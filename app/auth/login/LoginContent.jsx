'use client';
import Link from 'next/link';
import { Stethoscope, ArrowLeft } from 'lucide-react';
import { SignInForm } from './SignInForm.jsx';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export default function LoginContent() {
  const { t, isRTL, language: lang } = useLanguage();
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link href="/" className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} hover:opacity-80 transition-opacity`}>
              <Stethoscope className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-blue-900">SehaTalk</span>
            </Link>
            <Link href="/" className={`flex items-center gap-2 text-blue-600 hover:text-primary transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
              <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              {t('auth.login.backHome')}
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Stethoscope className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">{t('auth.login.welcome')}</h1>
            <p className="text-blue-600">{t('auth.login.subtitle')}</p>
          </div>

          <SignInForm />

          <div className="mt-8 text-center">
            <p className="text-blue-600 mb-4">
              {t('auth.login.noAccount')}{' '}
              <Link href="/auth" className="text-primary hover:underline font-medium">
                {t('auth.login.createAccount')}
              </Link>
            </p>

            <div className="flex items-center justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-blue-500 hover:text-primary transition-colors">
                {t('auth.login.privacy')}
              </Link>
              <span className="text-blue-300">•</span>
              <Link href="/terms" className="text-blue-500 hover:text-primary transition-colors">
                {t('auth.login.terms')}
              </Link>
              <span className="text-blue-300">•</span>
              <Link href="/help" className="text-blue-500 hover:text-primary transition-colors">
                {t('auth.login.help')}
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-blue-100">
            <div className="text-center">
              <p className="text-xs text-blue-500 mb-3">{t('auth.login.trusted')}</p>
              <div className="flex items-center justify-center gap-8 text-blue-400">
                <div className="text-center">
                  <div className="font-bold text-primary">{lang === 'ar' ? '٥٠٠+' : '500+'}</div>
                  <div className="text-xs">{t('auth.login.verifiedDoctors')}</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-primary">{lang === 'ar' ? '١٠٬٠٠٠+' : '10K+'}</div>
                  <div className="text-xs">{t('auth.login.activePatients')}</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-primary">24/7</div>
                  <div className="text-xs">{t('auth.login.support')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
