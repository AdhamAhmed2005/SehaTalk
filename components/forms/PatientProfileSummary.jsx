"use client";

import { User, Calendar, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card.jsx';
import { useLanguage } from '../../lib/i18n/LanguageProvider.jsx';

export function PatientProfileSummary({ patientProfile }) {
  const { t, isRTL } = useLanguage();
  
  if (!patientProfile) return null;

  return (
    <Card className="medical-card border-0 shadow-lg mb-6 bg-blue-50/50">
      <CardContent className="p-6">
        <h3 className={`font-bold text-blue-900 mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <User className="w-5 h-5" />
          {t('askQuestion.yourProfile')}
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-blue-800">{t('askQuestion.patient')}:</span>
            <p className="text-blue-700">{patientProfile.name}</p>
            <p className="text-blue-600">
              {patientProfile.age} {t('askQuestion.yearsOld')}, {t(`common.${patientProfile.gender}`)}
            </p>
          </div>
          <div>
            <span className="font-medium text-blue-800">{t('askQuestion.allergies')}:</span>
            <p className="text-blue-700">
              {patientProfile?.medicalHistory?.allergies?.join(', ') || t('askQuestion.noneReported')}
            </p>
          </div>
          <div>
            <span className="font-medium text-blue-800">{t('askQuestion.medications')}:</span>
            <p className="text-blue-700">
              {patientProfile?.medicalHistory?.currentMedications?.join(', ') || t('askQuestion.noneReported')}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-blue-200">
          <p className={`text-xs text-blue-600 flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Calendar className="w-3 h-3" />
            {t('askQuestion.profileUpdated')}: {new Date(patientProfile.lastUpdate).toLocaleDateString()}
            <button className="text-primary hover:underline ml-2">{t('askQuestion.updateProfile')}</button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}