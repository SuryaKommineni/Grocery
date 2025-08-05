import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ProductSection.css';

function ProductSection({ cart, addToCart, updateCart }) {
  const [products, setProducts] = useState([]); // State for storing product data
  const navigate = useNavigate(); // Initialize navigate hook

  // Fetch products on component mount
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle add to cart
  const handleAddToCart = (product) => {
    addToCart(product); // Add product to cart with quantity handling
  };

  // Handle quantity increment
  const handleIncrement = (productId) => {
    updateCart(productId, cart[productId].quantity + 1); // Increment quantity
  };

  // Handle quantity decrement
  const handleDecrement = (productId) => {
    if (cart[productId].quantity > 1) {
      updateCart(productId, cart[productId].quantity - 1); // Decrement quantity
    } else {
      updateCart(productId, 0); // Remove product if quantity reaches 0
    }
  };

  // Navigate to cart page
  const handleGoToCart = () => {
    navigate('/cart'); // Navigate to the cart page
  };
  const displayedProducts = [...products].slice(0, 8);
  return (
    <div className="product-section">
      <h2>Best Sellers</h2>
      <div className="product-cards">
        {displayedProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">
              <span className="original-price">₹{product.Oprice}</span> <br />
              <span className="discounted-price">₹{product.Dprice}</span>
            </p>

            {/* Displaying the add to cart or quantity control buttons */}
            {cart[product.id] ? (
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(product.id)} className="quantity-button">-</button>
                <span className="quantity">{cart[product.id].quantity}</span>
                <button onClick={() => handleIncrement(product.id)} className="quantity-button">+</button>
              </div>
            ) : (
              <button className="add-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            )}

            {/* Display Go to Cart button for all products that have been added to the cart */}
            {cart[product.id] && (
              <button className="go-to-cart-button" onClick={handleGoToCart}>Go to Cart</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductSection;
