
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './Chat.css';

const socket = io("https://yappers-yevm.onrender.com");

function Chat() {
  const [users, setUsers] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [userId, setUserId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');
  const typingTimeoutRef = useRef(null);
  const chatBoxRef = useRef(null);

  const token = localStorage.getItem('token');

  // Get current user
  useEffect(() => {
    axios.get('https://yappers-yevm.onrender.com/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUserId(res.data.user.id))
    .catch(() => alert("Please login again."));
  }, [token]);


  useEffect(() => {
    axios.get('https://yappers-yevm.onrender.com/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setUsers(res.data);
      const map = {};
      res.data.forEach(u => map[u.id] = u.username);
      setUserMap(map);
    })
    .catch(() => alert("Failed to load users"));
  }, [token]);

  // Register socket and fetch chat
  useEffect(() => {
    if (!userId || !receiverId) return;

    socket.emit("register", userId);

    axios.get(`https://yappers-yevm.onrender.com/api/messages/${userId}/${receiverId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setChat(res.data))
    .catch(() => console.error("Failed to fetch chat"));
  }, [userId, receiverId, token]);

  // Listen for incoming messages and typing
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setChat(prev => [...prev, data]);
    });

    socket.on("typing", ({ senderId }) => {
      setTypingStatus(`${userMap[senderId] || 'Someone'} is typing...`);
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => setTypingStatus(""), 3000);
    });

    socket.on("stopTyping", () => setTypingStatus(""));

    return () => {
      socket.off("receiveMessage");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [userMap]);

  // Auto-scroll
  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [chat]);

  // Send a message
  const sendMessage = () => {
    if (!message.trim() || !userId || !receiverId) return;

    const msgData = {
      senderId: userId,
      receiverId,
      message,
      timestamp: new Date().toISOString()
    };

    socket.emit("sendMessage", msgData);
    socket.emit("stopTyping", { senderId: userId, receiverId });

    setChat(prev => [...prev, { ...msgData, sender: "You" }]);
    setMessage("");
  };

  // Typing indicator
  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit("typing", { senderId: userId, receiverId });

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", { senderId: userId, receiverId });
    }, 2000);
  };

  // Avatar
  const getAvatar = (name) =>
    `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(name)}&size=32&radius=50`;

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-3">Live Chat 💬</h3>

      {/* Select user */}
      <div className="row mb-3">
        <div className="col-md-6 offset-md-3">
          <select
            className="form-select"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
          >
            <option value="">Select a user to chat with</option>
            {users.filter(u => u.id !== userId).map(u => (
              <option key={u.id} value={u.id}>
                {u.username}
              </option>
            ))}
          </select>
        </div>
      </div>

      {receiverId && (
        <>
          <h5 className="text-center mb-3">
            Chat with {userMap[receiverId] || "Unknown"}
          </h5>

          <div
            ref={chatBoxRef}
            className="border rounded p-3 mb-2 bg-light"
            style={{ height: '350px', overflowY: 'auto' }}
          >
            {chat.map((msg, idx) => {
              const isSelf = msg.senderId === userId || msg.sender === "You";
              const senderName = isSelf ? "You" : userMap[msg.senderId] || "Unknown";

              return (
                <div
                  key={msg.id || `msg-${idx}`}
                  className={`d-flex mb-3 ${isSelf ? 'justify-content-end' : 'justify-content-start'}`}
                >
                  {!isSelf && (
                    <img
                      src={getAvatar(senderName)}
                      alt="avatar"
                      className="rounded-circle me-2"
                    />
                  )}
                  <div className="bg-white p-2 rounded shadow-sm" style={{ maxWidth: '70%' }}>
                    <strong>{senderName}</strong>
                    <div>{msg.message}</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  {isSelf && (
                    <img
                      src={getAvatar(senderName)}
                      alt="avatar"
                      className="rounded-circle ms-2"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {typingStatus && (
            <div className="text-muted mb-2">
              <em>{typingStatus}</em>
            </div>
          )}

          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type a message..."
              value={message}
              onChange={handleTyping}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="btn btn-primary" onClick={sendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
