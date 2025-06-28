import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  useEffect(() => {
    // ✅ Allow only if token is present and user role is 'admin'
    if (!token || role !== "admin") {
      alert("Access denied. Only admin users can access this page.");
      navigate("/login");
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await fetch("https://e-comm-dash-4.onrender.com/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data);
        } else {
          alert(data.error || "Failed to fetch users.");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token, role, navigate]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, Admin!</h1>
      <p>You have access to all admin features.</p>
      <p>Logged in as: <strong>{email}</strong></p> {/* 👈 email used here */}

      <h2 style={{ marginTop: "30px" }}>All Users</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            border: "1px solid #ddd",
          }}
        >
          <thead style={{ backgroundColor: "#f0f0f0" }}>
            <tr>
              <th style={cellStyle}>Name</th>
              <th style={cellStyle}>Email</th>
              <th style={cellStyle}>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={cellStyle}>{user.username}</td>
                <td style={cellStyle}>{user.email}</td>
                <td style={cellStyle}>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const cellStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "left",
};

export default AdminDashboard;
