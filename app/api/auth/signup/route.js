import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";
import Admin from "@/models/Admin";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { role, password, confirmPassword, ...rest } = body || {};

    if (!role || !["doctor", "patient", "admin"].includes(role)) {
      return NextResponse.json(
        { message: "Invalid or missing role" },
        { status: 400 }
      );
    }

    if (!password || !confirmPassword) {
      return NextResponse.json(
        { message: "Password and confirmPassword are required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    const email = (rest.email || "").toLowerCase().trim();
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    let Model;
    if (role === "doctor") Model = Doctor;
    else if (role === "patient") Model = Patient;
    else Model = Admin;

    const existing = await Model.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let docData = { ...rest, email, password: hashedPassword };

    if (role === "doctor") {
      const name = `${rest.firstName || ""} ${rest.lastName || ""}`.trim();
      if (name) docData.name = name;
      if (!docData.specialty) {
        docData.specialty = "General Practice";
      }
    }

    if (role === "patient") {
      const name = `${rest.firstName || ""} ${rest.lastName || ""}`.trim();
      if (name) docData.name = name;
      if (rest.dateOfBirth) {
        const year = new Date(rest.dateOfBirth).getFullYear();
        const currentYear = new Date().getFullYear();
        const age = currentYear - year;
        if (!Number.isNaN(age) && age > 0 && age < 120) {
          docData.age = age;
        }
      }
      const history = [];
      [
        rest.chronicConditions,
        rest.previousSurgeries,
        rest.familyMedicalHistory,
        rest.allergies,
      ]
        .filter(Boolean)
        .forEach((item) => {
          if (typeof item === "string") {
            history.push(item);
          }
        });
      if (history.length) {
        docData.medicalHistory = history;
      }
    }

    if (role === "admin") {
      if (rest.name) docData.name = rest.name;
    }

    const user = await Model.create(docData);

    const safeUser = {
      id: user._id,
      role,
      name: user.name,
      email: user.email,
    };

    return NextResponse.json(
      { message: "Signup successful", user: safeUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
