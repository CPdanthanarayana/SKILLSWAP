import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile({ currentUser, onUserUpdate }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    bio: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    // Pre-fill form with current user data
    setFormData({
      name: currentUser.name || "",
      email: currentUser.email || "",
      location: currentUser.location || "",
      bio: currentUser.bio || "",
      profileImage: currentUser.profileImage || "",
    });
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      // Update local storage and parent component
      localStorage.setItem("userData", JSON.stringify(data));
      localStorage.setItem("userToken", data.token);

      if (onUserUpdate) {
        onUserUpdate(data);
      }

      setSuccess("Profile updated successfully!");
      setTimeout(() => {
        navigate(`/profile/${currentUser._id}`);
      }, 2000);
    } catch (error) {
      console.error("Profile update error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return null; // Will redirect
  }

  const previewImage =
    formData.profileImage ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      formData.name
    )}`;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(`/profile/${currentUser._id}`)}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
          >
            <span className="mr-2">←</span>
            Back to Profile
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-gray-600">Update your profile information</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image Preview */}
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  className="w-20 h-20 rounded-full border-4 border-gray-200"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="profileImage"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Profile Image URL
                </label>
                <input
                  id="profileImage"
                  name="profileImage"
                  type="url"
                  value={formData.profileImage}
                  onChange={handleChange}
                  placeholder="https://example.com/your-photo.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Leave empty for auto-generated avatar
                </p>
              </div>
            </div>

            {/* Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., New York, NY"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Bio */}
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows="4"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself and your skills..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 px-4 rounded-md text-white font-medium ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                }`}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>

              <button
                type="button"
                onClick={() => navigate(`/profile/${currentUser._id}`)}
                className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
