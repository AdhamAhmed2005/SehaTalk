import AuthOptionsContent from './AuthOptionsContent';

export const metadata = {
  title: "Join SehaTalk – Patient or Doctor Registration",
  description: "Choose your role and join Egypt's most trusted medical Q&A platform. Register as a patient to get medical guidance or as a doctor to help patients.",
};

export default async function AuthOptions({ searchParams }) {
  const sp = await searchParams;
  const lang = sp?.lang === 'en' ? 'en' : 'ar';
  return <AuthOptionsContent lang={lang} />;
}