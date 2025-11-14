export const tAuthOptions = (lang) => ({
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

export const tLogin = (lang) => ({
  backHome: lang === 'en' ? 'Back to Home' : 'العودة إلى الصفحة الرئيسية',
  welcome: lang === 'en' ? 'Welcome Back' : 'أهلاً بعودتك',
  subtitle:
    lang === 'en'
      ? 'Sign in to access your medical dashboard and continue your healthcare journey'
      : 'سجّل الدخول للوصول إلى لوحتك الطبية ومتابعة رحلتك الصحية',
  noAccount: lang === 'en' ? "Don't have an account?" : 'ليس لديك حساب؟',
  createAccount: lang === 'en' ? 'Create Account' : 'أنشئ حساباً',
  privacy: lang === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية',
  terms: lang === 'en' ? 'Terms of Service' : 'شروط الخدمة',
  help: lang === 'en' ? 'Help & Support' : 'المساعدة والدعم',
  trusted: lang === 'en' ? 'Trusted by healthcare professionals' : 'موثوق من قبل المتخصصين في الرعاية الصحية',
  verifiedDoctors: lang === 'en' ? 'Verified Doctors' : 'أطباء موثقون',
  activePatients: lang === 'en' ? 'Active Patients' : 'مرضى نشطون',
  support: lang === 'en' ? 'Support' : 'دعم',
});

export const tPatientSignup = (lang) => ({
  back: lang === 'en' ? 'Back to Auth Options' : 'العودة إلى خيارات التسجيل',
  title: lang === 'en' ? 'Patient Registration' : 'تسجيل المريض',
  subtitle:
    lang === 'en'
      ? 'Join our trusted medical community and get personalized healthcare guidance'
      : 'انضم إلى مجتمعنا الطبي الموثوق واحصل على إرشادات صحية مخصصة',
});

export const tDoctorSignup = (lang) => ({
  back: lang === 'en' ? 'Back to Auth Options' : 'العودة إلى خيارات التسجيل',
  title: lang === 'en' ? 'Doctor Registration' : 'تسجيل الطبيب',
  subtitle:
    lang === 'en'
      ? 'Join our network of verified medical professionals and help patients across Egypt'
      : 'انضم إلى شبكة الأطباء الموثقين وساعد المرضى في جميع أنحاء مصر',
});
