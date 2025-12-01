"use client";

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from './translations_safe.js';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ar'); // Default to Arabic
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Get saved language from localStorage only once on mount
    const savedLanguage = localStorage.getItem('sehatalk-language');
    if (savedLanguage && ['ar', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
      // Update document attributes immediately
      document.documentElement.setAttribute('lang', savedLanguage);
      document.documentElement.setAttribute('dir', savedLanguage === 'ar' ? 'rtl' : 'ltr');
    } else {
      // Set default to Arabic
      document.documentElement.setAttribute('lang', 'ar');
      document.documentElement.setAttribute('dir', 'rtl');
    }
    setIsInitialized(true);
  }, []);

  // Separate effect for updating document attributes when language changes after initialization
  useEffect(() => {
    if (isInitialized) {
      document.documentElement.setAttribute('lang', language);
      document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    }
  }, [language, isInitialized]);

  const changeLanguage = useCallback((lang) => {
    if (['ar', 'en'].includes(lang) && lang !== language) {
      setLanguage(lang);
      localStorage.setItem('sehatalk-language', lang);
    }
  }, [language]);

  const t = useCallback((key) => {
    // Debug: trace key resolution during development
    if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.debug('[i18n] t()', { key, language });
    }
    const keys = key.split('.');
    let value = translations[language];
    let cursor = value;
    
    // Try to get translation in current language
    for (const k of keys) {
      if (cursor && typeof cursor === 'object' && k in cursor) {
        cursor = cursor[k];
      } else {
        cursor = null;
        if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.warn('[i18n] missing key in current language', { key, missingAt: k, availableKeys: cursor && typeof cursor === 'object' ? Object.keys(cursor) : [] });
        }
        break;
      }
    }
    value = cursor;
    
    // If translation not found, fallback to English
    if (value === null || value === undefined) {
      let fallbackValue = translations['en'];
      let fallbackCursor = fallbackValue;
      for (const k of keys) {
        if (fallbackCursor && typeof fallbackCursor === 'object' && k in fallbackCursor) {
          fallbackCursor = fallbackCursor[k];
        } else {
          if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.warn('[i18n] missing key in fallback lang', { key, missingAt: k });
          }
          return key; // Return key if translation not found in both languages
        }
      }
      return fallbackCursor;
    }
    
    return value;
  }, [language]);

  const isRTL = language === 'ar';

  const value = {
    language,
    changeLanguage,
    t,
    isRTL,
    isArabic: language === 'ar',
    isEnglish: language === 'en'
  };

  return (
    <LanguageContext.Provider value={value}>
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