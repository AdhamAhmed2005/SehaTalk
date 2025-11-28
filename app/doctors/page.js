import DoctorsContent from "@/components/pages/DoctorsContent";
import { doctorsData, getSpecialties } from "@/lib/data/doctors";

export const metadata = {
  title: "Find Doctors | SehaTalk",
  description: "Browse and connect with verified Egyptian doctors across various medical specialties.",
};

export default async function DoctorsPage() {
  // Server-side data preparation
  const doctors = doctorsData;
  const specialties = getSpecialties();

  return <DoctorsContent doctors={doctors} specialties={specialties} />;
}
