import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { config } from "dotenv";

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, "../.env.local") });

// Import models
import Category from "../models/Category.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";
import Admin from "../models/Admin.js";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env.local file");
}

// Seed data
const categories = [
  {
    name: "General Health",
    slug: "general-health",
    description: "Common health questions, wellness advice, and preventive care guidance",
    imageUrl: "/categories/general-health.jpg",
  },
  {
    name: "Cardiology",
    slug: "cardiology",
    description: "Heart health, cardiovascular conditions, and blood pressure management",
    imageUrl: "/categories/cardiology.jpg",
  },
  {
    name: "Dermatology",
    slug: "dermatology",
    description: "Skin conditions, hair problems, nail health, and cosmetic concerns",
    imageUrl: "/categories/dermatology.jpg",
  },
  {
    name: "Pediatrics",
    slug: "pediatrics",
    description: "Children's health, growth development, and parenting health concerns",
    imageUrl: "/categories/pediatrics.jpg",
  },
  {
    name: "Psychology",
    slug: "psychology",
    description: "Mental health support, anxiety management, and emotional wellness",
    imageUrl: "/categories/psychology.jpg",
  },
  {
    name: "Nutrition",
    slug: "nutrition",
    description: "Dietary advice, meal planning, weight management, and healthy eating",
    imageUrl: "/categories/nutrition.jpg",
  },
  {
    name: "Orthopedics",
    slug: "orthopedics",
    description: "Bone health, joint pain, muscle injuries, and mobility concerns",
    imageUrl: "/categories/orthopedics.jpg",
  },
  {
    name: "Women's Health",
    slug: "womens-health",
    description: "Female reproductive health, pregnancy, and women's wellness",
    imageUrl: "/categories/womens-health.jpg",
  },
];

const doctors = [
  {
    name: "Dr. Ahmed Hassan",
    email: "ahmed.hassan@sehatalk.com",
    password: "Doctor@123",
    specialty: "Cardiology",
    bio: "Board-certified cardiologist with 15 years of experience in treating heart conditions.",
    verified: true,
    avatarUrl: "/avatars/doctor1.jpg",
  },
  {
    name: "Dr. Fatima El-Sayed",
    email: "fatima.elsayed@sehatalk.com",
    password: "Doctor@123",
    specialty: "Pediatrics",
    bio: "Specialized in pediatric care with a focus on child development and vaccination.",
    verified: true,
    avatarUrl: "/avatars/doctor2.jpg",
  },
  {
    name: "Dr. Mohamed Ali",
    email: "mohamed.ali@sehatalk.com",
    password: "Doctor@123",
    specialty: "Dermatology",
    bio: "Expert in treating skin conditions, acne, and cosmetic dermatology.",
    verified: true,
    avatarUrl: "/avatars/doctor3.jpg",
  },
];

const patients = [
  {
    name: "Sarah Ahmed",
    email: "sarah.ahmed@example.com",
    password: "Patient@123",
    age: 28,
    gender: "female",
    medicalHistory: ["Asthma", "Seasonal allergies"],
    avatarUrl: "/avatars/patient1.jpg",
  },
  {
    name: "Omar Khaled",
    email: "omar.khaled@example.com",
    password: "Patient@123",
    age: 35,
    gender: "male",
    medicalHistory: ["Hypertension"],
    avatarUrl: "/avatars/patient2.jpg",
  },
];

