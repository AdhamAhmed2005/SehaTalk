import Patient from "@/models/Patient";
import { hashPassword } from "@/lib/auth";

export async function listPatients() {
  const docs = await Patient.find().lean();
  return docs;
}

export async function createPatient(data) {
  if (data.password) {
    data.password = await hashPassword(data.password);
  }
  const doc = await Patient.create(data);
  return doc;
}

export async function getPatient(id) {
  const doc = await Patient.findById(id).lean();
  return doc;
}

export async function updatePatient(id, data) {
  const doc = await Patient.findByIdAndUpdate(id, data, { new: true }).lean();
  return doc;
}

export async function deletePatient(id) {
  const doc = await Patient.findByIdAndDelete(id).lean();
  return doc;
}
