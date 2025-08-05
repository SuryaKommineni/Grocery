import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Billing.css';

function Billing() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || {}; // Retrieve cart from state

  // Calculate total amount
  const totalAmount = Object.values(cart).reduce(
    (sum, item) => sum + item.Dprice * item.quantity,
    0
  );

  // Handle confirm purchase
  const handleConfirm = () => {
    alert("Purchase confirmed! Thank you.");
    navigate("/"); // Redirect to home page
    window.location.reload();
  };

  return (
    <div className="billing-page">
      <h2>Billing Summary</h2>
      <div className="billing-details">
        {Object.values(cart).map((item) => (
          <div key={item.id} className="billing-item">
            {/* Displaying the image */}
            <img src={item.image} alt={item.name} className="billing-item-image" />
            <div className="billing-item-details">
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.Dprice}</p>
              <p>Total: ₹{item.Dprice * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <h3>Total Amount: ₹{totalAmount}</h3>
      <button onClick={handleConfirm} className="confirm-button">Confirm Purchase</button>
    </div>
  );
}

export default Billing;
