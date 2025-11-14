"use client";
import { Card, CardContent } from "../ui/card.jsx";
import { Badge } from "../ui/badge.jsx";

export default function AboutContent({ lang = 'ar' }) {
  const isRTL = lang === 'ar';
  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="hero-bg pt-16 pb-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className={`text-5xl font-bold mb-6 text-blue-900 ${isRTL ? 'tracking-tight' : ''}`}> 
            {isRTL ? 'عن منصة صحة توك' : 'About SehaTalk'}
          </h1>
          <p className="text-xl text-blue-700 leading-relaxed max-w-3xl mx-auto">
            {isRTL
              ? 'صحة توك هي منصة مصرية موثوقة للتقنية الصحية تربط المرضى بالأطباء الموثقين في بيئة تفاعلية مجتمعية تجمع بين سهولة الوصول والخبرة الطبية.'
              : "SehaTalk is Egypt's trusted health-tech platform connecting patients with verified doctors through an interactive community environment that combines accessibility with professional medical expertise."}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-blue-900">{isRTL ? 'مهمتنا' : 'Our Mission'}</h2>
              <p className="text-lg text-blue-700 leading-relaxed mb-6">
                {isRTL
                  ? 'نؤمن أن الإرشاد الصحي الموثوق يجب أن يكون متاحًا لكل شخص في مصر. نحن نسد الفجوة بين المرضى الباحثين عن إجابات والأطباء المعتمدين.'
                  : 'We believe reliable healthcare guidance should be accessible to every Egyptian. We bridge the gap between patients seeking answers and verified medical professionals.'}
              </p>
              <p className="text-lg text-blue-700 leading-relaxed">
                {isRTL
                  ? 'تعزز منصتنا التواصل الطبي الأخلاقي وتشجع على زيارة الطبيب مباشرة للحالات الخاصة، مع توفير مساحة موثوقة للتثقيف الصحي العام.'
                  : 'Our platform promotes ethical medical communication and encourages direct medical visits for specific cases while providing a trusted space for general health education.'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="medical-card border-0 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">200+</div>
                  <div className="text-blue-700">{isRTL ? 'أطباء موثقون' : 'Verified Doctors'}</div>
                </CardContent>
              </Card>
              <Card className="medical-card border-0 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
                  <div className="text-blue-700">{isRTL ? 'أسئلة أُجيب عنها' : 'Questions Answered'}</div>
                </CardContent>
              </Card>
              <Card className="medical-card border-0 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                  <div className="text-blue-700">{isRTL ? 'مستخدمون مسجلون' : 'Registered Users'}</div>
                </CardContent>
              </Card>
              <Card className="medical-card border-0 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <div className="text-blue-700">{isRTL ? 'تخصصات طبية' : 'Medical Specialties'}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-blue-900">{isRTL ? 'قيمنا الأساسية' : 'Our Core Values'}</h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto">{isRTL ? 'كل ما نقوم به يستند إلى هذه المبادئ' : 'Everything we do is guided by these principles'}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="medical-card border-0 text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">{isRTL ? 'الثقة والتحقق' : 'Trust & Verification'}</h3>
                <p className="text-blue-700 leading-relaxed">{isRTL ? 'يتم التحقق من كل طبيب على منصتنا بدقة عبر التراخيص والشهادات الطبية المصرية.' : 'Every doctor on our platform is thoroughly verified with Egyptian medical licenses and credentials.'}</p>
              </CardContent>
            </Card>
            <Card className="medical-card border-0 text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">{isRTL ? 'الخصوصية والأمان' : 'Privacy & Security'}</h3>
                <p className="text-blue-700 leading-relaxed">{isRTL ? 'نمنح خصوصية المستخدمين أولوية مع الحفاظ على الشفافية في النقاشات الصحية العامة.' : 'We prioritize user privacy while maintaining transparency in public health discussions.'}</p>
              </CardContent>
            </Card>
            <Card className="medical-card border-0 text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">{isRTL ? 'إتاحة الوصول' : 'Accessibility'}</h3>
                <p className="text-blue-700 leading-relaxed">{isRTL ? 'نجعل المعلومات الصحية الموثوقة متاحة لكل المصريين بغض النظر عن الموقع أو الخلفية.' : 'Making reliable health information accessible to all Egyptians, regardless of location or background.'}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-blue-900">{isRTL ? 'كيف تعمل صحة توك' : 'How SehaTalk Works'}</h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto">{isRTL ? 'عملية بسيطة وآمنة تناسب المرضى والأطباء.' : 'A simple, secure process for patients and doctors.'}</p>
          </div>
          <div className="space-y-12">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className={`lg:w-1/2 ${isRTL ? 'text-right' : ''}`}> 
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">{isRTL ? 'للمرضى' : 'For Patients'}</Badge>
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">{isRTL ? 'اطرح أسئلتك علنًا' : 'Ask Questions Publicly'}</h3>
                <p className="text-lg text-blue-700 leading-relaxed">{isRTL ? 'يقوم المرضى بإنشاء حسابات لطرح الأسئلة الصحية مع التفاصيل والفئات ذات الصلة. تتحول الأسئلة إلى قاعدة معرفة قابلة للبحث تفيد المجتمع كله.' : 'Patients create accounts to post health questions with relevant details and categories. Questions become part of a searchable knowledge base that benefits the entire community.'}</p>
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
              <div className={`lg:w-1/2 ${isRTL ? 'text-right' : ''}`}> 
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">{isRTL ? 'للأطباء' : 'For Doctors'}</Badge>
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">{isRTL ? 'قدّم إرشادًا متخصصًا' : 'Provide Expert Guidance'}</h3>
                <p className="text-lg text-blue-700 leading-relaxed">{isRTL ? 'يمكن للأطباء الموثقين استعراض الأسئلة ضمن تخصصاتهم وتقديم إرشاد مهني وأخلاقي مع بناء سمعتهم داخل المجتمع الطبي.' : 'Verified doctors can browse questions in their specialties and provide professional, ethical guidance while building their reputation in the medical community.'}</p>
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
              <div className={`lg:w-1/2 ${isRTL ? 'text-right' : ''}`}> 
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">{isRTL ? 'للجميع' : 'For Everyone'}</Badge>
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">{isRTL ? 'تصفح وتعلم' : 'Browse & Learn'}</h3>
                <p className="text-lg text-blue-700 leading-relaxed">{isRTL ? 'يمكن لأي شخص استكشاف نقاشاتنا العامة دون إنشاء حساب، والتعلم من الحوارات الطبية الموثوقة وبناء الوعي الصحي.' : 'Anyone can explore our public discussions without creating an account, learning from verified medical conversations and building health awareness.'}</p>
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

      <section className="py-20 bg-linear-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6 text-white">{isRTL ? 'انضم إلى مجتمعنا الطبي' : 'Join Our Medical Community'}</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">{isRTL ? 'كن جزءًا من المنصة الصحية الأكثر ثقة في مصر التي تربط المرضى بالأطباء' : "Be part of Egypt's most trusted health platform connecting patients and doctors"}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/auth/patient" className="bg-white text-primary hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg">
              {isRTL ? 'انضم كمريض' : 'Join as Patient'}
            </a>
            <a href="/auth/doctor" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:transform hover:scale-105">
              {isRTL ? 'انضم كطبيب' : 'Join as Doctor'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
