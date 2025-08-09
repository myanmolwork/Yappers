import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import CreatePost from './CreatePost';

function PostFeed() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');

  const fetchPosts = useCallback(async () => {
    try {
      const res = await axios.get('https://yappers-yevm.onrender.com/api/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(res.data);
    } catch (err) {
      alert('Failed to fetch posts');
    }
  }, [token]);

  const toggleLike = async (postId) => {
    try {
      await axios.post(`https://yappers-yevm.onrender.com/api/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPosts(); 
    } catch (err) {
      alert('Failed to toggle like');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📰 Yappers Feed</h2>
      <CreatePost onPostCreated={fetchPosts} />
      {posts.length === 0 ? (
        <p style={styles.noPosts}>No posts yet.</p>
      ) : (
        posts.map(post => (
          <div key={post.id} style={styles.postCard}>
            <div style={styles.header}>
              <strong>{post.username}</strong>
              <span style={styles.timestamp}>
                {new Date(post.created_at).toLocaleString()}
              </span>
            </div>
            <p style={styles.content}>{post.content}</p>
            {post.image_url && (
              <img
                src={post.image_url}
                alt="Post"
                style={styles.postImage}
              />
            )}
            <div style={styles.footer}>
              <span style={styles.likes}>❤️ {post.likeCount}</span>
              <button
                onClick={() => toggleLike(post.id)}
                style={{
                  ...styles.likeButton,
                  backgroundColor: post.liked ? '#e74c3c' : '#3498db'
                }}
              >
                {post.liked ? '💔 Unlike' : '❤️ Like'}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '80px 20px 20px', // accounts for fixed navbar
    maxWidth: '700px',
    margin: 'auto',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#2c3e50',
  },
  noPosts: {
    color: '#777',
    fontStyle: 'italic',
  },
  postCard: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '18px',
    marginBottom: '20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  header: {
    marginBottom: '8px',
    fontSize: '15px',
    color: '#333',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  timestamp: {
    color: '#888',
    fontSize: '13px',
  },
  content: {
    fontSize: '16px',
    color: '#444',
    marginBottom: '10px',
  },
  postImage: {
    maxWidth: '100%',
    borderRadius: '8px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  likes: {
    fontSize: '15px',
    color: '#e74c3c',
  },
  likeButton: {
    padding: '6px 14px',
    fontSize: '14px',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
};

export default PostFeed;