const admins = [
  {
    name: "Admin User",
    email: "admin@sehatalk.com",
    password: "Admin@123",
    avatarUrl: "/avatars/admin.jpg",
  },
];

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seed...");

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await Category.deleteMany({});
    await Doctor.deleteMany({});
    await Patient.deleteMany({});
    await Question.deleteMany({});
    await Answer.deleteMany({});
    await Admin.deleteMany({});
    console.log("✅ Existing data cleared");

    // Seed Categories
    console.log("📁 Seeding categories...");
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${createdCategories.length} categories`);

    // Seed Doctors with hashed passwords
    console.log("👨‍⚕️ Seeding doctors...");
    const doctorsWithHashedPasswords = await Promise.all(
      doctors.map(async (doctor) => ({
        ...doctor,
        password: await bcrypt.hash(doctor.password, 10),
      }))
    );
    const createdDoctors = await Doctor.insertMany(doctorsWithHashedPasswords);
    console.log(`✅ Created ${createdDoctors.length} doctors`);

    // Seed Patients with hashed passwords
    console.log("🧑 Seeding patients...");
    const patientsWithHashedPasswords = await Promise.all(
      patients.map(async (patient) => ({
        ...patient,
        password: await bcrypt.hash(patient.password, 10),
      }))
    );
    const createdPatients = await Patient.insertMany(patientsWithHashedPasswords);
    console.log(`✅ Created ${createdPatients.length} patients`);

    // Seed Admins with hashed passwords
    console.log("👤 Seeding admins...");
    const adminsWithHashedPasswords = await Promise.all(
      admins.map(async (admin) => ({
        ...admin,
        password: await bcrypt.hash(admin.password, 10),
      }))
    );
    const createdAdmins = await Admin.insertMany(adminsWithHashedPasswords);
    console.log(`✅ Created ${createdAdmins.length} admins`);

    // Seed Sample Questions
    console.log("❓ Seeding questions...");
    const sampleQuestions = [
      {
        patient: createdPatients[0]._id,
        title: "How to manage seasonal allergies?",
        description:
          "I've been experiencing sneezing and runny nose every spring. What are the best ways to manage these symptoms?",
        category: createdCategories.find((c) => c.slug === "general-health")._id,
        urgencyLevel: "Low Priority - General Question",
        previousTreatments: "Tried over-the-counter antihistamines",
        attachments: [],
        likesCount: 5,
        viewsCount: 120,
      },
      {
        patient: createdPatients[1]._id,
        title: "Blood pressure management tips",
        description:
          "Recently diagnosed with hypertension. Looking for lifestyle changes and diet recommendations.",
        category: createdCategories.find((c) => c.slug === "cardiology")._id,
        urgencyLevel: "Medium Priority - Important Question",
        previousTreatments: "Currently on medication",
        attachments: [],
        likesCount: 8,
        viewsCount: 200,
      },
    ];

    const createdQuestions = await Question.insertMany(sampleQuestions);
    console.log(`✅ Created ${createdQuestions.length} questions`);

    // Seed Sample Answers
    console.log("💬 Seeding answers...");
    const sampleAnswers = [
      {
        question: createdQuestions[0]._id,
        doctor: createdDoctors[0]._id,
        content:
          "Seasonal allergies can be managed through several approaches: 1) Avoid allergen exposure when possible, 2) Use antihistamines as needed, 3) Consider nasal sprays, 4) Keep windows closed during high pollen days. If symptoms persist, consult with an allergist for long-term solutions.",
        attachments: [],
        isEdited: false,
      },
      {
        question: createdQuestions[1]._id,
        doctor: createdDoctors[0]._id,
        content:
          "For managing hypertension: 1) Reduce sodium intake (less than 2,300mg/day), 2) Regular exercise (30 minutes most days), 3) Maintain healthy weight, 4) Limit alcohol, 5) Reduce stress, 6) Monitor your BP regularly. Continue your medication and follow up with your doctor regularly.",
        attachments: [],
        isEdited: false,
      },
    ];

    const createdAnswers = await Answer.insertMany(sampleAnswers);
    console.log(`✅ Created ${createdAnswers.length} answers`);

    // Update questions with answer references
    await Question.findByIdAndUpdate(createdQuestions[0]._id, {
      $push: { replies: createdAnswers[0]._id },
    });
    await Question.findByIdAndUpdate(createdQuestions[1]._id, {
      $push: { replies: createdAnswers[1]._id },
    });

    console.log("\n🎉 Database seeded successfully!");
    console.log("\n📊 Summary:");
    console.log(`   Categories: ${createdCategories.length}`);
    console.log(`   Doctors: ${createdDoctors.length}`);
    console.log(`   Patients: ${createdPatients.length}`);
    console.log(`   Admins: ${createdAdmins.length}`);
    console.log(`   Questions: ${createdQuestions.length}`);
    console.log(`   Answers: ${createdAnswers.length}`);
    console.log("\n🔐 Test Credentials:");
    console.log("   Admin: admin@sehatalk.com / Admin@123");
    console.log("   Doctor: ahmed.hassan@sehatalk.com / Doctor@123");
    console.log("   Patient: sarah.ahmed@example.com / Patient@123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
