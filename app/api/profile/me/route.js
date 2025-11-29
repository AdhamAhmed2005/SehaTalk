import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";
import Admin from "@/models/Admin";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req) {
  try {
    if (!JWT_SECRET) {
      return NextResponse.json({ message: "Server misconfiguration: missing JWT secret" }, { status: 500 });
    }
    await connectDB();
    const token = req.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }
    const { sub: userId, role } = payload;
    let user;
    if (role === "doctor") user = await Doctor.findById(userId).lean();
    else if (role === "patient") user = await Patient.findById(userId).lean();
    else if (role === "admin") user = await Admin.findById(userId).lean();
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // Remove sensitive fields
    delete user.password;
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
