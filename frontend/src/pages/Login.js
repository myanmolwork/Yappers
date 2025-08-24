import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();

  // Redirect if user already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await axios.post("https://yappers-yevm.onrender.com/api/auth/login", {
        email,
        password,
      });
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      // Add success feedback
      setTimeout(() => {
        navigate("/home");
      }, 500);
      
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundElements}>
        <div style={styles.gradient1}></div>
        <div style={styles.gradient2}></div>
        <div style={styles.gradient3}></div>
        <div style={styles.gradient4}></div>
        <div style={styles.gradient5}></div>
      </div>

      <div style={styles.content}>
        <div style={styles.logoSection}>
          <div style={styles.logoContainer}>
            <img 
              src={logo}
              alt="REST Logo" 
              style={styles.logoImage}
            />
            <div style={styles.brandContainer}>
              <h1 style={styles.brandName}>REST</h1>
              <p style={styles.tagline}>Reconnect • Enjoy • Share • Talk</p>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardGlow}></div>
          
          <div style={styles.header}>
            <div style={styles.welcomeIcon}>✨</div>
            <h2 style={styles.heading}>Welcome Back!</h2>
            <p style={styles.subtext}>Sign in to continue your journey</p>
          </div>

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <div 
                style={{
                  ...styles.inputContainer,
                  ...(focusedInput === 'email' ? styles.inputContainerFocused : {})
                }}
              >
                <span style={styles.inputIcon}>📧</span>
                <input
                  style={styles.input}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <div 
                style={{
                  ...styles.inputContainer,
                  ...(focusedInput === 'password' ? styles.inputContainerFocused : {})
                }}
              >
                <span style={styles.inputIcon}>🔐</span>
                <input
                  style={styles.input}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  style={styles.toggleButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div style={styles.forgotPassword}>
              <Link to="/forgot-password" style={styles.forgotLink}>
                Forgot your password?
              </Link>
            </div>

            <button 
              style={{
                ...styles.submitButton,
                ...(isLoading ? styles.submitButtonLoading : {})
              }} 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div style={styles.spinner}></div>
                  <span>Signing you in...</span>
                </>
              ) : (
                <>
                  <span style={styles.buttonIcon}>🚀</span>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div style={styles.footer}>
            <p style={styles.footerText}>
              New to REST? 
              <Link to="/register" style={styles.registerLink}>
                Create an account
              </Link>
            </p>
          </div>
        </div>

        <div style={styles.features}>
          <div style={styles.feature}>
            <span style={styles.featureIcon}>🌍</span>
            <span style={styles.featureText}>Connect globally</span>
          </div>
          <div style={styles.feature}>
            <span style={styles.featureIcon}>💬</span>
            <span style={styles.featureText}>Share your thoughts</span>
          </div>
          <div style={styles.feature}>
            <span style={styles.featureIcon}>🤝</span>
            <span style={styles.featureText}>Build community</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    padding: '20px',
    overflow: 'hidden'
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 0
  },
  gradient1: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 8s ease-in-out infinite'
  },
  gradient2: {
    position: 'absolute',
    top: '60%',
    right: '15%',
    width: '250px',
    height: '250px',
    background: 'radial-gradient(circle, rgba(255, 182, 193, 0.12) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 10s ease-in-out infinite reverse'
  },
  gradient3: {
    position: 'absolute',
    bottom: '20%',
    left: '20%',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(173, 216, 230, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 7s ease-in-out infinite'
  },
  gradient4: {
    position: 'absolute',
    top: '30%',
    right: '30%',
    width: '150px',
    height: '150px',
    background: 'radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 9s ease-in-out infinite reverse'
  },
  gradient5: {
    position: 'absolute',
    top: '70%',
    left: '60%',
    width: '180px',
    height: '180px',
    background: 'radial-gradient(circle, rgba(144, 238, 144, 0.09) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 6s ease-in-out infinite'
  },
  content: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '480px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  // Updated Logo Section
  logoSection: {
    textAlign: 'center',
    marginBottom: '30px',
    animation: 'fadeInDown 1s ease-out forwards',
    opacity: 0
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '10px'
  },
  logoImage: {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    objectFit: 'cover',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
    animation: 'bounce 2s infinite'
  },
  brandContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  brandName: {
    fontSize: '42px',
    fontWeight: '900',
    margin: '0',
    background: 'linear-gradient(135deg, #ffffff, #f0f8ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    letterSpacing: '3px'
  },
  tagline: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    margin: '5px 0 0 0',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    background: 'linear-gradient(90deg, #ff6b9d, #4ecdc4, #667eea, #ff6b9d)',
    backgroundSize: '200% 100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'gradient-shift 4s ease-in-out infinite'
  },

  card: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '24px',
    padding: '40px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    animation: 'slideUp 0.8s ease-out 0.5s forwards',
    opacity: 0,
    transform: 'translateY(50px)'
  },
  cardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #ff6b9d, #4ecdc4, #667eea)',
    borderRadius: '24px 24px 0 0'
  },
  header: {
    textAlign: 'center',
    marginBottom: '35px'
  },
  welcomeIcon: {
    fontSize: '32px',
    marginBottom: '15px',
    display: 'block',
    animation: 'twinkle 3s infinite'
  },
  heading: {
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 10px 0',
    background: 'linear-gradient(135deg, #ffffff, #f0f8ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  subtext: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0',
    fontWeight: '400'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    position: 'relative'
  },
  inputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '4px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'
  },
  inputContainerFocused: {
    border: '1px solid rgba(255, 255, 255, 0.4)',
    background: 'rgba(255, 255, 255, 0.15)',
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-2px)'
  },
  inputIcon: {
    fontSize: '18px',
    padding: '0 15px',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    padding: '16px 8px 16px 0',
    fontSize: '16px',
    color: '#ffffff',
    outline: 'none',
    fontWeight: '500'
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    padding: '0 15px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: '-10px'
  },
  forgotLink: {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    border: 'none',
    borderRadius: '16px',
    padding: '18px 24px',
    fontSize: '16px',
    fontWeight: '700',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginTop: '10px'
  },
  submitButtonLoading: {
    background: 'rgba(255, 255, 255, 0.2)',
    cursor: 'not-allowed',
    transform: 'none'
  },
  buttonIcon: {
    fontSize: '18px',
    transition: 'transform 0.3s ease'
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid #ffffff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  footer: {
    textAlign: 'center',
    paddingTop: '25px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    marginTop: '25px'
  },
  footerText: {
    fontSize: '15px',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0'
  },
  registerLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: '600',
    marginLeft: '8px',
    background: 'linear-gradient(135deg, #ff6b9d, #4ecdc4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    transition: 'all 0.3s ease'
  },
  features: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginTop: '40px',
    flexWrap: 'wrap',
    animation: 'fadeInUp 1s ease-out 1s forwards',
    opacity: 0
  },
  feature: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    opacity: 0.8
  },
  featureIcon: {
    fontSize: '24px',
    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))'
  },
  featureText: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    textAlign: 'center'
  }
};

