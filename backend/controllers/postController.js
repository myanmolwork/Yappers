const db = require('../config/db');


exports.createPost = async (req, res) => {
  const { content, image_url } = req.body;
  const userId = req.user.id;

  try {
    await db.promise().query(
      'INSERT INTO posts (user_id, content, image_url) VALUES (?, ?, ?)',
      [userId, content, image_url || null]
    );
    res.status(201).json({ message: 'Post created successfully' });
  } catch (err) {
    console.error('Create Post Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getPosts = async (req, res) => {
  try {
    const [posts] = await db.promise().query(`
      SELECT p.*, u.username,
        (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS likeCount,
        (SELECT COUNT(*) FROM likes WHERE post_id = p.id AND user_id = ?) AS liked
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `, [req.user.id]);

    res.json(posts);
  } catch (err) {
    console.error('Get Posts Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMyPosts = async (req, res) => {
  const userId = req.user.id;

  try {
    const [posts] = await db.promise().query(`
      SELECT p.*, u.username,
        (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS likeCount,
        (SELECT COUNT(*) FROM likes WHERE post_id = p.id AND user_id = ?) AS liked
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.user_id = ?
      ORDER BY p.created_at DESC
    `, [userId, userId]);

    res.json(posts);
  } catch (err) {
    console.error('Get My Posts Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getUserPosts = async (req, res) => {
  const { userId } = req.query;

  try {
    const [posts] = await db.promise().query(`
      SELECT p.*, u.username
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.user_id = ?
      ORDER BY p.created_at DESC
    `, [userId]);

    const [userResult] = await db.promise().query(
      'SELECT username FROM users WHERE id = ?',
      [userId]
    );

    const username = userResult[0]?.username || 'Unknown';

    res.json({ username, posts });
  } catch (err) {
    console.error('Get User Posts Error:', err);
    res.status(500).json({ message: 'Failed to fetch user posts' });
  }
};


exports.toggleLike = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.postId;

  try {
    const [existing] = await db.promise().query(
      'SELECT * FROM likes WHERE user_id = ? AND post_id = ?',
      [userId, postId]
    );

    if (existing.length > 0) {
      // Unlike
      await db.promise().query(
        'DELETE FROM likes WHERE user_id = ? AND post_id = ?',
        [userId, postId]
      );
      res.json({ liked: false });
    } else {
      // Like
      await db.promise().query(
        'INSERT INTO likes (user_id, post_id) VALUES (?, ?)',
        [userId, postId]
      );
      res.json({ liked: true });
    }
  } catch (err) {
    console.error('Toggle Like Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
