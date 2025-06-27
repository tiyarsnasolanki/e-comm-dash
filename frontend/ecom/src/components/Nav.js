import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/2.png';

const Nav = () => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = email === 'admin@ecomm.com';

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const styles = {
    container: {
      backgroundColor: 'rgb(50, 41, 94)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 24px',
      flexWrap: 'wrap',
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    logo: {
      width: 60,
      borderRadius: '50%',
      cursor: 'pointer',
    },
    menuIcon: {
      display: 'none',
      fontSize: '26px',
      color: '#fff',
      cursor: 'pointer',
    },
    ul: {
      listStyle: 'none',
      display: menuOpen ? 'flex' : 'none',
      flexDirection: 'column',
      gap: '16px',
      margin: 0,
      padding: '12px 0',
      width: '100%',
      alignItems: 'flex-start',
    },
    li: {
      fontSize: '16px',
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      padding: '8px 12px',
      fontSize: '16px',
    },
    navGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    desktopMenu: {
      display: 'flex',
      listStyle: 'none',
      gap: '20px',
      margin: 0,
      padding: 0,
      alignItems: 'center',
    },
    button: {
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      fontSize: '16px',
      padding: '8px 12px',
    },
  };

  return (
    <div style={styles.container}>
      <style>{styles.responsiveStyle}</style>
      <img
        src={logo}
        alt="Logo"
        style={styles.logo}
        onClick={() => navigate('/')}
      />

      <div className="menu-toggle" style={styles.menuIcon} onClick={toggleMenu}>
      </div>

      <ul
        className={menuOpen ? 'nav-links' : 'desktop-menu'}
        style={menuOpen ? styles.ul : styles.desktopMenu}
      >
        {token ? (
          <>
            <li><Link to="/" style={styles.link}>Products</Link></li>
            <li><Link to="/news" style={styles.link}>Product Highlights</Link></li>
            <li><Link to="/add" style={styles.link}>Add Products</Link></li>
            <li><Link to="/update/123" style={styles.link}>Update Products</Link></li>
            <li><Link to="/profile" style={styles.link}>Profile</Link></li>
            {isAdmin && (
              <li><Link to="/admin-dashboard" style={styles.link}>Admin Dashboard</Link></li>
            )}
            <li>
              <button
                onClick={logout}
                style={styles.button}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/signup" style={styles.link}>Sign Up</Link></li>
            <li><Link to="/login" style={styles.link}>Login</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Nav;
