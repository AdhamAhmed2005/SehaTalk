import Doctor from "@/models/Doctor";
import { hashPassword } from "@/lib/auth";

export async function listDoctors() {
  const docs = await Doctor.find().lean();
  return docs;
}

export async function createDoctor(data) {
  if (data.password) {
    data.password = await hashPassword(data.password);
  }
  const doc = await Doctor.create(data);
  return doc;
}

export async function getDoctor(id) {
  const doc = await Doctor.findById(id).lean();
  return doc;
}

export async function updateDoctor(id, data) {
  const doc = await Doctor.findByIdAndUpdate(id, data, { new: true }).lean();
  return doc;
}

export async function deleteDoctor(id) {
  const doc = await Doctor.findByIdAndDelete(id).lean();
  return doc;
}
