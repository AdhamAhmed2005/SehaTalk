

import { connectDB } from "@/lib/mongodb";
import Doctor from "@/models/Doctor";

// Translation cache to avoid repeated API calls
const translationCache = new Map();

// Clear cache on server start to ensure fresh translations
function clearOldCache() {
	translationCache.clear();
}

/**
 * Detect if text is primarily Arabic
 */
function isArabicText(text) {
	const arabicRegex = /[\u0600-\u06FF]/g;
	const arabicChars = (text.match(arabicRegex) || []).length;
	return arabicChars > text.length * 0.3;
}

/**
 * Translate text using LibreTranslate API (Free & Open Source)
 * No API key required for public instance
 * Excellent for medical and technical content
 * Auto-detects source language
 */
async function translateWithLibreTranslate(text, targetLanguage) {
	if (!text) return text;

	// Detect source language
	const isArabic = isArabicText(text);
	const sourceLanguage = isArabic ? 'ar' : 'en';

	// No translation needed if source and target are the same
	if ((sourceLanguage === 'ar' && targetLanguage === 'ar') || 
	    (sourceLanguage === 'en' && targetLanguage === 'en')) {
		return text;
	}

	// Check cache first
	const cacheKey = `${text}-${sourceLanguage}-${targetLanguage}`;
	if (translationCache.has(cacheKey)) {
		return translationCache.get(cacheKey);
	}

	try {
		// Use free LibreTranslate API instance
		// Alternative public instances:
		// - https://api.libretranslate.de
		// - https://libretranslate.com/api
		const response = await fetch('https://api.libretranslate.de/translate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				q: text,
				source: sourceLanguage,
				target: targetLanguage === 'ar' ? 'ar' : 'en',
				format: 'text',
			}),
		});

		if (!response.ok) throw new Error('LibreTranslate API error');

		const data = await response.json();
		const translated = data.translatedText;

		// Cache the result
		translationCache.set(cacheKey, translated);
		return translated;
	} catch (error) {
		console.error('LibreTranslate API error:', error);
		// Fallback to local translation
		return translateBioLocal(text, targetLanguage);
	}
}

/**
 * Local translation fallback with medical terminology
 * Used when API is unavailable
 */
const localTranslations = {
	ar: {
		// Medical specialties
		cardiologist: 'طبيب قلب',
		orthopedist: 'جراح عظام',
		psychologist: 'طبيب نفسي',
		pediatrician: 'طبيب أطفال',
		neurologist: 'طبيب أعصاب',
		dermatologist: 'طبيب جلدية',
		gynecologist: 'طبيب نسائية',
		urologist: 'طبيب مسالك بولية',
		ophthalmologist: 'طبيب عيون',
		internist: 'طبيب باطني',
		gastroenterologist: 'طبيب جهاز هضمي',
		surgeon: 'جراح',
		
		// Common words  
		experienced: 'ذو خبرة',
		experience: 'خبرة',
		with: 'مع',
		and: 'و',
		in: 'في',
		of: 'من',
		for: 'للقيام بـ',
		to: 'إلى',
		have: 'لديه',
		has: 'لديه',
		helping: 'يساعد',
		helps: 'يساعد',
		
		// Specialization
		specializing: 'متخصص في',
		specialized: 'متخصص',
		specialization: 'التخصص',
		focus: 'التركيز',
		focusing: 'يركز',
		
		// Medical terms
		clinical: 'إكلينيكي',
		practice: 'ممارسة',
		medicine: 'طب',
		medical: 'طبي',
		health: 'صحة',
		care: 'رعاية',
		patient: 'مريض',
		patients: 'مرضى',
		passion: 'شغف',
		passionate: 'شغف',
		preventive: 'وقائية',
		prevention: 'الوقاية',
		disorder: 'اضطراب',
		treatment: 'علاج',
		disease: 'مرض',
		diseases: 'أمراض',
		surgery: 'جراحة',
		surgical: 'جراحي',
		joint: 'مفصل',
		joints: 'مفاصل',
		heart: 'قلب',
		cardiac: 'قلبي',
		interventional: 'تداخلي',
		cardiology: 'أمراض القلب',
		sports: 'الرياضية',
		sport: 'رياضي',
		injuries: 'الإصابات',
		injury: 'إصابة',
		replacement: 'الاستبدال',
		anxiety: 'القلق',
		depression: 'الاكتئاب',
		epilepsy: 'الصرع',
		neurodegenerative: 'التنكسية العصبية',
		failure: 'قصور',
		orthopedic: 'عظام',
		orthopedics: 'جراحة العظام',
		child: 'طفل',
		children: 'أطفال',
		years: 'سنوات',
		year: 'سنة',
	}
};

function translateBioLocal(text, language) {
	if (!text || language === 'en') return text;

	let translated = text;
	const translations = localTranslations[language];

	if (translations) {
		Object.entries(translations).forEach(([english, translated_term]) => {
			const regex = new RegExp(`\\b${english}\\b`, 'gi');
			translated = translated.replace(regex, translated_term);
		});
	}

	return translated;
}

/**
 * Translate doctor bio from English to target language
 * Database stores English text, translate it directly
 * Uses local medical terminology dictionary as fallback
 */
async function translateBioFromEnglish(text, targetLanguage) {
	if (!text || targetLanguage === 'en') return text;

	try {
		const response = await fetch('https://api.libretranslate.de/translate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				q: text,
				source: 'en',
				target: targetLanguage === 'ar' ? 'ar' : 'en',
				format: 'text',
			}),
		});

		if (!response.ok) throw new Error('LibreTranslate API error');

		const data = await response.json();
		const translated = data.translatedText;

		translationCache.set(`${text}-en-${targetLanguage}`, translated);
		return translated;
	} catch (error) {
		console.log('LibreTranslate API unavailable, using local translation');
		// Fallback to local translation dictionary
		return translateBioLocal(text, targetLanguage);
	}
}

export async function GET(req) {
	try {
		await connectDB();
		clearOldCache(); // Clear cache to get fresh translations
		const doctors = await Doctor.find({}).lean();

		// Get language from query params, default to 'ar'
		const { searchParams } = new URL(req.url);
		const language = searchParams.get('lang') || 'ar';

		// Translate bios from English (database source) to target language
		const translatedDoctors = await Promise.all(
			doctors.map(async (doc) => ({
				...doc,
				bio: await translateBioFromEnglish(doc.bio, language),
			}))
		);

		return Response.json(translatedDoctors);
	} catch (error) {
		console.error('Error fetching doctors:', error);
		return Response.json({ error: 'Failed to fetch doctors' }, { status: 500 });
	}
}
