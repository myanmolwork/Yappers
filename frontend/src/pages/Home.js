
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    try {
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

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>🌍 Explore Posts from Everyone</h2>
        {posts.length === 0 ? (
          <p style={styles.noPosts}>No posts to show yet.</p>
        ) : (
          posts.map(post => (
            <div key={post.id} style={styles.card}>
              <div style={styles.header}>
                <img
                  src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${post.username}`}
                  alt="avatar"
                  style={styles.avatar}
                />
                <div>
                  <strong
                    style={styles.username}
                    onClick={() => navigate(`/user/${post.user_id}`)}
                  >
                    @{post.username}
                  </strong>
                  <br />
                  <small style={styles.timestamp}>
                    {new Date(post.created_at).toLocaleString()}
                  </small>
                </div>
              </div>
              <p style={styles.content}>{post.content}</p>
              {post.image_url && (
                <img src={post.image_url} alt="post" style={styles.image} />
              )}
              <div style={styles.footer}>
                <span style={styles.likeCount}>❤️ {post.likeCount}</span>
                <button
                  onClick={() => toggleLike(post.id)}
                  style={{
                    ...styles.likeBtn,
                    backgroundColor: post.liked ? '#ffebee' : '#f0f0f0',
                    color: post.liked ? '#e53935' : '#555'
                  }}
                >
                  {post.liked ? 'Unlike' : 'Like'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: 800,
    margin: 'auto',
    backgroundColor: '#fafafa',
    minHeight: '100vh'
  },
  heading: {
    marginBottom: 40,
    fontSize: '28px',
    color: '#222',
    textAlign: 'center',
    fontWeight: '600'
  },
  noPosts: {
    textAlign: 'center',
    color: '#999',
    fontSize: '18px'
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    marginBottom: 30,
    transition: 'transform 0.2s',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 15,
    gap: 15
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    boxShadow: '0 0 0 2px #ddd'
  },
  username: {
    color: '#1976d2',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500'
  },
  timestamp: {
    fontSize: '12px',
    color: '#888'
  },
  content: {
    fontSize: '16px',
    lineHeight: 1.5,
    marginTop: 10,
    marginBottom: 10,
    color: '#444'
  },
  image: {
    maxWidth: '100%',
    borderRadius: 10,
    marginTop: 15
  },
  footer: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  likeCount: {
    fontSize: '15px',
    color: '#555'
  },
  likeBtn: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background 0.3s',
  }
};

export default Home;
