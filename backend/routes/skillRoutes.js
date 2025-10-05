const express = require("express");
const router = express.Router();
const {
  addSkill,
  getSkills,
  deleteSkill,
} = require("../controllers/skillController");
const { authenticate } = require("../middleware/authMiddleware");

// @route   GET /api/skills
// @desc    Get all skills
// @access  Public
router.get("/", getSkills);

// @route   POST /api/skills/offerskill
// @desc    Create a new skill
// @access  Private (requires authentication)
router.post("/offerskill", authenticate, addSkill);

// @route   DELETE /api/skills/:id
// @desc    Delete a skill by ID
// @access  Private (requires authentication)
router.delete("/:id", authenticate, deleteSkill);

module.exports = router;
