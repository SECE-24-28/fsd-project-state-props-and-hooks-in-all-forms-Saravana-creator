const Feedback = require("../Models/FeedbackModel");

const createFeedback = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required." });
    }

    const newFeedback = new Feedback({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone ? phone.trim() : "",
      subject: subject ? subject.trim() : "",
      message: message.trim(),
      submittedBy: req.user?.email || "",
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json({ message: "Feedback received successfully.", feedback: savedFeedback });
  } catch (error) {
    res.status(500).json({ message: "Error saving feedback.", error: error.message });
  }
};

const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({ feedbacks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback.", error: error.message });
  }
};

module.exports = { createFeedback, getAllFeedback };
