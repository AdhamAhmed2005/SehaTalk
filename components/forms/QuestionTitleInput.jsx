"use client";

import { Input } from '../ui/input.jsx';
import { Label } from '../ui/label.jsx';
import { useLanguage } from '../../lib/i18n/LanguageProvider.jsx';

export function QuestionTitleInput({ value, onChange, maxLength = 100 }) {
  const { t, isRTL } = useLanguage();

  return (
    <div className="group">
      <Label htmlFor="title" className="text-blue-900 font-semibold mb-3 block text-lg">
        {t('askQuestion.questionTitle')} *
      </Label>
      <div className="relative">
        <Input
          id="title"
          value={value}
          onChange={onChange}
          placeholder={t('askQuestion.questionTitlePlaceholder')}
          className={`medical-input text-lg py-4 px-6 rounded-xl border-2 border-blue-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-gray-900 placeholder:text-gray-500 ${isRTL ? 'text-right' : 'text-left'}`}
          maxLength={maxLength}
          dir={isRTL ? 'rtl' : 'ltr'}
          required
        />
        <div className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 text-sm text-blue-400 bg-blue-50 px-2 py-1 rounded`}>
          {value.length}/{maxLength}
        </div>
      </div>
      <div className="bg-blue-50 p-3 rounded-lg mt-2">
        <p className="text-sm text-blue-700 font-medium mb-1">{t('askQuestion.tipsTitle')}</p>
        <ul className="text-sm text-blue-600 space-y-1">
          <li>{t('askQuestion.tip1')}</li>
          <li>{t('askQuestion.tip2')}</li>
          <li>{t('askQuestion.tip3')}</li>
        </ul>
      </div>
    </div>
  );
}