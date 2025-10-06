import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import SkillCard from "../components/SkillCard";

function Profile({ currentUser }) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
      fetchUserSkills();
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/user/${userId}`
      );
      if (!response.ok) {
        throw new Error("User not found");
      }
      const userData = await response.json();
      setProfileUser(userData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Could not load user profile");
    }
  };

  const fetchUserSkills = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/skills/user/${userId}`
      );
      if (!response.ok) {
        throw new Error("Skills not found");
      }
      const skills = await response.json();
      setUserSkills(skills);
    } catch (error) {
      console.error("Error fetching user skills:", error);
      // Don't set error for skills, just leave empty array
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = (skillId) => {
    setUserSkills((prevSkills) =>
      prevSkills.filter((skill) => skill._id !== skillId)
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The user profile you're looking for doesn't exist."}
          </p>
          <Link
            to="/"
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser && currentUser._id === profileUser._id;
  const avatarUrl =
    profileUser.profileImage ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      profileUser.name
    )}`;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <span className="mr-2">←</span>
            Back
          </button>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <img
                src={avatarUrl}
                alt={profileUser.name}
                className="w-32 h-32 rounded-full border-4 border-indigo-100 shadow-lg"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {profileUser.name}
                {isOwnProfile && (
                  <span className="ml-2 text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                    You
                  </span>
                )}
              </h1>

              <div className="text-gray-600 mb-4">
                <div className="flex items-center justify-center md:justify-start mb-2">
                  <span className="mr-2">📍</span>
                  <span>{profileUser.location}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <span className="mr-2">📧</span>
                  <span>{profileUser.email}</span>
                </div>
              </div>

              {profileUser.bio && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">About</h3>
                  <p className="text-gray-600">{profileUser.bio}</p>
                </div>
              )}

              <div className="mt-4 text-sm text-gray-500">
                Member since:{" "}
                {new Date(profileUser.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              {isOwnProfile && (
                <button
                  onClick={() => navigate("/profile/edit")}
                  className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center"
                >
                  <span className="mr-2">✏️</span>
                  Edit Profile
                </button>
              )}

              {!isOwnProfile && (
                <button
                  onClick={() => {
                    const subject = `Connect on SkillSwap`;
                    const body = `Hello ${profileUser.name},\n\nI found your profile on SkillSwap and would like to connect!\n\nBest regards`;
                    const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${encodeURIComponent(
                      profileUser.email
                    )}&su=${encodeURIComponent(
                      subject
                    )}&body=${encodeURIComponent(body)}&tf=1`;
                    window.open(gmailUrl, "_blank");
                  }}
                  className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 flex items-center"
                >
                  <span className="mr-2">✉️</span>
                  Contact
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {isOwnProfile ? "Your Skills" : `${profileUser.name}'s Skills`}
            </h2>
            <div className="text-sm text-gray-500">
              {userSkills.length} skill{userSkills.length !== 1 ? "s" : ""}
            </div>
          </div>

          {userSkills.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {isOwnProfile ? "No skills added yet" : "No skills shared yet"}
              </h3>
              <p className="text-gray-500 mb-6">
                {isOwnProfile
                  ? "Start by adding your first skill to share with the community!"
                  : `${profileUser.name} hasn't shared any skills yet.`}
              </p>
              {isOwnProfile && (
                <Link
                  to="/post"
                  className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                >
                  Add Your First Skill
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userSkills.map((skill) => (
                <SkillCard
                  key={skill._id}
                  skillcard={skill}
                  onDelete={handleDeleteSkill}
                  currentUser={currentUser}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
