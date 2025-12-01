import { connectDB } from "@/lib/mongodb";
import Doctor from "@/models/Doctor";
import mongoose from "mongoose";

export async function GET(request, context) {
  await connectDB();
  let params = context?.params;
  if (typeof params?.then === 'function') {
    params = await params;
  }
  const { id } = params || {};
  let doctor = null;
  if (mongoose.Types.ObjectId.isValid(id)) {
    doctor = await Doctor.findById(id).lean();
  }
  if (!doctor) {
    doctor = await Doctor.findOne({ _id: id }).lean();
  }
  if (!doctor) {
    return Response.json({ error: 'Doctor not found' }, { status: 404 });
  }
  return Response.json(doctor);
}
