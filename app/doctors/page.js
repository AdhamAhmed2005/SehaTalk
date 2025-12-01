
import DoctorsContent from "@/components/pages/DoctorsContent";

export const metadata = {
  title: "Find Doctors | SehaTalk",
  description: "Browse and connect with verified Egyptian doctors across various medical specialties.",
};

export default async function DoctorsPage() {
  // Fetch doctors from the database
  // Build absolute URL using env vars (works on Vercel and locally)
  const base = process.env.NEXT_PUBLIC_SITE_URL
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const res = await fetch(`${base}/api/doctors`, { cache: "no-store" });
  const doctors = await res.json();
  // Get unique specialties from DB data
  const specialties = [
    "All",
    ...Array.from(new Set(doctors.map(doc => doc.specialty)))
  ];
  return <DoctorsContent doctors={doctors} specialties={specialties} />;
}
