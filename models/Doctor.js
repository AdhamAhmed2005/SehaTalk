import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const DoctorSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    specialty: { type: String, required: true, trim: true },
    bio: { type: String, default: "" },
    verified: { type: Boolean, default: false },
    avatarUrl: { type: String, default: "" },
    refreshTokenHash: { type: String },
  },
  { timestamps: true }
);

const Doctor = models.Doctor || model("Doctor", DoctorSchema);

export default Doctor;
