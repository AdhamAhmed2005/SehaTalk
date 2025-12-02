import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import PostComment from "@/models/PostComment";
import Doctor from "@/models/Doctor";
import Question from "@/models/Question";

const JWT_SECRET = process.env.JWT_SECRET;

// GET replies for a question (visible to all)
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const question = await Question.findById(id).lean();
    if (!question) return NextResponse.json({ message: "Question not found" }, { status: 404 });
    let replies = await PostComment.find({ post_id: id })
      .sort({ created_at: -1 })
      .populate({ path: "user_id", model: "Doctor", select: "name specialty verified avatarUrl" })
      .lean();
    if (!replies || replies.length === 0) {
      // Fallback to legacy answers embedded on Question
      const legacy = await Question.findById(id)
        .populate({ path: "replies", populate: { path: "doctor", select: "name specialty verified avatarUrl" } })
        .lean();
      replies = (legacy?.replies || []).map((a) => ({
        _id: a._id,
        post_id: id,
        user_id: a.doctor,
        content: a.content,
        created_at: a.createdAt || a.updatedAt || new Date(),
      }));
    }
    return NextResponse.json({ data: replies || [] });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// POST a reply (only doctors)
export async function POST(request, { params }) {
  try {
    if (!JWT_SECRET) {
      return NextResponse.json({ message: "Server misconfiguration: missing JWT secret" }, { status: 500 });
    }
    await connectDB();
    const { id } = await params;
    const token = request.cookies.get("auth_token")?.value;
    if (!token) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    if (payload.role !== "doctor") {
      return NextResponse.json({ message: "Only doctors can comment" }, { status: 403 });
    }

    const doctor = await Doctor.findById(payload.sub);
    if (!doctor) return NextResponse.json({ message: "Doctor not found" }, { status: 404 });

    const body = await request.json();
    const content = String(body?.content || "").trim();
    if (!content) return NextResponse.json({ message: "Content is required" }, { status: 400 });

    const comment = await PostComment.create({ post_id: id, user_id: doctor._id, userModel: "Doctor", content });
    const populated = await PostComment.findById(comment._id)
      .populate({ path: "user_id", model: "Doctor", select: "name specialty verified avatarUrl" })
      .lean();
    return NextResponse.json({ message: "Reply added", data: populated }, { status: 201 });
  } catch (error) {
    console.error("Reply error", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
