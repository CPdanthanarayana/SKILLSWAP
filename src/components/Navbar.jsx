import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">SkillSwap</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/post" className="hover:underline">
          Offer Skill
        </Link>
        <Link to="/request" className="hover:underline">
          Need Skill
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
