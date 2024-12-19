import express, { Request, Response } from "express";
dotenv.config();
import dotenv from "dotenv";
// Middlewares
import cors from "cors";
// Database
import { connectDB } from "./config/database";

// Create Express app
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to DevBlog API" });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
