import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const PendingDoctorSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    specialty: { type: String, required: true, trim: true },
    bio: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    documents: [{
      type: { type: String, required: true },
      status: { type: String, default: "Pending" },
      previewUrl: { type: String, default: "" }
    }],
    submittedAt: { type: Date, default: Date.now },
    rejectionReason: { type: String, default: "" },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }
  },
  { timestamps: true }
);

const PendingDoctor = models.PendingDoctor || model("PendingDoctor", PendingDoctorSchema);

export default PendingDoctor;
