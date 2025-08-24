const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const {
  sendRequest,
  acceptRequest,
  declineRequest,
  getFriends,
  getPendingRequests,
  getAllUsers,        // Add this
} = require('../controllers/friendsController');

router.post('/request/:userId', verifyToken, sendRequest);
router.post('/accept/:requesterId', verifyToken, acceptRequest);
router.post('/decline/:requesterId', verifyToken, declineRequest);
router.get('/', verifyToken, getFriends);
router.get('/pending', verifyToken, getPendingRequests);
router.get('/all', verifyToken, getAllUsers);  // New endpoint

module.exports = router;
