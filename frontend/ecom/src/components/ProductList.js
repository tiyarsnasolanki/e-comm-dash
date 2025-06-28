import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch("https://e-comm-dash-4.onrender.com/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/product/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) fetchProducts();
      else alert("Failed to delete product");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong");
    }
  };

  const handleSearch = async (e) => {
    const key = e.target.value;
    setSearch(key);

    if (!key) return fetchProducts();

    try {
      const response = await fetch(`http://localhost:5000/search/${key}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      setProducts(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Search error:", err);
      setProducts([]);
    }
  };

  return (
    <div style={{ padding: "30px", backgroundColor: "#e6dcfa", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold", fontSize: "28px", color: "#2e1058" }}>
        Product List
      </h2>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search product"
          value={search}
          onChange={handleSearch}
          style={{
            padding: "10px",
            width: "320px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #aaa",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      <div
        style={{
          overflowX: "auto",
          border: "1px solid #ccc",
          borderRadius: "12px",
          backgroundColor: "#fff",
          padding: "10px",
          maxWidth: "95%",
          margin: "auto",
        }}
      >
        {products.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "900px",
            }}
          >
            <thead style={{ backgroundColor: "#5a2c91", color: "#fff" }}>
              <tr>
                <th style={thStyle}>S.No</th>
                <th style={thStyle}>Image</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Company</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={item._id} style={{ textAlign: "center", borderBottom: "1px solid #eee" }}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={
                        item.image
                          ? `http://localhost:5000/uploads/${item.image}`
                          : "https://via.placeholder.com/80?text=No+Image"
                      }
                      alt={item.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "contain",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "10px",
                        padding: "4px",
                        boxShadow: "0 0 6px rgba(0,0,0,0.1)",
                      }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.company}</td>
                  <td>
                    <button
                      onClick={() => deleteProduct(item._id)}
                      style={{
                        backgroundColor: "#e74c3c",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "6px 12px",
                        marginRight: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                    <Link to={`/update/${item._id}`}>
                      <button
                        style={{
                          backgroundColor: "#2980b9",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          padding: "6px 12px",
                          cursor: "pointer",
                        }}
                      >
                        Update
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center", color: "#666", fontSize: "18px" }}>No products found.</p>
        )}
      </div>
    </div>
  );
};

// Header cell style
const thStyle = {
  padding: "10px",
  fontWeight: "bold",
  borderBottom: "1px solid #ccc",
};

export default ProductList;
