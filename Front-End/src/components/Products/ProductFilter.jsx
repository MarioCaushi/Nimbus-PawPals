import React, { useState } from 'react';

const ProductFilter = () => {

    return (
        <form  className="p-4 border rounded shadow" style={{ backgroundColor: '#f8faff' }}>
            {/* Category filter */}
            <div className="mb-4">
                <label htmlFor="category" className="form-label" style={{ color: '#606060' }}>Category:</label>
                <select id="category" name="category" className="form-select shadow-sm">
                    <option value="">Select</option>
                    <option value="food">Food</option>
                    <option value="toys">Toys</option>
                    <option value="accessories">Accessories</option>
                    <option value="hotel">Hotel</option>
                </select>
            </div>
            {/* Price range filter */}
            <div className="mb-4">
                <label className="form-label">Price Range:</label>
                <div className="input-group shadow-sm">
                    <input type="number" name="minPrice" placeholder="Min Price"  className="form-control" />
                    <input type="number" name="maxPrice" placeholder="Max Price"  className="form-control" />
                </div>
            </div>
            {/* Animal type filter */}
            <div className="mb-4">
                <label htmlFor="animalType" className="form-label">Animal Type:</label>
                <select id="animalType" name="animalType"  className="form-select shadow-sm">
                    <option value="">Select</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="reptile">Reptile</option>
                </select>
            </div>
            {/* Submit button */}
            <button type="submit" className="btn btn-primary shadow-sm" style={{ width: '100%', background: 'linear-gradient(to right, #33ccff, #ff99cc)' }}>Apply Filters</button>
        </form>
    );
};

export default ProductFilter;
