import React, { useState } from 'react';

const ProductFilter = ({ types, handleApplyFilters }) => {

    return (
        <form className="p-4 border rounded shadow" style={{ backgroundColor: '#f8faff' }}>
            {/* Category filter */}
            <div className="mb-4">
                <label htmlFor="category" className="form-label" style={{ color: '#606060' }}>Category:</label>
                <select id="category" name="category" className="form-select shadow-sm"
                value={types.category} onChange={(e) => handleApplyFilters(e, 'category', e.target.value)}>
                    <option value="">Select</option>
                    {types && types["Products"]["categories"] && types["Products"]["categories"].map(product => {
                        return <option key={product} value={product}>{product}</option>;
                    })}
                </select>
            </div>
            {/* Price range filter */}
            <div className="mb-4">
                <label className="form-label">Price Range:</label>
                <div className="input-group shadow-sm">
                    <input type="number" name="minPrice" placeholder="Min Price" className="form-control" value={types.minPrice} onChange={(e) => handleApplyFilters(e,"minPrice", e.target.value)}/>
                    <input type="number" name="maxPrice" placeholder="Max Price" className="form-control" value={types.maxPrice} onChange={(e) => handleApplyFilters(e,"maxPrice", e.target.value)} />
                </div>
            </div>
            {/* Animal type filter */}
            <div className="mb-4">
                <label htmlFor="animalType" className="form-label">Animal Type:</label>
                <select id="animalType" name="animalType" className="form-select shadow-sm"
                value={types.animalType} onChange={(e) => handleApplyFilters(e, 'animalType', e.target.value)}>
                    <option value="">Select</option>
                    {types && types["Products"]["animalTypes"] && types["Products"]["animalTypes"].map(product => {
                        return <option key={product} value={product}>{product}</option>;
                    })}
                </select>
            </div>
            {/* Submit button */}
            <button type="submit" className="btn btn-primary shadow-sm" style={{ width: '100%', background: 'linear-gradient(to right, #33ccff, #ff99cc)' }}
            onClick={(e) => handleApplyFilters(e, "ApplyFilters",null)}>Apply Filters</button>
        </form>
    );
};

export default ProductFilter;
