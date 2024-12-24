import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js"


dotenv.config()
// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;
 // Provide a default port in case the environment variable is missing

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
  connectDB();
});
