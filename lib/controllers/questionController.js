import Question from "@/models/Question";
import Answer from "@/models/Answer";

export async function listQuestions() {
  return await Question.find().populate("patient doctor category").lean();
}

export async function createQuestion(data) {
  return await Question.create(data);
}

export async function getQuestion(id) {
  return await Question.findById(id).populate("patient doctor category").lean();
}

export async function updateQuestion(id, data) {
  return await Question.findByIdAndUpdate(id, data, { new: true })
    .populate("patient doctor category")
    .lean();
}

export async function deleteQuestion(id) {
  return await Question.findByIdAndDelete(id).lean();
}

export async function listAnswersForQuestion(questionId) {
  return await Answer.find({ question: questionId }).populate("doctor").lean();
}
