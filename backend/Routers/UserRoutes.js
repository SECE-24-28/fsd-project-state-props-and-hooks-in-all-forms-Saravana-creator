const express = require("express");
const router  = express.Router();
const { SignUpUser, LoginUser, GetProfile, UpdateProfile } = require("../Controllers/UserController");
const { verifyToken } = require("../Utils/authMiddleware");

// Public routes
router.post("/signup", SignUpUser);
router.post("/login",  LoginUser);

// Protected routes (require JWT)
router.get("/profile/:email",  verifyToken, GetProfile);
router.put("/profile/:email",  verifyToken, UpdateProfile);

module.exports = router;