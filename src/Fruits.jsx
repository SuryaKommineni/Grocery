import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductSection.css";

function Fruits({ cart, addToCart, updateCart }) {
  const [products, setProducts] = useState([]); // All products
  const [searchInput, setSearchInput] = useState(""); // Search input state
  const [filteredFruits, setFilteredFruits] = useState([]); // State for filtered fruits
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredFruits(data.filter((product) => product.category === "Fruits"));
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle search when button is clicked
  const handleSearch = () => {
    const results = products.filter(
      (product) =>
        product.category === "Fruits" &&
        product.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredFruits(results);
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Navigate to cart page
  const handleGoToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="product-section">
      <h2>Fruits</h2>

      {/* Search Input and Button */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for fruits..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      {/* Products */}
      <div className="product-cards">
        {filteredFruits.length > 0 ? (
          filteredFruits.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <p className="product-price">
              <h3 className="product-name">{product.name}</h3>
                <span className="original-price">₹{product.Oprice}</span> <br />
                <span className="discounted-price">₹{product.Dprice}</span>
              </p>

              {/* Add to Cart Button */}
              {cart[product.id] ? (
                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      updateCart(product.id, cart[product.id].quantity - 1)
                    }
                    className="quantity-button"
                  >
                    -
                  </button>
                  <span className="quantity">{cart[product.id].quantity}</span>
                  <button
                    onClick={() =>
                      updateCart(product.id, cart[product.id].quantity + 1)
                    }
                    className="quantity-button"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="add-button"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              )}

              {/* Go to Cart Button */}
              {cart[product.id] && (
                <button className="go-to-cart-button" onClick={handleGoToCart}>
                  Go to Cart
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="no-results">No fruits found.</p>
        )}
      </div>
    </div>
  );
}

export default Fruits;
