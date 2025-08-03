import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostSkill from "./pages/PostSkill";
import RequestSkill from "./pages/RequestSkill";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostSkill />} />
          <Route path="/request" element={<RequestSkill />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
