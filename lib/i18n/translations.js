export const translations = {
  ar: {
    // Navigation
    nav: {
      home: "الرئيسية",
      browse: "تصفح الأسئلة",
      categories: "التصنيفات",
      doctors: "البحث عن أطباء",
      about: "حولنا",
      signIn: "تسجيل الدخول",
      getStarted: "ابدأ الآن",
      dashboard: "لوحة التحكم",
      signOut: "تسجيل الخروج",
      askQuestion: "اسأل سؤال"
    },

    // Ask Question Form
    askQuestion: {
      title: "اطرح سؤالاً طبياً",
      yourProfile: "ملفك الطبي",
      patient: "المريض",
      yearsOld: "سنة",
      allergies: "الحساسيات المعروفة",
      medications: "الأدوية الحالية",
      noneReported: "لا توجد",
      profileUpdated: "آخر تحديث للملف",
      updateProfile: "تحديث الملف",

      // Form Fields
      questionTitle: "عنوان السؤال",
      questionTitlePlaceholder: "أدخل عنوان سؤالك",
      required: "مطلوب",
      tipsTitle: "💡 نصائح لعنوان جيد:",
      tip1: "• كن محدداً حول أعراضك أو مخاوفك",
      tip2: "• اذكر أجزاء الجسم أو الحالات ذات الصلة",
      tip3: "• اجعله واضحاً ومختصراً",

      category: "التصنيف الطبي",
      categoryPlaceholder: "اختر التصنيف الطبي الأكثر صلة",
      urgencyLevel: "مستوى الإلحاح",

      description: "الوصف التفصيلي",
      descriptionPlaceholder: "أخبرنا المزيد عن حالتك...",
      includeDetails: "📋 اتضمن هذه التفاصيل للحصول على إجابات أفضل:",
      detail1: "• كيف تؤثر الأعراض على حياتك اليومية",
      detail2: "• أي أنماط لاحظتها",
      detail3: "• ما يثير الأعراض أو يخففها",
      detail4: "• مخاوفك أو أسئلتك الرئيسية",

      previousTreatments: "العلاجات السابقة",
      previousTreatmentsPlaceholder: "العلاجات أو الفحوصات السابقة...",
      previousTreatmentsHelp: "شمل زيارات الأطباء والفحوصات أو العلاجات لهذه الحالة",

      attachments: "المرفقات (اختيارية)",
      uploadText: "رفع التقارير الطبية أو نتائج الفحوصات أو الصور",
      supportedFiles: "المدعوم: PDF، JPG، PNG (حد أقصى 5 ميجابايت لكل ملف)",
      chooseFiles: "اختر الملفات",

      anonymous: "نشر بشكل مجهول",
      anonymousText: "لن يكون اسمك مرئياً للمستخدمين الآخرين. فقط الأطباء المعتمدون يمكنهم رؤية هويتك لأغراض طبية.",

      doctorReview: "سيتم مراجعة سؤالك من قبل أطباء معتمدين",
      responseTime: "متوسط وقت الاستجابة: 2-6 ساعات",
      submitting: "جاري الإرسال...",
      submitQuestion: "إرسال السؤال"
    },

    // Medical Categories
    categories: {
      "general-health": "الصحة العامة",
      "cardiology": "أمراض القلب",
      "dermatology": "الأمراض الجلدية",
      "pediatrics": "طب الأطفال",
      "gynecology": "أمراض النساء",
      "orthopedics": "جراحة العظام",
      "neurology": "الأمراض العصبية",
      "psychiatry": "الطب النفسي",
      "internal-medicine": "الطب الباطني",
      "surgery": "الجراحة",
      "ophthalmology": "طب العيون",
      "ent": "أنف وأذن وحنجرة",
      "urology": "المسالك البولية",
      "endocrinology": "الغدد الصماء",
      "gastroenterology": "أمراض الجهاز الهضمي",
      "pulmonology": "أمراض الرئة"
    },

    // Urgency Levels
    urgency: {
      low: "أولوية منخفضة - سؤال عام",
      normal: "عادي - استشارة منتظمة", 
      high: "عالي - مستعجل وليس طارئ"
    },

    // Authentication
    auth: {
      signInRequired: "تسجيل الدخول مطلوب",
      signInText: "لطرح الأسئلة والحصول على المشورة الطبية المخصصة، تحتاج إلى تسجيل الدخول كمريض.",
      signInAsPatient: "تسجيل الدخول كمريض",
      createAccount: "إنشاء حساب جديد",
      backToHome: "العودة للرئيسية"
    },

    // Form Components
    form: {
      detailedDescription: "الوصف التفصيلي",
      detailedDescriptionPlaceholder: "أخبرنا المزيد عن حالتك...",
      descriptionTips: "شمل هذه التفاصيل للحصول على إجابات أفضل:",
      descriptionTip1: "كيف تؤثر الأعراض على حياتك اليومية",
      descriptionTip2: "أي أنماط لاحظتها",
      descriptionTip3: "ما يثير الأعراض أو يخففها",
      descriptionTip4: "مخاوفك أو أسئلتك الرئيسية",
      previousTreatments: "العلاجات السابقة",
      previousTreatmentsPlaceholder: "العلاجات أو الفحوصات السابقة...",
      previousTreatmentsTip: "شمل زيارات الأطباء والفحوصات أو العلاجات لهذه الحالة",
      attachments: "المرفقات الطبية/الصور",
      optional: "اختياري",
      dragDropFiles: "اسحب وأفلت ملفاتك هنا، أو انقر للتصفح",
      selectFiles: "اختر الملفات",
      fileTypes: "PNG، JPG، PDF حتى 5 ميجابايت لكل ملف (حد أقصى 3 ملفات)",
      selectedFiles: "الملفات المحددة:",
      postAnonymously: "انشر بشكل مجهول",
      anonymousDescription: "لن يكون اسمك مرئيًا للمستخدمين الآخرين. يمكن للأطباء المعتمدين فقط رؤية هويتك لأغراض طبية.",
      submitNotice: "قبل الإرسال:",
      submitTip1: "تأكد من دقة معلوماتك",
      submitTip2: "سيراجع فريقنا الطبي خلال 24 ساعة",
      submitTip3: "ستتلقى تحديثات عبر الإشعارات",
      submitting: "جارٍ الإرسال...",
      submitQuestion: "إرسال السؤال",
      cancel: "إلغاء",
      doctorReview: "سيتم مراجعة سؤالك من قبل أطباء معتمدين",
      responseTime: "وقت الاستجابة المعتاد: 2-6 ساعات"
    },

    // Common
    common: {
      loading: "جاري التحميل...",
      error: "خطأ",
      success: "نجح",
      cancel: "إلغاء",
      save: "حفظ",
      edit: "تعديل",
      delete: "حذف",
      close: "إغلاق",
      male: "ذكر",
      female: "أنثى"
    }
  },

  en: {
    // Navigation
    nav: {
      home: "Home",
      browse: "Browse Questions",
      categories: "Categories", 
      doctors: "Find Doctors",
      about: "About",
      signIn: "Sign In",
      getStarted: "Get Started",
      dashboard: "Dashboard",
      signOut: "Sign Out",
      askQuestion: "Ask Question"
    },

    // Ask Question Form
    askQuestion: {
      title: "Ask a Medical Question",
      yourProfile: "Your Medical Profile",
      patient: "Patient",
      yearsOld: "years old",
      allergies: "Known Allergies",
      medications: "Current Medications", 
      noneReported: "None reported",
      profileUpdated: "Profile last updated",
      updateProfile: "Update Profile",

      // Form Fields
      questionTitle: "Question Title",
      questionTitlePlaceholder: "Enter your question title",
      required: "Required",
      tipsTitle: "💡 Tips for a good title:",
      tip1: "• Be specific about your symptoms or concern",
      tip2: "• Include relevant body parts or conditions",
      tip3: "• Keep it clear and concise",

      category: "Medical Category",
      categoryPlaceholder: "Select the most relevant medical category",
      urgencyLevel: "Urgency Level",

      description: "Detailed Description",
      descriptionPlaceholder: "Tell us more about your condition...",
      includeDetails: "📋 Include these details for better answers:",
      detail1: "• How symptoms affect daily life",
      detail2: "• Any patterns you've noticed", 
      detail3: "• What triggers or relieves symptoms",
      detail4: "• Your main concerns or questions",

      previousTreatments: "Previous Treatments",
      previousTreatmentsPlaceholder: "Previous treatments or tests...",
      previousTreatmentsHelp: "Include doctor visits, tests, or treatments for this condition",

      attachments: "Attachments (Optional)",
      uploadText: "Upload medical reports, test results, or photos",
      supportedFiles: "Supported: PDF, JPG, PNG (Max 5MB each)",
      chooseFiles: "Choose Files",

      anonymous: "Post Anonymously",
      anonymousText: "Your name will not be visible to other users. Only verified doctors can see your identity for medical purposes.",

      doctorReview: "Your question will be reviewed by verified doctors",
      responseTime: "Typical response time: 2-6 hours",
      submitting: "Submitting...",
      submitQuestion: "Submit Question"
    },

    // Medical Categories
    categories: {
      "general-health": "General Health",
      "cardiology": "Cardiology", 
      "dermatology": "Dermatology",
      "pediatrics": "Pediatrics",
      "gynecology": "Gynecology",
      "orthopedics": "Orthopedics",
      "neurology": "Neurology",
      "psychiatry": "Psychiatry",
      "internal-medicine": "Internal Medicine",
      "surgery": "Surgery",
      "ophthalmology": "Ophthalmology", 
      "ent": "ENT",
      "urology": "Urology",
      "endocrinology": "Endocrinology",
      "gastroenterology": "Gastroenterology",
      "pulmonology": "Pulmonology"
    },

    // Urgency Levels
    urgency: {
      low: "Low Priority - General Question",
      normal: "Normal - Regular Consultation",
      high: "High - Urgent but not Emergency"
    },

    // Authentication
    auth: {
      signInRequired: "Sign In Required",
      signInText: "To ask questions and get personalized medical advice, you need to sign in as a patient.",
      signInAsPatient: "Sign In as Patient", 
      createAccount: "Create New Account",
      backToHome: "Back to Home"
    },

    // Form Components
    form: {
      detailedDescription: "Detailed Description",
      detailedDescriptionPlaceholder: "Tell us more about your condition...",
      descriptionTips: "Include these details for better answers:",
      descriptionTip1: "How symptoms affect daily life",
      descriptionTip2: "Any patterns you've noticed",
      descriptionTip3: "What triggers or relieves symptoms",
      descriptionTip4: "Your main concerns or questions",
      previousTreatments: "Previous Treatments",
      previousTreatmentsPlaceholder: "Previous treatments or tests...",
      previousTreatmentsTip: "Include doctor visits, tests, or treatments for this condition",
      attachments: "Medical Documents/Images",
      optional: "Optional",
      dragDropFiles: "Drag and drop your files here, or click to browse",
      selectFiles: "Select Files",
      fileTypes: "PNG, JPG, PDF up to 5MB each (max 3 files)",
      selectedFiles: "Selected Files:",
      postAnonymously: "Post Anonymously",
      anonymousDescription: "Your name will not be visible to other users. Only verified doctors can see your identity for medical purposes.",
      submitNotice: "Before submitting:",
      submitTip1: "Double-check your information is accurate",
      submitTip2: "Our medical team will review within 24 hours",
      submitTip3: "You'll receive updates via notifications",
      submitting: "Submitting...",
      submitQuestion: "Submit Question",
      cancel: "Cancel",
      doctorReview: "Your question will be reviewed by verified doctors",
      responseTime: "Typical response time: 2-6 hours"
    },

    // Common
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      close: "Close",
      male: "male",
      female: "female"
    }
  }
};