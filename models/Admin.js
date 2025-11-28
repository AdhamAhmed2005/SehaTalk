import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Admin = models.Admin || model("Admin", AdminSchema);

export default Admin;
