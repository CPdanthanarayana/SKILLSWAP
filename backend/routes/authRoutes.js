const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
} = require("../controllers/authController");
const { authenticate } = require("../middleware/authMiddleware");

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post("/register", registerUser);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", loginUser);

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get("/profile", authenticate, getUserProfile);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", authenticate, updateUserProfile);

// @route   GET /api/auth/user/:id
// @desc    Get user by ID
// @access  Public
router.get("/user/:id", getUserById);

module.exports = router;
