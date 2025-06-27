import React from 'react';

const Profile = () => {
  const containerStyle = {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  };

  const headingStyle = {
    fontSize: '28px',
    textAlign: 'center',
    marginBottom: '25px',
    color: '#2c3e50',
  };

  const textStyle = {
    fontSize: '16px',
    margin: '12px 0',
    color: '#34495e',
  };

  const linkStyle = {
    color: '#2980b9',
    textDecoration: 'none',
    fontWeight: 500,
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>🏢 Company Profile</h1>

      <div>
        <p style={textStyle}><strong>Company Name:</strong> E-Dashboard Pvt. Ltd.</p>
        <p style={textStyle}><strong>Established:</strong> 2024</p>
        <p style={textStyle}><strong>Location:</strong> Gujarat, India</p>
        <p style={textStyle}><strong>Business Domain:</strong> Product Inventory Management</p>
        <p style={textStyle}><strong>CEO:</strong> Tiyarsna Solanki</p>
        <p style={textStyle}><strong>Employees:</strong> 15</p>
        <p style={textStyle}>
          <strong>Website:</strong>{' '}
          <a
            href="https://e-dashboard.com"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            e-dashboard.example.com
          </a>
        </p>
        <p style={textStyle}><strong>Email:</strong> info@e-dashboard.com</p>
        <p style={textStyle}><strong>Contact:</strong> +91-9978882919</p>
      </div>
    </div>
  );
};

export default Profile;
