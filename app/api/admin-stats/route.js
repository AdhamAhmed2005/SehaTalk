import { connectDB } from "@/lib/mongodb";
import PendingDoctor from "@/models/PendingDoctor";
import Doctor from "@/models/Doctor";

export async function GET() {
  await connectDB();

  // Pending Requests
  const pendingCount = await PendingDoctor.countDocuments({ status: "Pending" });

  // New submissions this week
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const newThisWeek = await PendingDoctor.countDocuments({ submittedAt: { $gte: weekAgo } });

  // Total Approved (Doctors collection)
  const approvedCount = await Doctor.countDocuments();

  // Rejected Last Month
  const now = new Date();
  const firstOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const rejectedLastMonth = await PendingDoctor.countDocuments({
    status: "Rejected",
    updatedAt: { $gte: firstOfLastMonth, $lt: firstOfThisMonth },
  });

  // Total Rejected
  const totalRejected = await PendingDoctor.countDocuments({ status: "Rejected" });

  return Response.json({
    pendingCount,
    newThisWeek,
    approvedCount,
    rejectedLastMonth,
    totalRejected,
  });
}
