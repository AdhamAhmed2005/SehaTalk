"use client";

import { useState } from 'react';
import { Stethoscope, Upload, FileText, Award, Shield, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../../components/ui/button.jsx';
import { Card, CardContent } from '../../../components/ui/card.jsx';
import { Input } from '../../../components/ui/input.jsx';
import { Label } from '../../../components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select.jsx';

export function DoctorRegistrationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    
    // Professional Information
    medicalLicenseNumber: '',
    specialty: '',
    subSpecialty: '',
    yearsOfExperience: '',
    hospitalAffiliation: '',
    clinicAddress: '',
    consultationFee: '',
    availableHours: '',
    languages: '',
    
    // Education & Certifications
    medicalSchool: '',
    graduationYear: '',
    residencyProgram: '',
    fellowshipProgram: '',
    boardCertifications: '',
    
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({ ...prev, [field]: file }));
    setUploadStatus(prev => ({ ...prev, [field.replace('Document', '').replace('Photo', 'photo')]: true }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const specialties = [
    "General Practice", "Internal Medicine", "Cardiology", "Dermatology", 
    "Pediatrics", "Gynecology", "Orthopedics", "Neurology", "Psychiatry", 
    "Surgery", "Radiology", "Anesthesiology", "Ophthalmology", "ENT",
    "Urology", "Emergency Medicine", "Family Medicine", "Endocrinology",
    "Gastroenterology", "Pulmonology", "Rheumatology", "Oncology"
  ];

  return (
    <>
      {/* Progress Bar */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-4">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step >= stepNum ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNum}
              </div>
              {stepNum < 4 && (
                <div className={`w-12 h-1 mx-2 transition-colors ${
                  step > stepNum ? 'bg-primary' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Card className="medical-card border-0 shadow-xl rounded-2xl overflow-hidden">
        <CardContent className="p-8">
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <User className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Personal Information</h2>
                <p className="text-blue-700">Let's start with your personal details</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-blue-900 font-medium">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="medical-input mt-2"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-blue-900 font-medium">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="medical-input mt-2"
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-blue-900 font-medium">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="medical-input mt-2"
                    placeholder="dr.yourname@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-blue-900 font-medium">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="medical-input mt-2"
                    placeholder="+20 1XX XXX XXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth" className="text-blue-900 font-medium">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="medical-input mt-2"
                  />
                </div>
                <div>
                  <Label className="text-blue-900 font-medium">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger className="medical-select mt-2">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="password" className="text-blue-900 font-medium">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="medical-input mt-2"
                    placeholder="Create a strong password"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-blue-900 font-medium">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="medical-input mt-2"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button onClick={nextStep} className="btn-primary px-8 py-3">
                  Next: Professional Info
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="text-center mb-8">
                <Stethoscope className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Professional Information</h2>
                <p className="text-blue-700">Tell us about your medical practice and expertise</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="medicalLicenseNumber" className="text-blue-900 font-medium">Medical License Number *</Label>
                  <Input
                    id="medicalLicenseNumber"
                    value={formData.medicalLicenseNumber}
                    onChange={(e) => handleInputChange('medicalLicenseNumber', e.target.value)}
                    className="medical-input mt-2"
                    placeholder="EG-12345678"
                  />
                </div>
                <div>
                  <Label className="text-blue-900 font-medium">Primary Specialty *</Label>
                  <Select value={formData.specialty} onValueChange={(value) => handleInputChange('specialty', value)}>
                    <SelectTrigger className="medical-select mt-2">
                      <SelectValue placeholder="Select your specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty.toLowerCase().replace(/\s+/g, '-')}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="subSpecialty" className="text-blue-900 font-medium">Sub-specialty (if any)</Label>
                  <Input
                    id="subSpecialty"
                    value={formData.subSpecialty}
                    onChange={(e) => handleInputChange('subSpecialty', e.target.value)}
                    className="medical-input mt-2"
                    placeholder="e.g., Interventional Cardiology"
                  />
                </div>
                <div>
                  <Label htmlFor="yearsOfExperience" className="text-blue-900 font-medium">Years of Experience *</Label>
                  <Select value={formData.yearsOfExperience} onValueChange={(value) => handleInputChange('yearsOfExperience', value)}>
                    <SelectTrigger className="medical-select mt-2">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="4-7">4-7 years</SelectItem>
                      <SelectItem value="8-15">8-15 years</SelectItem>
                      <SelectItem value="16-25">16-25 years</SelectItem>
                      <SelectItem value="25+">25+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="hospitalAffiliation" className="text-blue-900 font-medium">Hospital/Clinic Affiliation *</Label>
                  <Input
                    id="hospitalAffiliation"
                    value={formData.hospitalAffiliation}
                    onChange={(e) => handleInputChange('hospitalAffiliation', e.target.value)}
                    className="medical-input mt-2"
                    placeholder="Name of hospital or clinic where you practice"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="clinicAddress" className="text-blue-900 font-medium">Practice Address</Label>
                  <Input
                    id="clinicAddress"
                    value={formData.clinicAddress}
                    onChange={(e) => handleInputChange('clinicAddress', e.target.value)}
                    className="medical-input mt-2"
                    placeholder="Full address of your practice (optional for privacy)"
                  />
                </div>
                <div>
                  <Label htmlFor="consultationFee" className="text-blue-900 font-medium">Consultation Fee (EGP)</Label>
                  <Input
                    id="consultationFee"
                    type="number"
                    value={formData.consultationFee}
                    onChange={(e) => handleInputChange('consultationFee', e.target.value)}
                    className="medical-input mt-2"
                    placeholder="500"
                  />
                </div>
                <div>
                  <Label htmlFor="languages" className="text-blue-900 font-medium">Languages Spoken *</Label>
                  <Input
                    id="languages"
                    value={formData.languages}
                    onChange={(e) => handleInputChange('languages', e.target.value)}
                    className="medical-input mt-2"
                    placeholder="Arabic, English, French"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button onClick={prevStep} variant="outline" className="btn-secondary px-8 py-3">
                  Back
                </Button>
                <Button onClick={nextStep} className="btn-primary px-8 py-3">
                  Next: Education
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="text-center mb-8">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Education & Certifications</h2>
                <p className="text-blue-700">Share your educational background and qualifications</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="medicalSchool" className="text-blue-900 font-medium">Medical School *</Label>
                  <Input
                    id="medicalSchool"
                    value={formData.medicalSchool}
                    onChange={(e) => handleInputChange('medicalSchool', e.target.value)}
                    className="medical-input mt-2"
                    placeholder="Cairo University Faculty of Medicine"
                  />
                </div>
                <div>
                  <Label htmlFor="graduationYear" className="text-blue-900 font-medium">Graduation Year *</Label>
                  <Input
                    id="graduationYear"
                    type="number"
                    value={formData.graduationYear}
                    onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                    className="medical-input mt-2"
                    placeholder="2015"
                    min="1970"
                    max="2024"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="residencyProgram" className="text-blue-900 font-medium">Residency Program *</Label>
                  <Input
                    id="residencyProgram"
                    value={formData.residencyProgram}
                    onChange={(e) => handleInputChange('residencyProgram', e.target.value)}
                    className="medical-input mt-2"
                    placeholder="Internal Medicine Residency - Ain Shams University"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="fellowshipProgram" className="text-blue-900 font-medium">Fellowship Program (if applicable)</Label>
                  <Input
                    id="fellowshipProgram"
                    value={formData.fellowshipProgram}
                    onChange={(e) => handleInputChange('fellowshipProgram', e.target.value)}
                    className="medical-input mt-2"
                    placeholder="Cardiology Fellowship - National Heart Institute"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="boardCertifications" className="text-blue-900 font-medium">Board Certifications</Label>
                  <textarea
                    id="boardCertifications"
                    value={formData.boardCertifications}
                    onChange={(e) => handleInputChange('boardCertifications', e.target.value)}
                    className="medical-input mt-2 min-h-20 resize-none"
                    placeholder="List your board certifications and professional memberships"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button onClick={prevStep} variant="outline" className="btn-secondary px-8 py-3">
                  Back
                </Button>
                <Button onClick={nextStep} className="btn-primary px-8 py-3">
                  Next: Document Upload
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="text-center mb-8">
                <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Document Verification</h2>
                <p className="text-blue-700">Upload required documents for verification (PDF format preferred)</p>
              </div>

              <div className="space-y-6">
                {/* Medical License */}
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-blue-900 mb-2">Medical License Document *</h4>
                    <p className="text-sm text-blue-600 mb-4">Upload a clear copy of your medical license</p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('licenseDocument', e.target.files[0])}
                      className="hidden"
                      id="license-upload"
                    />
                    <label htmlFor="license-upload" className="btn-secondary inline-block px-6 py-2 rounded cursor-pointer">
                      {uploadStatus.license ? '✓ Uploaded' : 'Choose File'}
                    </label>
                  </div>
                </div>

                {/* Medical Diploma */}
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-6">
                  <div className="text-center">
                    <Award className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-blue-900 mb-2">Medical Diploma *</h4>
                    <p className="text-sm text-blue-600 mb-4">Upload your medical school diploma</p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('diplomaDocument', e.target.files[0])}
                      className="hidden"
                      id="diploma-upload"
                    />
                    <label htmlFor="diploma-upload" className="btn-secondary inline-block px-6 py-2 rounded cursor-pointer">
                      {uploadStatus.diploma ? '✓ Uploaded' : 'Choose File'}
                    </label>
                  </div>
                </div>

                {/* CV */}
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-6">
                  <div className="text-center">
                    <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-blue-900 mb-2">Curriculum Vitae *</h4>
                    <p className="text-sm text-blue-600 mb-4">Upload your current CV/Resume</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload('cvDocument', e.target.files[0])}
                      className="hidden"
                      id="cv-upload"
                    />
                    <label htmlFor="cv-upload" className="btn-secondary inline-block px-6 py-2 rounded cursor-pointer">
                      {uploadStatus.cv ? '✓ Uploaded' : 'Choose File'}
                    </label>
                  </div>
                </div>

                {/* Profile Photo */}
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-6">
                  <div className="text-center">
                    <User className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-blue-900 mb-2">Professional Photo</h4>
                    <p className="text-sm text-blue-600 mb-4">Upload a professional headshot (optional but recommended)</p>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('profilePhoto', e.target.files[0])}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="btn-secondary inline-block px-6 py-2 rounded cursor-pointer">
                      {uploadStatus.photo ? '✓ Uploaded' : 'Choose File'}
                    </label>
                  </div>
                </div>
              </div>

              {/* Verification Notice */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Verification Process</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>• All documents will be reviewed by our medical verification team</p>
                      <p>• Verification typically takes 2-5 business days</p>
                      <p>• You'll receive email updates on your application status</p>
                      <p>• Additional documentation may be requested if needed</p>
                      <p>• Your profile will be activated only after successful verification</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mt-6 p-6 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">Professional Agreement</h4>
                <div className="text-sm text-blue-700 space-y-2">
                  <p>• I certify that all information provided is accurate and complete</p>
                  <p>• I agree to provide professional, ethical medical guidance</p>
                  <p>• I understand that patients should seek in-person care for serious conditions</p>
                  <p>• I will maintain patient confidentiality and privacy standards</p>
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <input type="checkbox" id="doctor-terms" className="mt-1" />
                  <label htmlFor="doctor-terms" className="text-sm text-blue-700">
                    I agree to the <Link href="/doctor-terms" className="text-primary hover:underline">Medical Professional Terms</Link>, <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>, and Egyptian Medical Practice Guidelines.
                  </label>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button onClick={prevStep} variant="outline" className="btn-secondary px-8 py-3">
                  Back
                </Button>
                <Button className="btn-primary px-8 py-3">
                  Submit for Verification
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}