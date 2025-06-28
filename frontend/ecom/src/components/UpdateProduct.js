import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://e-comm-dash-4.onrender.com/product/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        setForm({
          name: data.name,
          price: data.price,
          category: data.category,
          company: data.company,
        });
        setExistingImage(data.image || ""); // Handle missing image
      } catch (err) {
        console.error(err);
        alert("Error fetching product details");
      }
    };

    if (!token) {
      navigate("/login");
    } else {
      fetchProduct();
    }
  }, [id, token, navigate]);

  const updateProduct = async () => {
    const { name, price, category, company } = form;

    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("company", company);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await fetch(`http://localhost:5000/product/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        alert("Product updated successfully!");
        navigate("/");
      } else {
        const errText = await res.text();
        throw new Error(errText);
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update product");
    }
  };

  const containerStyle = {
    padding: "30px",
    maxWidth: "500px",
    margin: "40px auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', sans-serif",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box",
  };

  const errorStyle = {
    color: "red",
    fontSize: "13px",
    marginBottom: "10px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#3182ce",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Update Product</h2>

      {["name", "price", "category", "company"].map((field) => (
        <div key={field}>
          <input
            type="text"
            placeholder={`Enter ${field}`}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            style={inputStyle}
          />
          {error && !form[field] && (
            <div style={errorStyle}>Enter valid {field}</div>
          )}
        </div>
      ))}

      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          style={inputStyle}
        />

        {/* Show existing image if present and no new image selected */}
        {existingImage && !imageFile && (
          <img
            src={`http://localhost:5000/${existingImage}`}
            alt="Existing product"
            style={{ maxWidth: "100%", marginTop: "10px", borderRadius: "6px" }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}

        {/* Preview selected new image */}
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            style={{ maxWidth: "100%", marginTop: "10px", borderRadius: "6px" }}
          />
        )}

        {/* If no image at all */}
        {!existingImage && !imageFile && (
          <div style={{ marginTop: "10px", fontStyle: "italic", color: "#888" }}>
            No existing image available.
          </div>
        )}
      </div>

      <button
        onClick={updateProduct}
        style={buttonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#2b6cb0")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#3182ce")}
      >
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
