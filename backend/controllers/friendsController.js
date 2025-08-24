// backend/controllers/friendsController.js
const db = require('../config/db'); // your MySQL connection

// Send friend request
exports.sendRequest = (req, res) => {
  const requesterId = req.user.id;
  const { userId } = req.params;

  db.query(
    "INSERT INTO friend_requests (requester_id, requested_id, status) VALUES (?, ?, 'pending')",
    [requesterId, userId],
    (err) => {
      if (err) return res.status(500).json({ message: "Error sending request", error: err });
      res.json({ message: "Friend request sent" });
    }
  );
};

// Accept friend request
exports.acceptRequest = (req, res) => {
  const userId = req.user.id;
  const { requesterId } = req.params;

  db.query(
    "UPDATE friend_requests SET status='accepted' WHERE requester_id=? AND requested_id=?",
    [requesterId, userId],
    (err) => {
      if (err) return res.status(500).json({ message: "Error accepting request", error: err });
      res.json({ message: "Friend request accepted" });
    }
  );
};

// Decline friend request
exports.declineRequest = (req, res) => {
  const userId = req.user.id;
  const { requesterId } = req.params;

  db.query(
    "DELETE FROM friend_requests WHERE requester_id=? AND requested_id=?",
    [requesterId, userId],
    (err) => {
      if (err) return res.status(500).json({ message: "Error declining request", error: err });
      res.json({ message: "Friend request declined" });
    }
  );
};

// Get all friends
exports.getFriends = (req, res) => {
  const userId = req.user.id;

  db.query(
    `SELECT u.id, u.name 
     FROM users u 
     JOIN friend_requests f 
       ON (u.id = f.requester_id OR u.id = f.requested_id) 
     WHERE (f.requester_id=? OR f.requested_id=?) 
       AND f.status='accepted'
       AND u.id != ?`,
    [userId, userId, userId],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Error fetching friends", error: err });
      res.json(results);
    }
  );
};

// Get pending friend requests
exports.getPendingRequests = (req, res) => {
  const userId = req.user.id;

  db.query(
    `SELECT f.requester_id, u.name 
     FROM friend_requests f 
     JOIN users u ON f.requester_id=u.id 
     WHERE f.requested_id=? AND f.status='pending'`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Error fetching pending requests", error: err });
      res.json(results);
    }
  );
};
