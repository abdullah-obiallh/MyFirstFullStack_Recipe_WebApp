const express = require("express");
const verifyToken = require("../middelware/auth");
const router = express.Router();
const Recipe = require("../Models/RecipeSchema");
//multer storage for image
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + file.fieldname;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recipes" });
    console.error(err);
  }
});
// Create a new recipe
router.post("/", upload.single("CoverImage"), verifyToken, async (req, res) => {
  console.log(req.user);
  const { title, ingredients, instructions } = req.body;
  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }
  const newRecipe = await Recipe.create({
    title,
    ingredients,
    instructions,
    CoverImage: req.file?.filename,
    CreatedBy: req.user.id,
  });
  res.status(201).json(newRecipe);
});
// Get a recipe by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ error: "Failed to find recipe" });
    console.error(err);
  }
});
//update a recipe by ID
router.put("/:id", upload.single("CoverImage"), async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, instructions } = req.body;
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { title, ingredients, instructions, CoverImage: req.file?.filename },
      { new: true, runValidators: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ error: "Failed to update recipe" });
    console.error(err);
  }
});
// Delete a recipe by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete recipe" });
    console.error(err);
  }
});
module.exports = router;
