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
import PostComment from "../models/PostComment.js";
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
    name: "Psychiatry",
    slug: "psychiatry",
    description: "Mental and behavioral health, mood disorders, and pharmacotherapy",
    imageUrl: "/categories/psychiatry.jpg",
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
    name: "Physiotherapy",
    slug: "physiotherapy",
    description: "Physical rehabilitation, mobility improvement, and pain management",
    imageUrl: "/categories/physiotherapy.jpg",
  },
  {
    name: "Women's Health",
    slug: "womens-health",
    description: "Female reproductive health, pregnancy, and women's wellness",
    imageUrl: "/categories/womens-health.jpg",
  },
  {
    name: "Gastroenterology",
    slug: "gastroenterology",
    description: "Digestive system health, GI disorders, and nutritional guidance",
    imageUrl: "/categories/gastroenterology.jpg",
  },
  {
    name: "Neurology",
    slug: "neurology",
    description: "Neurological conditions, migraines, sleep disorders, and brain health",
    imageUrl: "/categories/neurology.jpg",
  },
  {
    name: "Ophthalmology",
    slug: "ophthalmology",
    description: "Eye health, vision problems, eye diseases, and eye care",
    imageUrl: "/categories/ophthalmology.jpg",
  },
  {
    name: "Urology",
    slug: "urology",
    description: "Urinary system health and reproductive health for males",
    imageUrl: "/categories/urology.jpg",
  },
  {
    name: "Dentistry",
    slug: "dentistry",
    description: "Oral health, dental care, and gum diseases",
    imageUrl: "/categories/dentistry.jpg",
  },
  {
    name: "Gynecology",
    slug: "gynecology",
    description: "Women's reproductive health, menstrual issues, and gynecological concerns",
    imageUrl: "/categories/gynecology.jpg",
  },
  {
    name: "Internal Medicine",
    slug: "internal-medicine",
    description: "Treatment of adult diseases, chronic conditions, and internal health issues",
    imageUrl: "/categories/internal-medicine.jpg",
  },
  {
    name: "ENT",
    slug: "ent",
    description: "Ear, nose, and throat health, hearing problems, and related conditions",
    imageUrl: "/categories/ent.jpg",
  },
  {
    name: "Endocrinology",
    slug: "endocrinology",
    description: "Hormonal disorders, diabetes management, and thyroid conditions",
    imageUrl: "/categories/endocrinology.jpg",
  },
  {
    name: "Pulmonology",
    slug: "pulmonology",
    description: "Respiratory health, lung diseases, asthma, and breathing problems",
    imageUrl: "/categories/pulmonology.jpg",
  },
  {
    name: "Rheumatology",
    slug: "rheumatology",
    description: "Autoimmune diseases, arthritis, and joint disorders",
    imageUrl: "/categories/rheumatology.jpg",
  },
  {
    name: "Nephrology",
    slug: "nephrology",
    description: "Kidney health, chronic kidney disease, and dialysis care",
    imageUrl: "/categories/nephrology.jpg",
  },
  {
    name: "Hematology",
    slug: "hematology",
    description: "Blood disorders, anemia, clotting disorders, and hematologic care",
    imageUrl: "/categories/hematology.jpg",
  },
  {
    name: "Infectious Disease",
    slug: "infectious-disease",
    description: "Infections, antibiotics, travel medicine, and vaccination guidance",
    imageUrl: "/categories/infectious-disease.jpg",
  },
  {
    name: "Radiology",
    slug: "radiology",
    description: "Medical imaging, scans interpretation, and radiologic procedures",
    imageUrl: "/categories/radiology.jpg",
  },
  {
    name: "Oncology",
    slug: "oncology",
    description: "Cancer care, tumor treatment, and cancer prevention strategies",
    imageUrl: "/categories/oncology.jpg",
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
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Dr. Fatima El-Sayed",
    email: "fatima.elsayed@sehatalk.com",
    password: "Doctor@123",
    specialty: "Pediatrics",
    bio: "Specialized in pediatric care with a focus on child development and vaccination.",
    verified: true,
    avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Dr. Mohamed Ali",
    email: "mohamed.ali@sehatalk.com",
    password: "Doctor@123",
    specialty: "Dermatology",
    bio: "Expert in treating skin conditions, acne, and cosmetic dermatology.",
    verified: true,
    avatarUrl: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    name: "Dr. Layla Karim",
    email: "layla.karim@sehatalk.com",
    password: "Doctor@123",
    specialty: "Neurology",
    bio: "Specialized neurologist with expertise in migraines, neurological disorders, and sleep medicine.",
    verified: true,
    avatarUrl: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    name: "Dr. Hassan Ibrahim",
    email: "hassan.ibrahim@sehatalk.com",
    password: "Doctor@123",
    specialty: "Gastroenterology",
    bio: "Expert gastroenterologist with 12 years of experience in digestive health management.",
    verified: true,
    avatarUrl: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    name: "Dr. Noor Al-Rashid",
    email: "noor.alrashid@sehatalk.com",
    password: "Doctor@123",
    specialty: "Gynecology",
    bio: "Board-certified gynecologist with specialization in women's health and obstetrics.",
    verified: true,
    avatarUrl: "https://randomuser.me/api/portraits/women/56.jpg",
  },
  {
    name: "Dr. Amira Saleh",
    email: "amira.saleh@sehatalk.com",
    password: "Doctor@123",
    specialty: "Endocrinology",
    bio: "Endocrinologist specializing in diabetes management, thyroid disorders, and hormonal balance.",
    verified: true,
    avatarUrl: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    name: "Dr. Karim Mansour",
    email: "karim.mansour@sehatalk.com",
    password: "Doctor@123",
    specialty: "Orthopedics",
    bio: "Orthopedic surgeon with expertise in joint replacement, sports injuries, and rehabilitation.",
    verified: true,
    avatarUrl: "https://randomuser.me/api/portraits/men/27.jpg",
  },
  {
    name: "Dr. Hana Omar",
    email: "hana.omar@sehatalk.com",
    password: "Doctor@123",
    specialty: "Ophthalmology",
    bio: "Ophthalmologist with expertise in refractive surgery, cataracts, and eye disease treatment.",
    verified: true,
    avatarUrl: "https://randomuser.me/api/portraits/women/47.jpg",
  },
  {
    name: "Dr. Youssef Ahmed",
    email: "youssef.ahmed@sehatalk.com",
    password: "Doctor@123",
    specialty: "Internal Medicine",
    bio: "Internal medicine specialist with comprehensive experience in chronic disease management.",
    verified: true,
    avatarUrl: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    name: "Dr. Salma Nabil",
    email: "salma.nabil@sehatalk.com",
    password: "Doctor@123",
    specialty: "Psychiatry",
    bio: "Psychiatrist focusing on mood and anxiety disorders, 11 years experience.",
    verified: true,
    avatarUrl: "https://randomuser.me/api/portraits/women/38.jpg",
  },
  {
    name: "Dr. Tarek Fouad",
    email: "tarek.fouad@sehatalk.com",
    password: "Doctor@123",
    specialty: "Nephrology",
    bio: "Nephrologist managing CKD, dialysis, and transplantation.",
    verified: true,
    avatarUrl: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    name: "Dr. Rania Lotfy",
    email: "rania.lotfy@sehatalk.com",
    password: "Doctor@123",
    specialty: "Infectious Disease",
    bio: "Specialist in infectious diseases, travel medicine and antibiotic stewardship.",
    verified: true,
    avatarUrl: "https://randomuser.me/api/portraits/women/18.jpg",
  },
  {
    name: "Dr. Mostafa Saad",
    email: "mostafa.saad@sehatalk.com",
    password: "Doctor@123",
    specialty: "Radiology",
    bio: "Radiologist with expertise in CT/MRI reporting and interventional procedures.",
    verified: true,
    avatarUrl: "https://randomuser.me/api/portraits/men/60.jpg",
  },
  {
    name: "Dr. Nada Farouk",
    email: "nada.farouk@sehatalk.com",
    password: "Doctor@123",
    specialty: "Dentistry",
    bio: "Dentist specializing in restorative dentistry and oral hygiene education.",
    verified: true,
    avatarUrl: "https://randomuser.me/api/portraits/women/6.jpg",
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
    avatarUrl: "https://randomuser.me/api/portraits/women/72.jpg",
  },
  {
    name: "Omar Khaled",
    email: "omar.khaled@example.com",
    password: "Patient@123",
    age: 35,
    gender: "male",
    medicalHistory: ["Hypertension"],
    avatarUrl: "https://randomuser.me/api/portraits/men/71.jpg",
  },
  {
    name: "Mona Hassan",
    email: "mona.hassan@example.com",
    password: "Patient@123",
    age: 32,
    gender: "female",
    medicalHistory: ["Thyroid disorder", "Migraines"],
    avatarUrl: "https://randomuser.me/api/portraits/women/17.jpg",
  },
  {
    name: "Ali Karim",
    email: "ali.karim@example.com",
    password: "Patient@123",
    age: 42,
    gender: "male",
    medicalHistory: ["Arthritis", "Diabetes"],
    avatarUrl: "https://randomuser.me/api/portraits/men/19.jpg",
  },
  {
    name: "Yasmin Said",
    email: "yasmin.said@example.com",
    password: "Patient@123",
    age: 26,
    gender: "female",
    medicalHistory: ["Eczema", "Food allergies"],
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
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
      {
        patient: createdPatients[2]._id,
        title: "Chronic migraines affecting my work",
        description:
          "I suffer from severe migraines 2-3 times a week. They significantly impact my productivity. What are the latest treatment options available?",
        category: createdCategories.find((c) => c.slug === "neurology")._id,
        urgencyLevel: "High Priority - Urgent Question",
        previousTreatments: "Ibuprofen, rest, but ineffective long-term",
        attachments: [],
        likesCount: 15,
        viewsCount: 350,
      },
      {
        patient: createdPatients[3]._id,
        title: "Joint pain and arthritis management",
        description:
          "Starting to experience joint stiffness and pain in my knees. Family history of arthritis. What preventive measures should I take?",
        category: createdCategories.find((c) => c.slug === "orthopedics")._id,
        urgencyLevel: "Medium Priority - Important Question",
        previousTreatments: "Physical therapy, anti-inflammatory medications",
        attachments: [],
        likesCount: 12,
        viewsCount: 280,
      },
      {
        patient: createdPatients[4]._id,
        title: "Severe eczema flare-ups",
        description:
          "My eczema has been getting worse recently. The itching is unbearable and affecting my sleep. Any recommendations for relief?",
        category: createdCategories.find((c) => c.slug === "dermatology")._id,
        urgencyLevel: "High Priority - Urgent Question",
        previousTreatments: "Moisturizing creams, topical steroids",
        attachments: [],
        likesCount: 18,
        viewsCount: 425,
      },
      {
        patient: createdPatients[0]._id,
        title: "Thyroid function and weight gain",
        description:
          "I've been gaining weight despite diet and exercise. Recently tested and found my thyroid is underactive. How should I manage this?",
        category: createdCategories.find((c) => c.slug === "endocrinology")._id,
        urgencyLevel: "Medium Priority - Important Question",
        previousTreatments: "Started on thyroid replacement therapy",
        attachments: [],
        likesCount: 10,
        viewsCount: 215,
      },
      {
        patient: createdPatients[1]._id,
        title: "Digestive issues and dietary changes",
        description:
          "Experiencing frequent bloating, indigestion, and discomfort after meals. What dietary adjustments might help?",
        category: createdCategories.find((c) => c.slug === "gastroenterology")._id,
        urgencyLevel: "Low Priority - General Question",
        previousTreatments: "Antacids, food diary tracking",
        attachments: [],
        likesCount: 7,
        viewsCount: 165,
      },
      {
        patient: createdPatients[2]._id,
        title: "Vision changes and eye strain",
        description:
          "I've been experiencing blurred vision and frequent headaches. I work long hours at a computer. Is this normal eye strain?",
        category: createdCategories.find((c) => c.slug === "ophthalmology")._id,
        urgencyLevel: "Medium Priority - Important Question",
        previousTreatments: "Increased screen breaks, blue light glasses",
        attachments: [],
        likesCount: 11,
        viewsCount: 298,
      },
      {
        patient: createdPatients[3]._id,
        title: "Managing diabetes effectively",
        description:
          "Type 2 diabetic for 5 years. Want to improve my blood sugar control naturally. What lifestyle changes are most effective?",
        category: createdCategories.find((c) => c.slug === "endocrinology")._id,
        urgencyLevel: "High Priority - Urgent Question",
        previousTreatments: "Metformin, controlled diet",
        attachments: [],
        likesCount: 22,
        viewsCount: 510,
      },
      {
        patient: createdPatients[4]._id,
        title: "Nutritional advice for better health",
        description:
          "Looking to improve my overall health through better nutrition. What should be my dietary priorities?",
        category: createdCategories.find((c) => c.slug === "nutrition")._id,
        urgencyLevel: "Low Priority - General Question",
        previousTreatments: "Basic calorie counting",
        attachments: [],
        likesCount: 9,
        viewsCount: 190,
      },
      {
        patient: createdPatients[0]._id,
        title: "Frequent headaches and migraines",
        description:
          "I get headaches at least 3-4 times a week. They are affecting my quality of life. What could be the underlying cause?",
        category: createdCategories.find((c) => c.slug === "neurology")._id,
        urgencyLevel: "High Priority - Urgent Question",
        previousTreatments: "Over-the-counter pain relievers, rest",
        attachments: [],
        likesCount: 14,
        viewsCount: 380,
      },
      {
        patient: createdPatients[1]._id,
        title: "Urology issues and concerns",
        description:
          "Experiencing frequent urination and discomfort. When should I be concerned and seek medical attention?",
        category: createdCategories.find((c) => c.slug === "urology")._id,
        urgencyLevel: "Medium Priority - Important Question",
        previousTreatments: "Self-monitoring",
        attachments: [],
        likesCount: 6,
        viewsCount: 142,
      },
      {
        patient: createdPatients[2]._id,
        title: "Women's health and hormonal balance",
        description:
          "My menstrual cycle has become irregular. Should I be concerned? What tests should I get done?",
        category: createdCategories.find((c) => c.slug === "gynecology")._id,
        urgencyLevel: "Medium Priority - Important Question",
        previousTreatments: "Tracking cycles, dietary changes",
        attachments: [],
        likesCount: 13,
        viewsCount: 267,
      },
      {
        patient: createdPatients[3]._id,
        title: "Respiratory health and asthma management",
        description:
          "My asthma symptoms have worsened recently. What are the best practices for managing respiratory health?",
        category: createdCategories.find((c) => c.slug === "pulmonology")._id,
        urgencyLevel: "High Priority - Urgent Question",
        previousTreatments: "Inhaler, allergy management",
        attachments: [],
        likesCount: 16,
        viewsCount: 445,
      },
      {
        patient: createdPatients[4]._id,
        title: "General health and wellness",
        description:
          "I want to maintain better overall health. What preventive measures should I take at my age?",
        category: createdCategories.find((c) => c.slug === "general-health")._id,
        urgencyLevel: "Low Priority - General Question",
        previousTreatments: "Regular exercise, balanced diet",
        attachments: [],
        likesCount: 8,
        viewsCount: 201,
      },
    ];

    const createdQuestions = await Question.insertMany(sampleQuestions);
    console.log(`✅ Created ${createdQuestions.length} questions`);

    // Seed Arabic Questions with multiple replies
    console.log("❓ Seeding Arabic questions and replies...");
    const arQuestions = [
      {
        patient: createdPatients[0]._id,
        title: "سعال مستمر بعد الإنفلونزا",
        description: "أصبت بالإنفلونزا قبل أسبوعين وما زال لدي سعال مستمر. هل هذا طبيعي؟",
        category: createdCategories.find((c) => c.slug === "pulmonology")._id,
        urgencyLevel: "Low Priority - General Question",
        previousTreatments: "Honey tea and rest",
        attachments: [],
        likesCount: 0,
        viewsCount: 0,
      },
      {
        patient: createdPatients[2]._id,
        title: "قلق بشأن عدم انتظام ضربات القلب",
        description: "أحيانًا أشعر بأن قلبي يتخطى النبضات. ماذا أفعل؟",
        category: createdCategories.find((c) => c.slug === "cardiology")._id,
        urgencyLevel: "Medium Priority - Important Question",
        previousTreatments: "None",
        attachments: [],
        likesCount: 0,
        viewsCount: 0,
      },
      {
        patient: createdPatients[4]._id,
        title: "حب الشباب يزداد سوءًا في الشتاء",
        description: "حب الشباب يزداد سوءًا في الشتاء. هل هناك نصائح لتقليل الالتهابات؟",
        category: createdCategories.find((c) => c.slug === "dermatology")._id,
        urgencyLevel: "Low Priority - General Question",
        previousTreatments: "OTC creams",
        attachments: [],
        likesCount: 0,
        viewsCount: 0,
      },
    ];

    const createdArQuestions = await Question.insertMany(arQuestions);
    console.log(`✅ Created ${createdArQuestions.length} Arabic questions`);

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
      {
        question: createdQuestions[2]._id,
        doctor: createdDoctors[3]._id,
        content:
          "Chronic migraines require a multi-faceted approach: 1) Preventive medications like propranolol or topiramate, 2) Botox injections for chronic cases, 3) Lifestyle changes (sleep, stress management, hydration), 4) Trigger identification and avoidance, 5) Biofeedback and relaxation techniques. I recommend keeping a migraine diary to identify patterns. Let's schedule an appointment to discuss preventive treatment options.",
        attachments: [],
        isEdited: false,
      },
      {
        question: createdQuestions[3]._id,
        doctor: createdDoctors[7]._id,
        content:
          "Joint pain prevention is crucial: 1) Maintain healthy weight to reduce joint stress, 2) Regular low-impact exercise (swimming, walking), 3) Strengthening exercises for muscles around joints, 4) Anti-inflammatory diet rich in omega-3s, 5) Proper posture and ergonomics, 6) Regular monitoring. Given your family history, early intervention is key. Consider physical therapy and discuss preventive treatment options with me.",
        attachments: [],
        isEdited: false,
      },
      {
        question: createdQuestions[4]._id,
        doctor: createdDoctors[2]._id,
        content:
          "For severe eczema flare-ups: 1) Moisturize immediately after bathing, 2) Use fragrance-free, hypoallergenic products, 3) Avoid harsh soaps and hot water, 4) Prescription topical treatments like tacrolimus, 5) Consider phototherapy for severe cases, 6) Identify and avoid triggers. The unbearable itching might require systemic treatment. Let's evaluate your current regimen and consider upgrading to a more effective treatment plan.",
        attachments: [],
        isEdited: false,
      },
      {
        question: createdQuestions[5]._id,
        doctor: createdDoctors[6]._id,
        content:
          "Hypothyroidism management: 1) Consistent thyroid medication timing (same time daily, on empty stomach), 2) Monitor TSH levels regularly (every 6-8 weeks), 3) Increase physical activity gradually, 4) Ensure adequate sleep, 5) Reduce caloric intake slightly while maintaining nutrition, 6) Support thyroid with selenium and zinc. Weight loss may take 2-3 months after hormone levels stabilize. Keep track of your energy levels and adjust dosage as needed.",
        attachments: [],
        isEdited: false,
      },
      {
        question: createdQuestions[6]._id,
        doctor: createdDoctors[4]._id,
        content:
          "Digestive issues often respond well to dietary adjustments: 1) Eat slowly and chew thoroughly, 2) Avoid large meals, eat 4-5 smaller meals daily, 3) Limit fatty foods, caffeine, and spicy foods, 4) Increase fiber gradually, 5) Stay hydrated, 6) Avoid eating 2-3 hours before bedtime. Keep your food diary detailed with symptoms timing. If issues persist beyond 2 weeks, we should perform further investigations to rule out underlying conditions.",
        attachments: [],
        isEdited: false,
      },
      {
        question: createdQuestions[7]._id,
        doctor: createdDoctors[8]._id,
        content:
          "Vision changes and headaches with computer work suggest digital eye strain: 1) Follow the 20-20-20 rule (every 20 minutes, look 20 feet away for 20 seconds), 2) Adjust monitor to eye level, 20-26 inches away, 3) Use anti-glare screen, 4) Increase lighting to reduce glare, 5) Blink frequently and use artificial tears, 6) Get a comprehensive eye exam. Blurred vision could indicate need for glasses prescription update. Let's schedule an eye exam to rule out other conditions.",
        attachments: [],
        isEdited: false,
      },
      {
        question: createdQuestions[8]._id,
        doctor: createdDoctors[6]._id,
        content:
          "Type 2 diabetes management naturally: 1) Consistent moderate exercise (150 mins/week), 2) High-fiber foods (beans, whole grains, vegetables), 3) Lean proteins at each meal, 4) Portion control, 5) Stress reduction and adequate sleep (7-9 hours), 6) Regular blood sugar monitoring. Weight loss of 5-10% can significantly improve insulin sensitivity. Your current medication compliance is important too. Let's review your diet plan and adjust if needed during your next visit.",
        attachments: [],
        isEdited: false,
      },
      {
        question: createdQuestions[9]._id,
        doctor: createdDoctors[5]._id,
        content:
          "Nutritional priorities for better health: 1) Eat rainbow of fruits and vegetables (7-9 servings/day), 2) Choose whole grains over refined, 3) Include lean proteins (chicken, fish, legumes), 4) Healthy fats (olive oil, nuts, avocado), 5) Limit processed foods and added sugars, 6) Stay hydrated with water. Start with small changes rather than drastic overhaul. A balanced diet provides energy, improves mood, and supports long-term health. I can refer you to our nutritionist for a personalized meal plan.",
        attachments: [],
        isEdited: false,
      },
      {
        question: createdQuestions[10]._id,
        doctor: createdDoctors[3]._id,
        content:
          "Frequent headaches can stem from various causes: 1) Tension/stress-related, 2) Migraines, 3) Medication overuse, 4) Sleep issues, 5) Caffeine withdrawal, 6) Dehydration. We need proper diagnosis: keep a headache log noting timing, triggers, severity, and duration. I recommend: proper hydration, stress management, regular sleep schedule, and avoiding triggers. If they persist, we may need imaging studies like MRI to rule out serious conditions.",
        attachments: [],
        isEdited: false,
      },
      {
        question: createdQuestions[11]._id,
        doctor: createdDoctors[9]._id,
        content:
          "Frequent urination can indicate: 1) UTI, 2) Diabetes, 3) Overactive bladder, 4) Prostate issues, 5) Excessive fluid intake. Don't ignore persistent discomfort or burning sensation. You should seek medical attention if: symptoms last more than a few days, accompanied by fever, or if you see blood. Perform urinalysis and urine culture to identify any infection. Avoid irritants like caffeine and alcohol. We'll determine the root cause after testing.",
        attachments: [],
        isEdited: false,
      },
      {
        question: createdQuestions[12]._id,
        doctor: createdDoctors[5]._id,
        content:
          "Irregular menstrual cycles can be caused by: 1) Hormonal imbalances, 2) PCOS, 3) Thyroid disorders, 4) Stress, 5) Excessive exercise, 6) Significant weight changes. Recommended tests: blood work (FSH, LH, TSH), pelvic ultrasound, and hormonal panel. Lifestyle factors to address: stress reduction, regular sleep, healthy weight, and moderate exercise. Keep a cycle calendar noting dates and symptoms. We'll develop a personalized treatment plan based on your test results.",
        attachments: [],
        isEdited: false,
      },
      {
        question: createdQuestions[13]._id,
        doctor: createdDoctors[9]._id,
        content:
          "Asthma management strategies: 1) Use controller medications daily (inhaled corticosteroids), 2) Keep rescue inhaler readily available, 3) Identify and avoid triggers (allergens, exercise, cold air), 4) Regular monitoring of peak flow, 5) Annual flu and pneumonia vaccines, 6) Maintain healthy weight. Recently worsened symptoms suggest need for: medication adjustment, trigger identification, or underlying infections. Let's review your treatment plan and possibly increase controller medication dosage.",
        attachments: [],
        isEdited: false,
      },
      {
        question: createdQuestions[14]._id,
        doctor: createdDoctors[0]._id,
        content:
          "General wellness preventive measures by age: 1) Regular exercise (150 min/week), 2) Balanced, nutrient-rich diet, 3) Adequate sleep (7-9 hours), 4) Stress management, 5) Regular health screenings appropriate for your age, 6) Avoid smoking and excess alcohol. At your age, focus on: annual blood pressure checks, cholesterol screening, age-appropriate cancer screenings. Maintaining healthy lifestyle now prevents many chronic diseases. Schedule regular check-ups and don't hesitate to address concerns early.",
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

    // Seed multiple doctor comments for Arabic questions using PostComment
    console.log("💬 Seeding Arabic replies (PostComment)...");
    for (const q of createdArQuestions) {
      const docs = [createdDoctors[0], createdDoctors[2], createdDoctors[3]]; // pick some doctors
      const comments = [
        {
          post_id: q._id,
          user_id: docs[0]._id,
          userModel: "Doctor",
          content: "ننصح بمراجعة الطبيب إذا استمر السعال أكثر من 3 أسابيع.",
        },
        {
          post_id: q._id,
          user_id: docs[1]._id,
          userModel: "Doctor",
          content: "يرجى تجنب المحفزات ومتابعة الأعراض، وقد تحتاج لفحوصات بسيطة للاطمئنان.",
        },
        {
          post_id: q._id,
          user_id: docs[2]._id,
          userModel: "Doctor",
          content: "اشرب سوائل دافئة، واستخدم مرطب للهواء داخل المنزل، والمتابعة إذا ساءت الحالة.",
        },
      ];
      await PostComment.insertMany(comments);
    }
    console.log("✅ Arabic replies seeded");

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
