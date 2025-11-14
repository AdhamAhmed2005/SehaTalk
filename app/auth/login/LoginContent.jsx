'use client';
import Link from 'next/link';
import { Stethoscope, ArrowLeft } from 'lucide-react';
import { SignInForm } from './SignInForm.jsx';

const t = (lang) => ({
  backHome: lang === 'en' ? 'Back to Home' : 'العودة إلى الصفحة الرئيسية',
  welcome: lang === 'en' ? 'Welcome Back' : 'أهلاً بعودتك',
  subtitle:
    lang === 'en'
      ? 'Sign in to access your medical dashboard and continue your healthcare journey'
      : 'سجّل الدخول للوصول إلى لوحتك الطبية ومتابعة رحلتك الصحية',
  noAccount: lang === 'en' ? "Don't have an account?" : 'ليس لديك حساب؟',
  createAccount: lang === 'en' ? 'Create Account' : 'أنشئ حساباً',
  privacy: lang === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية',
  terms: lang === 'en' ? 'Terms of Service' : 'شروط الخدمة',
  help: lang === 'en' ? 'Help & Support' : 'المساعدة والدعم',
  trusted: lang === 'en' ? 'Trusted by healthcare professionals' : 'موثوق من قبل المتخصصين في الرعاية الصحية',
  verifiedDoctors: lang === 'en' ? 'Verified Doctors' : 'أطباء موثقون',
  activePatients: lang === 'en' ? 'Active Patients' : 'مرضى نشطون',
  support: lang === 'en' ? 'Support' : 'دعم',
});

export default function LoginContent({ lang }) {
  const isRTL = lang === 'ar';
  const i = t(lang);
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
              {i.backHome}
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
            <h1 className="text-3xl font-bold text-blue-900 mb-2">{i.welcome}</h1>
            <p className="text-blue-600">{i.subtitle}</p>
          </div>

          <SignInForm lang={lang} />

          <div className="mt-8 text-center">
            <p className="text-blue-600 mb-4">
              {i.noAccount}{' '}
              <Link href="/auth" className="text-primary hover:underline font-medium">
                {i.createAccount}
              </Link>
            </p>

            <div className="flex items-center justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-blue-500 hover:text-primary transition-colors">
                {i.privacy}
              </Link>
              <span className="text-blue-300">•</span>
              <Link href="/terms" className="text-blue-500 hover:text-primary transition-colors">
                {i.terms}
              </Link>
              <span className="text-blue-300">•</span>
              <Link href="/help" className="text-blue-500 hover:text-primary transition-colors">
                {i.help}
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-blue-100">
            <div className="text-center">
              <p className="text-xs text-blue-500 mb-3">{i.trusted}</p>
              <div className="flex items-center justify-center gap-8 text-blue-400">
                <div className="text-center">
                  <div className="font-bold text-primary">{lang === 'ar' ? '٥٠٠+' : '500+'}</div>
                  <div className="text-xs">{i.verifiedDoctors}</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-primary">{lang === 'ar' ? '١٠٬٠٠٠+' : '10K+'}</div>
                  <div className="text-xs">{i.activePatients}</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-primary">24/7</div>
                  <div className="text-xs">{i.support}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
