const express = require('express');
const router = express.Router();
const {
  sendRequest,
  acceptRequest,
  declineRequest,
  getFriends,
  getPendingRequests
} = require('../controllers/friendsController');

router.post('/request/:userId', sendRequest);
router.post('/accept/:requesterId', acceptRequest);
router.post('/decline/:requesterId', declineRequest);
router.get('/', getFriends);
router.get('/pending', getPendingRequests);

module.exports = router;
