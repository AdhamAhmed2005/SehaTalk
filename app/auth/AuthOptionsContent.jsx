'use client';
import { Stethoscope, Users, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../components/ui/button.jsx';
import { Card, CardContent } from '../../components/ui/card.jsx';

const t = (lang) => ({
  badge: lang === 'en' ? 'Trusted Medical Community' : 'مجتمع طبي موثوق',
  joinTitleA: lang === 'en' ? 'Join ' : 'انضم إلى ',
  joinTitleB: 'SehaTalk',
  subtitle:
    lang === 'en'
      ? "Choose how you'd like to join Egypt's most trusted medical community. Get expert healthcare guidance or share your medical expertise with those who need it."
      : 'اختر كيف تريد الانضمام إلى المجتمع الطبي الأكثر موثوقية في مصر. احصل على إرشادات صحية من الخبراء أو شارك خبرتك الطبية مع من يحتاجها.',
  patient: {
    title: lang === 'en' ? 'Register as Patient' : 'سجّل كمريض',
    subtitle: lang === 'en' ? 'Get personalized medical guidance' : 'احصل على إرشادات طبية مخصصة',
    points: [
      lang === 'en' ? 'Ask health questions to verified doctors' : 'اسأل أسئلة صحية لأطباء موثوقين',
      lang === 'en' ? 'Access personalized medical advice' : 'احصل على نصائح طبية مخصصة',
      lang === 'en' ? 'Browse community health discussions' : 'تصفح مناقشات المجتمع الصحية',
      lang === 'en' ? 'Secure medical history management' : 'إدارة آمنة للتاريخ الطبي',
    ],
    needTitle: lang === 'en' ? "What we'll need:" : 'ما الذي سنحتاجه:' ,
    needs: [
      lang === 'en' ? 'Basic personal information' : 'معلومات شخصية أساسية',
      lang === 'en' ? 'Medical history details' : 'تفاصيل التاريخ الطبي',
      lang === 'en' ? 'Emergency contact information' : 'معلومات جهة الاتصال للطوارئ',
      lang === 'en' ? 'Privacy consent' : 'موافقة الخصوصية',
    ],
    cta: lang === 'en' ? 'Register as Patient' : 'التسجيل كمريض',
    haveAccount: lang === 'en' ? 'Already have an account?' : 'لديك حساب بالفعل؟',
    signIn: lang === 'en' ? 'Sign in' : 'تسجيل الدخول',
  },
  doctor: {
    title: lang === 'en' ? 'Register as Doctor' : 'سجّل كطبيب',
    subtitle: lang === 'en' ? 'Share your medical expertise' : 'شارك خبرتك الطبية',
    points: [
      lang === 'en' ? 'Help patients with expert guidance' : 'ساعد المرضى بإرشادات الخبراء',
      lang === 'en' ? 'Build your professional reputation' : 'ابنِ سمعتك المهنية',
      lang === 'en' ? 'Connect with Egyptian medical community' : 'تواصل مع المجتمع الطبي المصري',
      lang === 'en' ? 'Verified professional status' : 'حالة مهنية موثقة',
    ],
    verifyTitle: lang === 'en' ? 'Verification Required:' : 'التحقق مطلوب:',
    verifyList: [
      lang === 'en' ? 'Valid Egyptian medical license' : 'رخصة طبية مصرية سارية',
      lang === 'en' ? 'Medical degree certificate' : 'شهادة المؤهل الطبي',
      lang === 'en' ? 'Professional CV/Resume' : 'السيرة الذاتية المهنية',
      lang === 'en' ? 'Identity verification' : 'التحقق من الهوية',
    ],
    cta: lang === 'en' ? 'Register as Doctor' : 'التسجيل كطبيب',
    alreadyVerified: lang === 'en' ? 'Already verified?' : 'تم التحقق بالفعل؟',
    signIn: lang === 'en' ? 'Sign in' : 'تسجيل الدخول',
  },
  why: lang === 'en' ? 'Why Choose SehaTalk?' : 'لماذا تختار SehaTalk؟',
  verifiedDoctors: lang === 'en' ? 'Verified Doctors' : 'أطباء موثقون',
  verifiedDesc:
    lang === 'en'
      ? 'All medical professionals are thoroughly verified with Egyptian medical licenses'
      : 'يتم التحقق من جميع المهنيين الطبيين بدقة برخص مصرية',
  trustedCommunity: lang === 'en' ? 'Trusted Community' : 'مجتمع موثوق',
  trustedDesc:
    lang === 'en'
      ? "Join thousands of patients and doctors in Egypt's largest medical Q&A platform"
      : 'انضم إلى آلاف المرضى والأطباء في أكبر منصة أسئلة وأجوبة طبية في مصر',
  expertGuidance: lang === 'en' ? 'Expert Guidance' : 'إرشاد من الخبراء',
  expertDesc:
    lang === 'en'
      ? 'Get reliable medical information and guidance from qualified healthcare professionals'
      : 'احصل على معلومات طبية موثوقة وإرشاد من مختصين مؤهلين',
  ready: lang === 'en' ? 'Ready to Get Started?' : 'هل أنت جاهز للبدء؟',
  readyDesc:
    lang === 'en'
      ? 'Choose your registration type above and join our growing community of healthcare seekers and providers.'
      : 'اختر نوع التسجيل بالأعلى وانضم إلى مجتمعنا المتنامي من طالبي ومقدمي الرعاية الصحية.',
  browse: lang === 'en' ? 'Browse Questions First' : 'تصفح الأسئلة أولاً',
  learn: lang === 'en' ? 'Learn More About Us' : 'تعرّف علينا أكثر',
});

export default function AuthOptionsContent({ lang }) {
  const isRTL = lang === 'ar';
  const i = t(lang);
  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="hero-bg pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className={`inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">{i.badge}</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-blue-900">
            {i.joinTitleA}<span className="section-header">{i.joinTitleB}</span>
          </h1>
          <p className="text-xl text-blue-700 leading-relaxed max-w-3xl mx-auto mb-8">{i.subtitle}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl -mt-8 pb-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="medical-card border-0 shadow-xl rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300">
            <CardContent className="p-0">
              <div className="bg-blue-50 p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-blue-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Users className="w-16 h-16 text-primary mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">{i.patient.title}</h2>
                <p className="text-blue-700">{i.patient.subtitle}</p>
              </div>
              <div className="p-8">
                <div className="space-y-4 mb-6">
                  {i.patient.points.map((p, idx) => (
                    <div key={idx} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-blue-700">{p}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">{i.patient.needTitle}</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    {i.patient.needs.map((n, idx) => (
                      <p key={idx}>• {n}</p>
                    ))}
                  </div>
                </div>
                <Link href="/auth/patient">
                  <Button className="btn-primary w-full py-3 font-semibold">{i.patient.cta}</Button>
                </Link>
                <p className="text-center text-sm text-blue-600 mt-4">
                  {i.patient.haveAccount} <Link href="/auth/login" className="text-primary hover:underline">{i.patient.signIn}</Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card border-0 shadow-xl rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300">
            <CardContent className="p-0">
              <div className="bg-green-50 p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-green-500 to-green-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Stethoscope className="w-16 h-16 text-green-600 mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">{i.doctor.title}</h2>
                <p className="text-blue-700">{i.doctor.subtitle}</p>
              </div>
              <div className="p-8">
                <div className="space-y-4 mb-6">
                  {i.doctor.points.map((p, idx) => (
                    <div key={idx} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-blue-700">{p}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    {i.doctor.verifyTitle}
                  </h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    {i.doctor.verifyList.map((v, idx) => (
                      <p key={idx}>• {v}</p>
                    ))}
                  </div>
                </div>
                <Link href="/auth/doctor">
                  <Button className="bg-green-600 hover:bg-green-700 w-full py-3 font-semibold text-white">{i.doctor.cta}</Button>
                </Link>
                <p className="text-center text-sm text-blue-600 mt-4">
                  {i.doctor.alreadyVerified} <Link href="/auth/login" className="text-primary hover:underline">{i.doctor.signIn}</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">{i.why}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">{i.verifiedDoctors}</h3>
              <p className="text-blue-700">{i.verifiedDesc}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">{i.trustedCommunity}</h3>
              <p className="text-blue-700">{i.trustedDesc}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">{i.expertGuidance}</h3>
              <p className="text-blue-700">{i.expertDesc}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="medical-card border-0 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">{i.ready}</h3>
            <p className="text-blue-600 mb-6 max-w-2xl mx-auto">{i.readyDesc}</p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Link href="/explore">
                <Button variant="outline" className="btn-secondary px-8 py-3">{i.browse}</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="btn-secondary px-8 py-3">{i.learn}</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
