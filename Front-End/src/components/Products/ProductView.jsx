import React, { useState, useEffect } from 'react';
import ProductFilter from './ProductFilter';
import axios from "axios";

const ProductView = ({ loggedIn, role }) => {

    const [products, setProducts] = useState({ Products: [], Types: [] });
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Dealing with product search and filter

    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [animalType, setAnimalType] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const [filtersApplied, setFiltersApplied] = useState(false);

    useEffect(() => {
        getAPI();
    }, []);

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

    // Function to filter products based on the selected filters every time filtersApplied changes
    useEffect(() => {
        filterAPI();
    }, [filtersApplied]);


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
            await filterAPI(); // Call API directly here
        }
    };
    
    const filterAPI = async () => {
        const params = {
            category: category,
            animalType: animalType,
            minPrice: minPrice,
            maxPrice: maxPrice,
            searchTerm: searchTerm
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
    
    // Note: No useEffect needed for filtersApplied if using the above setup
    

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
                    value={searchTerm}
                    onChange={(e) => handleApplyFilters(e, 'searchTerm', e.target.value)}
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
