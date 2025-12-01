"use client";
import Link from "next/link";
import { useLanguage } from "../lib/i18n/LanguageProvider";

export default function NotFound() {
  const { t, isRTL } = useLanguage();

  const title = isRTL ? "الصفحة غير موجودة" : "Page Not Found";
  const description = isRTL
    ? "عذرًا، لم نتمكن من العثور على الصفحة التي تبحث عنها."
    : "Sorry, we couldn’t find the page you’re looking for.";
  const backHome = isRTL ? "العودة للصفحه الرئيسية" : "Back to Home";
  const browseQuestions = isRTL ? "تصفح الأسئلة" : "Browse Questions";

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">404</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-blue-900">{title}</h1>
          <p className="text-blue-700 leading-relaxed mb-8">{description}</p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? "sm:flex-row-reverse" : ""}`}>
            <Link href="/" className="btn-primary px-6 py-3 rounded-lg font-semibold">
              {backHome}
            </Link>
            <Link href="/explore" className="btn-secondary px-6 py-3 rounded-lg font-semibold">
              {browseQuestions}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
