
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
      <div style={styles.header}>
        <img
          src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${username || 'user'}`}
          alt="avatar"
          style={styles.avatar}
        />
        <h2>{username ? `${username}'s Posts` : 'User Posts'}</h2>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((p) => (
          <div key={p.id || p._id} style={styles.card}>
            <p>{p.content}</p>
            {p.image_url && <img src={p.image_url} alt="Post" style={styles.image} />}
            <small>{new Date(p.created_at).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    maxWidth: 600,
    margin: 'auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    marginRight: 15,
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  image: {
    maxWidth: '100%',
    marginTop: 10,
    borderRadius: 5,
  },
};

export default UserPosts;
