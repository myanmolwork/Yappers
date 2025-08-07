const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/userController');
const { verifyToken } = require('../middleware/verifyToken');
const db = require('../config/db');


router.get('/', verifyToken, (req, res, next) => {
  console.log("🧪 Token decoded user:", req.user);
  next();
}, getAllUsers);


router.get('/by-name/:name', verifyToken, (req, res) => {
  const userName = req.params.name;

  const query = 'SELECT * FROM users WHERE name = ? LIMIT 1';
  db.query(query, [userName], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(results[0]);
  });
});


router.get('/by-id/:id', verifyToken, (req, res) => {
  const userId = req.params.id;

  const query = 'SELECT * FROM users WHERE id = ? LIMIT 1';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(results[0]);
  });
});


router.get('/:id', verifyToken, (req, res) => {
  const userId = req.params.id;

  const query = 'SELECT id, name FROM users WHERE id = ? LIMIT 1';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(results[0]);
  });
});

module.exports = router;
