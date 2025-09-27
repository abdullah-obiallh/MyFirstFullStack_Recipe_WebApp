const express = require("express");
const router = express.Router();
const User = require("../Models/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middelware/auth");
// Register User
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const Newuser = new User({ email, password: hashedPassword });
  await Newuser.save();
  let token = jwt.sign({ email, id: Newuser._id }, process.env.SECRET_KEY, {
    expiresIn: "1w",
  });
  return res.status(201).json({
    message: "User registered successfully",
    token,
    user: Newuser,
  });
});
// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  let user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    let token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1w",
    });
    return res.status(201).json({
      message: "User logged in successfully",
      token,
      user: user,
    });
  } else {
    return res.status(400).json({ message: "Invalid Email or Password" });
  }
});
// Get User id
router.get("/:id", async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user });
});
//add to fav
router.post("/addtofav", auth, async (req, res) => {
  try {
    const { recipeId } = req.body;
    if (!recipeId)
      return res.status(400).json({ message: "recipeId is required" });

    // addToSet prevents duplicates
    const updated = await User.findByIdAndUpdate(
      req.userId,
      { $addToSet: { faviorateRecipe: recipeId } },
      { new: true }
    ).populate("faviorateRecipe");

    return res.status(200).json({
      message: "Added to favorites",
      favorites: updated.faviorateRecipe,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Remove from favorites
router.post("/removefav", auth, async (req, res) => {
  try {
    const { recipeId } = req.body;
    if (!recipeId)
      return res.status(400).json({ message: "recipeId is required" });

    const updated = await User.findByIdAndUpdate(
      req.userId,
      { $pull: { faviorateRecipe: recipeId } },
      { new: true }
    ).populate("faviorateRecipe");

    return res.status(200).json({
      message: "Removed from favorites",
      favorites: updated.faviorateRecipe,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
