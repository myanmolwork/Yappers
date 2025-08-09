const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const socketIo = require("socket.io");
const db = require("./config/db");

dotenv.config();

const app = express();
const server = http.createServer(app);

// Configure CORS for Express
const corsOptions = {
  origin: "https://rest.nisha1.com", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // allow cookies and auth headers
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight requests

app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.get("/api", (req, res) => {
  res.send("Chat & Post App API is running...");
});

// Configure Socket.IO with CORS options matching Express
const io = socketIo(server, {
  cors: {
    origin: "https://rest.nisha1.com",
    methods: ["GET", "POST"],
    credentials: true,
  }
});

// Socket.io logic
let users = {};

io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  socket.on("register", (userId) => {
    users[userId] = socket.id;
    console.log(`✅ User ${userId} registered with socket ${socket.id}`);
  });

  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    console.log(`📨 Message from ${senderId} to ${receiverId}: ${message}`);

    db.query(
      "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
      [senderId, receiverId, message],
      (err) => {
        if (err) {
          console.error("❌ DB Error:", err);
          return;
        }

        const receiverSocket = users[receiverId];
        if (receiverSocket) {
          io.to(receiverSocket).emit("receiveMessage", {
            senderId,
            message,
            timestamp: new Date().toISOString(),
          });
        }
      }
    );
  });

  socket.on("typing", ({ senderId, receiverId }) => {
    const receiverSocket = users[receiverId];
    if (receiverSocket) {
      io.to(receiverSocket).emit("typing", { senderId });
    }
  });

  socket.on("stopTyping", ({ senderId, receiverId }) => {
    const receiverSocket = users[receiverId];
    if (receiverSocket) {
      io.to(receiverSocket).emit("stopTyping", { senderId });
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
