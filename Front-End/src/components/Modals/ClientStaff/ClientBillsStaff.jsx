import React, { useState, useEffect } from 'react';
import axios from 'axios';



const ClientBillsStaff = ({ clientId, handleClose }) => {

    const [bills, setBills] = useState([]); 

    const getBillsAPI = async () => {

        try {
            const response = await axios.get(`http://localhost:5067/api/Client/${clientId}/bills`);
            if (response.status === 200) {

                setBills(response.data);
                console.log('Bills fetched successfully:', bills);
            }
        } catch (error) {   
            console.error('Error fetching bills:', error);
        }
    };



    
    useEffect(() => {
        getBillsAPI();
    }, [clientId]);

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">

                <div className="modal-content shadow rounded-4">
                    <div className="modal-header bg-info text-white">
                        <h5 className="modal-title">🧾 Billing History</h5>
                        <button className="btn-close btn-close-white" onClick={handleClose}></button>
                    </div>

                    <div className="modal-body px-4 py-3" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                        {bills.length === 0 ? (
                            <div className="text-muted text-center">No bills found.</div>
                        ) : (
                            bills.map(bill => (
                                <div
                                    key={bill.billId}
                                    className="mb-4 border rounded shadow-sm p-3"
                                    style={{ maxHeight: '400px', overflowY: 'auto', backgroundColor: '#f9f9f9' }}
                                >
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div>
                                            <h6 className="fw-bold mb-1">Bill #{bill.billId}</h6>
                                            <small className="text-muted">Date: {new Date(bill.date).toLocaleDateString()}</small>
                                        </div>
                                        <span className="badge bg-primary">{bill.paymentMethod}</span>
                                    </div>

                                    {bill.products.length > 0 && (
                                        <>
                                            <h6 className="mt-3 mb-2">🛒 Products</h6>
                                            <ul className="list-group mb-3">
                                                {bill.products.map(product => (
                                                    <li key={product.productId} className="list-group-item d-flex justify-content-between">
                                                        <div>
                                                            <strong>{product.name}</strong> <small className="text-muted">({product.category})</small>
                                                            <div className="text-muted">Quantity: {product.quantity}</div>
                                                        </div>
                                                        <div className="text-end">
                                                            <div>€{(product.price * product.quantity).toFixed(2)}</div>
                                                            <small className="text-muted">€{product.price.toFixed(2)} each</small>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}

                                    {bill.services.length > 0 && (
                                        <>
                                            <h6 className="mt-3 mb-2">💼 Services</h6>
                                            <ul className="list-group mb-3">
                                                {bill.services.map(service => (
                                                    <li key={service.serviceId} className="list-group-item d-flex justify-content-between">
                                                        <div>
                                                            <strong>{service.serviceName}</strong>
                                                            <div className="text-muted">Type: {service.serviceType}</div>
                                                        </div>
                                                        <span>€{service.price.toFixed(2)}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}

                                    <div className="d-flex justify-content-end mt-2">
                                        <h6 className="text-success">Total: €{bill.totalAmount.toFixed(2)}</h6>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="modal-footer bg-light">
                        <button className="btn btn-outline-secondary rounded-pill px-4" onClick={handleClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientBillsStaff;
