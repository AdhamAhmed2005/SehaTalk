import { Stethoscope, Users, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../components/ui/button.jsx';
import { Card, CardContent } from '../../components/ui/card.jsx';

export const metadata = {
  title: "Join SehaTalk – Patient or Doctor Registration",
  description: "Choose your role and join Egypt's most trusted medical Q&A platform. Register as a patient to get medical guidance or as a doctor to help patients.",
};

export default function AuthOptions() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero-bg pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">Trusted Medical Community</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-blue-900">
            Join <span className="section-header">SehaTalk</span>
          </h1>
          <p className="text-xl text-blue-700 leading-relaxed max-w-3xl mx-auto mb-8">
            Choose how you'd like to join Egypt's most trusted medical community. 
            Get expert healthcare guidance or share your medical expertise with those who need it.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl -mt-8 pb-12 relative z-10">
        {/* Registration Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Patient Registration */}
          <Card className="medical-card border-0 shadow-xl rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300">
            <CardContent className="p-0">
              <div className="bg-blue-50 p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-blue-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Users className="w-16 h-16 text-primary mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Register as Patient</h2>
                <p className="text-blue-700">Get personalized medical guidance</p>
              </div>
              <div className="p-8">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-blue-700">Ask health questions to verified doctors</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-blue-700">Access personalized medical advice</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-blue-700">Browse community health discussions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-blue-700">Secure medical history management</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">What we'll need:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Basic personal information</p>
                    <p>• Medical history details</p>
                    <p>• Emergency contact information</p>
                    <p>• Privacy consent</p>
                  </div>
                </div>

                <Link href="/auth/patient">
                  <Button className="btn-primary w-full py-3 font-semibold">
                    Register as Patient
                  </Button>
                </Link>
                
                <p className="text-center text-sm text-blue-600 mt-4">
                  Already have an account? <Link href="/auth/login" className="text-primary hover:underline">Sign in</Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Doctor Registration */}
          <Card className="medical-card border-0 shadow-xl rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300">
            <CardContent className="p-0">
              <div className="bg-green-50 p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-green-500 to-green-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Stethoscope className="w-16 h-16 text-green-600 mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Register as Doctor</h2>
                <p className="text-blue-700">Share your medical expertise</p>
              </div>
              <div className="p-8">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-blue-700">Help patients with expert guidance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-blue-700">Build your professional reputation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-blue-700">Connect with Egyptian medical community</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-blue-700">Verified professional status</span>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Verification Required:
                  </h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Valid Egyptian medical license</p>
                    <p>• Medical degree certificate</p>
                    <p>• Professional CV/Resume</p>
                    <p>• Identity verification</p>
                  </div>
                </div>

                <Link href="/auth/doctor">
                  <Button className="bg-green-600 hover:bg-green-700 w-full py-3 font-semibold text-white">
                    Register as Doctor
                  </Button>
                </Link>
                
                <p className="text-center text-sm text-blue-600 mt-4">
                  Already verified? <Link href="/auth/login" className="text-primary hover:underline">Sign in</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">Why Choose SehaTalk?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Verified Doctors</h3>
              <p className="text-blue-700">All medical professionals are thoroughly verified with Egyptian medical licenses</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Trusted Community</h3>
              <p className="text-blue-700">Join thousands of patients and doctors in Egypt's largest medical Q&A platform</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Expert Guidance</h3>
              <p className="text-blue-700">Get reliable medical information and guidance from qualified healthcare professionals</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="medical-card border-0 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Ready to Get Started?</h3>
            <p className="text-blue-600 mb-6 max-w-2xl mx-auto">
              Choose your registration type above and join our growing community of healthcare seekers and providers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/explore">
                <Button variant="outline" className="btn-secondary px-8 py-3">
                  Browse Questions First
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="btn-secondary px-8 py-3">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}