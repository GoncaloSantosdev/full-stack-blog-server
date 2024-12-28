import mongoose from "mongoose";

const profanitySchema = new mongoose.Schema({
  bannedWords: [String],
});

const Profanity = mongoose.model("Profanity", profanitySchema);
export default Profanity;