// Enhanced CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  
  @keyframes slideUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  
  @keyframes twinkle {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
    50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
  }
  
  @keyframes gradient-shift {
    0%, 100% { background-position: 0% center; }
    50% { background-position: 100% center; }
  }
  
  input::placeholder {
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
  }
  
  .submitButton:hover:not(:disabled) {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.5);
  }
  
  .submitButton:hover .buttonIcon {
    transform: scale(1.2);
  }
  
  .toggleButton:hover {
    transform: scale(1.2);
  }
  
  .forgotLink:hover {
    color: rgba(255, 255, 255, 1);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
  
  .registerLink:hover {
    text-shadow: 0 0 10px rgba(255, 107, 157, 0.5);
  }
  
  @media (max-width: 768px) {
    .card {
      padding: 30px 20px !important;
      margin: 0 10px;
    }
    
    .features {
      gap: 20px !important;
      margin-top: 30px !important;
    }
    
    .logoContainer {
      flex-direction: column !important;
      gap: 10px !important;
    }
    
    .brandContainer {
      align-items: center !important;
      text-align: center;
    }
    
    .logoImage {
      width: 50px !important;
      height: 50px !important;
    }
    
    .brandName {
      font-size: 32px !important;
      letter-spacing: 2px !important;
    }
    
    .tagline {
      font-size: 10px !important;
      letter-spacing: 1px !important;
    }
    
    .heading {
      font-size: 24px !important;
    }
  }
  
  @media (max-width: 480px) {
    .logoImage {
      width: 45px !important;
      height: 45px !important;
    }
    
    .brandName {
      font-size: 28px !important;
      letter-spacing: 1px !important;
    }
    
    .tagline {
      font-size: 9px !important;
    }
    
    .card {
      padding: 25px 20px !important;
    }
  }
`;

document.head.appendChild(styleSheet);

export default Login;