"use client";

import { Label } from '../ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select.jsx';
import { useLanguage } from '../../lib/i18n/LanguageProvider.jsx';

const MEDICAL_CATEGORIES = [
  'general-health', 'cardiology', 'dermatology', 'pediatrics', 
  'gynecology', 'orthopedics', 'neurology', 'psychiatry',
  'internal-medicine', 'surgery', 'ophthalmology', 'ent',
  'urology', 'endocrinology', 'gastroenterology', 'pulmonology'
];

const URGENCY_LEVELS = [
  {
    value: 'low',
    color: 'bg-green-500'
  },
  {
    value: 'normal', 
    color: 'bg-yellow-500'
  },
  {
    value: 'high',
    color: 'bg-red-500'
  }
];

export function CategorySelector({ category, urgency, onCategoryChange, onUrgencyChange }) {
  const { t, isRTL } = useLanguage();

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="group">
        <Label className="text-blue-900 font-semibold mb-3 block">
          {t('askQuestion.category')} *
        </Label>
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className={`medical-select h-14 text-lg border-2 border-blue-200 focus:border-primary rounded-xl ${isRTL ? 'text-right' : 'text-left'}`}>
            <SelectValue placeholder={t('askQuestion.categoryPlaceholder')} />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {MEDICAL_CATEGORIES.map((cat) => (
              <SelectItem 
                key={cat} 
                value={cat} 
                className="text-base py-3"
              >
                {t(`categories.${cat}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="group">
        <Label className="text-blue-900 font-semibold mb-3 block">
          {t('askQuestion.urgencyLevel')}
        </Label>
        <Select value={urgency} onValueChange={onUrgencyChange}>
          <SelectTrigger className={`medical-select h-14 text-lg border-2 border-blue-200 focus:border-primary rounded-xl ${isRTL ? 'text-right' : 'text-left'}`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {URGENCY_LEVELS.map((level) => (
              <SelectItem key={level.value} value={level.value} className="text-base py-3">
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-3 h-3 ${level.color} rounded-full`}></div>
                  {t(`urgency.${level.value}`)}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}