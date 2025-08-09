
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
      <h2 style={styles.heading}>🧑‍🤝‍🧑 Discover Other Users</h2>
      {users.length === 0 ? (
        <p style={styles.noUsers}>No users found.</p>
      ) : (
        users.map(user => (
          <div key={user.id} style={styles.userCard}>
            <div style={styles.userInfo}>
              <img
                src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.username}`}
                alt="avatar"
                style={styles.avatar}
              />
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
    padding: '30px 20px',
    maxWidth: 800,
    margin: 'auto',
    background: '#f4f6f8',
    borderRadius: 12,
    boxShadow: '0 0 12px rgba(0,0,0,0.05)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 25,
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  noUsers: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
  },
  userCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    marginBottom: 15,
    background: '#fff',
    borderRadius: 10,
    boxShadow: '0 3px 8px rgba(0,0,0,0.04)',
    transition: 'transform 0.2s ease',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    border: '2px solid #ddd',
  },
  username: {
    fontWeight: 600,
    fontSize: '16px',
    color: '#2c3e50',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },
  actions: {
    display: 'flex',
    gap: 10,
  },
  actionBtn: {
    backgroundColor: '#ecf0f1',
    border: '1px solid #bdc3c7',
    padding: '6px 12px',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.2s ease',
  },
  chatBtn: {
    backgroundColor: '#3498db',
    border: 'none',
    color: '#fff',
    padding: '6px 14px',
    borderRadius: 6,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  }
};

export default UsersList;
