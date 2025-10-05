import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAvatarClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    setShowDropdown(false);
    onLogout();
  };

  // Generate avatar URL
  const getAvatarUrl = () => {
    if (user?.profileImage) {
      return user.profileImage;
    }
    // Use DiceBear API for consistent avatars based on user name
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      user?.name || "user"
    )}`;
  };

  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold hover:text-gray-200">
        SkillSwap
      </Link>
      <div className="flex items-center space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>

        {user ? (
          <>
            <Link to="/post" className="hover:underline">
              Offer Skill
            </Link>

            {/* Profile Avatar with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleAvatarClick}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src={getAvatarUrl()}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-white hover:border-gray-300 transition-colors cursor-pointer"
                />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-gray-500">{user.email}</div>
                  </div>

                 

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
