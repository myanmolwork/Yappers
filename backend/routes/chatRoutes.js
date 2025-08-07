const express = require('express');
const router = express.Router();

// Example chat route
router.post('/send', (req, res) => {
  res.send("Chat message sent.");
});

module.exports = router;
