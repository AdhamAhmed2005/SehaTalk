"use client";

import { MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../ui/button.jsx';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export function SubmitSection({ isSubmitting, onSubmit }) {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className={`flex flex-col md:flex-row md:justify-between md:items-center gap-4 pt-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
      <div className={`text-sm text-blue-600 order-1 md:order-none ${isRTL ? 'text-right' : 'text-left'}`}>
        <p className={`flex items-center gap-2 mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <CheckCircle className="w-4 h-4 text-green-600" />
          {t('form.doctorReview')}
        </p>
        <p className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Clock className="w-4 h-4 text-blue-500" />
          {t('form.responseTime')}
        </p>
      </div>
      <Button 
        type="submit" 
        className="btn-primary px-8 py-3 text-lg w-full md:w-auto order-2 md:order-none"
        disabled={isSubmitting}
        onClick={onSubmit}
      >
        {isSubmitting ? (
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            {t('form.submitting')}
          </div>
        ) : (
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <MessageSquare className="w-5 h-5" />
            {t('form.submitQuestion')}
          </div>
        )}
      </Button>
    </div>
  );
}