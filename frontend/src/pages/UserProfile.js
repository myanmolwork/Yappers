// src/pages/UserProfile.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
  const { id } = useParams(); // user id from URL
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/by-id/${id}`, {
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
    return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  }

  if (!user) return <p style={{ textAlign: 'center' }}>Loading user...</p>;

  return (
    <div style={styles.container}>
      <img
        src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.username}`}
        alt="avatar"
        style={styles.avatar}
      />
      <h2>{user.username}</h2>
      <p><strong>Email:</strong> {user.email}</p>

      <div style={{ marginTop: 20 }}>
        <button
          className="btn btn-primary me-2"
          onClick={() => navigate(`/chat?user=${user.id}`)}
        >
          💬 Chat
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate(`/user/${user.id}/posts`)}
        >
          📄 View Posts
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: '40px auto',
    padding: 20,
    textAlign: 'center',
    border: '1px solid #ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    marginBottom: 15,
  },
};

export default UserProfile;
