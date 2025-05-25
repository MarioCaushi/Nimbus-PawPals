import React from 'react'
import NavigationBar from '../../components/NavBars/NavigationBar';
import { useState, useEffect } from 'react';
import ClientCart from '../../components/ClientSide/ClientCart';


const LOGGED_IN_KEY = 'isLoggedIn';
const ROLE_KEY = 'role';
const USER_ID_KEY = 'userId';

const ShoppingCart = () => {

          const [loggedIn, setLoggedIn] = useState(false);
          const [role, setRole] = useState('');
          const [userId, setUserId] = useState('');
      
          useEffect(() => {
              const token = localStorage.getItem(LOGGED_IN_KEY);
              const savedRole = localStorage.getItem(ROLE_KEY); // Renamed to avoid shadowing
              const savedUserId = localStorage.getItem(USER_ID_KEY);
    
              console.log('Token:', token);
              console.log('Role:', savedRole);
              console.log('User ID:', savedUserId);
    
              if (token) {
                  setLoggedIn(true);
                  setRole(savedRole);
                  setUserId(savedUserId);
              }
          }, []);

  return (
        <div>
            <div style={{ marginTop: '80px' }}>
                <NavigationBar loggedIn={loggedIn} role={role} />
                <div className="container mt-5">
                    <h2> Shopping Cart </h2>
                    <p className="text-muted mb-2">Here you can view and manage your shopping cart.</p>
                    <ClientCart userId={userId} />
                </div>
            </div>
        </div>
  )
}

export default ShoppingCart
