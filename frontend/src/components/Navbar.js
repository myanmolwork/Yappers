// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { to: '/home', label: 'Home' },
    { to: '/users', label: 'Users' },
    { to: '/feed', label: 'Feed' },
    { to: '/chat', label: 'Chat' },
    { to: '/profile', label: 'Profile' },
  ];

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <Link to="/home" style={styles.logo}>💬 Yappers</Link>
      </div>
      <div style={styles.right}>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            style={{
              ...styles.link,
              ...(isActive(item.to) ? styles.activeLink : {}),
            }}
          >
            {item.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          style={styles.logoutButton}
          onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#1f1f1f',
    color: '#fff',
    padding: '14px 28px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '24px',
    textDecoration: 'none',
    color: '#fff',
    fontFamily: 'Segoe UI, sans-serif',
  },
  right: {
    display: 'flex',
    gap: '18px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  link: {
    color: '#ccc',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '6px 12px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
  },
  activeLink: {
    backgroundColor: '#333',
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    border: 'none',
    color: 'white',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '15px',
    transition: 'background-color 0.3s',
  },
};

export default Navbar;
