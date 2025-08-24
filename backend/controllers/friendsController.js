// backend/controllers/friendsController.js
const db = require('../config/db');

// -------------------- Send Friend Request --------------------
exports.sendRequest = (req, res) => {
  const requesterId = req.user.id;
  const { userId } = req.params;

  if (requesterId === parseInt(userId)) {
    return res.status(400).json({ message: "You cannot send a request to yourself" });
  }

  db.query(
    "SELECT * FROM friend_requests WHERE requester_id=? AND requested_id=?",
    [requesterId, userId],
    (err, results) => {
      if (err) {
        console.error("DB Error in sendRequest SELECT:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (results.length > 0) return res.status(400).json({ message: "Friend request already sent" });

      db.query(
        "INSERT INTO friend_requests (requester_id, requested_id, status) VALUES (?, ?, 'pending')",
        [requesterId, userId],
        (err) => {
          if (err) {
            console.error("DB Error in sendRequest INSERT:", err);
            return res.status(500).json({ message: "Error sending request", error: err });
          }
          res.json({ message: "Friend request sent successfully" });
        }
      );
    }
  );
};

// -------------------- Accept Friend Request --------------------
exports.acceptRequest = (req, res) => {
  const userId = req.user.id;
  const { requesterId } = req.params;

  db.query(
    "SELECT * FROM friend_requests WHERE requester_id=? AND requested_id=? AND status='pending'",
    [requesterId, userId],
    (err, results) => {
      if (err) {
        console.error("DB Error in acceptRequest SELECT:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (!results.length) return res.status(404).json({ message: "No pending request found" });

      db.query(
        "UPDATE friend_requests SET status='accepted' WHERE requester_id=? AND requested_id=?",
        [requesterId, userId],
        (err) => {
          if (err) {
            console.error("DB Error in acceptRequest UPDATE:", err);
            return res.status(500).json({ message: "Error accepting request", error: err });
          }
          res.json({ message: "Friend request accepted successfully" });
        }
      );
    }
  );
};

// -------------------- Decline Friend Request --------------------
exports.declineRequest = (req, res) => {
  const userId = req.user.id;
  const { requesterId } = req.params;

  db.query(
    "SELECT * FROM friend_requests WHERE requester_id=? AND requested_id=? AND status='pending'",
    [requesterId, userId],
    (err, results) => {
      if (err) {
        console.error("DB Error in declineRequest SELECT:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (!results.length) return res.status(404).json({ message: "No pending request found" });

      db.query(
        "DELETE FROM friend_requests WHERE requester_id=? AND requested_id=?",
        [requesterId, userId],
        (err) => {
          if (err) {
            console.error("DB Error in declineRequest DELETE:", err);
            return res.status(500).json({ message: "Error declining request", error: err });
          }
          res.json({ message: "Friend request declined successfully" });
        }
      );
    }
  );
};

// -------------------- Get All Friends --------------------
exports.getFriends = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT u.id, u.username
    FROM users u
    WHERE u.id IN (
      SELECT CASE
        WHEN requester_id = ? THEN requested_id
        ELSE requester_id
      END AS friend_id
      FROM friend_requests
      WHERE (requester_id = ? OR requested_id = ?) AND status='accepted'
    )
  `;

  db.query(query, [userId, userId, userId], (err, results) => {
    if (err) {
      console.error("DB Error in getFriends:", err);
      return res.status(500).json({ message: "Error fetching friends", error: err });
    }
    res.json({ success: true, friends: results.length ? results : [] });
  });
};

// -------------------- Get Pending Friend Requests --------------------
exports.getPendingRequests = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT f.requester_id, u.username
    FROM friend_requests f
    JOIN users u ON f.requester_id = u.id
    WHERE f.requested_id = ? AND f.status='pending'
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("DB Error in getPendingRequests:", err);
      return res.status(500).json({ message: "Error fetching pending requests", error: err });
    }
    res.json({ success: true, pendingRequests: results.length ? results : [] });
  });
};

// -------------------- Get All Users for Add Friend List --------------------
exports.getAllUsers = (req, res) => {
  const userId = req.user.id;

  const query = "SELECT id, username FROM users WHERE id != ?";

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("DB Error in getAllUsers:", err);
      return res.status(500).json({ message: "Error fetching all users", error: err });
    }
    res.json({ success: true, users: results.length ? results : [] });
  });
};
