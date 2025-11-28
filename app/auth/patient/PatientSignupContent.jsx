'use client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PatientRegistrationForm } from './PatientRegistrationForm.jsx';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export default function PatientSignupContent() {
  const { t, isRTL } = useLanguage();
  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="hero-bg py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className={`flex items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link href="/auth" className={`flex items-center gap-2 text-blue-700 hover:text-primary transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
              <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              {t('auth.patientSignup.back')}
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">{t('auth.patientSignup.title')}</h1>
            <p className="text-xl text-blue-700 mb-8">{t('auth.patientSignup.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl -mt-8 pb-12 relative z-10">
        <PatientRegistrationForm />
      </div>
    </div>
  );
}
