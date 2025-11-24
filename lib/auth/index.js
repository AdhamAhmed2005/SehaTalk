import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const JWT_EXPIRES_IN = "7d";

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function signRefreshToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
}

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function requireAuth(request) {
  const authHeader =
    request.headers.get("authorization") ||
    request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Missing or invalid Authorization header" };
  }
  const token = authHeader.slice(7);
  const decoded = verifyToken(token);
  if (!decoded) return { error: "Invalid or expired token" };
  return { user: decoded };
}

export async function rotateRefreshToken(userId, role) {
  const refreshToken = signRefreshToken({ id: userId, role });
  const hash = await hashPassword(refreshToken);
  if (role === "doctor") {
    await Doctor.findByIdAndUpdate(userId, { refreshTokenHash: hash });
  } else {
    await Patient.findByIdAndUpdate(userId, { refreshTokenHash: hash });
  }
  return refreshToken;
}

export async function verifyRefreshToken(token) {
  const decoded = verifyToken(token);
  if (!decoded) return null;
  const { id, role } = decoded;
  const Model = role === "doctor" ? Doctor : Patient;
  const user = await Model.findById(id).select("refreshTokenHash");
  if (!user || !user.refreshTokenHash) return null;
  const match = await comparePassword(token, user.refreshTokenHash);
  if (!match) return null;
  return decoded;
}
