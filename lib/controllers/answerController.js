import Answer from "@/models/Answer";

export async function listAnswers() {
  return await Answer.find().populate("doctor question").lean();
}

export async function createAnswer(data) {
  return await Answer.create(data);
}

export async function getAnswer(id) {
  return await Answer.findById(id).populate("doctor question").lean();
}

export async function updateAnswer(id, data) {
  return await Answer.findByIdAndUpdate(id, data, { new: true })
    .populate("doctor question")
    .lean();
}

export async function deleteAnswer(id) {
  return await Answer.findByIdAndDelete(id).lean();
}
