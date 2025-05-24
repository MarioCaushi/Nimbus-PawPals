import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EditProductModal({ show, onClose, handleToggle,  product, categories = [], animalTypes = [] }) {
  const [formData, setFormData] = useState({
    productId: product ? product.productId : '',
    name: '',
    category: '',
    price: '',
    description: '',
    imageUrl: '',
    animalType: ''
  });

  const [isCategoryOther, setIsCategoryOther] = useState(false);
  const [isAnimalTypeOther, setIsAnimalTypeOther] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (product) {
      console.log('Editing product:', product);
      setFormData({
        productId: product.productId || '',
        name: product.name || '',
        category: product.category || '',
        price: product.price || '',
        description: product.description || '',
        imageUrl: product.imageUrl || '',
        animalType: product.animalType || ''
      });

      setIsCategoryOther(!categories.includes(product.category));
      setIsAnimalTypeOther(!animalTypes.includes(product.animalType));
    }
  }, [product, categories, animalTypes]);

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

  const handleDiscard =  () => {
    if (!product) return;

    setFormData({
      name: product.name || '',
      category: product.category || '',
      price: product.price || '',
      description: product.description || '',
      imageUrl: product.imageUrl || '',
      animalType: product.animalType || ''
    });

    console.log('Discarding changes', product.productId);

    setIsCategoryOther(!categories.includes(product.category));
    setIsAnimalTypeOther(!animalTypes.includes(product.animalType));
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.category.trim() || !formData.animalType.trim() || !formData.price) {
      setErrorMessage('Please fill in all required fields.');
      setSuccessMessage('');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    try
    {

       const response = await axios.put(`http://localhost:5067/api/Product/editProduct`, formData);

       if (response.status == 200) {
        console.log('Product updated successfully:', response.data);
        setErrorMessage('');
        setSuccessMessage('Product updated successfully!');
        handleDiscard();
       }

    }
    catch (error) {
      console.error('Error updating product:', error);
      setErrorMessage('Failed to update product. Please try again.');
      setSuccessMessage('');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    setTimeout(() => {
      setSuccessMessage('');
      handleToggle();
      onClose();
    }, 3000);
  };

  if (!show || !product) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header border-0">
            <h4 className="modal-title fw-bold">Edit Product</h4>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body px-4">
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

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
                    name="animalType"
                    className="form-control mt-2"
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
                    name="category"
                    className="form-control mt-2"
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
            <button className="btn btn-secondary me-2 px-4" onClick={onClose}>Cancel</button>
            <button className="btn btn-danger me-2 px-4" onClick={handleDiscard}>Discard</button>
            <button className="btn btn-success px-4" onClick={handleSave}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProductModal;
