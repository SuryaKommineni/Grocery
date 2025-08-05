import React, { useState, useEffect } from "react";
import "./AdminPage.css"
function AdminPage() {
  const API_BASE_URL = "http://localhost:5000"; // Ensure your JSON Server runs on this base URL

  const [products, setProducts] = useState([]); // State for products
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    category: "",
    Dprice: 0,
    Oprice: 0,
    description: "",
    discount: "",
    image: "",
  }); // State for new product form

  // Fetch existing products from db.json
  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle form input changes for adding a new product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value, // Treat id as a string
    }));
  };

  // Add a new product via API call
  const handleAddProduct = () => {
    if (
      newProduct.id &&
      newProduct.name &&
      newProduct.category &&
      newProduct.Dprice > 0 &&
      newProduct.Oprice > 0 &&
      newProduct.description &&
      newProduct.discount &&
      newProduct.image
    ) {
      fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to add product: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          setProducts((prev) => [...prev, data]); // Update state with the new product
          setNewProduct({
            id: "",
            name: "",
            category: "",
            Dprice: 0,
            Oprice: 0,
            description: "",
            discount: "",
            image: "",
          }); // Reset the form
        })
        .catch((error) => console.error("Error adding product:", error));
    } else {
      alert("Please fill in all fields correctly!");
    }
  };

  // Delete a product via API call
  const handleDeleteProduct = (id) => {
    fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete product: ${response.statusText}`);
        }
        return response.json();
      })
      .then(() => {
        setProducts((prev) => prev.filter((product) => product.id !== id));
        console.log(`Product with ID ${id} deleted successfully!`);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("Failed to delete the product. Please check your server.");
      });
  };

  return (
    <div>
      <h1>Admin Page</h1>

      {/* Add New Product Form */}
      <div>
        <h2>Add New Product</h2>
        <form>
          <input
            type="text"
            name="id"
            placeholder="Product ID (string)"
            value={newProduct.id}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="Dprice"
            placeholder="Discounted Price"
            value={newProduct.Dprice}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="Oprice"
            placeholder="Original Price"
            value={newProduct.Oprice}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="discount"
            placeholder="Discount (e.g., 15% OFF)"
            value={newProduct.discount}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Product Image URL"
            value={newProduct.image}
            onChange={handleInputChange}
            required
          />
          <button type="button" onClick={handleAddProduct}>
            Add Product
          </button>
        </form>
      </div>

      {/* Existing Products */}
      <div>
        <h2>Existing Products</h2>
        <ul>
          {products.map((product) => (
            <li
              key={product.id}
              style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
              />
              <span>
                {product.name} ({product.category}) - ${product.Dprice} (Discount:{" "}
                {product.discount})
              </span>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPage;

