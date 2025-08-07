const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  toggleLike,
  getMyPosts,
  getUserPosts, 
} = require('../controllers/postController');
const { verifyToken } = require('../middleware/verifyToken');


router.post('/', verifyToken, createPost);
router.get('/', verifyToken, getPosts);
router.get('/mine', verifyToken, getMyPosts);
router.get('/user', verifyToken, getUserPosts); 
router.post('/:postId/like', verifyToken, toggleLike);

module.exports = router;
