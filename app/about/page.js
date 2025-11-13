import { Card, CardContent } from "../../components/ui/card.jsx";
import { Badge } from "../../components/ui/badge.jsx";

export const metadata = {
  title: "About SehaTalk – Trusted Medical Community",
  description: "Learn about SehaTalk's mission to connect patients with verified Egyptian doctors through a trusted health Q&A platform.",
};

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero-bg pt-16 pb-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6 text-blue-900">
            About <span className="section-header">SehaTalk</span>
          </h1>
          <p className="text-xl text-blue-700 leading-relaxed max-w-3xl mx-auto">
            SehaTalk is Egypt's trusted health-tech platform connecting patients with verified doctors 
            through an interactive, community-style environment that combines social accessibility 
            with professional medical expertise.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-blue-900">Our Mission</h2>
              <p className="text-lg text-blue-700 leading-relaxed mb-6">
                We believe that reliable healthcare guidance should be accessible to every Egyptian. 
                SehaTalk bridges the gap between patients seeking answers and verified medical professionals 
                willing to share their expertise.
              </p>
              <p className="text-lg text-blue-700 leading-relaxed">
                Our platform promotes ethical medical communication by encouraging users to visit 
                healthcare providers in person for serious or specific diagnoses, while providing 
                a trusted space for general health education and guidance.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="medical-card border-0 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">200+</div>
                  <div className="text-blue-700">Verified Doctors</div>
                </CardContent>
              </Card>
              <Card className="medical-card border-0 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
                  <div className="text-blue-700">Questions Answered</div>
                </CardContent>
              </Card>
              <Card className="medical-card border-0 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                  <div className="text-blue-700">Registered Users</div>
                </CardContent>
              </Card>
              <Card className="medical-card border-0 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <div className="text-blue-700">Medical Specialties</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-blue-900">Our Core Values</h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto">
              Everything we do is guided by these fundamental principles
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="medical-card border-0 text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Trust & Verification</h3>
                <p className="text-blue-700 leading-relaxed">
                  Every doctor on our platform is thoroughly verified with Egyptian medical licenses and credentials.
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card border-0 text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Privacy & Security</h3>
                <p className="text-blue-700 leading-relaxed">
                  We prioritize user privacy while maintaining transparency in public health discussions.
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card border-0 text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Accessibility</h3>
                <p className="text-blue-700 leading-relaxed">
                  Making reliable health information accessible to all Egyptians, regardless of location or background.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-blue-900">How SehaTalk Works</h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto">
              A simple, secure process designed for both patients and healthcare professionals
            </p>
          </div>

          <div className="space-y-12">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">For Patients</Badge>
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">Ask Questions Publicly</h3>
                <p className="text-lg text-blue-700 leading-relaxed">
                  Patients create accounts to post health questions with relevant details and categories. 
                  Questions become part of a searchable knowledge base that benefits the entire community.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="medical-card p-8 border-0">
                  <div className="text-center">
                    <div className="text-6xl mb-4">❓</div>
                    <p className="text-blue-700">Public Q&A Format</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="lg:w-1/2">
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">For Doctors</Badge>
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">Provide Expert Guidance</h3>
                <p className="text-lg text-blue-700 leading-relaxed">
                  Verified doctors can browse questions in their specialties and provide professional, 
                  ethical guidance while building their reputation in the medical community.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="medical-card p-8 border-0">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👨‍⚕️</div>
                    <p className="text-blue-700">Verified Medical Experts</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">For Everyone</Badge>
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">Browse & Learn</h3>
                <p className="text-lg text-blue-700 leading-relaxed">
                  Anyone can explore our public discussions without creating an account, 
                  learning from verified medical conversations and building health awareness.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="medical-card p-8 border-0">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📚</div>
                    <p className="text-blue-700">Open Knowledge Base</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6 text-white">Join Our Medical Community</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Be part of Egypt's most trusted health platform connecting patients and doctors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/auth/patient" className="bg-white text-primary hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg">
              Join as Patient
            </a>
            <a href="/auth/doctor" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:transform hover:scale-105">
              Join as Doctor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}