import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const AnswerSchema = new Schema(
  {
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Answer = models.Answer || model("Answer", AnswerSchema);
export default Answer;
