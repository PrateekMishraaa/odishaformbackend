import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 2000;

import cors from "cors";
import mongoose from "mongoose";
import Contact from "./routes/Contact.js";

// Use CORS middleware
app.use(cors());

// Body parser
app.use(express.json());
app.use(cors({
  origin: "https://i-am-form.netlify.app", // replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// API routes
app.use("/api", Contact);

// MongoDB connection
mongoose.connect(process.env.MONGOURI)
  .then(() => console.log("I am connected to the database"))
  .catch((err) => console.log("Database connection error:", err.message));

// Root route
app.get("/", (req, res) => {
  console.log("server is running");
  res.send("Hello world");
});

// Start server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
