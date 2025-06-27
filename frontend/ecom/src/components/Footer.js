import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: 'rgb(50, 41, 94)', 
    color: 'White',
    padding: '15px 0',
    textAlign: 'center',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    fontWeight: 'bold',
    fontSize: '18px',
    boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  };

  return (
    <footer style={footerStyle}>
      E-comm Dashboard
    </footer>
  );
};

export default Footer;
