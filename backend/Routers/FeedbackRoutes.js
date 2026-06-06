const express = require("express");
const router = express.Router();
const { createFeedback, getAllFeedback } = require("../Controllers/FeedbackController");
const { verifyToken, verifyAdmin } = require("../Utils/authMiddleware");

router.post("/", createFeedback);
router.get("/", verifyToken, verifyAdmin, getAllFeedback);

module.exports = router;
