// routes/Contact.js
import express from "express";
const router = express.Router();
import Contact from "../models/ContactSchema.js";

router.post("/contact", async (req, res) => {
  const { Name, Email, Mobile, Message } = req.body;

  if (!Name || !Email || !Mobile || !Message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const isMessage = await Contact.findOne({ Email });
    if (isMessage) {
      return res.status(409).json({ message: "You have already submitted the form. Please wait for our review." });
    }

    const newForm = new Contact({ Name, Email, Mobile, Message });
    await newForm.save();

    res.status(200).json({ message: "Form submitted successfully", newForm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

export default router;
