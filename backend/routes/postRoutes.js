const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  toggleLike,
  getMyPosts,
  getUserPosts, // ✅ Add this
} = require('../controllers/postController');
const { verifyToken } = require('../middleware/verifyToken');

// ✅ Routes
router.post('/', verifyToken, createPost);
router.get('/', verifyToken, getPosts);
router.get('/mine', verifyToken, getMyPosts);
router.get('/user', verifyToken, getUserPosts); // ✅ New route for another user's posts
router.post('/:postId/like', verifyToken, toggleLike);

module.exports = router;
