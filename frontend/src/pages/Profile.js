import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/');

    const fetchUser = async () => {
      try {
        const res = await axios.get('https://yappers-yevm.onrender.com/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        alert("Session expired. Please log in again.");
        navigate('/');
      }
    };

    const fetchUserPosts = async () => {
      try {
        const res = await axios.get('https://yappers-yevm.onrender.com/api/posts/mine', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(res.data || []);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchUserPosts();
  }, [navigate]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={styles.container}>
          <div style={styles.backgroundElements}>
            <div style={styles.gradient1}></div>
            <div style={styles.gradient2}></div>
            <div style={styles.gradient3}></div>
          </div>
          <div style={styles.content}>
            <div style={styles.loadingCard}>
              <div style={styles.spinner}></div>
              <p style={styles.loadingText}>Loading your amazing profile...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.backgroundElements}>
          <div style={styles.gradient1}></div>
          <div style={styles.gradient2}></div>
          <div style={styles.gradient3}></div>
        </div>

        <div style={styles.content}>
          <div style={styles.profileCard}>
            <div style={styles.cardGlow}></div>
            
            <div style={styles.profileHeader}>
              <div style={styles.avatarSection}>
                <div style={styles.avatarContainer}>
                  <img
                    src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.username}`}
                    alt="avatar"
                    style={styles.avatar}
                  />
                  <div style={styles.avatarRing}></div>
                </div>
                <div style={styles.profileBadge}>👑</div>
              </div>

              <div style={styles.userDetails}>
                <h2 style={styles.username}>@{user.username}</h2>
                <p style={styles.email}>
                  <span style={styles.emailIcon}>✉️</span>
                  {user.email}
                </p>
                <div style={styles.statsContainer}>
                  <div style={styles.stat}>
                    <span style={styles.statNumber}>{posts.length}</span>
                    <span style={styles.statLabel}>Posts</span>
                  </div>
                  <div style={styles.statDivider}></div>
                  {/* <div style={styles.stat}>
                    <span style={styles.statNumber}>{Math.floor(Math.random() * 1000) + 100}</span>
                    <span style={styles.statLabel}>Followers</span>
                  </div> */}
                </div>
              </div>
            </div>

            <div style={styles.actionButtons}>
              <button 
                style={styles.createButton} 
                onClick={() => navigate('/feed')}
              >
                <span>✨</span>
                Create New Post
              </button>
            </div>
          </div>

          <div style={styles.postsSection}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>
                <span>📚</span>
                Your Creative Journey
              </h3>
              <p style={styles.sectionSubtitle}>
                {posts.length > 0 
                  ? `${posts.length} amazing ${posts.length === 1 ? 'post' : 'posts'} shared` 
                  : 'Ready to share your first masterpiece?'}
              </p>
            </div>

            {posts.length === 0 ? (
              <div style={styles.noPostsCard}>
                <div style={styles.emptyIcon}>🎨</div>
                <h3 style={styles.emptyTitle}>Your canvas awaits!</h3>
                <p style={styles.emptyText}>Share your thoughts with the world.</p>
                <button 
                  style={styles.firstPostBtn}
                  onClick={() => navigate('/create-post')}
                >
                  Create Your First Post
                </button>
              </div>
            ) : (
              <div style={styles.postsGrid}>
                {posts.map((post, index) => (
                  <div key={post.id} style={styles.postCard}>
                    <div style={styles.postCardGlow}></div>
                    
                    <div style={styles.postHeader}>
                      <div style={styles.postBadge}>💎</div>
                      <small style={styles.postTimestamp}>
                        {new Date(post.created_at).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </small>
                    </div>

                    <p style={styles.postText}>{post.content}</p>
                    {post.image_url && (
                      <div style={styles.postImageContainer}>
                        <img src={post.image_url} alt="post" style={styles.postImage} />
                      </div>
                    )}

                    <div style={styles.postFooter}>
                      {/* <div style={styles.postStats}>
                        <span style={styles.postStat}>
                          <span>❤️</span>
                          {Math.floor(Math.random() * 50) + 10}
                        </span>
                        <span style={styles.postStat}>
                          <span>👁️</span>
                          {Math.floor(Math.random() * 100) + 20}
                        </span>
                      </div>
                      <div style={styles.postActions}>
                        <button style={styles.actionBtn}>📝</button>
                        <button style={styles.actionBtn}>🔗</button>
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
  content: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 20px'
  },
  loadingCard: {
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '24px',
    padding: '60px 30px',
    textAlign: 'center',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
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
  profileCard: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '24px',
    padding: '40px',
    marginBottom: '40px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    animation: 'slideUp 0.6s ease-out forwards'
  },
  cardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #ff6b9d, #4ecdc4, #667eea)',
    borderRadius: '24px 24px 0 0'
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    marginBottom: '30px'
  },
  avatarSection: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  avatarContainer: {
    position: 'relative'
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '4px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
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
    background: 'linear-gradient(45deg, #ff6b9d, #4ecdc4, #667eea)',
    zIndex: 1,
    animation: 'pulse 3s infinite'
  },
  profileBadge: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
    padding: '8px 12px',
    borderRadius: '12px',
    fontSize: '18px',
    marginTop: '15px'
  },
  userDetails: {
    flex: 1
  },
  username: {
    fontSize: '36px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #ff6b9d, #4ecdc4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '15px'
  },
  email: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '400',
    marginBottom: '25px'
  },
  emailIcon: {
    fontSize: '16px'
  },
  statsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)'
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#ffffff'
  },
  statLabel: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    marginTop: '5px',
    textTransform: 'uppercase'
  },
  statDivider: {
    width: '1px',
    height: '40px',
    background: 'rgba(255, 255, 255, 0.2)'
  },
  actionButtons: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center'
  },
  createButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
  },
  editButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    padding: '15px 30px',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    fontSize: '32px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '10px'
  },
  sectionSubtitle: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '400'
  },
  noPostsCard: {
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '24px',
    padding: '60px 30px',
    textAlign: 'center',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
  },
  emptyIcon: {
    fontSize: '80px',
    marginBottom: '25px'
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '15px',
    margin: '0 0 15px 0'
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '16px',
    margin: '0 0 30px 0',
    fontWeight: '400'
  },
  firstPostBtn: {
    background: 'linear-gradient(135deg, #ff6b9d, #ff1744)',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(255, 107, 157, 0.4)'
  },
  postsGrid: {
    display: 'grid',
    gap: '25px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
  },
  postCard: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    transition: 'all 0.4s ease',
    overflow: 'hidden'
  },
  postCardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #4ecdc4, #44a08d)',
    borderRadius: '20px 20px 0 0'
  },
  postHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  postBadge: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
    padding: '6px 10px',
    borderRadius: '10px',
    fontSize: '14px'
  },
  postTimestamp: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500'
  },
  postText: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '400',
    marginBottom: '15px'
  },
  postImageContainer: {
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    marginBottom: '15px'
  },
  postImage: {
    width: '100%',
    height: 'auto',
    maxHeight: '250px',
    objectFit: 'cover',
    display: 'block'
  },
  postFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '15px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
  },
  postStats: {
    display: 'flex',
    gap: '15px'
  },
  postStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500'
  },
  postActions: {
    display: 'flex',
    gap: '10px'
  },
  actionBtn: {
    background: 'rgba(255, 255, 255, 0.15)',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    color: 'rgba(255, 255, 255, 0.8)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    fontSize: '14px'
  }
};

// CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
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
  
  .profileCard:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  }
  
  .profileCard:hover .avatar {
    transform: scale(1.1);
  }
  
  .postCard:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
  }
  
  .createButton:hover, .firstPostBtn:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
  }
  
  .editButton:hover {
    transform: translateY(-2px) scale(1.05);
    background: rgba(255, 255, 255, 0.25);
  }
  
  .actionBtn:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.25);
  }
  
  @media (max-width: 768px) {
    .profileHeader {
      flex-direction: column !important;
      text-align: center;
      gap: 20px !important;
    }
    
    .actionButtons {
      flex-direction: column !important;
    }
    
    .postsGrid {
      grid-template-columns: 1fr !important;
    }
    
    .username {
      font-size: 28px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Profile;