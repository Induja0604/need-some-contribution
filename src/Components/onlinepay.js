import React, { useState, useEffect } from 'react';
import '../Stylesheets/onlinepay.css';

const Onlinepay = () => {
    const [paymentType, setPaymentType] = useState('select');
    const [additionalInput, setAdditionalInput] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [count, setCount] = useState(300);
    const [address, setAddress] = useState('123 Main St, Springfield, USA');
    const [editAddress, setEditAddress] = useState(false);
    const [newAddress, setNewAddress] = useState('');

    useEffect(() => {
        let countdown;
        if (showConfirmation) {
            countdown = setInterval(() => {
                setCount((prevCount) => {
                    if (prevCount <= 0) {
                        clearInterval(countdown);
                        window.location.href = 'success.html';
                        return 0;
                    }
                    return prevCount - 1;
                });
            }, 1000);
        }
        return () => clearInterval(countdown);
    }, [showConfirmation]);

    const handlePaymentTypeChange = (e) => {
        setPaymentType(e.target.value);
        if (e.target.value === 'Phone') {
            setAdditionalInput(<input type="text" name="phoneNumber" placeholder="Enter Phone Number" />);
        } else if (e.target.value === 'UPI') {
            setAdditionalInput(<input type="text" name="upiID" placeholder="Enter UPI ID" />);
        } else {
            setAdditionalInput('');
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const handleEditAddressChange = () => {
        setEditAddress(!editAddress);
    };

    const handleSaveAddress = () => {
        setAddress(newAddress);
    };

    const handleOtpSubmit = () => {
        window.location.href = 'success.html';
    };

    const minutes = Math.floor(count / 60);
    const seconds = count % 60 < 10 ? '0' + (count % 60) : count % 60;

    return (
        <div>
            {!showConfirmation ? (
                <div className="container" id="paymentForm">
                    <h2>Make Payment</h2>
                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="paymentType">Select Payment Type:</label>
                        <select name="paymentType" id="paymentType" onChange={handlePaymentTypeChange} value={paymentType}>
                            <option value="select">--select--</option>
                            <option value="UPI">UPI</option>
                            <option value="Phone">Phone Number</option>
                        </select>
                        <br />
                        <div id="additionalInput">{additionalInput}</div>
                        <input type="submit" value="Proceed" />
                    </form>
                    <div className="summary-container">
                        <h2>Payment Summary</h2>
                        <div className="summary-item">
                            <span>Shipping Charges:</span>
                            <span>$10.00</span>
                        </div>
                        <div className="summary-item">
                            <span>Expenses:</span>
                            <span>$50.00</span>
                        </div>
                        <div className="summary-item">
                            <span>GST:</span>
                            <span>$6.00</span>
                        </div>
                        <div className="summary-item">
                            <span>Total Cost:</span>
                            <span>$66.00</span>
                        </div>
                    </div>
                    <div className="address-container">
                        <h2>Address</h2>
                        <div className="address-item">
                            <span>Address:</span>
                            <span id="address-display">{address}</span>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="editAddress"
                                id="editAddress"
                                checked={editAddress}
                                onChange={handleEditAddressChange}
                            />
                            <label className="form-check-label" htmlFor="editAddress">
                                Edit Address
                            </label>
                        </div>
                        {editAddress && (
                            <div className="edit-address-container">
                                <label htmlFor="edit-address" className="form-label">New Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="edit-address"
                                    placeholder="Enter your new address"
                                    value={newAddress}
                                    onChange={(e) => setNewAddress(e.target.value)}
                                />
                                <input
                                    type="button"
                                    className="btn btn-secondary mt-2"
                                    value="Save Address"
                                    onClick={handleSaveAddress}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="container confirmation" id="confirmation">
                    <h2>Please Confirm the Payment</h2>
                    <p>Please wait <span id="countdown">{minutes}:{seconds}</span> minutes for transaction confirmation...</p>
                    <input type="text" id="otp" name="otp" placeholder="Enter OTP" />
                    <input type="button" value="Submit OTP" onClick={handleOtpSubmit} />
                </div>
            )}
        </div>
    );
};

export default Onlinepay;
