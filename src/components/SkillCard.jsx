import React from "react";

function SkillCard({ skill }) {
  const { name, description, location, skill: skillName, image } = skill;

  // fallback image if none is given
  const imageUrl = image
    ? image
    : `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;

  return (
    <div className="bg-white shadow-md rounded p-4 border hover:shadow-lg transition-all flex flex-col items-center text-center">
      <img
        src={imageUrl}
        alt={name}
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      <h3 className="text-lg font-bold text-indigo-700">{skillName}</h3>
      <p className="mt-2 text-gray-700">{description}</p>
      <div className="mt-4 text-sm text-gray-500">
        Offered by: <strong>{name}</strong>
        <br />
        Location: {location}
      </div>
    </div>
  );
}

export default SkillCard;
