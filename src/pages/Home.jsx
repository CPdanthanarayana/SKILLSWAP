import React, { useState } from "react";
import SkillCard from "../components/SkillCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function Home({ skillcard }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter the skills based on search term
  const filteredSkills = skillcard.filter((skill) =>
    skill.skillName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Welcome to SkillSwap 👋</h1>
        <p className="mt-2 text-lg">
          Share your skills. Find new ones. Grow together.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pt-6">
        {/* Heading and Search bar in same row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4 md:mb-0">
            Available Skills
          </h2>

          {/* Search input with icon */}
          <div className="relative w-full md:w-1/2">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <p className="text-gray-500">No skills found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
            {filteredSkills.map((skillcard, index) => (
              <SkillCard key={index} skillcard={skillcard} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
