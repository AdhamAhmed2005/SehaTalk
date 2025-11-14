import CategoriesContent from '../../components/pages/CategoriesContent.jsx';

export const metadata = {
  title: 'Categories – التصنيفات الطبية – SehaTalk',
  description: 'Browse medical specialties and categories (تصفح التخصصات الطبية والتصنيفات) on SehaTalk.',
};

export default async function Categories({ searchParams }) {
  // In Next.js, searchParams is a Promise in server components
  const sp = await searchParams;
  const lang = sp?.lang === 'en' ? 'en' : 'ar';
  return <CategoriesContent lang={lang} />;
}