import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";
import Admin from "@/models/Admin";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d";

export async function POST(request) {
  try {
    if (!JWT_SECRET) {
      return NextResponse.json(
        { message: "Server misconfiguration: missing JWT secret" },
        { status: 500 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { email, password, role } = body || {};

    if (!email || !password || !role) {
      return NextResponse.json(
        { message: "Email, password and role are required" },
        { status: 400 }
      );
    }

    if (!["doctor", "patient", "admin"].includes(role)) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    let Model;
    if (role === "doctor") Model = Doctor;
    else if (role === "patient") Model = Patient;
    else Model = Admin;

    const user = await Model.findOne({ email: normalizedEmail });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const tokenPayload = {
      sub: String(user._id),
      role,
      email: user.email,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        role,
        name: user.name,
        email: user.email,
      },
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
