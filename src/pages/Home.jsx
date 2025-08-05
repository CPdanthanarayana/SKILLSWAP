import React from "react";
import SkillCard from "../components/SkillCard";

function Home({ skills }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Welcome to SkillSwap 👋</h1>
        <p className="mt-2 text-lg">
          Share your skills. Find new ones. Grow together.
        </p>
      </section>

      {/* Skills Section */}
      <section className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700">
          Available Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
