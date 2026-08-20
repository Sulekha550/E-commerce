const router = require("express").Router();
const User = require("../models/User");
const { protect, adminOnly } = require("../middleware/auth");

// GET /api/users - Admin list all users
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// GET /api/users/profile - Get current user profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// PUT /api/users/profile - Update current user profile
router.put("/profile", protect, async (req, res) => {
  try {
    const { name, phone, address, city, postalCode } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, address, city, postalCode },
      { new: true, runValidators: true }
    ).select("-password");
    res.json(user);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
