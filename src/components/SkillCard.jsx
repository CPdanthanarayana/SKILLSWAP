import React from "react";

function SkillCard({ skill, description, name, location }) {
  return (
    <div className="bg-white shadow-md rounded p-4 border hover:shadow-lg transition-all">
      <h3 className="text-lg font-bold text-indigo-700">{skill}</h3>
      <p className="mt-2 text-gray-700">{description}</p>
      <div className="mt-4 text-sm text-gray-500">
        Offered by: <strong>{name}</strong> | Location: {location}
      </div>
    </div>
  );
}

export default SkillCard;
