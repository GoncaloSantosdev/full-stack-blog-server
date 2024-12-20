import express from "express";
import bodyParser from "body-parser";
// Controllers
import { userWebhookHandler } from "../controllers/webhookController";

const router = express.Router();

router.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  userWebhookHandler
);

export default router;
