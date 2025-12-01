import { connectDB } from "@/lib/mongodb";

// Translation cache
const translationCache = new Map();

/**
 * Detect if text is primarily Arabic
 */
function isArabicText(text) {
	const arabicRegex = /[\u0600-\u06FF]/g;
	const arabicChars = (text.match(arabicRegex) || []).length;
	return arabicChars > text.length * 0.3;
}

/**
 * Translate text using LibreTranslate API
 * Works for any user-inputted content
 * Auto-detects source language
 */
export async function translateText(text, targetLanguage, cacheKey = null) {
	if (!text) return text;

	// Detect source language
	const isArabic = isArabicText(text);
	const sourceLanguage = isArabic ? 'ar' : 'en';

	// No translation needed if source and target are the same
	if ((sourceLanguage === 'ar' && targetLanguage === 'ar') || 
	    (sourceLanguage === 'en' && targetLanguage === 'en')) {
		return text;
	}

	// Use provided cache key or generate one
	const key = cacheKey || `${text}-${sourceLanguage}-${targetLanguage}`;
	if (translationCache.has(key)) {
		return translationCache.get(key);
	}

	try {
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

		// Cache result
		translationCache.set(key, translated);
		return translated;
	} catch (error) {
		console.error('Translation API error:', error);
		return text; // Return original on error
	}
}

/**
 * Translate multiple texts in parallel
 */
export async function translateBatch(texts, targetLanguage) {
	if (targetLanguage === 'en') return texts;

	return Promise.all(
		texts.map((text, index) =>
			translateText(text, targetLanguage, `batch-${index}-${targetLanguage}`)
		)
	);
}

/**
 * Translate object with nested fields
 */
export async function translateObject(obj, fields, targetLanguage) {
	if (targetLanguage === 'en') return obj;

	const translated = { ...obj };

	for (const field of fields) {
		if (translated[field]) {
			translated[field] = await translateText(
				translated[field],
				targetLanguage,
				`obj-${field}-${targetLanguage}`
			);
		}
	}

	return translated;
}

/**
 * Clear translation cache
 */
export function clearTranslationCache() {
	translationCache.clear();
}

/**
 * Get cache stats (for monitoring)
 */
export function getCacheStats() {
	return {
		size: translationCache.size,
		entries: Array.from(translationCache.keys()),
	};
}
