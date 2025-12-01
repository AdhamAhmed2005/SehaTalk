"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "../ui/card.jsx";
import { Badge } from "../ui/badge.jsx";
import { useLanguage } from '../../lib/i18n/LanguageProvider';
import {
  Stethoscope,
  Calendar,
  ShieldCheck,
  Lock,
  Globe,
  Users,
  BookOpen,
  HelpCircle,
} from 'lucide-react';

// Full redesigned AboutContent: consistent theme, improved spacing, RTL-aware
export default function AboutContent() {
  const { t, isRTL } = useLanguage();

  // Centralized copy (all translations now in translations_safe.js)
  const copy = {
    title: t('about.title'),
    subtitle: t('about.subtitle'),
    ctaPatient: t('cta.joinAsPatient'),
    ctaDoctor: t('cta.joinAsDoctor'),
  };

  const stats = [
    { id: 'doctors', value: '200+', label: t('stats.verifiedDoctors'), icon: Stethoscope },
    { id: 'answered', value: '5,000+', label: t('stats.questionsAnswered'), icon: HelpCircle },
    { id: 'users', value: '10,000+', label: t('stats.registeredUsers'), icon: Users },
    { id: 'specialties', value: '15+', label: t('stats.medicalSpecialties'), icon: Globe },
  ];

  const values = [
    { id: 'trust', title: t('values.trust.title'), desc: t('values.trust.description'), icon: ShieldCheck },
    { id: 'privacy', title: t('values.privacy.title'), desc: t('values.privacy.description'), icon: Lock },
    { id: 'access', title: t('values.accessibility.title'), desc: t('values.accessibility.description'), icon: Globe },
  ];

  const steps = [
    { id: 'ask', number: 1, title: t('howItWorks.step1.title'), desc: t('howItWorks.step1.description'), icon: HelpCircle },
    { id: 'connect', number: 2, title: t('howItWorks.step2.title'), desc: t('howItWorks.step2.description'), icon: Calendar },
    { id: 'track', number: 3, title: t('howItWorks.step3.title'), desc: t('howItWorks.step3.description'), icon: BookOpen },
  ];

  const rtlClass = isRTL ? 'rtl' : 'ltr';

  return (
    <div className={`min-h-screen bg-white text-slate-800 ${rtlClass}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* HERO */}
      <header className="relative overflow-hidden bg-linear-to-b from-primary/5 to-transparent">
        <div className="container mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - copy */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-primary">{copy.title}</h1>
              <p className="text-lg text-slate-700 max-w-2xl leading-relaxed">{copy.subtitle}</p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FeatureCard icon={Stethoscope} title={t('about.hero.feature1.title')} desc={t('about.hero.feature1.desc')} isRTL={isRTL} />
                <FeatureCard icon={Calendar} title={t('about.hero.feature2.title')} desc={t('about.hero.feature2.desc')} isRTL={isRTL} />
                <FeatureCard icon={ShieldCheck} title={t('about.hero.feature3.title')} desc={t('about.hero.feature3.desc')} isRTL={isRTL} />
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a href="/auth/patient" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow-md hover:shadow-lg transition">{copy.ctaPatient}</a>
                <a href="/auth/doctor" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary text-primary font-semibold bg-white/90 hover:bg-white transition">{copy.ctaDoctor}</a>
              </div>

              <p className="text-sm text-slate-500 mt-4">{t('about.trustLine')}</p>
            </div>

            {/* Right - visual/illustration */}
            <div className="order-first lg:order-last lg:block">
              <div className="w-full rounded-2xl bg-white shadow-inner border border-primary/5 p-6 flex items-center justify-center overflow-hidden">
                <Image
                  src="/flat-woman-online-counseling-with-psychologist/67Z_2201.w012.n001.28C.p6.28.jpg"
                  alt="Doctor and patient consultation"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Small stats strip (responsive) */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-3">
            {stats.map((s) => (
              <div key={s.id} className="flex items-center gap-3 p-4 rounded-lg bg-white border shadow-sm">
                <div className="p-2 rounded-md bg-primary/10">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-800">{s.value}</div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* MISSION & VALUES */}
      <section className="py-12">
        <div className="container mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-3">{t('about.mission.title')}</h2>
            <p className="text-slate-700 mb-4">{t('mission.lead')}</p>

            <div className="space-y-3">
              <Bullet title={t('mission.point1')} icon={Stethoscope} />
              <Bullet title={t('mission.point2')} icon={Calendar} />
              <Bullet title={t('mission.point3')} icon={ShieldCheck} />
            </div>

            <p className="mt-4 text-slate-700">{t('mission.closing')}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('about.values.title')}</h3>
            <div className="grid md:grid-cols-1 gap-4">
              {values.map((v) => (
                <Card key={v.id} className="border-2 border-blue-300 shadow-md hover:shadow-lg transition">
                  <CardContent className="flex gap-4 items-center p-4" style={{ backgroundColor: '#f0f9ff' }}>
                    <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                      <v.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{v.title}</div>
                      <div className="text-sm text-slate-600">{v.desc}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - cards with numbers */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-6 text-center">
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">{t('about.howItWorks.title')}</h3>
          <p className="text-slate-600 mb-8">{t('about.howItWorks.subtitle')}</p>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.id} className="p-6 bg-white rounded-lg shadow-sm border">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold">{s.number}</div>
                  <div className="text-left">
                    <div className="font-semibold text-slate-800">{s.title}</div>
                    <div className="text-sm text-slate-600 mt-2">{s.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="container mx-auto max-w-5xl px-6 text-center rounded-xl bg-linear-to-br from-primary/10 to-primary/5 p-8">
          <h3 className="text-2xl font-bold text-primary">{t('about.cta.title')}</h3>
          <p className="text-slate-700 mt-2 mb-6">{t('about.cta.description')}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/auth/patient" className="px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow-md">{copy.ctaPatient}</a>
            <a href="/auth/doctor" className="px-6 py-3 rounded-lg border border-primary text-primary font-semibold bg-white/90">{copy.ctaDoctor}</a>
          </div>

          <div className="text-sm text-slate-600 mt-4">{t('cta.trust')}</div>
        </div>
      </section>

      <footer className="py-6">
        <div className="container mx-auto max-w-6xl px-6 text-center text-sm text-slate-500">{t('footer')}</div>
      </footer>
    </div>
  );
}


function FeatureCard({ icon: Icon, title, desc, isRTL }) {
  return (
    <div style={{ backgroundColor: '#f0f9ff' }} className={`flex gap-3 p-4 rounded-lg shadow-md border-2 border-blue-300 hover:shadow-lg transition-shadow`}> 
      <div style={{ backgroundColor: '#dbeafe' }} className="p-3 rounded-lg flex items-center justify-center shrink-0 h-fit">
        <Icon style={{ color: '#2563eb' }} className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm text-slate-800 mb-1 ">{title}</div>
        <div className="text-xs text-slate-600 leading-snug ">{desc}</div>
      </div>
    </div>
  );
}

function Bullet({ title, icon: Icon }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-primary"><Icon className="w-5 h-5" /></div>
      <div className="text-slate-700 text-sm">{title}</div>
    </div>
  );
}
