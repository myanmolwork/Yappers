
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PostFeed from "./pages/PostFeed";
import Home from "./pages/Home";
import UsersList from "./components/UsersList";
import UserPosts from "./pages/UserPosts";
import UserProfile from "./pages/UserProfile"; 
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";


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

        {/* Public Routes (No Navbar) */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (With Navbar) */}
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
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <UsersList />
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
