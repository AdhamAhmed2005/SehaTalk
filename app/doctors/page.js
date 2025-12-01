
import DoctorsContent from "@/components/pages/DoctorsContent";

export const metadata = {
  title: "Find Doctors | SehaTalk",
  description: "Browse and connect with verified Egyptian doctors across various medical specialties.",
};

export default async function DoctorsPage() {
  // Fetch doctors from the database
  // Use a relative URL so it works on Vercel and locally
  const res = await fetch(`/api/doctors`, { cache: "no-store" });
  const doctors = await res.json();
  // Get unique specialties from DB data
  const specialties = [
    "All",
    ...Array.from(new Set(doctors.map(doc => doc.specialty)))
  ];
  return <DoctorsContent doctors={doctors} specialties={specialties} />;
}
