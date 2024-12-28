import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
// Middlewares
import cors from "cors";
// Database connection
import connectDB from "./config/db";

// Initialize express
const app: Express = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Test route
app.get("/api", (req: Request, res: Response) => {
  res.send("Blog API is running");
});

// Connect to database
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
