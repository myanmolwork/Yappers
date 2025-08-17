import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    // Function to check mobile size
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { to: '/home', text: 'Home', icon: '🏠' },
    { to: '/users', text: 'Users', icon: '👥' },
    { to: '/feed', text: 'Feed', icon: '📰' },
    { to: '/chat', text: 'Chat', icon: '💬' },
    { to: '/profile', text: 'Profile', icon: '👤' },
  ];

  const isActive = (path) => location.pathname === path;

  // Mobile Bottom Navbar
  if (isMobile) {
    return (
      <nav style={styles.bottomNavbar}>
        {navItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            style={{
              ...styles.bottomIcon,
              ...(isActive(item.to) ? styles.activeBottomIcon : {}),
            }}
          >
            {item.icon}
          </Link>
        ))}
        <button onClick={handleLogout} style={{ ...styles.bottomIcon, color: '#e74c3c' }}>
          🚪
        </button>
      </nav>
    );
  }

  // Desktop Top Navbar
  return (
    <nav style={styles.topNavbar}>
      <div style={styles.left}>
        <Link to="/home" style={styles.logo}>💬 Yappers</Link>
      </div>
      <div style={styles.right}>
        {navItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            style={{
              ...styles.link,
              ...(isActive(item.to) ? styles.activeLink : {}),
            }}
          >
            {item.text}
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
  topNavbar: {
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
  left: {},
  logo: {
    fontWeight: 'bold',
    fontSize: '24px',
    textDecoration: 'none',
    color: '#fff',
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
    transition: 'all 0.3s',
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

  // bottom nav styles
  bottomNavbar: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1f1f1f',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px 0',
    zIndex: 1000,
    boxShadow: '0 -2px 6px rgba(0,0,0,0.3)',
  },
  bottomIcon: {
    fontSize: '24px',
    color: '#bbb',
    textDecoration: 'none',
    transition: 'color 0.3s',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  activeBottomIcon: {
    color: '#fff',
  },
};

export default Navbar;
