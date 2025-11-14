import DoctorSignupContent from './DoctorSignupContent';

export const metadata = {
  title: "Doctor Registration – SehaTalk",
  description: "Join SehaTalk as a verified medical professional and help patients with expert healthcare guidance.",
};

export default async function DoctorSignup({ searchParams }) {
  const sp = await searchParams;
  const lang = sp?.lang === 'en' ? 'en' : 'ar';
  return <DoctorSignupContent lang={lang} />;
}