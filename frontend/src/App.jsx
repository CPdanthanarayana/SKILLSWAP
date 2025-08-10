import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostSkill from "./pages/PostSkill";
import dummySkills from "./data/dummySkills";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostSkill />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
