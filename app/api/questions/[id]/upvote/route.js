import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import PostUpvote from "@/models/PostUpvote";
import Question from "@/models/Question";

const JWT_SECRET = process.env.JWT_SECRET;

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

    const userId = payload.sub;
    const role = payload.role;

    // Create upvote document, enforce unique per user+post
    try {
      await PostUpvote.create({ user_id: userId, userModel: role === "patient" ? "Patient" : role === "doctor" ? "Doctor" : "Admin", post_id: id });
      // Optionally maintain a denormalized count on Question
      await Question.findByIdAndUpdate(id, { $inc: { likesCount: 1 } });
    } catch (err) {
      if (err.code === 11000) {
        return NextResponse.json({ message: "Already upvoted" }, { status: 409 });
      }
      throw err;
    }

    // Return current count
    const count = await PostUpvote.countDocuments({ post_id: id });
    return NextResponse.json({ message: "Upvoted", upvotes: count }, { status: 201 });
  } catch (error) {
    console.error("Upvote error", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const count = await PostUpvote.countDocuments({ post_id: id });
    return NextResponse.json({ upvotes: count });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
