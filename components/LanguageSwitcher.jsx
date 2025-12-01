"use client";

import { Globe } from 'lucide-react';
import { useLanguage } from '../lib/i18n/LanguageProvider.jsx';
import { useState } from 'react';

export function LanguageSwitcher() {
  const { language, changeLanguage, isRTL } = useLanguage();
  const [isChanging, setIsChanging] = useState(false);

  const handleLanguageChange = () => {
    if (isChanging) return; // Prevent multiple clicks
    
    const newLanguage = language === 'ar' ? 'en' : 'ar';
    setIsChanging(true);
    
    // Change language in context (instant UI update, no URL change)
    changeLanguage(newLanguage);
    
    // Reset the flag after a short delay
    setTimeout(() => setIsChanging(false), 300);
  };

  return (
    <div className="relative">
      <button
        onClick={handleLanguageChange}
        disabled={isChanging}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-blue-200 bg-white hover:bg-blue-50 transition-colors text-blue-700 hover:text-blue-800 disabled:opacity-60 disabled:cursor-not-allowed ${isRTL ? 'flex-row-reverse' : ''}`}
        aria-label="تبديل اللغة / Switch Language"
      >
        <Globe className={`w-4 h-4 ${isChanging ? 'animate-spin' : ''}`} />
        <span className="text-sm font-medium">
          {language === 'ar' ? 'EN' : 'عربي'}
        </span>
      </button>
    </div>
  );
}