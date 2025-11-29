"use client";

import Link from "next/link";
import { Mail, Phone, MessageCircle, HelpCircle } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card.jsx";
import { Button } from "../../components/ui/button.jsx";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 flex flex-col justify-start">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-primary/90 to-blue-500 py-16 shadow-lg">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <HelpCircle className="w-16 h-16 text-white mx-auto mb-4 drop-shadow-lg animate-bounce" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">Support & Help Center</h1>
          <p className="text-lg text-blue-100 mb-2">We're here to help you 24/7. Find answers or contact our team below.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Email */}
          <Card className="shadow-lg border-0 rounded-2xl hover:scale-105 transition-transform bg-blue-50">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Mail className="w-10 h-10 text-blue-700 mb-3" />
              <div className="font-bold text-blue-900 text-lg mb-1">Email Support</div>
              <a href="mailto:support@sehatalk.com" className="text-blue-600 hover:underline text-base">support@sehatalk.com</a>
              <div className="text-xs text-blue-500 mt-2">Replies within 24 hours</div>
            </CardContent>
          </Card>
          {/* Phone */}
          <Card className="shadow-lg border-0 rounded-2xl hover:scale-105 transition-transform bg-green-50">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Phone className="w-10 h-10 text-green-700 mb-3" />
              <div className="font-bold text-blue-900 text-lg mb-1">Phone Support</div>
              <a href="tel:+201234567890" className="text-green-600 hover:underline text-base">+20 123 456 7890</a>
              <div className="text-xs text-green-500 mt-2">Available 9am - 9pm EET</div>
            </CardContent>
          </Card>
          {/* Live Chat */}
          <Card className="shadow-lg border-0 rounded-2xl hover:scale-105 transition-transform bg-yellow-50">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <MessageCircle className="w-10 h-10 text-yellow-700 mb-3" />
              <div className="font-bold text-blue-900 text-lg mb-1">Live Chat</div>
              <span className="text-yellow-700 text-base">Chat with us (9am - 9pm EET)</span>
              <div className="text-xs text-yellow-600 mt-2">Instant support</div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="group border-l-4 border-primary bg-blue-50 rounded-lg p-4">
              <summary className="font-semibold text-blue-900 cursor-pointer group-open:text-primary transition-colors">How do I reset my password?</summary>
              <p className="text-blue-700 mt-2">Go to the login page and click "Forgot Password?". Follow the instructions sent to your email.</p>
            </details>
            <details className="group border-l-4 border-primary bg-blue-50 rounded-lg p-4">
              <summary className="font-semibold text-blue-900 cursor-pointer group-open:text-primary transition-colors">How can I contact a doctor?</summary>
              <p className="text-blue-700 mt-2">You can use the "Book Appointment" button on a doctor's profile or use the live chat for urgent questions.</p>
            </details>
            <details className="group border-l-4 border-primary bg-blue-50 rounded-lg p-4">
              <summary className="font-semibold text-blue-900 cursor-pointer group-open:text-primary transition-colors">Is my medical data private?</summary>
              <p className="text-blue-700 mt-2">Yes, all your data is encrypted and only accessible to you and authorized medical professionals.</p>
            </details>
            <details className="group border-l-4 border-primary bg-blue-50 rounded-lg p-4">
              <summary className="font-semibold text-blue-900 cursor-pointer group-open:text-primary transition-colors">What if I have an emergency?</summary>
              <p className="text-blue-700 mt-2">For emergencies, please call your local emergency number or visit the nearest hospital. SehaTalk is not for urgent care.</p>
            </details>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button asChild className="bg-primary text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
