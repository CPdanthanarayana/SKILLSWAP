import React from "react";

function SkillCard({ skillcard }) {
  const { name, description, location, skillName, image, require, email } = skillcard;

  const imageUrl = image
    ? image
    : `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;

  return (
    <div className="bg-white shadow-md rounded p-4 border hover:shadow-lg transition-all flex flex-col text-center h-full">
      <img
        src={imageUrl}
        alt={name}
        className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
      />
      <h3 className="text-lg font-bold text-indigo-700">{skillName}</h3>
      <p className="mt-2 text-gray-700">{description}</p>

      {require && (
        <p className="mt-2 text-sm text-amber-600 font-semibold">
          Wants to learn: <span className="text-gray-800">{require}</span>
        </p>
      )}

      <div className="mt-4 text-sm text-gray-500">
        Offered by: <strong>{name}</strong><br />
        Location: {location}
      </div>

      
      <div className="flex-grow"></div>

      <a
        href={`mailto:${email}`}
        className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 inline-block"
      >
        📧 Contact Me
      </a>
    </div>
  );
}

export default SkillCard;
