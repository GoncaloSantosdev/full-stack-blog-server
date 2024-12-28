import mongoose from "mongoose";

const earningSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    amount: { type: Number, required: true },
    calculatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Earning = mongoose.model("Earning", earningSchema);
export default Earning;
