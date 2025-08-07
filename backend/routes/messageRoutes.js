// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const db = require('../config/db');

// ✅ Get messages between two users
router.get('/:senderId/:receiverId', verifyToken, (req, res) => {
  const { senderId, receiverId } = req.params;

  const query = `
    SELECT * FROM messages 
    WHERE (sender_id = ? AND receiver_id = ?) 
       OR (sender_id = ? AND receiver_id = ?) 
    ORDER BY timestamp ASC
  `;

  db.query(query, [senderId, receiverId, receiverId, senderId], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
});

// ✅ Send a new message
router.post('/', verifyToken, (req, res) => {
  const { senderId, receiverId, message } = req.body;

  if (!senderId || !receiverId || !message) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const query = `INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)`;
  db.query(query, [senderId, receiverId, message], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(201).json({ message: 'Message sent', messageId: result.insertId });
  });
});

module.exports = router;
