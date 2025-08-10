const SkillCardModel = require("../models/SkillCardModel");

//Skill adding 
const addSkill = async (req, res) => {
  try {
    console.log("Received data:", req.body); 
    const skillcard = await SkillCardModel.create(req.body);
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

module.exports = { addSkill, getSkills };
