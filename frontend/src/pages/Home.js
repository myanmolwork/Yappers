import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('https://yappers-yevm.onrender.com/api/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const formattedPosts = res.data.map(post => ({
        ...post,
        liked: post.liked === 1
      }));
      setPosts(formattedPosts);
    } catch (err) {
      console.error("Fetch posts error:", err);
      alert("Failed to fetch posts.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const toggleLike = async (postId) => {
    try {
      await axios.post(`https://yappers-yevm.onrender.com/api/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPosts(); 
    } catch (err) {
      console.error("Like/unlike failed:", err);
      alert("Failed to like/unlike post.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const LoadingCard = () => (
    <div style={styles.loadingCard}>
      <div style={styles.loadingContent}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading amazing content...</p>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.backgroundElements}>
          <div style={styles.gradient1}></div>
          <div style={styles.gradient2}></div>
          <div style={styles.gradient3}></div>
          <div style={styles.gradient4}></div>
          <div style={styles.gradient5}></div>
        </div>
        
        <div style={styles.content}>
          <div style={styles.headerSection}>
            <h2 style={styles.heading}>🌍 Explore Posts from Everyone</h2>
            <p style={styles.subtitle}>Discover amazing content from our community</p>
          </div>

          {isLoading ? (
            <LoadingCard />
          ) : posts.length === 0 ? (
            <div style={styles.noPostsCard}>
              <div style={styles.emptyIcon}>📝</div>
              <h3 style={styles.emptyTitle}>No posts yet</h3>
              <p style={styles.noPosts}>Be the first to share something amazing!</p>
              <button 
                style={styles.createPostBtn}
                onClick={() => navigate('/feed')}
              >
                Create First Post
              </button>
            </div>
          ) : (
            <div style={styles.postsGrid}>
              {posts.map((post, index) => (
                <div 
                  key={post.id} 
                  style={{
                    ...styles.card,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div style={styles.cardGlow}></div>
                  
                  <div style={styles.header}>
                    <div style={styles.avatarContainer}>
                      <img
                        src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${post.username}`}
                        alt="avatar"
                        style={styles.avatar}
                      />
                      <div style={styles.avatarRing}></div>
                    </div>
                    <div style={styles.userInfo}>
                      <strong
                        style={styles.username}
                        onClick={() => navigate(`/user/${post.user_id}`)}
                      >
                        @{post.username}
                      </strong>
                      <small style={styles.timestamp}>
                        {new Date(post.created_at).toLocaleString()}
                      </small>
                    </div>
                    <div style={styles.postBadge}>✨</div>
                  </div>

                  <div style={styles.contentSection}>
                    <p style={styles.postContent}>{post.content}</p>
                    {post.image_url && (
                      <div style={styles.imageContainer}>
                        <img src={post.image_url} alt="post" style={styles.image} />
                        <div style={styles.imageOverlay}></div>
                      </div>
                    )}
                  </div>

                  <div style={styles.footer}>
                    <div style={styles.statsSection}>
                      <span style={styles.likeCount}>
                        <span style={styles.heartIcon}>❤️</span>
                        {post.likeCount}
                      </span>
                      <span style={styles.engagement}>
                        <span style={styles.eyeIcon}>👁️</span>
                        {Math.floor(Math.random() * 100) + 50}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => toggleLike(post.id)}
                      style={{
                        ...styles.likeBtn,
                        background: post.liked 
                          ? 'linear-gradient(135deg, #ff6b9d, #ff1744)' 
                          : 'linear-gradient(135deg, #667eea, #764ba2)',
                        transform: post.liked ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: post.liked 
                          ? '0 8px 25px rgba(255, 107, 157, 0.4)' 
                          : '0 4px 15px rgba(102, 126, 234, 0.3)'
                      }}
                    >
                      <span style={styles.btnIcon}>
                        {post.liked ? '💖' : '🤍'}
                      </span>
                      <span>{post.liked ? 'Liked' : 'Like'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
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
    top: '70%',
    right: '30%',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(255, 215, 0, 0.06) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 9s ease-in-out infinite reverse'
  },
  gradient5: {
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
  headerSection: {
    textAlign: 'center',
    marginBottom: '50px'
  },
  heading: {
    fontSize: 'clamp(28px, 5vw, 40px)',
    color: '#ffffff',
    fontWeight: '800',
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    letterSpacing: '1px',
    marginBottom: '15px',
    background: 'linear-gradient(135deg, #ffffff, #f0f8ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  subtitle: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '400',
    letterSpacing: '0.5px'
  },
  postsGrid: {
    display: 'grid',
    gap: '30px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '20px'
    }
  },
  card: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '24px',
    padding: '30px',
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
    borderRadius: '24px 24px 0 0'
  },
  loadingCard: {
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '24px',
    padding: '60px 30px',
    textAlign: 'center',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
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
    margin: 0
  },
  noPostsCard: {
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '24px',
    padding: '60px 30px',
    textAlign: 'center',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
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
    margin: '0 0 30px 0',
    fontWeight: '400'
  },
  createPostBtn: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
    letterSpacing: '0.5px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    gap: '15px',
    position: 'relative'
  },
  avatarContainer: {
    position: 'relative'
  },
  avatar: {
    width: '60px',
    height: '60px',
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
    width: '66px',
    height: '66px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #ff6b9d, #4ecdc4)',
    zIndex: 1,
    animation: 'pulse 2s infinite'
  },
  userInfo: {
    flex: 1
  },
  username: {
    display: 'block',
    background: 'linear-gradient(135deg, #ff6b9d, #4ecdc4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '700',
    transition: 'all 0.3s ease',
    marginBottom: '5px'
  },
  timestamp: {
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '400',
    letterSpacing: '0.3px'
  },
  postBadge: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
    padding: '8px',
    borderRadius: '12px',
    fontSize: '16px',
    animation: 'twinkle 2s infinite'
  },
  contentSection: {
    marginBottom: '25px'
  },
  postContent: {
    fontSize: '16px',
    lineHeight: '1.7',
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '400',
    marginBottom: '20px',
    letterSpacing: '0.3px'
  },
  imageContainer: {
    position: 'relative',
    borderRadius: '18px',
    overflow: 'hidden',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: '400px',
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
  },
  statsSection: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  },
  likeCount: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '15px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600'
  },
  engagement: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '15px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500'
  },
  heartIcon: {
    fontSize: '16px',
    filter: 'drop-shadow(0 2px 4px rgba(255, 0, 0, 0.3))'
  },
  eyeIcon: {
    fontSize: '16px',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
  },
  likeBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 24px',
    borderRadius: '50px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '14px',
    border: 'none',
    color: 'white',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    position: 'relative',
    overflow: 'hidden'
  },
  btnIcon: {
    fontSize: '16px',
    transition: 'transform 0.3s ease'
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
  
  @keyframes twinkle {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
    50% { transform: scale(1.1) rotate(180deg); opacity: 1; }
  }
  
  .card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  }
  
  .card:hover .avatar {
    transform: scale(1.1);
  }
  
  .card:hover .image {
    transform: scale(1.05);
  }
  
  .card:hover .likeBtn .btnIcon {
    transform: scale(1.2);
  }
  
  .likeBtn:hover {
    transform: translateY(-2px) scale(1.05) !important;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3) !important;
  }
  
  .createPostBtn:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
  }
  
  @media (max-width: 768px) {
    .card {
      margin: 0 10px;
      padding: 20px;
    }
    
    .postsGrid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Home;