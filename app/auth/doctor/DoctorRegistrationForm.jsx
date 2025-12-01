"use client";

import { useState } from "react";
import axios from "axios";
import {
  Stethoscope,
  Upload,
  FileText,
  Award,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function DoctorRegistrationForm() {
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

    // Professional Information
    medicalLicenseNumber: "",
    specialty: "",
    subSpecialty: "",
    yearsOfExperience: "",
    hospitalAffiliation: "",
    clinicAddress: "",
    consultationFee: "",
    availableHours: "",
    languages: "",

    // Education & Certifications
    medicalSchool: "",
    graduationYear: "",
    residencyProgram: "",
    fellowshipProgram: "",
    boardCertifications: "",

    // Documents
    licenseDocument: null,
    diplomaDocument: null,
    cvDocument: null,
    profilePhoto: null,
  });

  const [uploadStatus, setUploadStatus] = useState({
    license: false,
    diploma: false,
    cv: false,
    photo: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, file) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
    setUploadStatus((prev) => ({
      ...prev,
      [field.replace("Document", "").replace("Photo", "photo")]: true,
    }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const specialties = [
    "General Practice",
    "Internal Medicine",
    "Cardiology",
    "Dermatology",
    "Pediatrics",
    "Gynecology",
    "Orthopedics",
    "Neurology",
    "Psychiatry",
    "Surgery",
    "Radiology",
    "Anesthesiology",
    "Ophthalmology",
    "ENT",
    "Urology",
    "Emergency Medicine",
    "Family Medicine",
    "Endocrinology",
    "Gastroenterology",
    "Pulmonology",
    "Rheumatology",
    "Oncology",
  ];

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const payload = {
        role: "doctor",
        ...formData,
      };

      const { data } = await axios.post("/api/auth/signup", payload);
      setSuccess(data?.message || "Signup successful");
      // Redirect to doctor profile after successful signup
      setTimeout(() => {
        window.location.href = "/profile/doctor";
      }, 1500);
    } catch (err) {
      const message =
        err?.response?.data?.message || "Signup failed. Please try again.";
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
          {[1, 2, 3, 4].map((stepNum) => (
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
              {stepNum < 4 && (
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
        <CardContent className="p-8">
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
                  {t('auth.doctorForm.step1Title')}
                </h2>
                <p className="text-blue-700">
                  {t('auth.doctorForm.step1Subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="firstName"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.doctorForm.firstName')} *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="medical-input mt-2"
                    placeholder={t('auth.doctorForm.firstNamePlaceholder')}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="lastName"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.doctorForm.lastName')} *
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="medical-input mt-2"
                    placeholder={t('auth.doctorForm.lastNamePlaceholder')}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-blue-900 font-medium">
                    {t('auth.doctorForm.email')} *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="medical-input mt-2"
                    placeholder={t('auth.doctorForm.emailPlaceholder')}
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-blue-900 font-medium">
                    {t('auth.doctorForm.phone')} *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="medical-input mt-2"
                    placeholder={t('auth.doctorForm.phonePlaceholder')}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="dateOfBirth"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.doctorForm.dateOfBirth')} *
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    className="medical-input mt-2"
                  />
                </div>
                <div>
                  <Label className="text-blue-900 font-medium">{t('auth.doctorForm.gender')} *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      handleInputChange("gender", value)
                    }
                  >
                    <SelectTrigger className="medical-select mt-2">
                      <SelectValue placeholder={t('auth.doctorForm.genderPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{t('auth.doctorForm.male')}</SelectItem>
                      <SelectItem value="female">{t('auth.doctorForm.female')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="password"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.doctorForm.password')} *
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="medical-input mt-2"
                    placeholder={t('auth.doctorForm.passwordPlaceholder')}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="confirmPassword"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.doctorForm.confirmPassword')} *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className="medical-input mt-2"
                    placeholder={t('auth.doctorForm.confirmPasswordPlaceholder')}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button onClick={nextStep} className="btn-primary px-8 py-3">
                  {t('auth.doctorForm.next')}
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="text-center mb-8">
                <Stethoscope className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  {t('auth.doctorForm.step2Title')}
                </h2>
                <p className="text-blue-700">
                  {t('auth.doctorForm.step2Subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="medicalLicenseNumber"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.doctorForm.licenseNumber')} *
                  </Label>
                  <Input
                    id="medicalLicenseNumber"
                    value={formData.medicalLicenseNumber}
                    onChange={(e) =>
                      handleInputChange("medicalLicenseNumber", e.target.value)
                    }
                    className="medical-input mt-2"
                    placeholder={t('auth.doctorForm.licenseNumberPlaceholder')}
                  />
                </div>
                <div>
                  <Label className="text-blue-900 font-medium">
                    {t('auth.doctorForm.specialty')} *
                  </Label>
                  <Select
                    value={formData.specialty}
                    onValueChange={(value) =>
                      handleInputChange("specialty", value)
                    }
                  >
                    <SelectTrigger className="medical-select mt-2">
                      <SelectValue placeholder={t('auth.doctorForm.specialtyPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem
                          key={specialty}
                          value={specialty.toLowerCase().replace(/\s+/g, "-")}
                        >
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="subSpecialty"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.doctorForm.subSpecialty')}
                  </Label>
                  <Input
                    id="subSpecialty"
                    value={formData.subSpecialty}
                    onChange={(e) =>
                      handleInputChange("subSpecialty", e.target.value)
                    }
                    className="medical-input mt-2"
                    placeholder={t('auth.doctorForm.subSpecialtyPlaceholder')}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="yearsOfExperience"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.doctorForm.yearsExperience')} *
                  </Label>
                  <Select
                    value={formData.yearsOfExperience}
                    onValueChange={(value) =>
                      handleInputChange("yearsOfExperience", value)
                    }
                  >
                    <SelectTrigger className="medical-select mt-2">
                      <SelectValue placeholder={t('auth.doctorForm.yearsExperiencePlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3">{lang === 'ar' ? '١-٣ سنوات' : '1-3 years'}</SelectItem>
                      <SelectItem value="4-7">{lang === 'ar' ? '٤-٧ سنوات' : '4-7 years'}</SelectItem>
                      <SelectItem value="8-15">{lang === 'ar' ? '٨-١٥ سنة' : '8-15 years'}</SelectItem>
                      <SelectItem value="16-25">{lang === 'ar' ? '١٦-٢٥ سنة' : '16-25 years'}</SelectItem>
                      <SelectItem value="25+">{lang === 'ar' ? '٢٥+ سنة' : '25+ years'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="hospitalAffiliation"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.doctorForm.hospitalAffiliation')} *
                  </Label>
                  <Input
                    id="hospitalAffiliation"
                    value={formData.hospitalAffiliation}
                    onChange={(e) =>
                      handleInputChange("hospitalAffiliation", e.target.value)
                    }
                    className="medical-input mt-2"
                    placeholder={t('auth.doctorForm.hospitalAffiliationPlaceholder')}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="clinicAddress"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.doctorForm.clinicAddress')}
                  </Label>
                  <Input
                    id="clinicAddress"
                    value={formData.clinicAddress}
                    onChange={(e) =>
                      handleInputChange("clinicAddress", e.target.value)
                    }
                    className="medical-input mt-2"
                    placeholder={t('auth.doctorForm.clinicAddressPlaceholder')}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="consultationFee"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.doctorForm.consultationFee')}
                  </Label>
                  <Input
                    id="consultationFee"
                    type="number"
                    value={formData.consultationFee}
                    onChange={(e) =>
                      handleInputChange("consultationFee", e.target.value)
                    }
                    className="medical-input mt-2"
                    placeholder={t('auth.doctorForm.consultationFeePlaceholder')}
                  />
                </div>
                <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                  <Label
                    htmlFor="languages"
                    className={`${isRTL ? 'text-right' : 'text-left'} text-blue-900 font-medium`}
                  >
                    {t('auth.doctorForm.languages')} *
                  </Label>
                  <Input
                    id="languages"
                    value={formData.languages}
                    onChange={(e) =>
                      handleInputChange("languages", e.target.value)
                    }
                    className={`medical-input mt-2 ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={t('auth.doctorForm.languagesPlaceholder')}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="btn-secondary px-8 py-3"
                >
                  {t('auth.doctorForm.previous')}
                </Button>
                <Button onClick={nextStep} className="btn-primary px-8 py-3">
                  {t('auth.doctorForm.next')}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="text-center mb-8">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  {t('auth.doctorForm.step3Title')}
                </h2>
                <p className="text-blue-700">
                  {t('auth.doctorForm.step3Subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="medicalSchool"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.doctorForm.medicalSchool')} *
                  </Label>
                  <Input
                    id="medicalSchool"
                    value={formData.medicalSchool}
                    onChange={(e) =>
                      handleInputChange("medicalSchool", e.target.value)
                    }
                    className="medical-input mt-2"
                    placeholder={t('auth.doctorForm.medicalSchoolPlaceholder')}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="graduationYear"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.doctorForm.graduationYear')} *
                  </Label>
                  <Input
                    id="graduationYear"
                    type="number"
                    value={formData.graduationYear}
                    onChange={(e) =>
                      handleInputChange("graduationYear", e.target.value)
                    }
                    className="medical-input mt-2"
                    placeholder={t('auth.doctorForm.graduationYearPlaceholder')}
                    min="1970"
                    max="2024"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="residencyProgram"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.doctorForm.residencyProgram')} *
                  </Label>
                  <Input
                    id="residencyProgram"
                    value={formData.residencyProgram}
                    onChange={(e) =>
                      handleInputChange("residencyProgram", e.target.value)
                    }
                    className="medical-input mt-2"
                    placeholder={t('auth.doctorForm.residencyProgramPlaceholder')}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="fellowshipProgram"
                    className="text-blue-900 font-medium"
                  >
                    {t('auth.doctorForm.fellowshipProgram')}
                  </Label>
                  <Input
                    id="fellowshipProgram"
                    value={formData.fellowshipProgram}
                    onChange={(e) =>
                      handleInputChange("fellowshipProgram", e.target.value)
                    }
                    className="medical-input mt-2"
                    placeholder={t('auth.doctorForm.fellowshipProgramPlaceholder')}
                  />
                </div>
                <div className={`md:col-span-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className={`${isRTL ? 'flex flex-col items-end gap-1' : 'flex flex-col items-start gap-1'}`}>
                    <Label
                      htmlFor="boardCertifications"
                      className={`${isRTL ? 'text-right' : 'text-left'} text-blue-900 font-medium`}
                    >
                      {t('auth.doctorForm.boardCertifications')}
                    </Label>
                    <p className={`${isRTL ? 'text-right' : 'text-left'} text-sm text-blue-700`}>{t('auth.doctorForm.boardCertificationsPlaceholder')}</p>
                  </div>
                  <textarea
                    id="boardCertifications"
                    value={formData.boardCertifications}
                    onChange={(e) =>
                      handleInputChange("boardCertifications", e.target.value)
                    }
                    className={`medical-input mt-2 min-h-20 resize-none w-full ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={t('auth.doctorForm.boardCertificationsPlaceholder')}
                    rows={3}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="btn-secondary px-8 py-3"
                >
                  {t('auth.doctorForm.previous')}
                </Button>
                <Button onClick={nextStep} className="btn-primary px-8 py-3">
                  {t('auth.doctorForm.next')}
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="text-center mb-8">
                <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  {t('auth.doctorForm.step4Title')}
                </h2>
                <p className="text-blue-700">
                  {t('auth.doctorForm.step4Subtitle')}
                </p>
              </div>

              <div className="space-y-6">
                {/* Medical License */}
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-blue-900 mb-2">
                      {t('auth.doctorForm.licenseDocument')} *
                    </h4>
                    <p className="text-sm text-blue-600 mb-4">
                      {t('auth.doctorForm.licenseDocumentDesc')}
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) =>
                        handleFileUpload("licenseDocument", e.target.files[0])
                      }
                      className="hidden"
                      id="license-upload"
                    />
                    <label
                      htmlFor="license-upload"
                      className="btn-secondary inline-block px-6 py-2 rounded cursor-pointer"
                    >
                      {uploadStatus.license ? `✓ ${t('auth.doctorForm.uploaded')}` : t('auth.doctorForm.uploadButton')}
                    </label>
                  </div>
                </div>

                {/* Medical Diploma */}
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-6">
                  <div className="text-center">
                    <Award className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-blue-900 mb-2">
                      {t('auth.doctorForm.diplomaDocument')} *
                    </h4>
                    <p className="text-sm text-blue-600 mb-4">
                      {t('auth.doctorForm.diplomaDocumentDesc')}
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) =>
                        handleFileUpload("diplomaDocument", e.target.files[0])
                      }
                      className="hidden"
                      id="diploma-upload"
                    />
                    <label
                      htmlFor="diploma-upload"
                      className="btn-secondary inline-block px-6 py-2 rounded cursor-pointer"
                    >
                      {uploadStatus.diploma ? `✓ ${t('auth.doctorForm.uploaded')}` : t('auth.doctorForm.uploadButton')}
                    </label>
                  </div>
                </div>

                {/* CV */}
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-6">
                  <div className="text-center">
                    <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-blue-900 mb-2">
                      {t('auth.doctorForm.cvDocument')} *
                    </h4>
                    <p className="text-sm text-blue-600 mb-4">
                      {t('auth.doctorForm.cvDocumentDesc')}
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) =>
                        handleFileUpload("cvDocument", e.target.files[0])
                      }
                      className="hidden"
                      id="cv-upload"
                    />
                    <label
                      htmlFor="cv-upload"
                      className="btn-secondary inline-block px-6 py-2 rounded cursor-pointer"
                    >
                      {uploadStatus.cv ? `✓ ${t('auth.doctorForm.uploaded')}` : t('auth.doctorForm.uploadButton')}
                    </label>
                  </div>
                </div>

                {/* Profile Photo */}
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-6">
                  <div className="text-center">
                    <User className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-blue-900 mb-2">
                      {t('auth.doctorForm.profilePhoto')}
                    </h4>
                    <p className="text-sm text-blue-600 mb-4">
                      {t('auth.doctorForm.profilePhotoDesc')}
                    </p>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) =>
                        handleFileUpload("profilePhoto", e.target.files[0])
                      }
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="btn-secondary inline-block px-6 py-2 rounded cursor-pointer"
                    >
                      {uploadStatus.photo ? `✓ ${t('auth.doctorForm.uploaded')}` : t('auth.doctorForm.uploadButton')}
                    </label>
                  </div>
                </div>
              </div>

              {/* Verification Notice */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">
                      {t('auth.doctorForm.verificationNote')}
                    </h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>
                        {lang === 'ar' ? '• سيتم مراجعة جميع المستندات من قبل فريق التحقق الطبي' : '• All documents will be reviewed by our medical verification team'}
                      </p>
                      <p>{lang === 'ar' ? '• يستغرق التحقق عادة من 2-5 أيام عمل' : '• Verification typically takes 2-5 business days'}</p>
                      <p>
                        {lang === 'ar' ? '• ستتلقى تحديثات بالبريد الإلكتروني حول حالة طلبك' : '• You\'ll receive email updates on your application status'}
                      </p>
                      <p>
                        {lang === 'ar' ? '• قد يُطلب منك مستندات إضافية إذا لزم الأمر' : '• Additional documentation may be requested if needed'}
                      </p>
                      <p>
                        {lang === 'ar' ? '• سيتم تفعيل ملفك الشخصي فقط بعد التحقق بنجاح' : '• Your profile will be activated only after successful verification'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mt-6 p-6 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">
                  {lang === 'ar' ? 'الاتفاقية المهنية' : 'Professional Agreement'}
                </h4>
                <div className="text-sm text-blue-700 space-y-2">
                  <p>
                    {lang === 'ar' ? '• أؤكد أن جميع المعلومات المقدمة دقيقة وكاملة' : '• I certify that all information provided is accurate and complete'}
                  </p>
                  <p>
                    {lang === 'ar' ? '• أوافق على تقديم إرشادات طبية مهنية وأخلاقية' : '• I agree to provide professional, ethical medical guidance'}
                  </p>
                  <p>
                    {lang === 'ar' ? '• أفهم أن المرضى يجب أن يطلبوا الرعاية الشخصية للحالات الخطيرة' : '• I understand that patients should seek in-person care for serious conditions'}
                  </p>
                  <p>
                    {lang === 'ar' ? '• سأحافظ على سرية المريض ومعايير الخصوصية' : '• I will maintain patient confidentiality and privacy standards'}
                  </p>
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <input type="checkbox" id="doctor-terms" className="mt-1" />
                  <label
                    htmlFor="doctor-terms"
                    className="text-sm text-blue-700"
                  >
                    {lang === 'ar' ? (
                      <>
                        أوافق على{" "}
                        <Link
                          href="/doctor-terms"
                          className="text-primary hover:underline"
                        >
                          شروط المهنيين الطبيين
                        </Link>
                        ، و{" "}
                        <Link
                          href="/privacy"
                          className="text-primary hover:underline"
                        >
                          سياسة الخصوصية
                        </Link>
                        ، وإرشادات الممارسة الطبية المصرية.
                      </>
                    ) : (
                      <>
                        I agree to the{" "}
                        <Link
                          href="/doctor-terms"
                          className="text-primary hover:underline"
                        >
                          Medical Professional Terms
                        </Link>
                        ,{" "}
                        <Link
                          href="/privacy"
                          className="text-primary hover:underline"
                        >
                          Privacy Policy
                        </Link>
                        , and Egyptian Medical Practice Guidelines.
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="btn-secondary px-8 py-3"
                >
                  {t('auth.doctorForm.previous')}
                </Button>
                <Button
                  className="btn-primary px-8 py-3"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? t('auth.doctorForm.submitting') : t('auth.doctorForm.submit')}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
