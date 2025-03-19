const CART_KEY = 'cartItems';

// Get cart items (returns array)
export const getCartItems = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

// Add item to cart
export const addItemToCart = (item) => {
  const cart = getCartItems();
  cart.push(item);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Remove item by id (assuming each item has a unique id)
export const removeItemFromCart = (itemId) => {
  const cart = getCartItems().filter(item => item.id !== itemId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Update item quantity by id
export const updateItemQuantity = (itemId, quantity) => {
    const cart = getCartItems().map(item => {
      if (item.id === itemId) {
        if (quantity === 0) {
          return null; 
        }
        return { ...item, quantity };
      }
      return item;
    }).filter(item => item !== null); 
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  };
  

// Clear cart
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};
