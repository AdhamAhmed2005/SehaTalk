import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const PostSchema = new Schema(
  {
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);
export default Post;
