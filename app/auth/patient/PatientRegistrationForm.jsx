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

export function PatientRegistrationForm() {
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const payload = {
        role: "patient",
        ...formData,
      };

      const { data } = await axios.post("/api/auth/signup", payload);
      setSuccess(data?.message || "Signup successful");
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
                  Personal Information
                </h2>
                <p className="text-blue-700">
                  Let's start with your basic details
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="firstName"
                    className="text-blue-900 font-medium"
                  >
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="medical-input mt-2"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="lastName"
                    className="text-blue-900 font-medium"
                  >
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="medical-input mt-2"
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-blue-900 font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="medical-input mt-2"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-blue-900 font-medium">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="medical-input mt-2"
                    placeholder="+20 1XX XXX XXXX"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="dateOfBirth"
                    className="text-blue-900 font-medium"
                  >
                    Date of Birth *
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
                  <Label className="text-blue-900 font-medium">Gender *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      handleInputChange("gender", value)
                    }
                  >
                    <SelectTrigger className="medical-select mt-2">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="password"
                    className="text-blue-900 font-medium"
                  >
                    Password *
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="medical-input mt-2"
                    placeholder="Create a strong password"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="confirmPassword"
                    className="text-blue-900 font-medium"
                  >
                    Confirm Password *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className="medical-input mt-2"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button onClick={nextStep} className="btn-primary px-8 py-3">
                  Next: Medical History
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="text-center mb-8">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  Medical History
                </h2>
                <p className="text-blue-700">
                  Help our doctors provide better care by sharing your medical
                  background
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="height" className="text-blue-900 font-medium">
                    Height (cm)
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
                      className="medical-input pl-10"
                      placeholder="170"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="weight" className="text-blue-900 font-medium">
                    Weight (kg)
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
                      className="medical-input pl-10"
                      placeholder="70"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-blue-900 font-medium">
                    Blood Type
                  </Label>
                  <Select
                    value={formData.bloodType}
                    onValueChange={(value) =>
                      handleInputChange("bloodType", value)
                    }
                  >
                    <SelectTrigger className="medical-select mt-2">
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a+">A+</SelectItem>
                      <SelectItem value="a-">A-</SelectItem>
                      <SelectItem value="b+">B+</SelectItem>
                      <SelectItem value="b-">B-</SelectItem>
                      <SelectItem value="ab+">AB+</SelectItem>
                      <SelectItem value="ab-">AB-</SelectItem>
                      <SelectItem value="o+">O+</SelectItem>
                      <SelectItem value="o-">O-</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-blue-900 font-medium">
                    Smoking Status
                  </Label>
                  <Select
                    value={formData.smokingStatus}
                    onValueChange={(value) =>
                      handleInputChange("smokingStatus", value)
                    }
                  >
                    <SelectTrigger className="medical-select mt-2">
                      <SelectValue placeholder="Select smoking status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never smoked</SelectItem>
                      <SelectItem value="former">Former smoker</SelectItem>
                      <SelectItem value="current">Current smoker</SelectItem>
                      <SelectItem value="occasional">
                        Occasional smoker
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="allergies"
                    className="text-blue-900 font-medium"
                  >
                    Known Allergies
                  </Label>
                  <textarea
                    id="allergies"
                    value={formData.allergies}
                    onChange={(e) =>
                      handleInputChange("allergies", e.target.value)
                    }
                    className="medical-input mt-2 min-h-20 resize-none"
                    placeholder="List any known allergies (medications, foods, environmental, etc.)"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="currentMedications"
                    className="text-blue-900 font-medium"
                  >
                    Current Medications
                  </Label>
                  <textarea
                    id="currentMedications"
                    value={formData.currentMedications}
                    onChange={(e) =>
                      handleInputChange("currentMedications", e.target.value)
                    }
                    className="medical-input mt-2 min-h-20 resize-none"
                    placeholder="List all medications you're currently taking (include dosage if known)"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="chronicConditions"
                    className="text-blue-900 font-medium"
                  >
                    Chronic Conditions
                  </Label>
                  <textarea
                    id="chronicConditions"
                    value={formData.chronicConditions}
                    onChange={(e) =>
                      handleInputChange("chronicConditions", e.target.value)
                    }
                    className="medical-input mt-2 min-h-20 resize-none"
                    placeholder="Any ongoing health conditions (diabetes, hypertension, asthma, etc.)"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="previousSurgeries"
                    className="text-blue-900 font-medium"
                  >
                    Previous Surgeries
                  </Label>
                  <textarea
                    id="previousSurgeries"
                    value={formData.previousSurgeries}
                    onChange={(e) =>
                      handleInputChange("previousSurgeries", e.target.value)
                    }
                    className="medical-input mt-2 min-h-20 resize-none"
                    placeholder="List any surgeries or major medical procedures (include approximate dates)"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="btn-secondary px-8 py-3"
                >
                  Back
                </Button>
                <Button onClick={nextStep} className="btn-primary px-8 py-3">
                  Next: Emergency Contact
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="text-center mb-8">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  Emergency Contact & Final Details
                </h2>
                <p className="text-blue-700">
                  Almost done! Please provide emergency contact information
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">
                    Emergency Contact Information
                  </h3>
                </div>
                <div>
                  <Label
                    htmlFor="emergencyContactName"
                    className="text-blue-900 font-medium"
                  >
                    Contact Name *
                  </Label>
                  <Input
                    id="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={(e) =>
                      handleInputChange("emergencyContactName", e.target.value)
                    }
                    className="medical-input mt-2"
                    placeholder="Emergency contact full name"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="emergencyContactPhone"
                    className="text-blue-900 font-medium"
                  >
                    Contact Phone *
                  </Label>
                  <Input
                    id="emergencyContactPhone"
                    type="tel"
                    value={formData.emergencyContactPhone}
                    onChange={(e) =>
                      handleInputChange("emergencyContactPhone", e.target.value)
                    }
                    className="medical-input mt-2"
                    placeholder="+20 1XX XXX XXXX"
                  />
                </div>
                <div>
                  <Label className="text-blue-900 font-medium">
                    Relationship *
                  </Label>
                  <Select
                    value={formData.emergencyContactRelation}
                    onValueChange={(value) =>
                      handleInputChange("emergencyContactRelation", value)
                    }
                  >
                    <SelectTrigger className="medical-select mt-2">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-blue-900 font-medium">
                    Exercise Frequency
                  </Label>
                  <Select
                    value={formData.exerciseFrequency}
                    onValueChange={(value) =>
                      handleInputChange("exerciseFrequency", value)
                    }
                  >
                    <SelectTrigger className="medical-select mt-2">
                      <SelectValue placeholder="How often do you exercise?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="4-6-weekly">
                        4-6 times per week
                      </SelectItem>
                      <SelectItem value="2-3-weekly">
                        2-3 times per week
                      </SelectItem>
                      <SelectItem value="weekly">Once a week</SelectItem>
                      <SelectItem value="rarely">Rarely</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="familyMedicalHistory"
                    className="text-blue-900 font-medium"
                  >
                    Family Medical History
                  </Label>
                  <textarea
                    id="familyMedicalHistory"
                    value={formData.familyMedicalHistory}
                    onChange={(e) =>
                      handleInputChange("familyMedicalHistory", e.target.value)
                    }
                    className="medical-input mt-2 min-h-24 resize-none"
                    placeholder="Any significant family medical history (heart disease, diabetes, cancer, etc.)"
                    rows={4}
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">
                  Privacy & Terms
                </h4>
                <div className="text-sm text-blue-700 space-y-2">
                  <p>
                    • Your medical information is encrypted and stored securely
                  </p>
                  <p>
                    • Only verified doctors you interact with will see relevant
                    medical details
                  </p>
                  <p>• You can update or delete your information at any time</p>
                  <p>
                    • We follow strict medical privacy regulations (HIPAA
                    equivalent)
                  </p>
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <input type="checkbox" id="terms" className="mt-1" />
                  <label htmlFor="terms" className="text-sm text-blue-700">
                    I agree to the{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    , and consent to the secure storage of my medical
                    information.
                  </label>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="btn-secondary px-8 py-3"
                >
                  Back
                </Button>
                <Button
                  className="btn-primary px-8 py-3"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting
                    ? "Creating Account..."
                    : "Create Patient Account"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
