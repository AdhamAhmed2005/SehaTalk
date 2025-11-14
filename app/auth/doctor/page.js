import DoctorSignupContent from './DoctorSignupContent';
import { getLang } from '../../../lib/lang';

export const metadata = {
  title: "Doctor Registration – SehaTalk",
  description: "Join SehaTalk as a verified medical professional and help patients with expert healthcare guidance.",
};

export default async function DoctorSignup({ searchParams }) {
  const lang = await getLang(searchParams);
  return <DoctorSignupContent lang={lang} />;
}