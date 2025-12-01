
import DoctorsContent from "@/components/pages/DoctorsContent";
import { headers } from "next/headers";

export const metadata = {
  title: "Find Doctors | SehaTalk",
  description: "Browse and connect with verified Egyptian doctors across various medical specialties.",
};

export default async function DoctorsPage() {
  // Fetch doctors from the database
  // Build absolute URL for SSR using incoming request headers (works on Vercel and locally)
  const h = headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") || (host?.includes("localhost") ? "http" : "https");
  const base = `${proto}://${host}`;
  const res = await fetch(`${base}/api/doctors`, { cache: "no-store" });
  const doctors = await res.json();
  // Get unique specialties from DB data
  const specialties = [
    "All",
    ...Array.from(new Set(doctors.map(doc => doc.specialty)))
  ];
  return <DoctorsContent doctors={doctors} specialties={specialties} />;
}
