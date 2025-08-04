import React, { useState } from "react";
import dummySkills from "../data/dummySkills";
import SkillCard from "../components/SkillCard";

function Home() {
  const [skills] = useState(dummySkills); // react state, later we fetch from backend

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill.skill}
            description={skill.description}
            name={skill.name}
            location={skill.location}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
