// Map of specialty names in English to their translation keys
export const specialtyTranslationMap = {
  'All': 'categories.all',
  'General Health': 'categories.general-health',
  'Cardiology': 'categories.cardiology',
  'Cardiologist': 'categories.cardiologist',
  'Dermatology': 'categories.dermatology',
  'Dermatologist': 'categories.dermatologist',
  'Pediatrics': 'categories.pediatrics',
  'Pediatrician': 'categories.pediatrician',
  'Orthopedics': 'categories.orthopedics',
  'Orthopedist': 'categories.orthopedist',
  'Psychiatry': 'categories.psychiatry',
  'Psychologist': 'categories.psychologist',
  'Gastroenterology': 'categories.gastroenterology',
  'Neurology': 'categories.neurology',
  'Neurologist': 'categories.neurologist',
  'Ophthalmology': 'categories.ophthalmology',
  'Urology': 'categories.urology',
  'Gynecology': 'categories.gynecology',
  'Internal Medicine': 'categories.internal-medicine',
  'Internist': 'categories.internist',
  'FA': 'categories.fa',
  'Family Medicine': 'categories.fa',
};

export const getSpecialtyTranslationKey = (specialty) => {
  return specialtyTranslationMap[specialty] || specialty;
};
