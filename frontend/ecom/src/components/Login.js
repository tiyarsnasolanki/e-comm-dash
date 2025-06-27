import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password || !role) {
      alert("Please fill in all fields");
      return;
    }

    // Only allow admin login for one specific email-password pair
    if (
      role === "admin" &&
      (email !== "admin@ecomm.com" || password !== "Admin@123")
    ) {
      alert("Invalid admin credentials.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);
        localStorage.setItem("email", email); // ✅ Store email for AdminDashboard

        if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
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
    select: {
      width: "95%",
      padding: "10px",
      margin: "10px 0",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      backgroundColor: "#fff",
    },
    button: {
      width: "95%",
      padding: "12px",
      backgroundColor: "#32295e",
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
      <h2 style={styles.title}>Login</h2>
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
      <select
        style={styles.select}
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button style={styles.button} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
