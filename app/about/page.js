import AboutContent from "../../components/pages/AboutContent.jsx";
export const metadata = {
  title: "About SehaTalk – منصة صحة توك",
  description:
    "Egyptian medical Q&A platform connecting patients with verified doctors.",
};

export default function About({ searchParams }) {
  // Use query param ?lang=en for optional English; default Arabic for SEO stability
  const lang = searchParams?.lang === "en" ? "en" : "ar";
  return <AboutContent lang={lang} />;
}
