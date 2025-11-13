export const DEFAULT_PATIENT_PROFILE = {
  id: 'p123',
  name: 'سارة محمد', // Sarah Mohamed in Arabic
  email: 'sarah.mohamed@email.com',
  age: 28,
  gender: 'female',
  phone: '+20 101 234 5678',
  medicalHistory: {
    allergies: ['البنسلين', 'المأكولات البحرية'], // Penicillin, Seafood in Arabic
    currentMedications: ['ميتفورمين 500 مجم', 'فيتامين د'], // Metformin 500mg, Vitamin D in Arabic
    chronicConditions: ['السكري النوع الثاني'], // Type 2 Diabetes in Arabic
    surgeries: ['استئصال الزائدة الدودية (2019)'], // Appendectomy in Arabic
    bloodType: 'A+'
  },
  lastUpdate: '2024-11-10'
};

export const INITIAL_QUESTION_DATA = {
  title: '',
  description: '',
  category: '',
  urgency: 'normal',
  isAnonymous: false,
  previousTreatments: ''
};