export async function getLang(searchParams) {
  const sp = await searchParams;
  return sp?.lang === 'en' ? 'en' : 'ar';
}

export function isRTL(lang) {
  return lang === 'ar';
}
