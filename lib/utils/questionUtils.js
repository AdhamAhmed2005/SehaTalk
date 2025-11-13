// Mock authentication functions
export function isPatientAuthenticated() {
  // Replace with actual authentication logic
  return true;
}

export function getPatientProfile() {
  // Replace with actual profile fetching logic
  return {
    name: "Sarah Johnson",
    isVerified: true,
    memberSince: "2023",
    questionsAsked: 12,
    helpfulAnswers: 8
  };
}

// Form validation
export function validateQuestionForm(questionData) {
  const errors = [];
  
  if (!questionData.title?.trim()) {
    errors.push('Question title is required');
  }
  
  if (!questionData.description?.trim()) {
    errors.push('Detailed description is required');
  }
  
  if (!questionData.category) {
    errors.push('Medical category is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Mock API functions
export async function submitQuestion(submissionData) {
  // Simulate API call
  console.log('Submitting question with patient data:', submissionData);
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock question ID for redirect
  const questionId = 'q' + Date.now();
  return { questionId, success: true };
}