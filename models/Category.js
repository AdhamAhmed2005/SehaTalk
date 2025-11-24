import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const Category = models.Category || model("Category", CategorySchema);
export default Category;
