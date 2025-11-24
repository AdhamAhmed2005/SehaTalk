"use client";
import { Card, CardContent } from "../ui/card.jsx";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

const getCategories = (lang) => [
  {
    name: lang === "en" ? "General Health" : "الصحة العامة",
    description:
      lang === "en"
        ? "Common health questions, wellness advice, and preventive care guidance"
        : "أسئلة الصحة العامة، نصائح العافية، وإرشادات الرعاية الوقائية",
    icon: "🏥",
    count: 1250,
    trending: true,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    name: lang === "en" ? "Cardiology" : "أمراض القلب",
    description:
      lang === "en"
        ? "Heart health, cardiovascular conditions, and blood pressure management"
        : "صحة القلب، أمراض القلب والأوعية الدموية، وإدارة ضغط الدم",
    icon: "❤️",
    count: 420,
    trending: false,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
  },
  {
    name: lang === "en" ? "Dermatology" : "الأمراض الجلدية",
    description:
      lang === "en"
        ? "Skin conditions, hair problems, nail health, and cosmetic concerns"
        : "أمراض الجلد، مشاكل الشعر، صحة الأظافر، والمشاكل التجميلية",
    icon: "🧴",
    count: 380,
    trending: true,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    name: lang === "en" ? "Pediatrics" : "طب الأطفال",
    description:
      lang === "en"
        ? "Children's health, growth development, and parenting health concerns"
        : "صحة الأطفال، التطور والنمو، والمشاكل الصحية للوالدين",
    icon: "👶",
    count: 560,
    trending: false,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
  },
  {
    name: lang === "en" ? "Psychology" : "الصحة النفسية",
    description:
      lang === "en"
        ? "Mental health support, anxiety management, and emotional wellness"
        : "الدعم النفسي، إدارة القلق، والعافية العاطفية",
    icon: "🧠",
    count: 340,
    trending: true,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    name: lang === "en" ? "Nutrition" : "التغذية",
    description:
      lang === "en"
        ? "Dietary advice, meal planning, weight management, and healthy eating"
        : "النصائح الغذائية، تخطيط الوجبات، إدارة الوزن، والأكل الصحي",
    icon: "🥗",
    count: 290,
    trending: false,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    name: lang === "en" ? "Orthopedics" : "جراحة العظام",
    description:
      lang === "en"
        ? "Bone health, joint pain, muscle injuries, and mobility concerns"
        : "صحة العظام، آلام المفاصل، إصابات العضلات، ومشاكل الحركة",
    icon: "🦴",
    count: 310,
    trending: false,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    name: lang === "en" ? "Women's Health" : "صحة المرأة",
    description:
      lang === "en"
        ? "Female reproductive health, pregnancy, and women's wellness"
        : "الصحة الإنجابية للمرأة، الحمل، وعافية النساء",
    icon: "👩‍⚕️",
    count: 270,
    trending: true,
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-50",
  },
];

const getContent = (lang) => ({
  badge: lang === "en" ? "Medical Specialties" : "التخصصات الطبية",
  title: lang === "en" ? "Health Categories" : "التصنيفات الصحية",
  subtitle:
    lang === "en"
      ? "Explore health questions organized by medical specialties. Find expert answers from verified Egyptian doctors in your area of interest."
      : "استكشف الأسئلة الصحية المنظمة حسب التخصصات الطبية. احصل على إجابات الخبراء من أطباء مصريين معتمدين في مجال اهتمامك.",
  stats: {
    specialties: lang === "en" ? "Specialties" : "التخصصات",
    totalQuestions: lang === "en" ? "Total Questions" : "إجمالي الأسئلة",
    expertDoctors: lang === "en" ? "Expert Doctors" : "الأطباء الخبراء",
  },
  trending: lang === "en" ? "Trending Categories" : "التصنيفات الشائعة",
  allSpecialties:
    lang === "en" ? "All Medical Specialties" : "جميع التخصصات الطبية",
  questionsLabel: lang === "en" ? "questions" : "سؤال",
  explore: lang === "en" ? "Explore →" : "استكشف ←",
  trending_badge: lang === "en" ? "Trending" : "شائع",
  cta: {
    title:
      lang === "en" ? "Can't Find Your Category?" : "لا تجد التصنيف المناسب؟",
    description:
      lang === "en"
        ? "Our medical experts cover a wide range of specialties. Ask your question and get connected with the right doctor."
        : "خبراؤنا الطبيون يغطون مجموعة واسعة من التخصصات. اسأل سؤالك واتصل بالطبيب المناسب.",
    askQuestion: lang === "en" ? "Ask a Question" : "اسأل سؤالاً",
    browseQuestions:
      lang === "en" ? "Browse All Questions" : "تصفح جميع الأسئلة",
  },
});

