import LoginContent from './LoginContent';

export const metadata = {
  title: 'Sign In - SehaTalk | Access Your Medical Account',
  description: 'Sign in to your SehaTalk account. Access personalized healthcare advice, track your medical history, and connect with verified doctors.',
  keywords: 'sign in, login, medical account, healthcare platform, doctor consultation, patient portal',
};

export default async function SignInPage({ searchParams }) {
  const sp = await searchParams;
  const lang = sp?.lang === 'en' ? 'en' : 'ar';
  return <LoginContent lang={lang} />;
}