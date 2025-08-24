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
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Updated navItems with /friends instead of /users
  const navItems = [
    { to: '/home', text: 'Home', icon: '🏠' },
    { to: '/friends', text: 'Friends', icon: '👥' },
    { to: '/feed', text: 'Feed', icon: '📰' },
    { to: '/chat', text: 'Chat', icon: '💬' },
    { to: '/profile', text: 'Profile', icon: '👤' },
  ];

  const isActive = (path) => location.pathname === path;

  // Mobile Bottom Navbar
  if (isMobile) {
    return (
      <nav style={styles.bottomNavbar}>
        <div style={styles.bottomContainer}>
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                ...styles.bottomIcon,
                ...(isActive(item.to) ? styles.activeBottomIcon : {}),
              }}
            >
              <div style={styles.iconWrapper}>
                <span style={styles.iconEmoji}>{item.icon}</span>
                {isActive(item.to) && <div style={styles.activeDot}></div>}
              </div>
            </Link>
          ))}
          <button 
            onClick={handleLogout} 
            style={styles.logoutBottomIcon}
          >
            <div style={styles.iconWrapper}>
              <span style={styles.iconEmoji}>🚪</span>
            </div>
          </button>
        </div>
      </nav>
    );
  }

  // Desktop Top Navbar
  return (
    <nav style={styles.topNavbar}>
      <div style={styles.navContainer}>
        <div style={styles.left}>
          <Link to="/home" style={styles.logo}>
            <div style={styles.logoContainer}>
              <svg width="32" height="32" viewBox="0 0 32 32" style={styles.logoSvg}>
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff6b9d" />
                    <stop offset="100%" stopColor="#4ecdc4" />
                  </linearGradient>
                </defs>
                <circle cx="16" cy="16" r="15" fill="url(#logoGradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                <path d="M10 12 L14 16 L22 8" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="16" cy="20" r="2" fill="white" opacity="0.8"/>
              </svg>
            </div>
            <span style={styles.logoText}>REST</span>
          </Link>
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
              <span style={styles.linkIcon}>{item.icon}</span>
              <span>{item.text}</span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            style={styles.logoutButton}
          >
            <span style={styles.logoutIcon}>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};


const styles = {
  topNavbar: {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    padding: '0',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  left: {},
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '24px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))',
  },
  logoSvg: {
    transition: 'transform 0.3s ease',
  },
  logoText: {
    background: 'linear-gradient(135deg, #ff6b9d, #4ecdc4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
    letterSpacing: '2px',
    fontWeight: '900',
  },
  right: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'rgba(255, 255, 255, 0.9)',
    textDecoration: 'none',
    fontSize: '15px',
    padding: '12px 18px',
    borderRadius: '15px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    fontWeight: '500',
  },
  linkIcon: {
    fontSize: '16px',
    filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3))',
  },
  activeLink: {
    background: 'rgba(255, 255, 255, 0.25)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-1px)',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 15px rgba(231, 76, 60, 0.4)',
  },
  logoutIcon: {
    fontSize: '16px',
    filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3))',
  },
  // Mobile Bottom Navbar Styles
  bottomNavbar: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 40px)',
    maxWidth: '400px',
    zIndex: 1000,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '25px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    padding: '8px',
  },
  bottomContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '8px 4px',
  },
  bottomIcon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '15px',
    minWidth: '50px',
    minHeight: '50px',
  },
  activeBottomIcon: {
    background: 'rgba(255, 255, 255, 0.25)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-2px)',
  },
  logoutBottomIcon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '15px',
    minWidth: '50px',
    minHeight: '50px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 15px rgba(231, 76, 60, 0.4)',
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    position: 'relative',
  },
  iconEmoji: {
    fontSize: '24px',
    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  activeDot: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #ff6b9d, #4ecdc4)',
    boxShadow: '0 0 8px rgba(255, 107, 157, 0.6)',
  },
};

// Add CSS animations and hover effects
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  nav a:hover, nav button:hover {
    transform: translateY(-2px) scale(1.02);
  }
  
  nav a:active, nav button:active {
    transform: translateY(0) scale(0.98);
  }
  
  nav a:hover svg {
    transform: scale(1.1) rotate(5deg);
  }
  
  @media (max-width: 768px) {
    nav a:hover, nav button:hover {
      transform: translateY(-3px) scale(1.05);
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
  
  .active-icon {
    animation: pulse 2s infinite;
  }
  
  @keyframes logoRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  nav a[href="/home"]:hover svg {
    animation: logoRotate 0.6s ease-in-out;
  }
`;
document.head.appendChild(styleSheet);

export default Navbar;