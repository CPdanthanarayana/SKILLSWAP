import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostSkill from "./pages/PostSkill";
import RequestSkill from "./pages/RequestSkill";
import dummySkills from "./data/dummySkills";

function App() {
  const [skills, setSkills] = useState(dummySkills);

  function addSkill(newSkill) {
    setSkills([newSkill, ...skills]);
  }

  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home skills={skills} />} />
          <Route path="/post" element={<PostSkill addSkill={addSkill} />} />
          <Route path="/request" element={<RequestSkill />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
