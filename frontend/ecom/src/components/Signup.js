import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const collectData = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("https://e-comm-dash-4.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, email, password }),
      });

      const result = await response.json();

      if (response.ok && result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("username", result.username || name);
        navigate("/");
      } else {
        alert(result?.error || "Registration failed. Try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };


  const styles = {
    container: {
      maxWidth: "400px",
      margin: "80px auto",
      padding: "30px",
      border: "1px solid #ccc",
      borderRadius: "12px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#f8f9fa",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "bold",
      color: "#343a40",
    },
    input: {
      width: "90%",
      padding: "10px",
      margin: "10px 0",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #ccc",
    },
    button: {
      width: "95%",
      padding: "12px",
      backgroundColor: "green",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "15px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register</h2>
      <input
        style={styles.input}
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        style={styles.input}
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button style={styles.button} onClick={collectData}>
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
