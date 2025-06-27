import React, { useState, useRef } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);

  // we’ll use a ref to clear the file input on success
  const fileInputRef = useRef();

  const token = localStorage.getItem("token");
  const auth = localStorage.getItem("user");
  const userId = auth ? JSON.parse(auth)._id : null;

  const addProduct = async () => {
    // basic validation
    if (!name || !price || !category || !company || !image) {
      setError(true);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("company", company);
    formData.append("userId", userId);
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // no Content-Type here!
        },
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Product added successfully!");
        // reset form fields
        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
        setImage(null);
        setError(false);
        // clear the file input
        fileInputRef.current.value = "";
      } else {
        alert(`❌ Error: ${result.error || "Failed to add product"}`);
      }
      console.log("Server response:", result);
    } catch (err) {
      console.error("Network/server error:", err);
      alert("Network or server error");
    }
  };

  const styles = {
    container: {
      padding: "30px",
      maxWidth: "500px",
      margin: "40px auto",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      fontFamily: "'Segoe UI', sans-serif",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "12px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "16px",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#5a67d8",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    error: {
      color: "red",
      fontSize: "13px",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Product</h2>

      <input
        type="text"
        placeholder="Product name"
        style={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && <div style={styles.error}>Enter valid name</div>}

      <input
        type="text"
        placeholder="Product price"
        style={styles.input}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price && <div style={styles.error}>Enter valid price</div>}

      <input
        type="text"
        placeholder="Product category"
        style={styles.input}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !category && <div style={styles.error}>Enter valid category</div>}

      <input
        type="text"
        placeholder="Company name"
        style={styles.input}
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      {error && !company && <div style={styles.error}>Enter valid company</div>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={styles.input}
        onChange={(e) => setImage(e.target.files[0])}
      />
      {error && !image && <div style={styles.error}>Upload product image</div>}

      <button
        style={styles.button}
        onClick={addProduct}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#434190")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#5a67d8")}
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
