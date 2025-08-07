// controllers/userController.js
const db = require('../config/db');

exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await db.promise().query(
      'SELECT id, username FROM users WHERE id != ?',
      [req.user.id]
    );
    res.json(users);
  } catch (err) {
    console.error("Get All Users Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};
