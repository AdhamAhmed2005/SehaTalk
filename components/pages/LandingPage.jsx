"use client";

import { MessageCircle, Shield, Users, Clock, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button.jsx';
import { Card, CardContent } from '../ui/card.jsx';
import { ImageWithFallback } from '../figma/ImageWithFallback.jsx';
import { useLanguage } from '../../lib/i18n/LanguageProvider';

export function LandingPage() {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="hero-bg pt-40 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
             
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-blue-900">
                منصتك الطبية
                <span className="section-header block">الموثوقة في مصر</span>
                للاستشارات الصحية
              </h1>
              <p className="text-xl text-blue-700 leading-relaxed max-w-lg">
                تواصل مع أطباء مصريين معتمدين للحصول على إرشادات صحية موثوقة. 
                اطرح الأسئلة واحصل على إجابات متخصصة وانضم لمجتمع طبي موثوق.
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <Button size="lg" className="btn-primary shadow-lg" asChild>
                  <Link href="/auth/patient" className={`inline-flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    ابدأ الآن
                    <ChevronRight className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="btn-secondary" asChild>
                  <Link href="/explore">تصفح الأسئلة</Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-primary/10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">+5,000</div>
                  <div className="text-sm text-blue-600">سؤال تم الإجابة عليه</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">+200</div>
                  <div className="text-sm text-blue-600">طبيب معتمد</div>
                </div>
              </div>
            </div>
            <div className="relative lg:pl-8">
              <div className="medical-card rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjA3ODExNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Healthcare Technology"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/* Trust indicators */}
              
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className="text-4xl font-bold mb-6 text-blue-900">
              لماذا يختار المهنيون الطبيون
              <span className="section-header block">SehaTalk</span>
            </h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
              منصة آمنة وموثوقة مصممة لربط المرضى بخبراء طبيين معتمدين 
              من خلال مناقشات مجتمعية موثوقة.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="medical-card hover:shadow-xl transition-all duration-300 border-0">
              <CardContent className={`p-8 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">أطباء معتمدون</h3>
                <p className="text-blue-700 leading-relaxed">
                  جميع المهنيين الطبيين معتمدون برخص طبية مصرية وشهادات موثقة
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card hover:shadow-xl transition-all duration-300 border-0">
              <CardContent className={`p-8 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">قاعدة معرفة عامة</h3>
                <p className="text-blue-700 leading-relaxed">
                  تصفح وتعلم من مناقشات صحية مجتمعية متاحة للجميع
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card hover:shadow-xl transition-all duration-300 border-0">
              <CardContent className={`p-8 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">استجابة سريعة</h3>
                <p className="text-blue-700 leading-relaxed">
                  احصل على إرشادات طبية خبيرة من المهنيين خلال 24 ساعة
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card hover:shadow-xl transition-all duration-300 border-0">
              <CardContent className={`p-8 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">مجتمع موثوق</h3>
                <p className="text-blue-700 leading-relaxed">
                  انضم إلى مجتمع داعم يركز على التعليم الصحي والعافية
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className="text-4xl font-bold mb-6 text-blue-900">كيف يعمل</h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
              خطوات بسيطة وآمنة للحصول على استشارات طبية مهنية من خبراء رعاية صحية معتمدين
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className={`text-center group ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="w-20 h-20 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-105 transition-transform duration-300">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-900">أنشئ حسابك</h3>
              <p className="text-blue-700 leading-relaxed text-lg">
                سجل كمريض بمعلوماتك الأساسية في أقل من 30 ثانية
              </p>
            </div>

            <div className={`text-center group ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="w-20 h-20 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-105 transition-transform duration-300">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-900">اطرح سؤالك</h3>
              <p className="text-blue-700 leading-relaxed text-lg">
                انشر سؤالك الصحي مع التفاصيل ذات الصلة والفئة الطبية
              </p>
            </div>

            <div className={`text-center group ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="w-20 h-20 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-105 transition-transform duration-300">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-900">احصل على إجابات متخصصة</h3>
              <p className="text-blue-700 leading-relaxed text-lg">
                احصل على ردود مهنية من أطباء ومتخصصين طبيين معتمدين
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className="text-4xl font-bold mb-6 text-blue-900">موثوق من الآلاف</h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
              تجارب حقيقية من المرضى ومهنيي الرعاية الصحية على منصتنا
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="medical-card hover:shadow-xl transition-all duration-300 border-0">
              <CardContent className={`p-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-1 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-blue-700 leading-relaxed mb-6 text-lg">
                  "ساعدني SehaTalk في الحصول على إجابات سريعة وموثوقة حول مخاوف طفلي الصحية. الأطباء مهنيون ومهتمون حقًا."
                </p>
                <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">فأ</span>
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <div className="font-semibold text-blue-900">فاطمة أحمد</div>
                    <div className="text-blue-600">مريضة، القاهرة</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="medical-card hover:shadow-xl transition-all duration-300 border-0">
              <CardContent className={`p-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-1 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-blue-700 leading-relaxed mb-6 text-lg">
                  "بصفتي طبيب قلب، أحب أن أكون قادرًا على مساعدة المرضى ومشاركة المعرفة الطبية في هذه البيئة المهنية الموثوقة."
                </p>
                <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">مح</span>
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <div className="font-semibold text-blue-900">د. محمد حسن</div>
                    <div className="text-blue-600">طبيب قلب</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="medical-card hover:shadow-xl transition-all duration-300 border-0">
              <CardContent className={`p-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-1 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-blue-700 leading-relaxed mb-6 text-lg">
                  "نظام التحقق يعطيني ثقة كاملة في أني أتلقى استشارات من مهنيين طبيين حقيقيين ومؤهلين."
                </p>
                <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">سم</span>
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <div className="font-semibold text-blue-900">سارة محمود</div>
                    <div className="text-blue-600">مريضة، الإسكندرية</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-linear-to-br from-primary to-primary/80">
        <div className={`container mx-auto px-4 text-center max-w-4xl ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">مستعد للانضمام لمجتمعنا الطبي؟</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-primary-foreground/90 leading-relaxed">
            انضم لآلاف المرضى ومهنيي الرعاية الصحية الذين يثقون في SehaTalk 
            للحصول على إرشادات طبية موثوقة وتعليم صحي.
          </p>
          <div className={`flex flex-col sm:flex-row gap-6 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-50 shadow-lg px-8 py-4 text-lg" asChild>
              <Link href="/auth/patient">انضم كمريض</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg" asChild>
              <Link href="/auth/doctor">انضم كطبيب</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
