import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostSkill from "./pages/PostSkill";
import dummySkills from "./data/dummySkills";

function App() {
  const [skillcard, setSkillcard] = useState(dummySkills);

  function addSkill(newSkillcard) {
    setSkillcard([newSkillcard, ...skillcard]);
  }

  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home skillcard={skillcard} />} />
          <Route path="/post" element={<PostSkill addSkill={addSkill} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
