const CART_KEY = 'cartItems';

// Get cart items (returns dictionary with Services and Products)

// Get total count of items in cart (services + products*quantity)
export const getCartItemCount = () => {
  const cart = getCartItems();
  const serviceCount = cart.Services.length;
  const productCount = cart.Products.reduce((total, p) => total + (p.quantity || 1), 0);
  return serviceCount + productCount;
};

export const getCartItems = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : { Services: [], Products: [] };
};

// Add item to cart in correct category
export const addItemToCart = (item, type) => {
  const cart = getCartItems();

  if (type === 'service') {
    const exists = cart.Services.some(s =>
      s.serviceId === item.serviceId &&
      s.startTime === item.startTime &&
      s.endTime === item.endTime &&
      s.description === item.description &&
      s.status === item.status &&
      s.petId === item.petId &&
      s.clientId === item.clientId &&
      s.paymentMethod === item.paymentMethod &&
      s.totalAmount === item.totalAmount
    );
    if (!exists) {
      cart.Services.push(item);
    }
  } else if (type === 'product') {
    const existingIndex = cart.Products.findIndex(p => p.productId === item.productId);
    if (existingIndex !== -1) {
      cart.Products[existingIndex].quantity = (cart.Products[existingIndex].quantity || 1) + (item.quantity || 1);
    } else {
      cart.Products.push({ ...item, quantity: item.quantity || 1 });
    }
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
};

// Remove item by id from both categories
export const removeItemFromCart = (itemId, type) => {
  const cart = getCartItems();
  if (type === 'service') {
    cart.Services = cart.Services.filter(item => item.serviceId !== itemId);
  } else if (type === 'product') {
    cart.Products = cart.Products.filter(item => item.productId !== itemId);
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
};

// Update item quantity by id in products only
export const updateItemQuantity = (itemId, quantity) => {
  const cart = getCartItems();
  cart.Products = cart.Products.map(item => {
    if (item.productId === itemId) {
      return quantity <= 0 ? null : { ...item, quantity };
    }
    return item;
  }).filter(item => item !== null);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
};

// Clear cart
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

// Format cart for summary
export const formatCartDetails = (services = [], products = []) => {
  return {
    Services: services.map(s => ({
      serviceId: s.serviceId,
      name: s.name,
      price: s.price,
      duration: s.duration
    })),
    Products: products.map(p => ({
      productId: p.productId,
      name: p.name,
      quantity: p.quantity,
      price: p.price
    }))
  };
};
