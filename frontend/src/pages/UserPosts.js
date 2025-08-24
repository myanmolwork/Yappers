import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserPosts() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`https://yappers-yevm.onrender.com/api/posts/user?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const postData = res?.data?.posts ?? [];
        const name = res?.data?.username ?? 'Unknown';
        setPosts(postData);
        setUsername(name);
      } catch (err) {
        console.error('Error fetching user posts:', err);
        setError("Unable to load user's posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserPosts();
  }, [userId, token]);

  return (
    <div style={styles.container}>
      <div style={styles.backgroundElements}>
        <div style={styles.gradient1}></div>
        <div style={styles.gradient2}></div>
        <div style={styles.gradient3}></div>
        <div style={styles.gradient4}></div>
      </div>
      
      <div style={styles.content}>
        <div style={styles.headerCard}>
          <div style={styles.cardGlow}></div>
          <div style={styles.header}>
            <div style={styles.avatarContainer}>
              <img
                src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${username || 'user'}`}
                alt="avatar"
                style={styles.avatar}
              />
              <div style={styles.avatarRing}></div>
            </div>
            <h2 style={styles.headerTitle}>{username ? `${username}'s Posts` : 'User Posts'}</h2>
          </div>
        </div>

        {loading ? (
          <div style={styles.loadingCard}>
            <div style={styles.cardGlow}></div>
            <div style={styles.loadingContent}>
              <div style={styles.spinner}></div>
              <p style={styles.loadingText}>Loading...</p>
            </div>
          </div>
        ) : error ? (
          <div style={styles.errorCard}>
            <div style={styles.cardGlow}></div>
            <div style={styles.errorIcon}>❌</div>
            <p style={styles.errorText}>{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div style={styles.noPostsCard}>
            <div style={styles.cardGlow}></div>
            <div style={styles.emptyIcon}>📝</div>
            <h3 style={styles.emptyTitle}>No posts yet</h3>
            <p style={styles.noPosts}>This user hasn't shared anything yet.</p>
          </div>
        ) : (
          <div style={styles.postsGrid}>
            {posts.map((p, index) => (
              <div 
                key={p.id || p._id} 
                style={{
                  ...styles.card,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div style={styles.cardGlow}></div>
                <div style={styles.contentSection}>
                  <p style={styles.postContent}>{p.content}</p>
                  {p.image_url && (
                    <div style={styles.imageContainer}>
                      <img src={p.image_url} alt="Post" style={styles.image} />
                      <div style={styles.imageOverlay}></div>
                    </div>
                  )}
                </div>
                <div style={styles.footer}>
                  <small style={styles.timestamp}>
                    {new Date(p.created_at).toLocaleString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    paddingTop: '80px',
    paddingBottom: '100px',
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
    left: '5%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 8s ease-in-out infinite'
  },
  gradient2: {
    position: 'absolute',
    top: '40%',
    right: '5%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(255, 182, 193, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 10s ease-in-out infinite reverse'
  },
  gradient3: {
    position: 'absolute',
    bottom: '30%',
    left: '10%',
    width: '250px',
    height: '250px',
    background: 'radial-gradient(circle, rgba(173, 216, 230, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 7s ease-in-out infinite'
  },
  gradient4: {
    position: 'absolute',
    top: '20%',
    left: '50%',
    width: '150px',
    height: '150px',
    background: 'radial-gradient(circle, rgba(144, 238, 144, 0.07) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 6s ease-in-out infinite'
  },
  content: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 20px'
  },
  headerCard: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '24px',
    padding: '30px',
    marginBottom: '40px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  avatarContainer: {
    position: 'relative'
  },
  avatar: {
    width: '80px',
    height: '80px',
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
    width: '86px',
    height: '86px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #ff6b9d, #4ecdc4)',
    zIndex: 1,
    animation: 'pulse 2s infinite'
  },
  headerTitle: {
    fontSize: 'clamp(24px, 4vw, 32px)',
    color: '#ffffff',
    fontWeight: '800',
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    letterSpacing: '1px',
    background: 'linear-gradient(135deg, #ffffff, #f0f8ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0'
  },
  loadingCard: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '24px',
    padding: '60px 30px',
    textAlign: 'center',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden'
  },
  loadingContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid #ffffff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  loadingText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '16px',
    fontWeight: '500',
    margin: '0'
  },
  errorCard: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '24px',
    padding: '60px 30px',
    textAlign: 'center',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden'
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
  noPostsCard: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '24px',
    padding: '60px 30px',
    textAlign: 'center',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden'
  },
  emptyIcon: {
    fontSize: '60px',
    marginBottom: '20px',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '15px',
    margin: '0 0 15px 0'
  },
  noPosts: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '16px',
    margin: '0',
    fontWeight: '400'
  },
  postsGrid: {
    display: 'grid',
    gap: '25px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'
  },
  card: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    animation: 'slideUp 0.6s ease-out forwards',
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
    borderRadius: '20px 20px 0 0'
  },
  contentSection: {
    marginBottom: '20px'
  },
  postContent: {
    fontSize: '16px',
    lineHeight: '1.7',
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '400',
    marginBottom: '15px',
    letterSpacing: '0.3px'
  },
  imageContainer: {
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: '300px',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.3s ease'
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.05) 100%)',
    pointerEvents: 'none'
  },
  footer: {
    paddingTop: '15px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
  },
  timestamp: {
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '400',
    letterSpacing: '0.3px'
  }
};

// Enhanced CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-30px) rotate(180deg); }
  }
  
  @keyframes slideUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.05); opacity: 1; }
  }
  
  .card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  }
  
  .card:hover .image {
    transform: scale(1.05);
  }
  
  .headerCard:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 50px rgba(0, 0, 0, 0.2);
  }
  
  .headerCard:hover .avatar {
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    .postsGrid {
      grid-template-columns: 1fr !important;
      gap: 20px !important;
    }
    
    .card {
      margin: 0 10px !important;
      padding: 20px !important;
    }
    
    .headerCard {
      margin: 0 10px 30px 10px !important;
      padding: 20px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default UserPosts;