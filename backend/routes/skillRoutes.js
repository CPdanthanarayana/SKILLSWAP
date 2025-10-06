const express = require("express");
const router = express.Router();
const {
  addSkill,
  getSkills,
  deleteSkill,
  getSkillsByUser,
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

// @route   GET /api/skills/user/:userId
// @desc    Get skills by user ID
// @access  Public
router.get("/user/:userId", getSkillsByUser);

module.exports = router;
