import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import SkillForm from "../components/SkillForm";

function PostSkill({ user }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    skillName: "",
    require: "",
    description: "",
    location: "",
    image: "",
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      alert("Please log in to create a skill");
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(
        "http://localhost:5000/api/skills/offerskill",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      alert("Skill added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating skill. Please try again.");
    }
  }

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded text-center">
        <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
        <p className="text-gray-600 mb-6">
          Please log in to offer your skills on SkillSwap
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Register
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Offer Your Skill</h2>
      <p className="text-gray-600 mb-6">
        Hello <strong>{user.name}</strong>! Share your skills with the
        community.
      </p>

      <SkillForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default PostSkill;
