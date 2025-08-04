import React, { useState } from "react";

function PostSkill() {
  const [formData, setFormData] = useState({
    name: "",
    skill: "",
    description: "",
    location: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault(); // prevent browser reload
    console.log("Submitted skill:", formData);
    alert("Skill submitted!");
    // In future: send to backend
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Offer Your Skill</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="skill"
          placeholder="Skill Name"
          value={formData.skill}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location (e.g., Online)"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostSkill;
