import React, { useState } from "react";
import "./Terms.css";
import { useNavigate } from "react-router-dom";
function Terms() {
  const [terms, setTerms] = useState([
    "All sales are final.",
    "Ensure correct information before placing an order.",
    "Privacy is our priority; your data is safe with us.",
  ]); // Initial terms
  const [newTerm, setNewTerm] = useState(""); // Input for new terms

  // Function to handle adding a new term
  const handleAddTerm = () => {
    if (newTerm.trim()) {
      setTerms([...terms, newTerm]); // Add new term to the list
      setNewTerm(""); // Clear input field
    }
  };
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  }
  return (
    <div className="terms">
      <h2>Terms and Conditions</h2>
      <ul>
        {terms.map((term, index) => (
          <li key={index}>{term}</li>
        ))}
      </ul>

      <div className="add-term">
        <h3>Add a New Term</h3>
        <input
          type="text"
          value={newTerm}
          onChange={(e) => setNewTerm(e.target.value)}
          placeholder="Write a new term..."
        />
        <button onClick={handleAddTerm}>Add Term</button>
        <button onClick={handleGoHome}>Go Back</button>
        {/* <Link to = "/"  HOME/> */}
      </div>
    </div>
  );
}

export default Terms;
