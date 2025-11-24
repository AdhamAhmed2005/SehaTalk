import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const QuestionSchema = new Schema(
  {
    patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    status: {
      type: String,
      enum: ["open", "answered", "closed"],
      default: "open",
    },
  },
  { timestamps: true }
);

const Question = models.Question || model("Question", QuestionSchema);
export default Question;
