import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const QuestionSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    urgencyLevel: {
      type: String,
      enum: [
        "Low Priority - General Question",
        "Medium Priority - Important Question",
        "High Priority - Urgent Question",
      ],
      default: "Low Priority - General Question",
    },
    previousTreatments: {
      type: String,
      default: "",
    },
    attachments: [
      {
        type: String,
      },
    ],
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
    likesCount: {
      type: Number,
      default: 0,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

QuestionSchema.virtual("repliesCount").get(function () {
  return this.replies.length;
});

const Question = models.Question || model("Question", QuestionSchema);

export default Question;
