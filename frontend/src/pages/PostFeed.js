import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import CreatePost from './CreatePost';

function PostFeed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const token = localStorage.getItem('token');

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(posts.length === 0);
      setRefreshing(posts.length > 0);
      const res = await axios.get('https://yappers-yevm.onrender.com/api/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const formattedPosts = res.data.map(post => ({
        ...post,
        liked: post.liked === 1
      }));
      setPosts(formattedPosts);
    } catch (err) {
      alert('Failed to fetch posts');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [token, posts.length]);

  const toggleLike = async (postId) => {
    try {
      // Optimistic update
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? {
                ...post,
                liked: !post.liked,
                likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1
              }
            : post
        )
      );

      await axios.post(`https://yappers-yevm.onrender.com/api/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Refresh to get accurate data
      fetchPosts();
    } catch (err) {
      alert('Failed to toggle like');
      // Revert optimistic update on error
      fetchPosts();
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const LoadingCard = () => (
    <div style={styles.loadingCard}>
      <div style={styles.loadingContent}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading your feed...</p>
      </div>
    </div>
  );

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
        <div style={styles.headerSection}>
          <h2 style={styles.heading}>📰 Your Personal Feed</h2>
          <p style={styles.subtitle}>Share your thoughts and connect with others</p>
          <button 
            onClick={fetchPosts} 
            style={{
              ...styles.refreshButton,
              opacity: refreshing ? 0.7 : 1,
              transform: refreshing ? 'rotate(360deg)' : 'rotate(0deg)'
            }}
            disabled={refreshing}
          >
            <span style={styles.refreshIcon}>🔄</span>
            <span>{refreshing ? 'Refreshing...' : 'Refresh Feed'}</span>
          </button>
        </div>

        <div style={styles.createPostSection}>
          <CreatePost onPostCreated={fetchPosts} />
        </div>

        {isLoading ? (
          <LoadingCard />
        ) : posts.length === 0 ? (
          <div style={styles.noPostsCard}>
            <div style={styles.emptyIcon}>✨</div>
            <h3 style={styles.emptyTitle}>Your feed is empty</h3>
            <p style={styles.noPosts}>Start by creating your first post above!</p>
            <div style={styles.emptyActions}>
              <span style={styles.actionTip}>👆 Use the form above to share something amazing</span>
            </div>
          </div>
        ) : (
          <div style={styles.postsContainer}>
            <div style={styles.postsHeader}>
              <h3 style={styles.postsTitle}>Latest Posts</h3>
              <span style={styles.postsCount}>{posts.length} posts</span>
            </div>
            
            <div style={styles.postsGrid}>
              {posts.map((post, index) => (
                <div 
                  key={post.id} 
                  style={{
                    ...styles.postCard,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div style={styles.cardGlow}></div>
                  
                  <div style={styles.header}>
                    <div style={styles.userSection}>
                      <div style={styles.avatarContainer}>
                        <img
                          src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${post.username}`}
                          alt="avatar"
                          style={styles.avatar}
                        />
                        <div style={styles.avatarRing}></div>
                      </div>
                      <div style={styles.userInfo}>
                        <strong style={styles.username}>@{post.username}</strong>
                        <span style={styles.timestamp}>
                          {new Date(post.created_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div style={styles.postBadge}>
                      {index < 3 ? '🔥' : '✨'}
                    </div>
                  </div>

                  <div style={styles.contentSection}>
                    <p style={styles.postContent}>{post.content}</p>
                    {post.image_url && (
                      <div style={styles.imageContainer}>
                        <img
                          src={post.image_url}
                          alt="Post"
                          style={styles.postImage}
                        />
                        <div style={styles.imageOverlay}></div>
                      </div>
                    )}
                  </div>

                  <div style={styles.footer}>
                    <div style={styles.statsSection}>
                      <span style={styles.likes}>
                        <span style={styles.heartIcon}>❤️</span>
                        {post.likeCount || 0}
                      </span>
                      <span style={styles.views}>
                        <span style={styles.eyeIcon}>👁️</span>
                        {Math.floor(Math.random() * 200) + 50}
                      </span>
                      <span style={styles.shares}>
                        <span style={styles.shareIcon}>📤</span>
                        {Math.floor(Math.random() * 20) + 5}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => toggleLike(post.id)}
                      style={{
                        ...styles.likeButton,
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
    paddingTop: '100px',
    paddingBottom: '120px',
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
    left: '5%',
    width: '350px',
    height: '350px',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 8s ease-in-out infinite'
  },
  gradient2: {
    position: 'absolute',
    top: '50%',
    right: '8%',
    width: '280px',
    height: '280px',
    background: 'radial-gradient(circle, rgba(255, 182, 193, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 10s ease-in-out infinite reverse'
  },
  gradient3: {
    position: 'absolute',
    bottom: '25%',
    left: '15%',
    width: '220px',
    height: '220px',
    background: 'radial-gradient(circle, rgba(173, 216, 230, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 7s ease-in-out infinite'
  },
  gradient4: {
    position: 'absolute',
    top: '30%',
    right: '25%',
    width: '180px',
    height: '180px',
    background: 'radial-gradient(circle, rgba(255, 215, 0, 0.06) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 9s ease-in-out infinite reverse'
  },
  gradient5: {
    position: 'absolute',
    top: '70%',
    left: '40%',
    width: '160px',
    height: '160px',
    background: 'radial-gradient(circle, rgba(144, 238, 144, 0.07) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 6s ease-in-out infinite'
  },
  content: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 20px'
  },
  headerSection: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  heading: {
    fontSize: 'clamp(28px, 5vw, 36px)',
    color: '#ffffff',
    fontWeight: '800',
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    letterSpacing: '0.8px',
    marginBottom: '10px',
    background: 'linear-gradient(135deg, #ffffff, #f0f8ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  subtitle: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '400',
    marginBottom: '25px',
    letterSpacing: '0.3px'
  },
  refreshButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    margin: '0 auto'
  },
  refreshIcon: {
    fontSize: '16px',
    transition: 'transform 0.3s ease'
  },
  createPostSection: {
    marginBottom: '40px'
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
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
    animation: 'bounce 2s infinite'
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
  emptyActions: {
    marginTop: '20px'
  },
  actionTip: {
    display: 'inline-block',
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '10px 20px',
    borderRadius: '50px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '14px',
    fontWeight: '500'
  },
  postsContainer: {
    marginTop: '30px'
  },
  postsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    padding: '0 10px'
  },
  postsTitle: {
    color: '#ffffff',
    fontSize: '22px',
    fontWeight: '700',
    margin: 0
  },
  postsCount: {
    background: 'rgba(255, 255, 255, 0.15)',
    color: 'rgba(255, 255, 255, 0.9)',
    padding: '6px 15px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500'
  },
  postsGrid: {
    display: 'grid',
    gap: '25px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'
  },
  postCard: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '24px',
    padding: '28px',
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  avatarContainer: {
    position: 'relative'
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: '3px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
    position: 'relative',
    zIndex: 2
  },
  avatarRing: {
    position: 'absolute',
    top: '-3px',
    left: '-3px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #ff6b9d, #4ecdc4)',
    zIndex: 1,
    animation: 'pulse 2s infinite'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  username: {
    background: 'linear-gradient(135deg, #ff6b9d, #4ecdc4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: '16px',
    fontWeight: '700',
    margin: 0
  },
  timestamp: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '400'
  },
  postBadge: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
    padding: '8px',
    borderRadius: '12px',
    fontSize: '16px',
    animation: 'twinkle 3s infinite'
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
  postImage: {
    width: '100%',
    height: 'auto',
    maxHeight: '350px',
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
  likes: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600'
  },
  views: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500'
  },
  shares: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500'
  },
  heartIcon: {
    fontSize: '14px',
    filter: 'drop-shadow(0 2px 4px rgba(255, 0, 0, 0.3))'
  },
  eyeIcon: {
    fontSize: '14px',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
  },
  shareIcon: {
    fontSize: '14px',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
  },
  likeButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: '50px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '13px',
    border: 'none',
    color: 'white',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    position: 'relative',
    overflow: 'hidden'
  },
  btnIcon: {
    fontSize: '14px',
    transition: 'transform 0.3s ease'
  }
};

// Enhanced CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-25px) rotate(180deg); }
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
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .postCard:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  }
  
  .postCard:hover .avatar {
    transform: scale(1.1);
  }
  
  .postCard:hover .postImage {
    transform: scale(1.05);
  }
  
  .refreshButton:hover {
    transform: translateY(-2px) scale(1.05);
    background: rgba(255, 255, 255, 0.25);
  }
  
  .refreshButton:hover .refreshIcon {
    transform: rotate(180deg);
  }
  
  .likeButton:hover {
    transform: translateY(-2px) scale(1.05) !important;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3) !important;
  }
  
  .likeButton:hover .btnIcon {
    transform: scale(1.2);
  }
  
  @media (max-width: 768px) {
    .postCard {
      margin: 0 5px;
      padding: 20px;
    }
    
    .postsGrid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
    
    .postsHeader {
      flex-direction: column;
      gap: 15px;
      text-align: center;
    }
    
    .statsSection {
      gap: 15px;
    }
  }
`;
document.head.appendChild(styleSheet);

export default PostFeed;