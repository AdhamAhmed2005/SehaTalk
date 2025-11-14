"use client";

import { MessageCircle, Shield, Users, Clock, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button.jsx';
import { Card, CardContent } from '../ui/card.jsx';
import { ImageWithFallback } from '../figma/ImageWithFallback.jsx';
import { useLanguage } from '../../lib/i18n/LanguageProvider';

export function LandingPage() {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="hero-bg pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
             
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-blue-900">
                {t('landing.hero.title')}
                <span className="section-header block">{t('landing.hero.titleHighlight')}</span>
                {t('landing.hero.subtitle')}
              </h1>
              <p className="text-lg text-blue-700 leading-relaxed max-w-lg">
                {t('landing.hero.description')}
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <Button size="default" className="btn-primary shadow-md" asChild>
                  <Link href="/auth/patient" className={`inline-flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {t('landing.hero.getStarted')}
                    <ChevronRight className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                  </Link>
                </Button>
                <Button size="default" variant="outline" className="btn-secondary" asChild>
                  <Link href="/explore">{t('landing.hero.browseQuestions')}</Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-primary/10">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-primary">{t('landing.stats.questionsAnswered')}</div>
                  <div className="text-xs text-blue-600">{t('landing.stats.questionsLabel')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-primary">{t('landing.stats.verifiedDoctors')}</div>
                  <div className="text-xs text-blue-600">{t('landing.stats.doctorsLabel')}</div>
                </div>
              </div>
            </div>
            <div className="relative lg:pl-8">
              <div className="medical-card rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjA3ODExNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Healthcare Technology"
                  className="w-half h-[450px] object-cover"
                />
              </div>
              {/* Trust indicators */}
              
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-blue-900">
              {t('landing.features.title')}
              <span className="section-header block">SehaTalk</span>
            </h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
              {t('landing.features.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="medical-card hover:shadow-xl transition-all duration-300 border-0">
              <CardContent className={`p-8 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">{t('landing.features.verified.title')}</h3>
                <p className="text-blue-700 leading-relaxed">
                  {t('landing.features.verified.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card hover:shadow-xl transition-all duration-300 border-0">
              <CardContent className={`p-8 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">{t('landing.features.knowledge.title')}</h3>
                <p className="text-blue-700 leading-relaxed">
                  {t('landing.features.knowledge.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card hover:shadow-xl transition-all duration-300 border-0">
              <CardContent className={`p-8 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">{t('landing.features.support.title')}</h3>
                <p className="text-blue-700 leading-relaxed">
                  {t('landing.features.support.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card hover:shadow-xl transition-all duration-300 border-0">
              <CardContent className={`p-8 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">{t('landing.features.community.title')}</h3>
                <p className="text-blue-700 leading-relaxed">
                  {t('landing.features.community.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className="text-4xl font-bold mb-6 text-blue-900">{t('landing.howItWorks.title')}</h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
              {t('landing.howItWorks.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className={`text-center group ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="w-20 h-20 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-105 transition-transform duration-300">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-900">{t('landing.howItWorks.step1.title')}</h3>
              <p className="text-blue-700 leading-relaxed text-lg">
                {t('landing.howItWorks.step1.description')}
              </p>
            </div>

            <div className={`text-center group ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="w-20 h-20 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-105 transition-transform duration-300">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-900">{t('landing.howItWorks.step2.title')}</h3>
              <p className="text-blue-700 leading-relaxed text-lg">
                {t('landing.howItWorks.step2.description')}
              </p>
            </div>

            <div className={`text-center group ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="w-20 h-20 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-105 transition-transform duration-300">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-900">{t('landing.howItWorks.step3.title')}</h3>
              <p className="text-blue-700 leading-relaxed text-lg">
                {t('landing.howItWorks.step3.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className="text-4xl font-bold mb-6 text-blue-900">{t('landing.testimonials.title')}</h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
              {t('landing.testimonials.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="medical-card hover:shadow-xl transition-all duration-300 border-0">
              <CardContent className={`p-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-1 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-blue-700 leading-relaxed mb-6 text-lg">
                  "{t('landing.testimonials.patient1.text')}"
                </p>
                <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">{t('landing.testimonials.patient1.initials')}</span>
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <div className="font-semibold text-blue-900">{t('landing.testimonials.patient1.name')}</div>
                    <div className="text-blue-600">{t('landing.testimonials.patient1.role')}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="medical-card hover:shadow-xl transition-all duration-300 border-0">
              <CardContent className={`p-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-1 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-blue-700 leading-relaxed mb-6 text-lg">
                  "{t('landing.testimonials.doctor1.text')}"
                </p>
                <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">{t('landing.testimonials.doctor1.initials')}</span>
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <div className="font-semibold text-blue-900">{t('landing.testimonials.doctor1.name')}</div>
                    <div className="text-blue-600">{t('landing.testimonials.doctor1.role')}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="medical-card hover:shadow-xl transition-all duration-300 border-0">
              <CardContent className={`p-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-1 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-blue-700 leading-relaxed mb-6 text-lg">
                  "{t('landing.testimonials.patient2.text')}"
                </p>
                <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">{t('landing.testimonials.patient2.initials')}</span>
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <div className="font-semibold text-blue-900">{t('landing.testimonials.patient2.name')}</div>
                    <div className="text-blue-600">{t('landing.testimonials.patient2.role')}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-linear-to-br from-primary to-primary/80">
        <div className={`container mx-auto px-4 text-center max-w-4xl ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">{t('landing.cta.title')}</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-primary-foreground/90 leading-relaxed">
            {t('landing.cta.description')}
          </p>
          <div className={`flex flex-col sm:flex-row gap-6 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-50 shadow-lg px-8 py-4 text-lg" asChild>
              <Link href="/auth/patient">{t('landing.cta.joinAsPatient')}</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-primary hover:bg-white hover:text-primary backdrop-blur-sm px-8 py-4 text-lg" asChild>
              <Link href="/auth/doctor">{t('landing.cta.joinAsDoctor')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