export default function CategoriesContent({ lang }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get("/categories");
        const data = res.data?.data || [];
        if (mounted) setCategories(data);
      } catch (e) {
        // Fallback to static sample if API empty or error
        if (mounted) setCategories(getCategories(lang));
      }
    })();
    return () => {
      mounted = false;
    };
  }, [lang]);
  const content = getContent(lang);
  const isRTL = lang === "ar";

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="hero-bg pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div
            className={`inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-6 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">
              {content.badge}
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-blue-900">
            {lang === "en" ? (
              <>
                Health <span className="section-header">Categories</span>
              </>
            ) : (
              <>
                <span className="section-header">التصنيفات</span> الصحية
              </>
            )}
          </h1>
          <p className="text-xl text-blue-700 leading-relaxed max-w-3xl mx-auto mb-8">
            {content.subtitle}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">8</div>
              <div className="text-sm text-blue-600">
                {content.stats.specialties}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">3,820</div>
              <div className="text-sm text-blue-600">
                {content.stats.totalQuestions}
              </div>
            </div>
            <div className="text-center md:col-span-1 col-span-2">
              <div className="text-2xl font-bold text-primary">150+</div>
              <div className="text-sm text-blue-600">
                {content.stats.expertDoctors}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl -mt-8 pb-12 relative z-10">
        {/* Featured Categories */}
        <div className="mb-12">
          <div className="medical-card border-0 shadow-xl rounded-2xl overflow-hidden">
            <div className="bg-linear-to-r from-primary/5 to-primary/10 px-6 py-4 border-b border-primary/10">
              <h3
                className={`text-lg font-semibold text-blue-900 flex items-center gap-2 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                {content.trending}
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories
                  .filter((cat) => cat.trending)
                  .map((category) => (
                    <div
                      key={category.name}
                      className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <div className="text-sm font-medium text-blue-900">
                        {category.name}
                      </div>
                      <div className="text-xs text-blue-600">
                        {category.count.toLocaleString(
                          lang === "ar" ? "ar-EG" : "en-US"
                        )}{" "}
                        {content.questionsLabel}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* All Categories Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            {content.allSpecialties}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="medical-card hover:shadow-xl transition-all duration-300 border-0 cursor-pointer group hover:scale-105 rounded-2xl overflow-hidden"
            >
              <CardContent className="p-0">
                <div
                  className={`${category.bgColor} p-6 text-center relative overflow-hidden`}
                >
                  {category.trending && (
                    <div
                      className={`absolute ${
                        isRTL ? "top-2 left-2" : "top-2 right-2"
                      } bg-primary text-white text-xs px-2 py-1 rounded-full font-medium`}
                    >
                      {content.trending_badge}
                    </div>
                  )}
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-900 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-blue-700 mb-4 leading-relaxed text-sm">
                    {category.description}
                  </p>
                  <div
                    className={`flex items-center justify-between ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className="text-sm text-blue-600 font-medium">
                      {category.count.toLocaleString(
                        lang === "ar" ? "ar-EG" : "en-US"
                      )}{" "}
                      {content.questionsLabel}
                    </div>
                    <div
                      className={`text-primary text-sm font-medium transition-transform duration-300 ${
                        isRTL
                          ? "group-hover:-translate-x-1"
                          : "group-hover:translate-x-1"
                      }`}
                    >
                      {content.explore}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="medical-card border-0 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">
              {content.cta.title}
            </h3>
            <p className="text-blue-600 mb-6 max-w-2xl mx-auto">
              {content.cta.description}
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center ${
                isRTL ? "sm:flex-row-reverse" : ""
              }`}
            >
              <button className="btn-primary px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:transform hover:scale-105">
                {content.cta.askQuestion}
              </button>
              <button className="btn-secondary px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:transform hover:scale-105">
                {content.cta.browseQuestions}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
