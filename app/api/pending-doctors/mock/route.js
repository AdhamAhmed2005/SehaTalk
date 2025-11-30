import PendingDoctor from "@/models/PendingDoctor";

export async function GET() {
  // Mockup data for development/demo
  const mockDoctors = [
    {
      _id: "656f1a1a1a1a1a1a1a1a1a1a",
      name: "Dr. Ahmed Yassin",
      email: "ahmed.yassin@example.com",
      password: "hashedpassword",
      specialty: "Internal Medicine",
      bio: "Experienced physician in internal medicine.",
      avatarUrl: "",
      documents: [
        { type: "ID Card", status: "Approved", previewUrl: "/path/to/doc1.jpg" },
        { type: "License", status: "Pending", previewUrl: "/path/to/doc2.jpg" }
      ],
      submittedAt: new Date("2023-01-30"),
      rejectionReason: "",
      status: "Pending"
    },
    {
      _id: "656f1a1a1a1a1a1a1a1a1a1b",
      name: "Dr. Sara Ali",
      email: "sara.ali@example.com",
      password: "hashedpassword",
      specialty: "Pediatrics",
      bio: "Pediatrician with 10 years of experience.",
      avatarUrl: "",
      documents: [
        { type: "ID Card", status: "Pending", previewUrl: "/path/to/doc3.jpg" },
        { type: "License", status: "Pending", previewUrl: "/path/to/doc4.jpg" }
      ],
      submittedAt: new Date("2023-02-15"),
      rejectionReason: "",
      status: "Pending"
    }
  ];

  // If DB is empty, insert mock data (dev only)
  const count = await PendingDoctor.countDocuments();
  if (count === 0) {
    await PendingDoctor.insertMany(mockDoctors);
  }

  const pendingDoctors = await PendingDoctor.find({ status: "Pending" }).lean();
  return Response.json(pendingDoctors);
}
