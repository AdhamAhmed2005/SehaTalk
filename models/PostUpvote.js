import mongoose from "mongoose";

const PostUpvoteSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, refPath: "userModel", required: true },
    userModel: { type: String, enum: ["Patient", "Doctor", "Admin"], required: true },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

PostUpvoteSchema.index({ user_id: 1, post_id: 1 }, { unique: true });

export default mongoose.models.PostUpvote || mongoose.model("PostUpvote", PostUpvoteSchema);
