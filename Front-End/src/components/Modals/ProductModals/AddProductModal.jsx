import React, { useState } from 'react';
import axios from 'axios';

function AddProductModal({ show, handleToggle, onClose, categories = [], animalTypes = [] }) {
  const [isCategoryOther, setIsCategoryOther] = useState(false);
  const [isAnimalTypeOther, setIsAnimalTypeOther] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    imageUrl: '',
    animalType: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'category') {
      setIsCategoryOther(value === 'Other');
      setFormData(prev => ({ ...prev, category: value === 'Other' ? '' : value }));
    } else if (name === 'animalType') {
      setIsAnimalTypeOther(value === 'Other');
      setFormData(prev => ({ ...prev, animalType: value === 'Other' ? '' : value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDiscard = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      description: '',
      imageUrl: '',
      animalType: ''
    });
    setIsCategoryOther(false);
    setIsAnimalTypeOther(false);
  };

  const handleSave = async () => {

    console.log('Form data:', formData);
    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.category.trim() ||
      !formData.animalType.trim() ||
      !formData.price
    ) {

      setErrorMessage('Please fill in all required fields.');
      setSuccessMessage('');

      setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return;
    }

    try {

      const response = await axios.post('http://localhost:5067/api/Product/addProduct', formData);

      if (response.status == 200) {
        setErrorMessage('');
        setSuccessMessage('Product saved successfully!');
        handleDiscard();
        handleToggle();
      }

    } catch (error) {
      console.error('Error saving product:', error);
      setErrorMessage('Failed to save product. Please try again.');
      setSuccessMessage('');
    }

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);


    console.log('Saving product:', formData);
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header border-0">
            <h4 className="modal-title fw-bold">Add New Product</h4>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body px-4">
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}

            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Product Name</label>
                  <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Price</label>
                  <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Animal Type</label>
                  <select name="animalType" className="form-select" value={isAnimalTypeOther ? 'Other' : formData.animalType} onChange={handleChange}>
                    <option value="">Select animal type</option>
                    {animalTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="animalType"
                    placeholder="Enter custom animal type"
                    value={formData.animalType}
                    onChange={handleChange}
                    disabled={!isAnimalTypeOther}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Category</label>
                  <select name="category" className="form-select" value={isCategoryOther ? 'Other' : formData.category} onChange={handleChange}>
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="category"
                    placeholder="Enter custom category"
                    value={formData.category}
                    onChange={handleChange}
                    disabled={!isCategoryOther}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea name="description" className="form-control" rows="2" value={formData.description} onChange={handleChange}></textarea>
                </div>

                <div className="col-12">
                  <label className="form-label">Image URL</label>
                  <input type="text" name="imageUrl" className="form-control" value={formData.imageUrl} onChange={handleChange} />
                </div>
              </div>
            </form>
          </div>

          <div className="modal-footer justify-content-center border-0 pb-4">
            <button className="btn btn-secondary me-2 px-4" onClick={onClose}>Close</button>
            <button className="btn btn-danger me-2 px-4" onClick={handleDiscard}>Discard</button>
            <button className="btn btn-success px-4" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;
