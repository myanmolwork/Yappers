import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`https://yappers-yevm.onrender.com/api/users/by-id/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.error(err);
        setError('User not found or server error');
      });
  }, [id, token]);

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.backgroundElements}>
          <div style={styles.gradient1}></div>
          <div style={styles.gradient2}></div>
        </div>
        <div style={styles.errorCard}>
          <div style={styles.cardGlow}></div>
          <div style={styles.errorIcon}>❌</div>
          <p style={styles.errorText}>{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.backgroundElements}>
          <div style={styles.gradient1}></div>
          <div style={styles.gradient2}></div>
        </div>
        <div style={styles.loadingCard}>
          <div style={styles.cardGlow}></div>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading user...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.backgroundElements}>
        <div style={styles.gradient1}></div>
        <div style={styles.gradient2}></div>
        <div style={styles.gradient3}></div>
      </div>
      
      <div style={styles.profileCard}>
        <div style={styles.cardGlow}></div>
        
        <div style={styles.avatarContainer}>
          <img
            src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.username}`}
            alt="avatar"
            style={styles.avatar}
          />
          <div style={styles.avatarRing}></div>
        </div>
        
        <h2 style={styles.username}>{user.username}</h2>
        <p style={styles.email}><strong>Email:</strong> {user.email}</p>
        
        <div style={styles.buttonContainer}>
          <button
            onClick={() => navigate(`/chat?user=${user.id}`)}
            style={styles.chatButton}
          >
            💬 Chat
          </button>
          <button
            onClick={() => navigate(`/user/${user.id}/posts`)}
            style={styles.postsButton}
          >
            📄 View Posts
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    padding: '40px 20px',
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
    top: '15%',
    left: '10%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 8s ease-in-out infinite'
  },
  gradient2: {
    position: 'absolute',
    top: '60%',
    right: '15%',
    width: '250px',
    height: '250px',
    background: 'radial-gradient(circle, rgba(255, 182, 193, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 10s ease-in-out infinite reverse'
  },
  gradient3: {
    position: 'absolute',
    bottom: '30%',
    left: '40%',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(173, 216, 230, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 7s ease-in-out infinite'
  },
  profileCard: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '500px',
    margin: '0 auto',
    padding: '40px 30px',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '24px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden'
  },
  errorCard: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '500px',
    margin: '0 auto',
    padding: '40px 30px',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '24px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden'
  },
  loadingCard: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '500px',
    margin: '0 auto',
    padding: '40px 30px',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '24px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden'
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
  avatarContainer: {
    position: 'relative',
    display: 'inline-block',
    marginBottom: '25px'
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '4px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease',
    position: 'relative',
    zIndex: 2
  },
  avatarRing: {
    position: 'absolute',
    top: '-4px',
    left: '-4px',
    width: '128px',
    height: '128px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #ff6b9d, #4ecdc4)',
    zIndex: 1,
    animation: 'pulse 2s infinite'
  },
  username: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#ffffff',
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    letterSpacing: '1px',
    marginBottom: '20px',
    background: 'linear-gradient(135deg, #ffffff, #f0f8ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 20px 0'
  },
  email: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '400',
    marginBottom: '30px',
    letterSpacing: '0.3px',
    margin: '0 0 30px 0'
  },
  buttonContainer: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginTop: '30px'
  },
  chatButton: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    padding: '15px 25px',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
    letterSpacing: '0.5px',
    textTransform: 'uppercase'
  },
  postsButton: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    padding: '15px 25px',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    letterSpacing: '0.5px',
    textTransform: 'uppercase'
  },
  errorIcon: {
    fontSize: '60px',
    marginBottom: '20px',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
  },
  errorText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '18px',
    fontWeight: '500',
    margin: '0'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid #ffffff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px auto'
  },
  loadingText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '16px',
    fontWeight: '500',
    margin: '0'
  }
};

// Enhanced CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-30px) rotate(180deg); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.05); opacity: 1; }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .profileCard:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  }
  
  .profileCard:hover .avatar {
    transform: scale(1.1);
  }
  
  .chatButton:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4) !important;
  }
  
  .postsButton:hover {
    background: rgba(255, 255, 255, 0.25) !important;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 20px rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    .buttonContainer {
      flex-direction: column !important;
      align-items: center !important;
    }
    
    .chatButton, .postsButton {
      width: 100% !important;
      max-width: 250px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default UserProfile;