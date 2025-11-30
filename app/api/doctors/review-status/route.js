import { connectDB } from "@/lib/mongodb";
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
      return new Response(JSON.stringify({ error: 'Invalid doctor id' }), { status: 400 });
    }
    const update = { verified: status === 'Approved' };
    if (status === 'Rejected') {
      update.rejectionReason = rejectionReason || '';
    }
    const doctor = await Doctor.findByIdAndUpdate(id, update, { new: true });
    if (!doctor) {
      return new Response(JSON.stringify({ error: 'Doctor not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, doctor }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), { status: 500 });
  }
}
