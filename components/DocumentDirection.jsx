"use client";

import { useEffect } from 'react';
import { useLanguage } from '../lib/i18n/LanguageProvider';

function DocumentDirection() {
  const { isRTL } = useLanguage();

  useEffect(() => {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.body.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  }, [isRTL]);

  return null;
}

export default DocumentDirection;