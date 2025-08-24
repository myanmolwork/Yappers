import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PostFeed from "./pages/PostFeed";
import Home from "./pages/Home";// updated
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
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/home" replace />
            ) : (
              <Login />
            )
          }
        />

        <Route path="/register" element={<Register />} />

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

        {/* Updated route for friends list */}
        <Route
          path="/friends"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <Friends />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />

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
