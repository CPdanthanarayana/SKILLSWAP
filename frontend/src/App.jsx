import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostSkill from "./pages/PostSkill";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing user session on app load
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
  };

  const handleUserUpdate = (userData) => {
    setUser(userData);
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="p-4">
              <Home user={user} />
            </div>
          }
        />
        <Route
          path="/post"
          element={
            <div className="p-4">
              <PostSkill user={user} />
            </div>
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />
        <Route
          path="/profile/:userId"
          element={
            <div className="p-4">
              <Profile currentUser={user} />
            </div>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <EditProfile currentUser={user} onUserUpdate={handleUserUpdate} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
