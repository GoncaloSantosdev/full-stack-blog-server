import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
// Middlewares
import cors from "cors";
// Database
import { connectDB } from "./config/database";
// Routes
import webhookRoutes from "./routes/webhookRoutes";

// Create Express app
const app = express();
connectDB();

// Middleware
app.use(cors());

// Webhook
app.use("/api/webhooks", webhookRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to DevBlog API" });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
