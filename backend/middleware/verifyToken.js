// middleware/verifyToken.js
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access Denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Must include `.id` here
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = { verifyToken };
