import mongoose from "mongoose";

const PostCommentSchema = new mongoose.Schema(
  {
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true, index: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    userModel: { type: String, required: true, enum: ["Doctor"], default: "Doctor" },
    content: { type: String, required: true, trim: true, maxlength: 2000 },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  }
);

// Optional index for faster lookups by post
PostCommentSchema.index({ post_id: 1, created_at: -1 });

export default mongoose.models.PostComment || mongoose.model("PostComment", PostCommentSchema);
