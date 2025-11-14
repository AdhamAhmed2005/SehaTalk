import PatientSignupContent from './PatientSignupContent';

export const metadata = {
  title: "Patient Registration – SehaTalk",
  description: "Create your patient account on SehaTalk and join our trusted medical community.",
};

export default async function PatientSignup({ searchParams }) {
  const sp = await searchParams;
  const lang = sp?.lang === 'en' ? 'en' : 'ar';
  return <PatientSignupContent lang={lang} />;
}