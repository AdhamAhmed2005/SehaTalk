import AuthOptionsContent from './AuthOptionsContent';
import { getLang } from '../../lib/lang';

export const metadata = {
  title: "Join SehaTalk – Patient or Doctor Registration",
  description: "Choose your role and join Egypt's most trusted medical Q&A platform. Register as a patient to get medical guidance or as a doctor to help patients.",
};

export default async function AuthOptions({ searchParams }) {
  const lang = await getLang(searchParams);
  return <AuthOptionsContent lang={lang} />;
}