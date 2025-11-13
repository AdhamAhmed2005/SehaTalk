import { Metadata } from 'next';
import Link from 'next/link';
import { Stethoscope, ArrowLeft } from 'lucide-react';
import { SignInForm } from './SignInForm.jsx';

export const metadata = {
  title: 'Sign In - SehaTalk | Access Your Medical Account',
  description: 'Sign in to your SehaTalk account. Access personalized healthcare advice, track your medical history, and connect with verified doctors.',
  keywords: 'sign in, login, medical account, healthcare platform, doctor consultation, patient portal',
};

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Stethoscope className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-blue-900">SehaTalk</span>
            </Link>
            <Link 
              href="/" 
              className="flex items-center gap-2 text-blue-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Stethoscope className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Welcome Back</h1>
            <p className="text-blue-600">
              Sign in to access your medical dashboard and continue your healthcare journey
            </p>
          </div>

          {/* Sign In Form Component */}
          <SignInForm />

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <p className="text-blue-600 mb-4">
              Don't have an account?{' '}
              <Link href="/auth" className="text-primary hover:underline font-medium">
                Create Account
              </Link>
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-blue-500 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <span className="text-blue-300">•</span>
              <Link href="/terms" className="text-blue-500 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <span className="text-blue-300">•</span>
              <Link href="/help" className="text-blue-500 hover:text-primary transition-colors">
                Help & Support
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-blue-100">
            <div className="text-center">
              <p className="text-xs text-blue-500 mb-3">Trusted by healthcare professionals</p>
              <div className="flex items-center justify-center gap-8 text-blue-400">
                <div className="text-center">
                  <div className="font-bold text-primary">500+</div>
                  <div className="text-xs">Verified Doctors</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-primary">10K+</div>
                  <div className="text-xs">Active Patients</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-primary">24/7</div>
                  <div className="text-xs">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}