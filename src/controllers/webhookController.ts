import { Request, Response } from "express";
import { Webhook } from "svix";
// Models
import { User } from "../models/User";

interface WebhookEvent {
  type: string;
  data: {
    id: string;
    [key: string]: any;
  };
}

export const userWebhookHandler = async (req: Request, res: Response) => {
  const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!CLERK_WEBHOOK_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(CLERK_WEBHOOK_SECRET);

  // Get headers and body
  const headers = req.headers;
  const payload = req.body;

  // Get Svix headers for verification
  const svix_id = headers["svix-id"];
  const svix_timestamp = headers["svix-timestamp"];
  const svix_signature = headers["svix-signature"];

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return void res.status(400).json({
      success: false,
      message: "Error: Missing svix headers",
    });
  }

  let evt: WebhookEvent; // Type your evt

  try {
    // Type assertion if needed: wh.verify returns a generic unknown type by default
    evt = wh.verify(payload, {
      "svix-id": svix_id as string,
      "svix-timestamp": svix_timestamp as string,
      "svix-signature": svix_signature as string,
    }) as WebhookEvent;
  } catch (error: unknown) {
    // Narrow down the error type before using `.message`
    if (error instanceof Error) {
      console.log("Error: Could not verify webhook:", error.message);
      return void res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      // If it's not an Error instance, handle accordingly
      console.log("Error: Could not verify webhook:", error);
      return void res.status(400).json({
        success: false,
        message: "Unknown error occurred",
      });
    }
  }

  if (evt.type === "user.created") {
    const clerkUserId = evt.data.id;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ clerkId: clerkUserId });

      if (!existingUser) {
        await User.create({ clerkId: clerkUserId });
        console.log(`New user created with Clerk ID: ${clerkUserId}`);
      } else {
        console.log(`User already exists with Clerk ID: ${clerkUserId}`);
      }
    } catch (dbError) {
      console.error("Error creating user in the database:", dbError);
      return void res.status(500).json({
        success: false,
        message: "Error creating user in the database",
      });
    }
  }

  return void res.status(200).json({
    success: true,
    message: "Webhook received",
  });
};
