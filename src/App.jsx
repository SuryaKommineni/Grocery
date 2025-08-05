import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import ProductSection from "./ProductSection";
import Fruits from "./Fruits";
import Vegetables from "./Vegetables";
import Cart from "./Cart";
import Banner from "./Banner";
import Dairy from "./Dairy";
import Billing from "./Billing";
import Terms from "./Terms"; // Import the Terms component
import Footer from "./Footer"; // Import Footer
import AdminPage from "./AdminPage"; // Import the AdminPage component
import "./App.css";

function App() {
  const [cart, setCart] = useState({}); // State to track cart items with quantities
  const [products, setProducts] = useState([]); // State to track products list

  // Function to add or update items in the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[product.id]) {
        // If product already exists, update the quantity
        newCart[product.id].quantity += 1;
      } else {
        // If product doesn't exist in the cart, add it with quantity 1
        newCart[product.id] = {
          ...product,
          quantity: 1, // Initialize quantity as 1 when first added
        };
      }
      return newCart;
    });
  };

  // Function to update the cart's item quantity or remove it
  const updateCart = (productId, quantity) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (quantity > 0) {
        newCart[productId].quantity = quantity; // Update quantity
      } else {
        delete newCart[productId]; // Remove item if quantity is 0
      }
      return newCart;
    });
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart({});
  };

  // Function to update the product list
  const updateProducts = (newProducts) => {
    setProducts(newProducts);
  };

  return (
    <BrowserRouter>
      <div>
        <Navbar cart={cart} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <ProductSection
                  addToCart={addToCart}
                  cart={cart}
                  updateCart={updateCart}
                />
              </>
            }
          />
          {/* Fruits route */}
          <Route
            path="/fruits"
            element={
              <Fruits
                cart={cart}
                addToCart={addToCart}
                updateCart={updateCart}
              />
            }
          />
          <Route
            path="/vegetables"
            element={
              <Vegetables
                cart={cart}
                addToCart={addToCart}
                updateCart={updateCart}
              />
            }
          />
          <Route
            path="/dairy"
            element={
              <Dairy
                cart={cart}
                addToCart={addToCart}
                updateCart={updateCart}
              />
            }
          />
          <Route
            path="/cart"
            element={<Cart cart={cart} updateCart={updateCart} />}
          />
          <Route
            path="/billing"
            element={<Billing cart={cart} clearCart={clearCart} />}
          />
          <Route path="/terms" element={<Terms />} />
          <Route
            path="/admin"
            element={
              <AdminPage products={products} updateProducts={updateProducts} />
            }
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
