"use client";

import { useState } from "react";
import api from "@/lib/axios";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  UserCheck,
  Stethoscope,
  Shield,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button.jsx";
import { Card, CardContent } from "../../../components/ui/card.jsx";
import { Input } from "../../../components/ui/input.jsx";
import { Label } from "../../../components/ui/label.jsx";

const t = (lang) => ({
  signInAs: lang === "en" ? "Sign in as:" : "سجّل الدخول كـ:",
  patient: lang === "en" ? "Patient" : "مريض",
  patientHint: lang === "en" ? "Seek medical advice" : "اطلب المشورة الطبية",
  doctor: lang === "en" ? "Doctor" : "طبيب",
  doctorHint: lang === "en" ? "Provide consultation" : "قدّم الاستشارة",
  emailAddress: lang === "en" ? "Email Address" : "البريد الإلكتروني",
  emailPlaceholderPatient:
    lang === "en" ? "patient@example.com" : "patient@example.com",
  emailPlaceholderDoctor:
    lang === "en" ? "dr.yourname@example.com" : "dr.yourname@example.com",
  password: lang === "en" ? "Password" : "كلمة المرور",
  passwordPlaceholder:
    lang === "en" ? "Enter your password" : "أدخل كلمة المرور",
  rememberMe: lang === "en" ? "Remember me" : "تذكرني",
  forgotPassword: lang === "en" ? "Forgot password?" : "هل نسيت كلمة المرور؟",
  demoCredentials: lang === "en" ? "Demo Credentials:" : "بيانات تجريبية:",
  demoPatient: lang === "en" ? "Patient:" : "مريض:",
  demoDoctor: lang === "en" ? "Doctor:" : "طبيب:",
  signingIn: lang === "en" ? "Signing In..." : "جاري تسجيل الدخول...",
  signInSecurely: lang === "en" ? "Sign In Securely" : "تسجيل الدخول بأمان",
  needHelp:
    lang === "en" ? "Need help with your account?" : "تحتاج مساعدة في حسابك؟",
  contactSupport: lang === "en" ? "Contact Support" : "اتصل بالدعم",
  verifyAccount: lang === "en" ? "Verify Account" : "تأكيد الحساب",
  protectedTitle: lang === "en" ? "Your data is protected" : "بياناتك محمية",
  protectedDesc:
    lang === "en"
      ? "We use industry-standard encryption to keep your medical information secure and private."
      : "نستخدم تشفيراً بمعايير صناعية للحفاظ على معلوماتك الطبية آمنة وسرّية.",
  errFillAll:
    lang === "en"
      ? "Please fill in all required fields"
      : "يرجى ملء جميع الحقول المطلوبة",
  errEmailFormat:
    lang === "en"
      ? "Please enter a valid email address"
      : "يرجى إدخال بريد إلكتروني صالح",
  errInvalid:
    lang === "en"
      ? "Invalid email or password. Please try again."
      : "البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مرة أخرى.",
});

