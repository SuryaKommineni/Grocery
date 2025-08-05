import React from "react";
import './Cart.css';
import { Link, useNavigate } from "react-router-dom";

function Cart({ cart, updateCart }) {
  const navigate = useNavigate();

  // Handle Buy Now button click
  const handleBuyNow = () => {
    navigate("/billing", { state: { cart } }); 
  // Pass cart details via state
  };

  // Handle product removal
  const handleRemove = (id) => {
    updateCart(id, 0); // Set quantity to 0 to remove the product
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {Object.keys(cart).length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          {Object.values(cart).map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div>
                <p>{item.name}</p>
                <p>Price: ₹{item.Dprice}</p>
                <div className="product-details">
                  <button onClick={() => updateCart(item.id, item.quantity - 1)}>-</button>
                  <p>{item.quantity}</p>
                  <button onClick={() => updateCart(item.id, item.quantity + 1)}>+</button>
                </div>
                <h3>Total Amount: ₹{item.Dprice * item.quantity}</h3>
                <button onClick={() => handleRemove(item.id)} className="remove-button">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-actions">
        <Link to="/" className="continue">Continue Shopping</Link>
        {Object.keys(cart).length > 0 && (
          <button onClick={handleBuyNow} className="buy-now-button">Buy Now</button>
        )}
      </div>
    </div>
  );
}

export default Cart;
