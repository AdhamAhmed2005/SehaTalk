'use client';
import { Stethoscope, Users, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../components/ui/button.jsx';
import { Card, CardContent } from '../../components/ui/card.jsx';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export default function AuthOptionsContent() {
  const { t, isRTL, language: lang } = useLanguage();
  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="hero-bg pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className={`inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">{t('auth.options.badge')}</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-blue-900">
            {t('auth.options.joinTitleA')}<span className="section-header">{t('auth.options.joinTitleB')}</span>
          </h1>
          <p className="text-xl text-blue-700 leading-relaxed max-w-3xl mx-auto mb-8">{t('auth.options.subtitle')}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl -mt-8 pb-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="medical-card border-0 shadow-xl rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300">
            <CardContent className="p-0">
              <div className="bg-blue-50 p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-blue-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Users className="w-16 h-16 text-primary mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">{t('auth.options.patient.title')}</h2>
                <p className="text-blue-700">{t('auth.options.patient.subtitle')}</p>
              </div>
              <div className="p-8">
                <div className="space-y-4 mb-6">
                  {t('auth.options.patient.points').map((p, idx) => (
                    <div key={idx} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-blue-700">{p}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">{t('auth.options.patient.needTitle')}</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    {t('auth.options.patient.needs').map((n, idx) => (
                      <p key={idx}>• {n}</p>
                    ))}
                  </div>
                </div>
                <Link href="/auth/patient">
                  <Button className="btn-primary w-full py-3 font-semibold">{t('auth.options.patient.cta')}</Button>
                </Link>
                <p className="text-center text-sm text-blue-600 mt-4">
                  {t('auth.options.patient.haveAccount')} <Link href="/auth/login" className="text-primary hover:underline">{t('auth.options.patient.signIn')}</Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card border-0 shadow-xl rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300">
            <CardContent className="p-0">
              <div className="bg-green-50 p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-green-500 to-green-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Stethoscope className="w-16 h-16 text-green-600 mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">{t('auth.options.doctor.title')}</h2>
                <p className="text-blue-700">{t('auth.options.doctor.subtitle')}</p>
              </div>
              <div className="p-8">
                <div className="space-y-4 mb-6">
                  {t('auth.options.doctor.points').map((p, idx) => (
                    <div key={idx} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-blue-700">{p}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    {t('auth.options.doctor.verifyTitle')}
                  </h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    {t('auth.options.doctor.verifyList').map((v, idx) => (
                      <p key={idx}>• {v}</p>
                    ))}
                  </div>
                </div>
                <Link href="/auth/doctor">
                  <Button className="bg-green-600 hover:bg-green-700 w-full py-3 font-semibold text-white">{t('auth.options.doctor.cta')}</Button>
                </Link>
                <p className="text-center text-sm text-blue-600 mt-4">
                  {t('auth.options.doctor.alreadyVerified')} <Link href="/auth/login" className="text-primary hover:underline">{t('auth.options.doctor.signIn')}</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">{t('auth.options.why')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">{t('auth.options.verifiedDoctors')}</h3>
              <p className="text-blue-700">{t('auth.options.verifiedDesc')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">{t('auth.options.trustedCommunity')}</h3>
              <p className="text-blue-700">{t('auth.options.trustedDesc')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">{t('auth.options.expertGuidance')}</h3>
              <p className="text-blue-700">{t('auth.options.expertDesc')}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="medical-card border-0 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">{t('auth.options.ready')}</h3>
            <p className="text-blue-600 mb-6 max-w-2xl mx-auto">{t('auth.options.readyDesc')}</p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Link href="/explore">
                <Button variant="outline" className="btn-secondary px-8 py-3">{t('auth.options.browse')}</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="btn-secondary px-8 py-3">{t('auth.options.learn')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
