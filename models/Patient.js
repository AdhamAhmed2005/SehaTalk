import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const PatientSchema = new Schema(
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
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    medicalHistory: {
      type: [String],
      default: [],
    },
    avatarUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Patient = models.Patient || model("Patient", PatientSchema);

export default Patient;
