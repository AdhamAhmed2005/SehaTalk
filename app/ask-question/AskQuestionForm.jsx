"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '../../components/ui/card.jsx';
import { Label } from '../../components/ui/label.jsx';
import { useLanguage } from '../../lib/i18n/LanguageProvider';

// Modular Components
import { PatientProfileSummary } from '../../components/forms/PatientProfileSummary.jsx';
import { QuestionTitleInput } from '../../components/forms/QuestionTitleInput.jsx';
import { CategorySelector } from '../../components/forms/CategorySelector.jsx';
import { DetailedDescription } from '../../components/forms/DetailedDescription.jsx';
import FileUpload from '../../components/forms/FileUpload.jsx';
import { SubmitSection } from '../../components/forms/SubmitSection.jsx';

// Constants and Utils
import { DEFAULT_PATIENT_PROFILE, INITIAL_QUESTION_DATA } from '../../lib/constants.js';
import { validateQuestionForm, submitQuestion } from '../../lib/utils/questionUtils.js';
import { fetchCurrentUser } from '../../lib/utils/authClient.js';

export function AskQuestionForm() {
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentPatientProfile, setCurrentPatientProfile] = useState(null);
  const [questionData, setQuestionData] = useState(INITIAL_QUESTION_DATA);

  useEffect(() => {
    async function fetchProfile() {
      const user = await fetchCurrentUser();
      if (user && user.role === 'patient') {
        setCurrentPatientProfile(user);
      } else {
        setCurrentPatientProfile(null);
      }
    }
    fetchProfile();
  }, []);

  const handleInputChange = (field, value) => {
    setQuestionData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    const validation = validateQuestionForm(questionData);
    if (!validation.isValid) {
      alert(validation.errors.join('\n'));
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare submission data with patient profile information
      const submissionData = {
        ...questionData,
        patientId: currentPatientProfile.id,
        patientInfo: {
          age: currentPatientProfile.age,
          gender: currentPatientProfile.gender,
          medicalHistory: currentPatientProfile.medicalHistory
        },
        attachments: uploadedFiles,
        submittedAt: new Date().toISOString()
      };

      const result = await submitQuestion(submissionData);
      
      // Redirect to question details page or patient dashboard
      router.push(`/dashboard/patient?newQuestion=${result.questionId}&success=true`);
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('There was an error submitting your question. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Patient Profile Summary - only show if signed in as patient */}
      {currentPatientProfile && (
        <PatientProfileSummary patientProfile={currentPatientProfile} />
      )}

      <Card className="medical-card border-0 shadow-xl rounded-2xl overflow-hidden">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            
            {/* Question Title */}
            <QuestionTitleInput 
              value={questionData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />

            {/* Category and Urgency */}
            <CategorySelector
              category={questionData.category}
              urgency={questionData.urgency}
              onCategoryChange={(value) => handleInputChange('category', value)}
              onUrgencyChange={(value) => handleInputChange('urgency', value)}
            />

            {/* Detailed Description */}
            <DetailedDescription
              value={questionData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />

            {/* Previous Treatments */}
            <div>
              <Label htmlFor="previousTreatments" className={`text-blue-900 font-medium mb-2 block ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('form.previousTreatments')}
              </Label>
              <textarea
                id="previousTreatments"
                value={questionData.previousTreatments}
                onChange={(e) => handleInputChange('previousTreatments', e.target.value)}
                placeholder={t('form.previousTreatmentsPlaceholder')}
                className={`medical-input min-h-20 resize-none text-gray-900 placeholder:text-gray-500 w-full p-4 border-2 border-blue-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                rows={3}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              <p className={`text-xs text-blue-600 mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('form.previousTreatmentsTip')}
              </p>
            </div>

            {/* File Upload */}
            <FileUpload 
              attachments={uploadedFiles}
              setAttachments={setUploadedFiles}
            />

            {/* Privacy Options */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={questionData.isAnonymous}
                  onChange={(e) => handleInputChange('isAnonymous', e.target.checked)}
                  className="mt-1"
                />
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <label htmlFor="anonymous" className="text-blue-900 font-medium cursor-pointer">
                    {t('form.postAnonymously')}
                  </label>
                  <p className="text-sm text-blue-600 mt-1">
                    {t('form.anonymousDescription')}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <SubmitSection 
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
            />
            
          </form>
        </CardContent>
      </Card>
    </>
  );
}