'use client';
import { Card, CardContent } from "../ui/card.jsx";
import { useLanguage } from '../../lib/i18n/LanguageProvider';

const getCategoriesData = (t) => [
  {
    key: 'generalHealth',
    name: t('categories.data.generalHealth.name'),
    description: t('categories.data.generalHealth.description'),
    icon: "🏥",
    count: 1250,
    trending: true,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    key: 'cardiology',
    name: t('categories.data.cardiology.name'),
    description: t('categories.data.cardiology.description'),
    icon: "❤️",
    count: 420,
    trending: false,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
  },
  {
    key: 'dermatology',
    name: t('categories.data.dermatology.name'),
    description: t('categories.data.dermatology.description'),
    icon: "🧴",
    count: 380,
    trending: true,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    key: 'pediatrics',
    name: t('categories.data.pediatrics.name'),
    description: t('categories.data.pediatrics.description'),
    icon: "👶",
    count: 560,
    trending: false,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
  },
  {
    key: 'psychology',
    name: t('categories.data.psychology.name'),
    description: t('categories.data.psychology.description'),
    icon: "🧠",
    count: 340,
    trending: true,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    key: 'nutrition',
    name: t('categories.data.nutrition.name'),
    description: t('categories.data.nutrition.description'),
    icon: "🥗",
    count: 290,
    trending: false,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    key: 'orthopedics',
    name: t('categories.data.orthopedics.name'),
    description: t('categories.data.orthopedics.description'),
    icon: "🦴",
    count: 310,
    trending: false,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    key: 'womensHealth',
    name: t('categories.data.womensHealth.name'),
    description: t('categories.data.womensHealth.description'),
    icon: "👩‍⚕️",
    count: 270,
    trending: true,
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-50",
  },
];

export default function CategoriesContent({ lang }) {
  const { t, isRTL, currentLanguage } = useLanguage();
  const categories = getCategoriesData(t);

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="hero-bg pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className={`inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">{t('categories.page.badge')}</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-blue-900">
            {isRTL ? (
              <><span className="section-header">{t('categories.page.title').split(' ')[0]}</span> {t('categories.page.title').split(' ')[1]}</>
            ) : (
              <>{t('categories.page.title').split(' ')[0]} <span className="section-header">{t('categories.page.title').split(' ')[1]}</span></>
            )}
          </h1>
          <p className="text-xl text-blue-700 leading-relaxed max-w-3xl mx-auto mb-8">
            {t('categories.page.subtitle')}
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">8</div>
              <div className="text-sm text-blue-600">{t('categories.page.stats.specialties')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">3,820</div>
              <div className="text-sm text-blue-600">{t('categories.page.stats.totalQuestions')}</div>
            </div>
            <div className="text-center md:col-span-1 col-span-2">
              <div className="text-2xl font-bold text-primary">150+</div>
              <div className="text-sm text-blue-600">{t('categories.page.stats.expertDoctors')}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl -mt-8 pb-12 relative z-10">
        {/* Featured Categories */}
        <div className="mb-12">
          <div className="medical-card border-0 shadow-xl rounded-2xl overflow-hidden">
            <div className="bg-linear-to-r from-primary/5 to-primary/10 px-6 py-4 border-b border-primary/10">
              <h3 className={`text-lg font-semibold text-blue-900 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                {t('categories.page.trending')}
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.filter(cat => cat.trending).map((category) => (
                  <div key={category.key} className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="text-sm font-medium text-blue-900">{category.name}</div>
                    <div className="text-xs text-blue-600">{category.count.toLocaleString(isRTL ? 'ar-EG' : 'en-US')} {t('categories.page.questionsLabel')}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* All Categories Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">{t('categories.page.allSpecialties')}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.key} className="medical-card hover:shadow-xl transition-all duration-300 border-0 cursor-pointer group hover:scale-105 rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className={`${category.bgColor} p-6 text-center relative overflow-hidden`}>
                  {category.trending && (
                    <div className={`absolute ${isRTL ? 'top-2 left-2' : 'top-2 right-2'} bg-primary text-white text-xs px-2 py-1 rounded-full font-medium`}>
                      {t('categories.page.trendingBadge')}
                    </div>
                  )}
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <div className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-900 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-blue-700 mb-4 leading-relaxed text-sm">
                    {category.description}
                  </p>
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="text-sm text-blue-600 font-medium">
                      {category.count.toLocaleString(isRTL ? 'ar-EG' : 'en-US')} {t('categories.page.questionsLabel')}
                    </div>
                    <div className={`text-primary text-sm font-medium transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                      {t('categories.page.explore')}
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
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">{t('categories.page.cta.title')}</h3>
            <p className="text-blue-600 mb-6 max-w-2xl mx-auto">
              {t('categories.page.cta.description')}
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <button className="btn-primary px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:transform hover:scale-105">
                {t('categories.page.cta.askQuestion')}
              </button>
              <button className="btn-secondary px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:transform hover:scale-105">
                {t('categories.page.cta.browseQuestions')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}