"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations.js';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ar'); // Default to Arabic

  useEffect(() => {
    // Get saved language from localStorage
    const savedLanguage = localStorage.getItem('sehatalk-language');
    if (savedLanguage && ['ar', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Set document direction and lang attribute whenever language changes
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }, [language]);

  const changeLanguage = (lang) => {
    if (['ar', 'en'].includes(lang)) {
      setLanguage(lang);
      localStorage.setItem('sehatalk-language', lang);
      
      // Update document attributes
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    // Try to get translation in current language
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        value = null;
        break;
      }
    }
    
    // If translation not found, fallback to English
    if (value === null || value === undefined) {
      let fallbackValue = translations['en'];
      for (const k of keys) {
        if (fallbackValue && typeof fallbackValue === 'object' && k in fallbackValue) {
          fallbackValue = fallbackValue[k];
        } else {
          return key; // Return key if translation not found in both languages
        }
      }
      return fallbackValue;
    }
    
    return value;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{
      language,
      changeLanguage,
      t,
      isRTL,
      isArabic: language === 'ar',
      isEnglish: language === 'en'
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}