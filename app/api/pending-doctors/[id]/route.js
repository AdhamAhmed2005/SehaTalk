import { connectDB } from "@/lib/mongodb";
import PendingDoctor from "@/models/PendingDoctor";
import mongoose from "mongoose";

export async function GET(request, context) {
  await connectDB();
  // Next.js 14+ app directory: params may be a Promise
  let params = context?.params;
  if (typeof params?.then === 'function') {
    params = await params;
  }
  const { id } = params || {};
  let doctor = null;
  if (mongoose.Types.ObjectId.isValid(id)) {
    doctor = await PendingDoctor.findById(id).lean();
  }
  if (!doctor) {
    // Try string match for mock data
    doctor = await PendingDoctor.findOne({ _id: id }).lean();
  }
  if (!doctor) {
    return Response.json({ error: 'Doctor not found' }, { status: 404 });
  }
  return Response.json(doctor);
}
