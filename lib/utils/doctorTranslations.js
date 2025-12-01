// Simple translation cache to avoid repeated translations
const translationCache = new Map();

// Common medical terms for translation
const medicalTermsMap = {
  ar: {
    // Specialties
    'cardiologist': 'طبيب قلب',
    'orthopedist': 'جراح عظام',
    'psychologist': 'طبيب نفسي',
    'pediatrician': 'طبيب أطفال',
    'neurologist': 'طبيب أعصاب',
    'dermatologist': 'طبيب جلدية',
    'gynecologist': 'طبيب نسائية',
    'urologist': 'طبيب مسالك بولية',
    'ophthalmologist': 'طبيب عيون',
    'internist': 'طبيب باطني',
    'gastroenterologist': 'طبيب جهاز هضمي',
    
    // Common bio phrases
    'experience': 'سنوات خبرة',
    'years': 'سنة',
    'specializing': 'متخصص في',
    'specialized': 'متخصص في',
    'focus': 'متخصص في',
    'medical': 'طبي',
    'health': 'صحة',
    'care': 'رعاية',
    'patient': 'مريض',
    'clinical': 'إكلينيكي',
  }
};

/**
 * Translate doctor name - keeps original if no translation found
 * For Egyptian doctors, names typically stay the same
 */
export const translateDoctorName = (name, language) => {
  if (language === 'en') return name;
  // In most cases, doctor names remain the same in both languages
  return name;
};

/**
 * Translate doctor bio description
 * Uses a simple keyword-based translation approach
 */
export const translateDoctorBio = (bio, language) => {
  if (!bio || language === 'en') return bio;
  
  const cacheKey = `${bio}-${language}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  let translatedBio = bio;
  const terms = medicalTermsMap[language];
  
  if (terms) {
    // Replace common English terms with Arabic equivalents (case-insensitive)
    Object.entries(terms).forEach(([english, arabic]) => {
      const regex = new RegExp(`\\b${english}\\b`, 'gi');
      translatedBio = translatedBio.replace(regex, arabic);
    });
  }

  // Cache the result
  translationCache.set(cacheKey, translatedBio);
  return translatedBio;
};

/**
 * Translate doctor specialty
 */
export const translateDoctorSpecialty = (specialty, t) => {
  // Use the translation function to get translated specialty
  const key = specialty.toLowerCase().replace(/\s+/g, '-');
  const translationKey = `categories.${key}`;
  return t(translationKey) || specialty;
};

/**
 * Clear translation cache (optional, for memory management)
 */
export const clearTranslationCache = () => {
  translationCache.clear();
};
