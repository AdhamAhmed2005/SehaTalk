import CategoriesContent from '../../components/pages/CategoriesContent.jsx';
import { getLang } from '../../lib/lang.js';

export const metadata = {
  title: 'Categories – التصنيفات الطبية – SehaTalk',
  description: 'Browse medical specialties and categories (تصفح التخصصات الطبية والتصنيفات) on SehaTalk.',
};

export default async function Categories({ searchParams }) {
  const sp = await searchParams;
  const lang = getLang(sp);
  return <CategoriesContent lang={lang} />;
}