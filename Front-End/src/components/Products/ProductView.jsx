import React, { useState, useEffect } from 'react';
import ProductFilter from './ProductFilter';
import axios from "axios";
import AddProductModal from '../Modals/ProductModals/AddProductModal';
import EditProductModal from '../Modals/ProductModals/EditProductModal';
import { addItemToCart } from '../../utils/cartUtils';

const ProductView = ({ role }) => {

    const [products, setProducts] = useState({ Products: [], Types: [] });
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Dealing with product search and filter

    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [animalType, setAnimalType] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    //  Dealing with Add Product Modal
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const [toggle, setToggle] = useState(false);
    const handleToggle = () => {
        setToggle(prev => !prev)
        console.log("Added state changed to:", !toggle);
    };

    // Dealing with Edit Product Modal
    const [showEditModal, setShowEditModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);


    useEffect(() => {
        getAPI();
    }, [toggle]);

    const getAPI = async () => {
        try {
            const response1 = await axios.get('http://localhost:5067/api/Product');
            let types = []; // Default empty array if the second call fails
            if (response1.status === 200) {
                const response2 = await axios.get('http://localhost:5067/api/Product/types');
                if (response2.status === 200) {
                    types = response2.data;
                } else {
                    console.error("Error fetching product types from API");
                }
                setProducts({
                    Products: response1.data,
                    Types: types
                });
            }
        } catch (error) {
            console.error("Error fetching products from API", error);
        }
    };

    const resetFilters = () => {
        setCategory('');
        setAnimalType('');
        setMinPrice('');
        setMaxPrice('');
        setSearchTerm('');
    }


    const handleApplyFilters = async (e, filter, choice) => {
        e.preventDefault();

        if (filter === 'category') {
            setCategory(choice);
        } else if (filter === 'animalType') {
            setAnimalType(choice);
        } else if (filter === 'minPrice') {
            setMinPrice(choice);
        } else if (filter === 'maxPrice') {
            setMaxPrice(choice);
        } else if (filter === 'searchTerm') {
            setSearchTerm(choice);
        } else if (filter === 'ApplyFilters') {
            await new Promise(resolve => setTimeout(resolve, 0)); // let searchTerm update
            filterAPI();
        }


    };

    const filterAPI = async () => {
        const params = {
            category: category,
            animalType: animalType,
            minPrice: minPrice,
            maxPrice: maxPrice,
            searchWord: searchTerm
        };

        // Remove empty filter parameters
        Object.keys(params).forEach(key => params[key] === '' && delete params[key]);

        console.log("Applying filters:", params);

        try {
            const response = await axios.post('http://localhost:5067/api/Product/search', params);
            if (response.status === 200) {
                setProducts(prev => ({
                    ...prev,
                    Products: response.data
                }));
            } else {
                console.error("Error fetching filtered products from API");
            }
        } catch (error) {
            console.error("Error with the filter API call", error);
        }
    };

    const handleDeleteProduct = async (productId) => {

        if (!confirm("Are you sure you want to delete this product?")) {
            return;
        }
        try {
            const response = await axios.delete(`http://localhost:5067/api/Product/${productId}`);
            if (response.status === 200) {
                setProducts(prev => ({
                    ...prev,
                    Products: prev.Products.filter(product => product.productId !== productId)
                }));
                setSelectedProduct(null);
            } else {
                console.error("Error deleting product from API");
            }
        } catch (error) {
            console.error("Error with the delete API call", error);
        }
    }

    const [cartQuantity, setCartQuantity] = useState(1);

    const handleAddToCart = (product) => {
        console.log("Add to cart:", product, "Quantity:", cartQuantity);
        // Add your real logic here

        const cartItem = {
            ...product,
            quantity: cartQuantity}

        console.log("Cart Item:", cartItem);

        addItemToCart(cartItem, 'product');
        alert(`${product.name} has been added to your cart!`);
    };




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
                {role === 'Manager' && (
                    <button type="button" className="btn" style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        borderRadius: '25px',
                        border: 'none',
                        height: '50px',
                        fontSize: '16px',
                        padding: '0 20px',
                        marginRight: '20px',
                        boxShadow: '0 4px 8px rgba(0, 128, 0, 0.2)',
                        transition: 'all 0.3s ease'
                    }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#367c39';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#4CAF50';
                        }}
                        onClick={openModal}>
                        Add Product
                    </button>
                )}

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
                    value={searchTerm}
                    onChange={(e) => handleApplyFilters(e, 'searchTerm', e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault(); // optional, but good to have
                            console.log("Enter pressed"); // test line
                            handleApplyFilters(e, 'ApplyFilters', null);
                        }
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
                    }}
                    onClick={(e) => handleApplyFilters(e, 'ApplyFilters', null)}>
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
                    }}
                    onClick={() => resetFilters()}>
                    Clear
                </button>
            </div>


            {/* Main Layout */}
            <div className="d-flex" style={{ height: '90vh', width: '100%' }}>

                {/* Left Column - Fixed Sidebar for Filters */}
                <div className="filters p-2 me-4" style={{ minWidth: '300px', maxWidth: '350px', overflowY: 'auto' }}>
                    <ProductFilter types={{
                        "Products": products["Types"],
                        category,
                        animalType,
                        minPrice,
                        maxPrice,
                        searchTerm
                    }} handleApplyFilters={handleApplyFilters} />
                </div>

                {/* Right Column - Scrollable Product Listing */}
                <div className="products-container flex-grow-1" style={{
                    padding: '20px',
                    overflowY: 'auto'
                }}>
                    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                        {products["Products"].map(product => (
                            <div key={product["productId"]} className="col">
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
                                        <img src={product["imageUrl"]} className="card-img-top" alt={product["name"]}
                                            style={{ height: '200px', objectFit: 'cover', borderRadius: '15px 15px 0 0' }}
                                        />
                                    </div>
                                    <div className="card-body text-center">
                                        <h6 className="card-title fw-bold text-dark">{product["name"]}</h6>
                                        <p className="card-text text-muted small">{product["description"].slice(0, 40)}...</p>
                                        <p className="card-text text-success fw-bold fs-5">{product["price"]}$</p> {/* Green price text for better contrast */}
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
                                <h5 className="modal-title">{selectedProduct["name"]}</h5>
                                <button type="button" className="btn-close" onClick={() => setSelectedProduct(null)}></button>
                            </div>
                            <div className="modal-body text-center">
                                <img
                                    src={selectedProduct["imageUrl"]}
                                    alt={selectedProduct["name"]}
                                    className="img-fluid rounded"
                                    style={{ maxWidth: '100%', width: '300px', height: 'auto' }}
                                />
                                <p className="mt-3">{selectedProduct["description"]}</p>
                                <h4 className="text-primary">{selectedProduct["price"]}$</h4>
                            </div>
                            <div className="modal-footer">
                                {role === "Manager" && (
                                    <>
                                        <button
                                            className="btn"
                                            style={{
                                                backgroundColor: '#dc3545', // Red for delete
                                                color: 'white',
                                                borderRadius: '5px',
                                                marginRight: '10px',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                                            onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                                            onClick={() => { handleDeleteProduct(selectedProduct["productId"]) }}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="btn"
                                            style={{
                                                backgroundColor: '#17a2b8', // Light blue, specifically Bootstrap's "info" blue
                                                color: 'white',
                                                borderRadius: '5px',
                                                marginRight: '10px',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseOver={(e) => e.target.style.backgroundColor = '#138496'} // Slightly darker on hover
                                            onMouseOut={(e) => e.target.style.backgroundColor = '#17a2b8'}
                                            onClick={() => {
                                                setShowEditModal(true);        // open edit modal
                                                // pass a product directly — don’t clear selectedProduct yet
                                                setEditProduct(selectedProduct);
                                                setSelectedProduct(null);      // now hide product detail modal
                                            }}
                                        >
                                            Edit
                                        </button>

                                    </>
                                )}
                                {role === "Client" && (
                                    <div className="d-flex align-items-center gap-3 me-auto">
                                        <div className="input-group" style={{ width: '130px' }}>
                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={() => setCartQuantity(prev => Math.max(1, prev - 1))}
                                            >−</button>
                                            <input
                                                type="number"
                                                className="form-control text-center"
                                                value={cartQuantity}
                                                onChange={(e) => setCartQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                            />
                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={() => setCartQuantity(prev => prev + 1)}
                                            >+</button>
                                        </div>

                                        <button
                                            className="btn btn-outline-success fw-semibold px-4 py-2 rounded-pill shadow-sm"
                                            onClick={() => handleAddToCart(selectedProduct)}
                                        >
                                            🛒 Add {cartQuantity} to Cart
                                        </button>
                                    </div>
                                )}


                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setSelectedProduct(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <AddProductModal
                show={showModal}
                onClose={closeModal}
                handleToggle={handleToggle}
                categories={products["Types"]["categories"]}
                animalTypes={products["Types"]["animalTypes"]}
            />

            <EditProductModal
                show={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setEditProduct(null);
                }}
                handleToggle={handleToggle}
                product={editProduct}
                categories={products["Types"]["categories"]}
                animalTypes={products["Types"]["animalTypes"]}
            />


        </div>
    );
};

export default ProductView;
