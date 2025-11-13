"use client";

import { Label } from '../ui/label.jsx';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export function DetailedDescription({ value, onChange, maxLength = 2000 }) {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className="group">
      <Label htmlFor="description" className={`text-blue-900 font-semibold mb-3 block text-lg ${isRTL ? 'text-right' : 'text-left'}`}>
        {t('form.detailedDescription')} *
      </Label>
      <div className="relative">
        <textarea
          id="description"
          value={value}
          onChange={onChange}
          placeholder={t('form.detailedDescriptionPlaceholder')}
          className={`medical-input min-h-40 resize-y rounded-xl border-2 border-blue-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all p-6 text-base leading-relaxed text-gray-900 placeholder:text-gray-500 ${isRTL ? 'text-right' : 'text-left'}`}
          maxLength={maxLength}
          rows={8}
          dir={isRTL ? 'rtl' : 'ltr'}
          required
        />
        <div className={`absolute bottom-4 text-sm text-blue-400 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-200 ${isRTL ? 'left-4' : 'right-4'}`}>
          {value.length}/{maxLength}
        </div>
      </div>
      <div className="bg-green-50 p-4 rounded-lg mt-3">
        <p className={`text-sm text-green-700 font-medium mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
          📋 {t('form.descriptionTips')}
        </p>
        <div className={`grid md:grid-cols-2 gap-2 text-sm text-green-600 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div>• {t('form.descriptionTip1')}</div>
          <div>• {t('form.descriptionTip2')}</div>
          <div>• {t('form.descriptionTip3')}</div>
          <div>• {t('form.descriptionTip4')}</div>
        </div>
      </div>
    </div>
  );
}