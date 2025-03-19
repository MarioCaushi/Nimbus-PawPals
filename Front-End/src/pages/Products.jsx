import React from 'react'
import { useState, useEffect } from 'react';
import NavigationBar from '../components/NavBars/NavigationBar';
import ProductView from '../components/Products/ProductView';

const LOGGED_IN_KEY = 'isLoggedIn';
const ROLE_KEY = 'role';

const Products = () => {

  const [loggedIn, isLoggedIn] = useState(false);
  const [role, setRole] = useState('');

   useEffect(() => {
          const token = localStorage.getItem(LOGGED_IN_KEY);
          const role = localStorage.getItem(ROLE_KEY);
          if (token) {
              isLoggedIn(true);
              setRole(role);
          }
      }, []);

  return (
    <>
    <NavigationBar loggedIn={loggedIn} role={role} />
    
    <ProductView/>

    </>
  )
}

export default Products;
