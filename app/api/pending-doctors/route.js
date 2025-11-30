import { connectDB } from "@/lib/mongodb";
import PendingDoctor from "@/models/PendingDoctor";

export async function GET() {
  await connectDB();
  const pendingDoctors = await PendingDoctor.find({ status: "Pending" }).lean();
  return Response.json(pendingDoctors);
}
