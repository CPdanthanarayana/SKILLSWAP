const SkillCardModel = require("../models/SkillCardModel");

//Skill adding - Now requires authentication
const addSkill = async (req, res) => {
  try {
    const { skillName, require, description, location, image } = req.body;

    // Create skill card with authenticated user data
    const skillcard = await SkillCardModel.create({
      skillName,
      require,
      description,
      location,
      image: image || "",
      name: req.user.name,
      email: req.user.email,
      user: req.user._id, // Link to authenticated user
    });

    console.log("Saved skill:", skillcard);
    res.status(201).json(skillcard);
  } catch (error) {
    console.error("Error saving skill:", error);
    res.status(400).json({ error: error.message });
  }
};

//Skill retrieval
const getSkills = async (req, res) => {
  try {
    const skills = await SkillCardModel.find().sort({ createdAt: -1 });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Skill deletion - Now uses proper authentication
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the skill card
    const skillcard = await SkillCardModel.findById(id);

    if (!skillcard) {
      return res.status(404).json({ error: "Skill card not found" });
    }

    // Check if the authenticated user owns this skill
    if (skillcard.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "You can only delete your own skills" });
    }

    // Delete the skill card
    await SkillCardModel.findByIdAndDelete(id);

    console.log("Skill deleted:", id);
    res.status(200).json({ message: "Skill card deleted successfully" });
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addSkill, getSkills, deleteSkill };
