"use client";

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, UserCheck, Stethoscope, Shield, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/ui/button.jsx';
import { Card, CardContent } from '../../../components/ui/card.jsx';
import { Input } from '../../../components/ui/input.jsx';
import { Label } from '../../../components/ui/label.jsx';

export function SignInForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'patient', // 'patient' or 'doctor'
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication logic
      if (formData.email === 'demo@patient.com' && formData.password === 'demo123') {
        router.push('/dashboard/patient');
      } else if (formData.email === 'demo@doctor.com' && formData.password === 'demo123') {
        router.push('/dashboard/doctor');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="medical-card border-0 shadow-xl rounded-2xl overflow-hidden">
      <CardContent className="p-8">
        {/* User Type Selection */}
        <div className="mb-6">
          <Label className="text-blue-900 font-medium mb-3 block">Sign in as:</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleInputChange('userType', 'patient')}
              className={`p-4 rounded-xl border-2 transition-all ${
                formData.userType === 'patient'
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-blue-200 hover:border-primary/30'
              }`}
            >
              <UserCheck className={`w-6 h-6 mx-auto mb-2 ${
                formData.userType === 'patient' ? 'text-primary' : 'text-blue-400'
              }`} />
              <div className={`text-sm font-medium ${
                formData.userType === 'patient' ? 'text-primary' : 'text-blue-600'
              }`}>
                Patient
              </div>
              <div className="text-xs text-blue-500 mt-1">Seek medical advice</div>
            </button>
            
            <button
              onClick={() => handleInputChange('userType', 'doctor')}
              className={`p-4 rounded-xl border-2 transition-all ${
                formData.userType === 'doctor'
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-blue-200 hover:border-primary/30'
              }`}
            >
              <Stethoscope className={`w-6 h-6 mx-auto mb-2 ${
                formData.userType === 'doctor' ? 'text-primary' : 'text-blue-400'
              }`} />
              <div className={`text-sm font-medium ${
                formData.userType === 'doctor' ? 'text-primary' : 'text-blue-600'
              }`}>
                Doctor
              </div>
              <div className="text-xs text-blue-500 mt-1">Provide consultation</div>
            </button>
          </div>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="text-blue-900 font-medium">Email Address</Label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="medical-input pl-10"
                placeholder={formData.userType === 'patient' ? 'patient@example.com' : 'dr.yourname@example.com'}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="password" className="text-blue-900 font-medium">Password</Label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="medical-input pl-10 pr-12"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                className="w-4 h-4 text-primary border-blue-300 rounded focus:ring-primary focus:ring-offset-0"
              />
              <span className="text-sm text-blue-600">Remember me</span>
            </label>
            <Link 
              href="/auth/forgot-password" 
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          {/* Demo Credentials */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</h4>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>Patient:</strong> demo@patient.com / demo123</p>
              <p><strong>Doctor:</strong> demo@doctor.com / demo123</p>
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
                Signing In...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Sign In Securely
              </div>
            )}
          </Button>
        </form>

        {/* Additional Options */}
        <div className="mt-8 pt-6 border-t border-blue-100">
          <div className="text-center">
            <p className="text-sm text-blue-600 mb-4">
              Need help with your account?
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button 
                variant="outline" 
                className="btn-secondary text-sm px-4 py-2" 
                asChild
              >
                <Link href="/support">Contact Support</Link>
              </Button>
              <Button 
                variant="outline" 
                className="btn-secondary text-sm px-4 py-2" 
                asChild
              >
                <Link href="/auth/verify-account">Verify Account</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-3 bg-green-50 rounded-lg">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-green-700">
              <p className="font-medium mb-1">Your data is protected</p>
              <p>We use industry-standard encryption to keep your medical information secure and private.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}