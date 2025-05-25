import React, { useState, useEffect } from 'react';
import { getCartItems, updateItemQuantity, clearCart, removeItemFromCart } from '../../utils/cartUtils';

const ClientCart = ({ userId }) => {
    const [cart, setCart] = useState({ Services: [], Products: [] });
    const [statusMessage, setStatusMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const items = getCartItems();
        setCart(items);
    }, []);

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeItemFromCart(productId, 'product');
        } else {
            updateItemQuantity(productId, newQuantity);
        }
        const updatedCart = getCartItems();
        setCart(updatedCart);
    };

    const handlePayment = async () => {
        setStatusMessage(null);
        setErrorMessage(null);
        setIsProcessing(true);

        const totalAmount =
            cart.Products.reduce((sum, p) => sum + p.price * p.quantity, 0) +
            cart.Services.reduce((sum, s) => sum + (s.totalAmount || 0), 0);

        const payload = {
            clientId: parseInt(userId),
            paymentMethod: "Card",
            totalAmount,
            services: cart.Services.flatMap(s =>
                s.serviceId.map(id => ({
                    serviceId: id,
                    petId: s.petId,
                    startTime: s.startTime,
                    endTime: s.endTime,
                    description: s.description,
                    status: s.status || "Pending"
                }))
            ),
            products: cart.Products.map(p => ({
                productId: p.productId,
                name: p.name,
                description: p.description,
                category: p.category,
                animalType: p.animalType,
                price: p.price,
                quantity: p.quantity
            }))
        };

        console.log("📦 Sending checkout payload to backend:", payload);

        try {
            const response = await fetch("http://localhost:5067/api/Cart/proceedPayment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error("Failed to process payment");

            setStatusMessage("✅ Payment completed successfully.");
            clearCart();
            setCart({ Services: [], Products: [] });
        } catch (err) {
            setErrorMessage("❌ Payment failed. Please try again.");
            console.error(err);
        } finally {
            setIsProcessing(false);

            // Auto-hide messages after 3 seconds
            setTimeout(() => {
                setStatusMessage(null);
                setErrorMessage(null);
            }, 3000);
        }
    };

    const total = cart.Products.reduce((sum, p) => sum + (p.price * p.quantity), 0) +
        cart.Services.reduce((sum, s) => sum + (s.totalAmount || 0), 0);

    return (
        <div className="container my-5">
            <div className="row g-4">
                <div className="col-lg-6">
                    <div className="card shadow border-0 rounded-4">
                        <div className="card-header bg-primary text-white fw-semibold rounded-top-4">
                            Products
                        </div>
                        <div className="card-body" style={{ maxHeight: '450px', overflowY: 'auto' }}>
                            {cart.Products.length === 0 ? (
                                <p className="text-muted">No products in cart.</p>
                            ) : (
                                cart.Products.map(product => (
                                    <div key={product.productId} className="pb-3 mb-3 border-bottom">
                                        <div className="d-flex flex-column">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h5 className="mb-1">{product.name}</h5>
                                                <span className="fw-bold text-success">${(product.price * product.quantity).toFixed(2)}</span>
                                            </div>
                                            <p className="mb-1 text-muted small">{product.description}</p>
                                            <div className="mb-2">
                                                <span className="badge bg-info me-2">{product.category}</span>
                                                <span className="badge bg-secondary">{product.animalType}</span>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantityChange(product.productId, product.quantity - 1)}>-</button>
                                                <input
                                                    type="number"
                                                    value={product.quantity}
                                                    onChange={(e) => handleQuantityChange(product.productId, Math.max(0, parseInt(e.target.value) || 1))}
                                                    className="form-control form-control-sm text-center"
                                                    style={{ width: '60px' }}
                                                />
                                                <button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantityChange(product.productId, product.quantity + 1)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="card shadow border-0 rounded-4">
                        <div className="card-header bg-dark text-white fw-semibold rounded-top-4">
                            Services
                        </div>
                        <div className="card-body" style={{ maxHeight: '450px', overflowY: 'auto' }}>
                            {cart.Services.length === 0 ? (
                                <p className="text-muted">No services selected.</p>
                            ) : (
                                cart.Services.map((service, idx) => (
                                    <div key={idx} className="pb-3 mb-3 border-bottom">
                                        <div className="d-flex flex-column">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h6 className="fw-bold mb-1">Service ID: {service.serviceId.join(', ')}</h6>
                                                <span className="fw-bold text-success">${service.totalAmount}</span>
                                            </div>
                                            <p className="mb-1 text-muted small">{service.description}</p>
                                            <p className="mb-1">Pet ID: <strong>{service.petId}</strong></p>
                                            <p className="mb-1">Time: {new Date(service.startTime).toLocaleString()} ➝ {new Date(service.endTime).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <div className="card border-0 shadow rounded-4 p-4 d-flex flex-md-row flex-column justify-content-between align-items-center bg-light">
                    <h4 className="mb-3 mb-md-0 fw-bold text-dark">Total Amount: <span className="text-success">${total.toFixed(2)}</span></h4>
                    <button
                        className="btn btn-success btn-lg px-5 rounded-pill m-3"
                        onClick={handlePayment}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                    </button>
                </div>
            </div>

            {statusMessage && (
                <div className="alert alert-success text-center" role="alert">
                    {statusMessage}
                </div>
            )}

            {errorMessage && (
                <div className="alert alert-danger text-center" role="alert">
                    {errorMessage}
                </div>
            )}

        </div>
    );
};

export default ClientCart;
