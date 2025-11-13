"use client";

import { Globe } from 'lucide-react';
import { useLanguage } from '../lib/i18n/LanguageProvider.jsx';

export function LanguageSwitcher() {
  const { language, changeLanguage, isRTL } = useLanguage();

  return (
    <div className="relative">
      <button
        onClick={() => changeLanguage(language === 'ar' ? 'en' : 'ar')}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-blue-200 bg-white hover:bg-blue-50 transition-colors text-blue-700 hover:text-blue-800 ${isRTL ? 'flex-row-reverse' : ''}`}
        aria-label="تبديل اللغة / Switch Language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {language === 'ar' ? 'EN' : 'عربي'}
        </span>
      </button>
    </div>
  );
}