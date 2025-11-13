import { PatientRegistrationForm } from './PatientRegistrationForm.jsx';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Patient Registration – SehaTalk",
  description: "Create your patient account on SehaTalk and join our trusted medical community.",
};

export default function PatientSignup() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="hero-bg py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center mb-6">
            <Link href="/auth" className="flex items-center gap-2 text-blue-700 hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Auth Options
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Patient Registration
            </h1>
            <p className="text-xl text-blue-700 mb-8">
              Join our trusted medical community and get personalized healthcare guidance
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl -mt-8 pb-12 relative z-10">
        <PatientRegistrationForm />
      </div>
    </div>
  );
}