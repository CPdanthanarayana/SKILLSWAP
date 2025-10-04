import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SkillForm from "../components/SkillForm";

function PostSkill() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    skillName: "",
    require: "",
    description: "",
    location: "",
    image: "",
    email: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:5000/api/skills/offerskill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        alert("Skill added successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error creating skill. Please try again.");
      });
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Offer Your Skill</h2>

      <SkillForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default PostSkill;
