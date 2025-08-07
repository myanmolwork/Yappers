const db = require('../config/db');

exports.getChatHistory = async (req, res) => {
  const userId = req.user.id;
  let { otherUserId } = req.query;

  try {
    // If the frontend sends a username, convert it to user ID
    if (isNaN(otherUserId)) {
      const [user] = await db.promise().query(
        'SELECT id FROM users WHERE username = ?',
        [otherUserId]
      );

      if (user.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      otherUserId = user[0].id;
    }

    const [msgs] = await db.promise().query(
      `SELECT sender_id, receiver_id, message, timestamp
       FROM messages
       WHERE (sender_id = ? AND receiver_id = ?)
          OR (sender_id = ? AND receiver_id = ?)
       ORDER BY timestamp ASC`,
      [userId, otherUserId, otherUserId, userId]
    );

    res.json(msgs);
  } catch (err) {
    console.error("Chat history error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};
