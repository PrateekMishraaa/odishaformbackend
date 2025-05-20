// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import Contact from "./routes/Contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;

// MongoDB connection
mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err.message));


app.use(cors({
  origin: ["https://odishaholiday.netlify.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Body parser
app.use(express.json());

// API routes
app.use("/", Contact);

// Test route
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on PORT ${PORT}`);
});
