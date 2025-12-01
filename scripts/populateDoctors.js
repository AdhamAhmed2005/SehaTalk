import mongoose from "mongoose";
import Doctor from "../models/Doctor.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const doctors = [
  {
    name: "Fahd Al-Harbi",
    email: "fahd.harbi@example.com",
    password: "hashedpassword1",
    specialty: "Cardiologist",
    bio: "Experienced cardiologist with 8 years in clinical practice. Specialized in heart failure and interventional cardiology.",
    verified: true,
    avatarUrl: "",
    location: "Cairo, Egypt"
  },
  {
    name: "Mazen Saeed",
    email: "mazen.saeed@example.com",
    password: "hashedpassword2",
    specialty: "Orthopedist",
    bio: "Orthopedic surgeon with a focus on sports injuries and joint replacement. 5 years of experience.",
    verified: true,
    avatarUrl: "",
    location: "Alexandria, Egypt"
  },
  {
    name: "Hind Al-Ketbi",
    email: "hind.ketbi@example.com",
    password: "hashedpassword3",
    specialty: "Psychologist",
    bio: "Clinical psychologist helping patients with anxiety and depression. 6 years of experience.",
    verified: true,
    avatarUrl: "",
    location: "Giza, Egypt"
  },
  {
    name: "Naglaa Sharaf",
    email: "naglaa.sharaf@example.com",
    password: "hashedpassword4",
    specialty: "Pediatrician",
    bio: "Pediatrician with a passion for child health and preventive care. 10 years of experience.",
    verified: true,
    avatarUrl: "",
    location: "Mansoura, Egypt"
  },
  {
    name: "Ali Tawfik",
    email: "ali.tawfik@example.com",
    password: "hashedpassword5",
    specialty: "Neurologist",
    bio: "Neurologist specializing in epilepsy and neurodegenerative diseases. 9 years of experience.",
    verified: true,
    avatarUrl: "",
    location: "Tanta, Egypt"
  }
];

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Doctor.deleteMany({});
  await Doctor.insertMany(doctors);
  console.log("Test doctors inserted.");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