export function SignInForm({ lang = "ar" }) {
  const isRTL = lang === "ar";
  const i = t(lang);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "patient", // 'patient' or 'doctor'
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.email || !formData.password) {
      setError(i.errFillAll);
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setError(i.errEmailFormat);
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      const { token, role } = res.data;
      if (!token) throw new Error("No token returned");
      if (typeof window !== "undefined") {
        localStorage.setItem("sehatalk_token", token);
        localStorage.setItem("sehatalk_role", role);
      }
      router.push(
        role === "doctor" ? "/dashboard/doctor" : "/dashboard/patient"
      );
    } catch (err) {
      setError(i.errInvalid);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="medical-card border-0 shadow-xl rounded-2xl overflow-hidden">
      <CardContent className="p-8">
        {/* User Type Selection */}
        <div className="mb-6">
          <Label className="text-blue-900 font-medium mb-3 block">
            {i.signInAs}
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleInputChange("userType", "patient")}
              className={`p-4 rounded-xl border-2 transition-all ${
                formData.userType === "patient"
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-blue-200 hover:border-primary/30"
              }`}
            >
              <UserCheck
                className={`w-6 h-6 mx-auto mb-2 ${
                  formData.userType === "patient"
                    ? "text-primary"
                    : "text-blue-400"
                }`}
              />
              <div
                className={`text-sm font-medium ${
                  formData.userType === "patient"
                    ? "text-primary"
                    : "text-blue-600"
                }`}
              >
                {i.patient}
              </div>
              <div className="text-xs text-blue-500 mt-1">{i.patientHint}</div>
            </button>

            <button
              onClick={() => handleInputChange("userType", "doctor")}
              className={`p-4 rounded-xl border-2 transition-all ${
                formData.userType === "doctor"
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-blue-200 hover:border-primary/30"
              }`}
            >
              <Stethoscope
                className={`w-6 h-6 mx-auto mb-2 ${
                  formData.userType === "doctor"
                    ? "text-primary"
                    : "text-blue-400"
                }`}
              />
              <div
                className={`text-sm font-medium ${
                  formData.userType === "doctor"
                    ? "text-primary"
                    : "text-blue-600"
                }`}
              >
                {i.doctor}
              </div>
              <div className="text-xs text-blue-500 mt-1">{i.doctorHint}</div>
            </button>
          </div>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="text-blue-900 font-medium">
              {i.emailAddress}
            </Label>
            <div className="relative mt-2">
              <Mail
                className={`absolute ${
                  isRTL ? "right-3" : "left-3"
                } top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400`}
              />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`medical-input ${isRTL ? "pr-10" : "pl-10"}`}
                placeholder={
                  formData.userType === "patient"
                    ? i.emailPlaceholderPatient
                    : i.emailPlaceholderDoctor
                }
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="password" className="text-blue-900 font-medium">
              {i.password}
            </Label>
            <div className="relative mt-2">
              <Lock
                className={`absolute ${
                  isRTL ? "right-3" : "left-3"
                } top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400`}
              />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`medical-input ${
                  isRTL ? "pr-10 pl-12" : "pl-10 pr-12"
                }`}
                placeholder={i.passwordPlaceholder}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute ${
                  isRTL ? "left-3" : "right-3"
                } top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-primary transition-colors`}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div
            className={`flex items-center justify-between ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) =>
                  handleInputChange("rememberMe", e.target.checked)
                }
                className="w-4 h-4 text-primary border-blue-300 rounded focus:ring-primary focus:ring-offset-0"
              />
              <span className="text-sm text-blue-600">{i.rememberMe}</span>
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              {i.forgotPassword}
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          {/* Demo Credentials */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              {i.demoCredentials}
            </h4>
            <div className="text-xs text-blue-700 space-y-1">
              <p>
                <strong>{i.demoPatient}</strong> demo@patient.com / demo123
              </p>
              <p>
                <strong>{i.demoDoctor}</strong> demo@doctor.com / demo123
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="btn-primary w-full py-3 text-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {i.signingIn}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {i.signInSecurely}
              </div>
            )}
          </Button>
        </form>

        {/* Additional Options */}
        <div className="mt-8 pt-6 border-t border-blue-100">
          <div className="text-center">
            <p className="text-sm text-blue-600 mb-4">{i.needHelp}</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button
                variant="outline"
                className="btn-secondary text-sm px-4 py-2"
                asChild
              >
                <Link href="/support">{i.contactSupport}</Link>
              </Button>
              <Button
                variant="outline"
                className="btn-secondary text-sm px-4 py-2"
                asChild
              >
                <Link href="/auth/verify-account">{i.verifyAccount}</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-3 bg-green-50 rounded-lg">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
            <div className="text-xs text-green-700">
              <p className="font-medium mb-1">{i.protectedTitle}</p>
              <p>{i.protectedDesc}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
