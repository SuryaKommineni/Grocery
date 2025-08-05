import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Vegetables({ cart, addToCart, updateCart }) {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // Search input state
  const [filteredVegetables,setFilteredVegetables] = useState([]); // Initialize navigate hook
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
          setProducts(data);
          setFilteredVegetables(
            data.filter((product) => product.category === "Vegetables")
          );
        })
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

  const handleSearch = () => {
    const results = products.filter((product) => 
      product.category === "Vegetables" &&
      product.name.toLowerCase().includes(searchInput.toLowerCase()))
      setFilteredVegetables(results);
  }

  // Navigate to cart page
  const handleGoToCart = () => {
    navigate('/cart'); // Navigate to the cart page
  };

  // Filter fruits from the products array
  // const Vegetables = products.filter((product) => product.category === "Vegetables");

  return (
    <div className="product-section">
      <h2>Vegetables</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for Vegetables..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      <div className="product-cards">
        {filteredVegetables.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="product-price">
              <span className="original-price">₹{product.Oprice}</span> <br />
              <span className="discounted-price">₹{product.Dprice}</span>
            </p>

            {/* Add to Cart Button */}
            {cart[product.id] ? (
              <div className="quantity-controls">
                <button onClick={() => updateCart(product.id, cart[product.id].quantity - 1)} className="quantity-button">-</button>
                <span className="quantity">{cart[product.id].quantity}</span>
                <button onClick={() => updateCart(product.id, cart[product.id].quantity + 1)} className="quantity-button">+</button>
              </div>
            ) : (
              <button className="add-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            )}

            {/* Go to Cart Button */}
            {cart[product.id] && (
              <button className="go-to-cart-button" onClick={handleGoToCart}>Go to Cart</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vegetables;
