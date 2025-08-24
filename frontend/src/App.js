import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PostFeed from "./pages/PostFeed";
import Home from "./pages/Home";
import UserPosts from "./pages/UserPosts";
import UserProfile from "./pages/UserProfile"; 
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Friends from "./pages/Friends";

const LayoutWithNavbar = ({ children }) => (
  <>
    <Navbar />
    <div style={{ paddingTop: '60px' }}>{children}</div>
  </>
);

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route 
          path="/" 
          element={token ? <Navigate to="/home" replace /> : <Login />}
        />

        <Route path="/register" element={<Register />} />

        {/* Home */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <Home />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <Profile />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />

        {/* Chat */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <Chat />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />

        {/* Feed */}
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <PostFeed />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />

        {/* Friends */}
        <Route
          path="/friends"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <Friends token={token} />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />

        {/* User posts */}
        <Route
          path="/user/:userId/posts"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <UserPosts />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />

        {/* User profile */}
        <Route
          path="/user/:id"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <UserProfile />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
