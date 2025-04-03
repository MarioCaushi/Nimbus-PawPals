import React, { useState, useEffect } from 'react';
import axios from "axios";
import NavigationBar from '../components/NavBars/NavigationBar';
import ProductView from '../components/Products/ProductView';

const LOGGED_IN_KEY = 'isLoggedIn';
const ROLE_KEY = 'role';

const Products = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [products, setProducts] = useState({ Products: [], Types: [] });

  useEffect(() => {
    const token = localStorage.getItem(LOGGED_IN_KEY);
    const savedRole = localStorage.getItem(ROLE_KEY); // Renamed to avoid shadowing
    if (token) {
      setLoggedIn(true);
      setRole(savedRole);
    }

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

  // Reset function adjusted to match defined state
  const reset = () => {
    setProducts({ Products: [], Types: [] });
  };

  return (
    <>
      <NavigationBar loggedIn={loggedIn} role={role} />
      <ProductView loggedIn={loggedIn} role={role} products={products} />
    </>
  );
};

export default Products;
