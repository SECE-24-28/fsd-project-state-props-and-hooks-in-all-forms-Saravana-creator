const express = require("express");
const router  = express.Router();
const {
  SignUpUser,
  LoginUser,
  GetProfile,
  UpdateProfile,
  GetAllUsers,
  GetUserStats,
} = require("../Controllers/UserController");
const { verifyToken, verifyAdmin } = require("../Utils/authMiddleware");

// ── Public routes ────────────────────────────────────────────────────────────
router.post("/signup", SignUpUser);
router.post("/login",  LoginUser);

// ── Admin only ───────────────────────────────────────────────────────────────
// NOTE: /stats must come before /:email to avoid param collision
router.get("/stats", verifyToken, verifyAdmin, GetUserStats);
router.get("/",      verifyToken, verifyAdmin, GetAllUsers);

// ── Protected (own user or admin) ────────────────────────────────────────────
router.get("/profile/:email", verifyToken, GetProfile);
router.put("/profile/:email", verifyToken, UpdateProfile);

module.exports = router;