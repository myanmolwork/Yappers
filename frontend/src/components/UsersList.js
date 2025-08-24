import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://yappers-yevm.onrender.com/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setUsers(res.data))
      .catch(() => alert("Failed to load users"));
  }, [token]);

  return (
    <div style={styles.container}>
      <div style={styles.backgroundElements}>
        <div style={styles.gradient1}></div>
        <div style={styles.gradient2}></div>
        <div style={styles.gradient3}></div>
      </div>
      
      <h2 style={styles.heading}>🧑‍🤝‍🧑 Discover Other Users</h2>
      {users.length === 0 ? (
        <div style={styles.noUsersCard}>
          <p style={styles.noUsers}>No users found.</p>
        </div>
      ) : (
        users.map(user => (
          <div key={user.id} style={styles.userCard}>
            <div style={styles.cardGlow}></div>
            <div style={styles.userInfo}>
              <div style={styles.avatarContainer}>
                <img
                  src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.username}`}
                  alt="avatar"
                  style={styles.avatar}
                />
                <div style={styles.avatarRing}></div>
              </div>
              <span
                onClick={() => navigate(`/user/${user.id}`)}
                style={styles.username}
                title="Click to view profile"
              >
                @{user.username}
              </span>
            </div>
            <div style={styles.actions}>
              <button onClick={() => navigate(`/user/${user.id}`)} style={styles.actionBtn}>👤 Profile</button>
              <button onClick={() => navigate(`/user/${user.id}/posts`)} style={styles.actionBtn}>📝 Posts</button>
              <button onClick={() => navigate(`/chat?user=${user.id}`)} style={styles.chatBtn}>💬 Chat</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    padding: '30px 20px',
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
    top: '20%',
    left: '10%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 8s ease-in-out infinite'
  },
  gradient2: {
    position: 'absolute',
    top: '50%',
    right: '15%',
    width: '250px',
    height: '250px',
    background: 'radial-gradient(circle, rgba(255, 182, 193, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 10s ease-in-out infinite reverse'
  },
  gradient3: {
    position: 'absolute',
    bottom: '20%',
    left: '30%',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(173, 216, 230, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 7s ease-in-out infinite'
  },
  heading: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    marginBottom: '40px',
    fontSize: 'clamp(28px, 5vw, 40px)',
    fontWeight: '800',
    color: '#ffffff',
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    letterSpacing: '1px',
    background: 'linear-gradient(135deg, #ffffff, #f0f8ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  noUsersCard: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '600px',
    margin: '0 auto',
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '24px',
    padding: '40px 30px',
    textAlign: 'center',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
  },
  noUsers: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '18px',
    fontWeight: '400',
    margin: '0'
  },
  userCard: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '25px 30px',
    marginBottom: '20px',
    maxWidth: '900px',
    margin: '0 auto 20px auto',
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '20px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden'
  },
  cardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #ff6b9d, #4ecdc4, #667eea)',
    borderRadius: '20px 20px 0 0'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  avatarContainer: {
    position: 'relative'
  },
  avatar: {
    width: '55px',
    height: '55px',
    borderRadius: '50%',
    border: '3px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.3s ease',
    position: 'relative',
    zIndex: 2
  },
  avatarRing: {
    position: 'absolute',
    top: '-3px',
    left: '-3px',
    width: '61px',
    height: '61px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #ff6b9d, #4ecdc4)',
    zIndex: 1,
    animation: 'pulse 2s infinite'
  },
  username: {
    fontWeight: '700',
    fontSize: '18px',
    background: 'linear-gradient(135deg, #ff6b9d, #4ecdc4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    letterSpacing: '0.5px'
  },
  actions: {
    display: 'flex',
    gap: '12px'
  },
  actionBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    padding: '10px 16px',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  chatBtn: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    border: 'none',
    color: '#ffffff',
    padding: '10px 18px',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
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
  
  .userCard:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  }
  
  .userCard:hover .avatar {
    transform: scale(1.1);
  }
  
  .actionBtn:hover {
    background: rgba(255, 255, 255, 0.25) !important;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 20px rgba(255, 255, 255, 0.2);
  }
  
  .chatBtn:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4) !important;
  }
  
  .username:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    .userCard {
      flex-direction: column !important;
      gap: 20px !important;
      text-align: center !important;
      padding: 25px 20px !important;
    }
    
    .actions {
      flex-wrap: wrap !important;
      justify-content: center !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default UsersList;