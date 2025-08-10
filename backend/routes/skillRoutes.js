const express = require("express");
const router = express.Router();
const { addSkill, getSkills } = require("../controllers/skillController");

// @route   GET /api/skills
// @desc    Get all skills
// @access  Public
router.get("/", getSkills);

// @route   POST /api/skills/offerskill
// @desc    Create a new skill
// @access  Public
router.post("/offerskill", addSkill);

module.exports = router;
