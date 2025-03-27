import React, { useState } from 'react';
import ProductFilter from './ProductFilter';

const products = [
    { id: 1, name: 'Product 1', price: '$19.99', image: 'https://via.placeholder.com/200', description: 'This is a detailed description of Product 1.' },
    { id: 2, name: 'Product 2', price: '$29.99', image: 'https://via.placeholder.com/200', description: 'This is a detailed description of Product 2.' },
    { id: 3, name: 'Product 3', price: '$39.99', image: 'https://via.placeholder.com/200', description: 'This is a detailed description of Product 3.' },
    { id: 4, name: 'Product 4', price: '$49.99', image: 'https://via.placeholder.com/200', description: 'This is a detailed description of Product 4.' },
    { id: 5, name: 'Product 5', price: '$59.99', image: 'https://via.placeholder.com/200', description: 'This is a detailed description of Product 5.' },
    { id: 6, name: 'Product 6', price: '$69.99', image: 'https://via.placeholder.com/200', description: 'This is a detailed description of Product 6.' },
    { id: 7, name: 'Product 7', price: '$79.99', image: 'https://via.placeholder.com/200', description: 'This is a detailed description of Product 7.' },
    { id: 8, name: 'Product 8', price: '$89.99', image: 'https://via.placeholder.com/200', description: 'This is a detailed description of Product 8.' },
    { id: 9, name: 'Product 9', price: '$99.99', image: 'https://via.placeholder.com/200', description: 'This is a detailed description of Product 9.' },
    { id: 10, name: 'Product 10', price: '$109.99', image: 'https://via.placeholder.com/200', description: 'This is a detailed description of Product 10.' }
];

const ProductView = ({ loggedIn, role }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <div className="container-fluid px-0 py-4 ">

            <h1 className="text-center mb-4 mt-5">Products</h1>

            {/* Search Bar */}
            <div className="input-group mb-5" style={{
                maxWidth: '600px',
                margin: 'auto',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                borderRadius: '30px',
                padding: '6px',
                backgroundColor: 'white'
            }}>
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Search products..."
                    style={{
                        height: '50px',
                        border: '2px solid #888',
                        borderRadius: '25px',
                        fontSize: '16px',
                        paddingLeft: '15px',
                        backgroundColor: 'white'
                    }}
                />
                <button type="button" className="btn me-2" style={{
                    backgroundColor: 'white',
                    color: '#5A8DEE',
                    borderRadius: '25px',
                    border: '2px solid #5A8DEE',
                    height: '50px',
                    fontSize: '16px',
                    padding: '0 20px',
                    marginLeft: '5px',
                    transition: 'all 0.3s ease'
                }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#5A8DEE';
                        e.target.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.color = '#5A8DEE';
                    }}>
                    Search
                </button>
                <button type="button" className="btn" style={{
                    backgroundColor: 'white',
                    color: '#ADB5BD',
                    borderRadius: '25px',
                    border: '2px solid #ADB5BD',
                    height: '50px',
                    fontSize: '16px',
                    padding: '0 20px',
                    marginLeft: '5px',
                    transition: 'all 0.3s ease'
                }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#ADB5BD';
                        e.target.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.color = '#ADB5BD';
                    }}>
                    Clear
                </button>
            </div>


            {/* Main Layout */}
            <div className="d-flex" style={{ height: '90vh', width: '100%' }}>

                {/* Left Column - Fixed Sidebar for Filters */}
                <div className="filters p-2 me-4" style={{ minWidth: '300px', maxWidth: '350px', overflowY: 'auto' }}>
                    <ProductFilter />
                </div>

                {/* Right Column - Scrollable Product Listing */}
                <div className="products-container flex-grow-1" style={{
                    padding: '20px',
                    overflowY: 'auto'
                }}>
                    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                        {products.map(product => (
                            <div key={product.id} className="col">
                                <div className="card h-100 shadow-sm border-0"
                                    style={{
                                        cursor: 'pointer',
                                        borderRadius: '15px',
                                        overflow: 'hidden',
                                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                        background: 'linear-gradient(to bottom, #f9fafb, #ffffff)', // Softer gradient background
                                        border: '1px solid #e0e0e0', // Softer border color
                                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' // Softer shadow
                                    }}
                                    onClick={() => setSelectedProduct(product)}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.03)';
                                        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
                                    }}
                                >
                                    <div className="position-relative">
                                        <img src={product.image} className="card-img-top" alt={product.name}
                                            style={{ height: '200px', objectFit: 'cover', borderRadius: '15px 15px 0 0' }}
                                        />
                                    </div>
                                    <div className="card-body text-center">
                                        <h6 className="card-title fw-bold text-dark">{product.name}</h6>
                                        <p className="card-text text-muted small">{product.description.slice(0, 40)}...</p>
                                        <p className="card-text text-success fw-bold fs-5">{product.price}</p> {/* Green price text for better contrast */}
                                        <button className="btn btn-warning btn-sm px-4 text-dark fw-bold">View Details</button> {/* New warm yellow button */}
                                    </div>
                                </div>
                            </div>
                        ))}



                    </div>
                </div>
            </div>

            {/* Bootstrap Modal for Product Details (Centered) */}
            {selectedProduct && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog"
                    style={{ background: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedProduct.name}</h5>
                                <button type="button" className="btn-close" onClick={() => setSelectedProduct(null)}></button>
                            </div>
                            <div className="modal-body text-center">
                                <img src={selectedProduct.image} alt={selectedProduct.name} className="img-fluid rounded" />
                                <p className="mt-3">{selectedProduct.description}</p>
                                <h4 className="text-primary">{selectedProduct.price}</h4>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setSelectedProduct(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductView;
