
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
        <div style={styles.centered}>Loading profile...</div>
      </>
    );
  }

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.card}>
          <img
            src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.username}`}
            alt="avatar"
            style={styles.avatar}
          />
          <h2 style={styles.username}>{user.username}</h2>
          <p style={styles.email}>{user.email}</p>
          <button style={styles.feedButton} onClick={() => navigate('/feed')}>
            ➕ Create New Post
          </button>
        </div>

        <div style={styles.postSection}>
          <h3>Your Recent Posts</h3>
          {posts.length === 0 ? (
            <p style={styles.noPostText}>You haven't posted anything yet.</p>
          ) : (
            posts.map(post => (
              <div key={post.id} style={styles.postCard}>
                <p>{post.content}</p>
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt="post"
                    style={{ width: '100%', marginTop: 10, borderRadius: 5 }}
                  />
                )}
                <p style={styles.timestamp}>{new Date(post.created_at).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  centered: {
    textAlign: 'center',
    marginTop: 80,
    fontSize: '20px',
    color: '#666'
  },
  container: {
    padding: '40px 20px',
    maxWidth: '1000px',
    margin: 'auto',
  },
  card: {
    background: '#fff',
    borderRadius: '10px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    marginBottom: 20,
  },
  username: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
  },
  email: {
    margin: '10px 0',
    fontSize: '16px',
    color: '#777',
  },
  feedButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: 6,
    marginTop: 15,
    cursor: 'pointer'
  },
  postSection: {
    background: '#f9f9f9',
    padding: '20px',
    borderRadius: 10,
  },
  postCard: {
    background: '#fff',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: 10,
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  },
  timestamp: {
    fontSize: '12px',
    color: '#aaa',
    marginTop: '8px',
  },
  noPostText: {
    color: '#666',
    marginTop: 10,
  }
};

export default Profile;
