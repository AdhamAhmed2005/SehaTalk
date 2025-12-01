'use client';

import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, Users, Heart, Shield } from 'lucide-react';
import { AskQuestionForm } from './AskQuestionForm';
import { DEFAULT_PATIENT_PROFILE } from '../../lib/constants.js';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { useLanguage } from '../../lib/i18n/LanguageProvider';

// Mock function to check if user is authenticated and is a patient
function isPatientAuthenticated() {
  // Replace with actual authentication logic
  return true; // Set to true to test the form inputs
}

function getPatientProfile() {
  // Replace with actual profile fetching logic
  return {
    name: "Sarah Johnson",
    isVerified: true,
    memberSince: "2023",
    questionsAsked: 12,
    helpfulAnswers: 8
  };
}

export default function AskQuestionPage() {
  const { t, isRTL } = useLanguage();
  
  // Check authentication
  const isAuthenticated = isPatientAuthenticated();
  const patientProfile = isAuthenticated ? getPatientProfile() : null;
  
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link 
              href="/dashboard/patient" 
              className={`flex items-center gap-2 text-blue-600 hover:text-primary transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft className="w-4 h-4" />
              {t('nav.dashboard')}
            </Link>
            
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            <div className={`flex items-center gap-4 text-sm text-blue-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Shield className="w-4 h-4" />
                <span>{t('askQuestion.verifiedPatient')}</span>
              </div>
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Users className="w-4 h-4" />
                <span>500+ {t('askQuestion.doctorsAvailable')}</span>
              </div>
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Heart className="w-4 h-4" />
                <span>{t('askQuestion.support247')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className={`text-center mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">{t('askQuestion.title')}</h1>
            <p className="text-blue-600 max-w-2xl mx-auto">
              {t('askQuestion.subtitle')}
            </p>
          </div>

          {/* Guidelines */}
          <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
            <h3 className={`font-semibold text-blue-900 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('askQuestion.guidelinesTitle')}
            </h3>
            <div className={`grid md:grid-cols-2 gap-4 text-sm text-blue-700 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="space-y-2">
                <p>✅ {t('askQuestion.doSpecific')}</p>
                <p>✅ {t('askQuestion.doMedicalHistory')}</p>
                <p>✅ {t('askQuestion.doMentionMeds')}</p>
                <p>✅ {t('askQuestion.doDescribeStart')}</p>
              </div>
              <div className="space-y-2">
                <p>❌ {t('askQuestion.dontSharePersonal')}</p>
                <p>❌ {t('askQuestion.dontEmergency')}</p>
                <p>❌ {t('askQuestion.dontPrivateImages')}</p>
                <p>❌ {t('askQuestion.dontPrescriptions')}</p>
              </div>
            </div>
          </div>

          {/* Question Form */}

          {/* Emergency Notice */}
                  {!isAuthenticated ? (
          /* Sign In Required Message */
          <div className="max-w-md mx-auto text-center py-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-bold text-blue-900 mb-3">{t('auth.signInRequired')}</h2>
              <p className="text-blue-700 mb-6">
                {t('auth.signInText')}
              </p>
              <div className="space-y-3">
                <Link href="/auth/patient" className="block">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                    {t('auth.signInAsPatient')}
                  </button>
                </Link>
                <Link href="/auth/patient-signup" className="block">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                    {t('auth.createAccount')}
                  </button>
                </Link>
                <Link href="/" className="block">
                  <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-6 rounded-lg transition-colors">
                    {t('auth.backToHome')}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Emergency Notice */}
            <div className={`bg-red-50 border border-red-200 rounded-lg p-4 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-start gap-3 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="bg-red-100 rounded-full p-2 shrink-0 ">
                  <svg className="w-5 h-5 text-red-600 " fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className={`${isRTL ? 'text-right' : 'text-left'} flex-1` }>
                  <h3 className="text-red-800 font-semibold text-sm mb-1">{t('askQuestion.emergencyTitle')}</h3>
                  <p className="text-red-700 text-sm">
                    {t('askQuestion.emergencyText')}
                  </p>
                </div>
              </div>
            </div>

            {/* Question Form */}
            <AskQuestionForm patientProfile={patientProfile} />
          </>
        )}
        </div>
      </div>
    </div>
  );
}