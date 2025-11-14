import PatientSignupContent from './PatientSignupContent';
import { getLang } from '../../../lib/lang';

export const metadata = {
  title: "Patient Registration – SehaTalk",
  description: "Create your patient account on SehaTalk and join our trusted medical community.",
};

export default async function PatientSignup({ searchParams }) {
  const lang = await getLang(searchParams);
  return <PatientSignupContent lang={lang} />;
}