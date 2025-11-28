"use client";

import { Card, CardContent } from "../ui/card.jsx";
import { Badge } from "../ui/badge.jsx";
import { useLanguage } from '../../lib/i18n/LanguageProvider';

export default function AboutContent({ lang = 'ar' }) {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="hero-bg pt-20 pb-24 px-4">
        <div className="container mx-auto max-w-4xl text-center mt-15">
          <h1 className={`text-5xl font-bold mb-6 text-blue-1000${isRTL ? 'tracking-tight' : ''}`}> 
            {t('about.title')}
          </h1>
          <p className="text-xl text-blue-700 leading-relaxed max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-blue-1000">{t('about.mission.title')}</h2>
              <p className="text-lg text-blue-700 leading-relaxed mb-6">
                {t('about.mission.paragraph1')}
              </p>
              <p className="text-lg text-blue-700 leading-relaxed">
                {t('about.mission.paragraph2')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="medical-card border-0 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">200+</div>
                  <div className="text-blue-700">{t('about.stats.verifiedDoctors')}</div>
                </CardContent>
              </Card>
              <Card className="medical-card border-0 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
                  <div className="text-blue-700">{t('about.stats.questionsAnswered')}</div>
                </CardContent>
              </Card>
              <Card className="medical-card border-0 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                  <div className="text-blue-700">{t('about.stats.registeredUsers')}</div>
                </CardContent>
              </Card>
              <Card className="medical-card border-0 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <div className="text-blue-700">{t('about.stats.medicalSpecialties')}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-blue-900">{t('about.values.title')}</h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto">{t('about.values.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="medical-card border-0 text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">{t('about.values.trust.title')}</h3>
                <p className="text-blue-700 leading-relaxed">{t('about.values.trust.description')}</p>
              </CardContent>
            </Card>
            <Card className="medical-card border-0 text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">{t('about.values.privacy.title')}</h3>
                <p className="text-blue-700 leading-relaxed">{t('about.values.privacy.description')}</p>
              </CardContent>
            </Card>
            <Card className="medical-card border-0 text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">{t('about.values.accessibility.title')}</h3>
                <p className="text-blue-700 leading-relaxed">{t('about.values.accessibility.description')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-blue-900">{t('about.howItWorks.title')}</h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto">{t('about.howItWorks.subtitle')}</p>
          </div>
          <div className="space-y-12">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className={`lg:w-1/2 ${isRTL ? 'text-right' : ''}`}> 
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">{t('about.howItWorks.patients.badge')}</Badge>
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">{t('about.howItWorks.patients.title')}</h3>
                <p className="text-lg text-blue-700 leading-relaxed">{t('about.howItWorks.patients.description')}</p>
              </div>
              <div className="lg:w-1/2">
                <div className="medical-card p-8 border-0">
                  <div className="text-center">
                    <div className="text-6xl mb-4">❓</div>
                    <p className="text-blue-700">{t('about.howItWorks.patients.label')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className={`lg:w-1/2 ${isRTL ? 'text-right' : ''}`}> 
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">{t('about.howItWorks.doctors.badge')}</Badge>
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">{t('about.howItWorks.doctors.title')}</h3>
                <p className="text-lg text-blue-700 leading-relaxed">{t('about.howItWorks.doctors.description')}</p>
              </div>
              <div className="lg:w-1/2">
                <div className="medical-card p-8 border-0">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👨‍⚕️</div>
                    <p className="text-blue-700">{t('about.howItWorks.doctors.label')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className={`lg:w-1/2 ${isRTL ? 'text-right' : ''}`}> 
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">{t('about.howItWorks.everyone.badge')}</Badge>
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">{t('about.howItWorks.everyone.title')}</h3>
                <p className="text-lg text-blue-700 leading-relaxed">{t('about.howItWorks.everyone.description')}</p>
              </div>
              <div className="lg:w-1/2">
                <div className="medical-card p-8 border-0">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📚</div>
                    <p className="text-blue-700">{t('about.howItWorks.everyone.label')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-linear-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6 text-white">{t('about.cta.title')}</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">{t('about.cta.description')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/auth/patient" className="bg-white text-primary hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg">
              {t('about.cta.joinAsPatient')}
            </a>
            <a href="/auth/doctor" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:transform hover:scale-105">
              {t('about.cta.joinAsDoctor')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
