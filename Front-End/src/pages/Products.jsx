import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavBars/NavigationBar';
import ProductView from '../components/Products/ProductView';

const LOGGED_IN_KEY = 'isLoggedIn';
const ROLE_KEY = 'role';

const Products = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem(LOGGED_IN_KEY);
    const savedRole = localStorage.getItem(ROLE_KEY); // Renamed to avoid shadowing
    if (token) {
      setLoggedIn(true);
      setRole(savedRole);
    }
  }, []);

  return (
    <>
      <NavigationBar loggedIn={loggedIn} role={role} />
      <ProductView loggedIn={loggedIn} role={role} />
    </>
  );
};

export default Products;
