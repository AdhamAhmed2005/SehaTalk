"use client";

import { useState } from "react";
import axios from "axios";
import { User, Ruler, Weight, Heart, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../components/ui/button.jsx";
import { Card, CardContent } from "../../../components/ui/card.jsx";
import { Input } from "../../../components/ui/input.jsx";
import { Label } from "../../../components/ui/label.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select.jsx";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function PatientRegistrationForm() {
  const { t, isRTL, language: lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
    gender: "",

    // Medical History
    height: "",
    weight: "",
    bloodType: "",
    allergies: "",
    currentMedications: "",
    chronicConditions: "",
    previousSurgeries: "",
    familyMedicalHistory: "",
    smokingStatus: "",
    alcoholConsumption: "",
    exerciseFrequency: "",

    // Emergency Contact
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactPhone: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [shakeButton, setShakeButton] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const validateForm = () => {
    const requiredStep1 = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'dateOfBirth',
      'gender',
      'password',
      'confirmPassword',
    ];
    for (const key of requiredStep1) {
      if (!formData[key] || String(formData[key]).trim() === '') {
        return t('auth.login.errFillAll');
      }
    }
    if (formData.password.length < 6) {
      return t('auth.login.errFillAll');
    }
    if (formData.password !== formData.confirmPassword) {
      return t('auth.patientForm.confirmPassword');
    }
    // Step 3 required
    const requiredStep3 = [
      'emergencyContactName',
      'emergencyContactPhone',
      'emergencyContactRelation',
    ];
    for (const key of requiredStep3) {
      if (!formData[key] || String(formData[key]).trim() === '') {
        return t('auth.login.errFillAll');
      }
    }
    if (!termsAccepted) {
      return t('auth.patientForm.privacyTerms');
    }
    return null;
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setShakeButton(true);
      setTimeout(() => setShakeButton(false), 500);
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        role: "patient",
        ...formData,
      };

      console.log("Submitting signup:", payload);
      const { data } = await axios.post("/api/auth/signup", payload);
      console.log("Signup success:", data);
      setSuccess(data?.message || "Signup successful");
      // Redirect to patient profile after successful signup
      setTimeout(() => {
        window.location.href = "/profile/patient";
      }, 1500);
    } catch (err) {
      console.error("Signup failed:", err);
      console.error("Error response:", err?.response?.data);
      let message = err?.response?.data?.message || "Signup failed. Please try again.";
      if (err?.response?.status === 409) {
        message = "An account with this email already exists. Please use a different email or log in.";
      }
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-4">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step >= stepNum
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepNum}
              </div>
              {stepNum < 3 && (
                <div
                  className={`w-12 h-1 mx-2 transition-colors ${
                    step > stepNum ? "bg-primary" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Card className="medical-card border-0 shadow-xl rounded-2xl overflow-hidden">
        <CardContent className="p-4 sm:p-6 md:p-8">
          {error && (
            <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded bg-green-50 text-green-700 text-sm">
              {success}
            </div>
          )}
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <User className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  {t('auth.patientForm.step1Title')}
                </h2>
                <p className="text-blue-700">
                  {t('auth.patientForm.step1Subtitle')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label
                    htmlFor="firstName"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.patientForm.firstName')} *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className={`medical-input mt-2 w-full ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={t('auth.patientForm.firstNamePlaceholder')}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="lastName"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.patientForm.lastName')} *
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className={`medical-input mt-2 w-full ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={t('auth.patientForm.lastNamePlaceholder')}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-blue-900 font-medium">
                    {t('auth.patientForm.email')} *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`medical-input mt-2 w-full ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={t('auth.patientForm.emailPlaceholder')}
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-blue-900 font-medium">
                    {t('auth.patientForm.phone')} *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`medical-input mt-2 w-full ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={t('auth.patientForm.phonePlaceholder')}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="dateOfBirth"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.patientForm.dateOfBirth')} *
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    className={`medical-input mt-2 w-full ${isRTL ? 'text-right' : 'text-left'}`}
                  />
                </div>
                <div>
                  <Label className="text-blue-900 font-medium">{t('auth.patientForm.gender')} *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      handleInputChange("gender", value)
                    }
                  >
                    <SelectTrigger className={`medical-select mt-2 w-full ${isRTL ? 'text-right' : 'text-left'}`}>
                      <SelectValue placeholder={t('auth.patientForm.genderPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent className={`${isRTL ? 'text-right' : 'text-left'}`}>
                      <SelectItem value="male">{t('auth.patientForm.male')}</SelectItem>
                      <SelectItem value="female">{t('auth.patientForm.female')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="password"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.patientForm.password')} *
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`medical-input mt-2 w-full ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={t('auth.patientForm.passwordPlaceholder')}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="confirmPassword"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.patientForm.confirmPassword')} *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className={`medical-input mt-2 w-full ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={t('auth.patientForm.confirmPasswordPlaceholder')}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button onClick={nextStep} className="btn-primary px-8 py-3">
                  {t('auth.patientForm.nextMedicalHistory')}
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="text-center mb-8">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  {t('auth.patientForm.step2Title')}
                </h2>
                <p className="text-blue-700">
                  {t('auth.patientForm.step2SubtitleLong')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="height" className="text-blue-900 font-medium">
                    {t('auth.patientForm.height')}
                  </Label>
                  <div className="relative mt-2">
                    <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                    <Input
                      id="height"
                      type="number"
                      value={formData.height}
                      onChange={(e) =>
                        handleInputChange("height", e.target.value)
                      }
                      className="medical-input pl-10 w-full"
                      placeholder={t('auth.patientForm.heightPlaceholder')}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="weight" className="text-blue-900 font-medium">
                    {t('auth.patientForm.weight')}
                  </Label>
                  <div className="relative mt-2">
                    <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) =>
                        handleInputChange("weight", e.target.value)
                      }
                      className="medical-input pl-10 w-full"
                      placeholder={t('auth.patientForm.weightPlaceholder')}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-blue-900 font-medium">
                    {t('auth.patientForm.bloodType')}
                  </Label>
                  <Select
                    value={formData.bloodType}
                    onValueChange={(value) =>
                      handleInputChange("bloodType", value)
                    }
                  >
                    <SelectTrigger className={`medical-select mt-2 w-full ${isRTL ? 'text-right' : 'text-left'}`}>
                      <SelectValue placeholder={t('auth.patientForm.bloodTypePlaceholder')} />
                    </SelectTrigger>
                    <SelectContent className={`${isRTL ? 'text-right' : 'text-left'}`}>
                      <SelectItem value="a+">A+</SelectItem>
                      <SelectItem value="a-">A-</SelectItem>
                      <SelectItem value="b+">B+</SelectItem>
                      <SelectItem value="b-">B-</SelectItem>
                      <SelectItem value="ab+">AB+</SelectItem>
                      <SelectItem value="ab-">AB-</SelectItem>
                      <SelectItem value="o+">O+</SelectItem>
                      <SelectItem value="o-">O-</SelectItem>
                      <SelectItem value="unknown">{t('auth.patientForm.unknown')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-blue-900 font-medium">
                    {t('auth.patientForm.smokingStatus')}
                  </Label>
                  <Select
                    value={formData.smokingStatus}
                    onValueChange={(value) =>
                      handleInputChange("smokingStatus", value)
                    }
                  >
                    <SelectTrigger className={`medical-select mt-2 w-full ${isRTL ? 'text-right' : 'text-left'}`}>
                      <SelectValue placeholder={t('auth.patientForm.smokingPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">{t('auth.patientForm.neverSmoked')}</SelectItem>
                      <SelectItem value="former">{t('auth.patientForm.formerSmoker')}</SelectItem>
                      <SelectItem value="current">{t('auth.patientForm.currentSmoker')}</SelectItem>
                      <SelectItem value="occasional">
                        {t('auth.patientForm.occasionalSmoker')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <div className="mb-2">
                    <Label
                      htmlFor="allergies"
                      className="text-blue-900 font-semibold text-base flex items-center gap-2"
                    >
                      <span className="text-lg">⚠️</span>
                      {t('auth.patientForm.knownAllergies')}
                    </Label>
                    <p className="text-sm text-blue-600 mt-1">
                      {t('auth.patientForm.knownAllergiesPlaceholder')}
                    </p>
                  </div>
                  <textarea
                    id="allergies"
                    value={formData.allergies}
                    onChange={(e) =>
                      handleInputChange("allergies", e.target.value)
                    }
                    className="medical-input mt-2 min-h-28 resize-y w-full bg-white hover:bg-blue-50/30 transition-colors duration-200"
                    placeholder={t('auth.patientForm.knownAllergiesPlaceholder')}
                    rows={4}
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="mb-2">
                    <Label
                      htmlFor="currentMedications"
                      className="text-blue-900 font-semibold text-base flex items-center gap-2"
                    >
                      <span className="text-lg">💊</span>
                      {t('auth.patientForm.currentMedications')}
                    </Label>
                    <p className="text-sm text-blue-600 mt-1">
                      {t('auth.patientForm.currentMedicationsLong')}
                    </p>
                  </div>
                  <textarea
                    id="currentMedications"
                    value={formData.currentMedications}
                    onChange={(e) =>
                      handleInputChange("currentMedications", e.target.value)
                    }
                    className="medical-input mt-2 min-h-28 text-black resize-y w-full bg-white hover:bg-blue-50/30 transition-colors duration-200"
                    placeholder={t('auth.patientForm.currentMedicationsPlaceholder')}
                    rows={4}
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="mb-2">
                    <Label
                      htmlFor="chronicConditions"
                      className="text-blue-900 font-semibold text-base flex items-center gap-2"
                    >
                      <span className="text-lg">🩺</span>
                      {t('auth.patientForm.chronicConditions')}
                    </Label>
                    <p className="text-sm text-blue-600 mt-1">
                      {t('auth.patientForm.chronicConditionsLong')}
                    </p>
                  </div>
                  <textarea
                    id="chronicConditions"
                    value={formData.chronicConditions}
                    onChange={(e) =>
                      handleInputChange("chronicConditions", e.target.value)
                    }
                    className="medical-input mt-2 min-h-28 resize-y w-full bg-white hover:bg-blue-50/30 transition-colors duration-200"
                    placeholder={t('auth.patientForm.chronicConditionsPlaceholder')}
                    rows={4}
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="mb-2">
                    <Label
                      htmlFor="previousSurgeries"
                      className="text-blue-900 font-semibold text-base flex items-center gap-2"
                    >
                      <span className="text-lg">🏥</span>
                      {t('auth.patientForm.previousSurgeries')}
                    </Label>
                    <p className="text-sm text-blue-600 mt-1">
                      {t('auth.patientForm.previousSurgeriesLong')}
                    </p>
                  </div>
                  <textarea
                    id="previousSurgeries"
                    value={formData.previousSurgeries}
                    onChange={(e) =>
                      handleInputChange("previousSurgeries", e.target.value)
                    }
                    className="medical-input mt-2 min-h-28 resize-y w-full bg-white hover:bg-blue-50/30 transition-colors duration-200"
                    placeholder={t('auth.patientForm.previousSurgeriesPlaceholder')}
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="btn-secondary px-8 py-3"
                >
                  {t('auth.patientForm.back')}
                </Button>
                <Button onClick={nextStep} className="btn-primary px-8 py-3">
                  {t('auth.patientForm.nextEmergencyContact')}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="text-center mb-8">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  {t('auth.patientForm.step3TitleFull')}
                </h2>
                <p className="text-blue-700">
                  {t('auth.patientForm.step3SubtitleLong')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">
                    {t('auth.patientForm.emergencyContactInfo')}
                  </h3>
                </div>
                <div>
                  <Label
                    htmlFor="emergencyContactName"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.patientForm.contactName')} *
                  </Label>
                  <Input
                    id="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={(e) =>
                      handleInputChange("emergencyContactName", e.target.value)
                    }
                    className="medical-input mt-2 w-full"
                    placeholder={t('auth.patientForm.emergencyNamePlaceholder')}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="emergencyContactPhone"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.patientForm.contactPhone')} *
                  </Label>
                  <Input
                    id="emergencyContactPhone"
                    type="tel"
                    value={formData.emergencyContactPhone}
                    onChange={(e) =>
                      handleInputChange("emergencyContactPhone", e.target.value)
                    }
                    className="medical-input mt-2 w-full"
                    placeholder={t('auth.patientForm.emergencyPhonePlaceholder')}
                  />
                </div>
                <div>
                  <Label className="text-blue-900 font-medium">
                    {t('auth.patientForm.relationship')} *
                  </Label>
                  <Select
                    value={formData.emergencyContactRelation}
                    onValueChange={(value) =>
                      handleInputChange("emergencyContactRelation", value)
                    }
                  >
                    <SelectTrigger className={`medical-select mt-2 w-full ${isRTL ? 'text-right' : 'text-left'}`}>
                      <SelectValue placeholder={t('auth.patientForm.emergencyRelationPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">{t('auth.patientForm.spouse')}</SelectItem>
                      <SelectItem value="parent">{t('auth.patientForm.parent')}</SelectItem>
                      <SelectItem value="child">{t('auth.patientForm.child')}</SelectItem>
                      <SelectItem value="sibling">{t('auth.patientForm.sibling')}</SelectItem>
                      <SelectItem value="friend">{t('auth.patientForm.friend')}</SelectItem>
                      <SelectItem value="other">{t('auth.patientForm.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-blue-900 font-medium">
                    {t('auth.patientForm.exerciseFrequency')}
                  </Label>
                  <Select
                    value={formData.exerciseFrequency}
                    onValueChange={(value) =>
                      handleInputChange("exerciseFrequency", value)
                    }
                  >
                    <SelectTrigger className={`medical-select mt-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      <SelectValue placeholder={t('auth.patientForm.exercisePlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">{t('auth.patientForm.daily')}</SelectItem>
                      <SelectItem value="4-6-weekly">
                        {t('auth.patientForm.fourToSixWeekly')}
                      </SelectItem>
                      <SelectItem value="2-3-weekly">
                        {t('auth.patientForm.twoToThreeWeekly')}
                      </SelectItem>
                      <SelectItem value="weekly">{t('auth.patientForm.weekly')}</SelectItem>
                      <SelectItem value="rarely">{t('auth.patientForm.rarely')}</SelectItem>
                      <SelectItem value="never">{t('auth.patientForm.never')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <div className="mb-2">
                    <Label
                      htmlFor="familyMedicalHistory"
                      className="text-blue-900 font-semibold text-base flex items-center gap-2"
                    >
                      <span className="text-lg">👨‍👩‍👧‍👦</span>
                      {t('auth.patientForm.familyMedicalHistory')}
                    </Label>
                    <p className="text-sm text-blue-600 mt-1">
                      {t('auth.patientForm.familyMedicalHistoryPlaceholder')}
                    </p>
                  </div>
                  <textarea
                    id="familyMedicalHistory"
                    value={formData.familyMedicalHistory}
                    onChange={(e) =>
                      handleInputChange("familyMedicalHistory", e.target.value)
                    }
                    className="medical-input mt-2 min-h-28 resize-y w-full bg-white hover:bg-blue-50/30 transition-colors duration-200"
                    placeholder={t('auth.patientForm.familyMedicalHistoryPlaceholder')}
                    rows={4}
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">
                  {t('auth.patientForm.privacyTerms')}
                </h4>
                <div className="text-sm text-blue-700 space-y-2">
                  <p>
                    {t('auth.patientForm.privacyPoint1')}
                  </p>
                  <p>
                    {t('auth.patientForm.privacyPoint2')}
                  </p>
                  <p>{t('auth.patientForm.privacyPoint3')}</p>
                  <p>
                    {t('auth.patientForm.privacyPoint4')}
                  </p>
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <label htmlFor="terms" className="text-sm text-blue-700">
                    {t('auth.patientForm.agreeTerms')}{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      {t('auth.patientForm.termsOfService')}
                    </Link>{" "}
                    {t('auth.patientForm.and')}{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      {t('auth.patientForm.privacyPolicy')}
                    </Link>
                    {t('auth.patientForm.consentStorage')}
                  </label>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="btn-secondary px-8 py-3"
                >
                  {t('auth.patientForm.back')}
                </Button>
                <Button
                  className={`btn-primary px-8 py-3 ${shakeButton ? 'shake' : ''}`}
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting
                    ? t('auth.patientForm.creatingAccount')
                    : t('auth.patientForm.createPatientAccount')}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
