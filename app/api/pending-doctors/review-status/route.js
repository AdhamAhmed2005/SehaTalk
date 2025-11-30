import { connectDB } from "@/lib/mongodb";
import PendingDoctor from "@/models/PendingDoctor";
import Doctor from "@/models/Doctor";
import mongoose from "mongoose";

export async function PATCH(request) {
  try {
    await connectDB();
    let body = null;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
    }
    const { id, status, rejectionReason } = body || {};
    if (!id || !status) {
      return new Response(JSON.stringify({ error: 'Missing id or status' }), { status: 400 });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: 'Invalid pending doctor id' }), { status: 400 });
    }
    const pendingDoctor = await PendingDoctor.findById(id);
    if (!pendingDoctor) {
      return new Response(JSON.stringify({ error: 'Pending doctor not found' }), { status: 404 });
    }
    if (status === 'Approved') {
      // Move to Doctor collection
      const doctorData = pendingDoctor.toObject();
      delete doctorData._id;
      delete doctorData.status;
      delete doctorData.rejectionReason;
      const newDoctor = new Doctor(doctorData);
      await newDoctor.save();
      await PendingDoctor.findByIdAndDelete(id);
      return new Response(JSON.stringify({ success: true, doctor: newDoctor }), { status: 200 });
    } else if (status === 'Rejected') {
      pendingDoctor.status = 'Rejected';
      pendingDoctor.rejectionReason = rejectionReason || '';
      await pendingDoctor.save();
      return new Response(JSON.stringify({ success: true, rejected: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Invalid status' }), { status: 400 });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), { status: 500 });
  }
}
