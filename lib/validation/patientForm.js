// Simple validation helpers for Patient Signup multi-step form
// Each validator returns an object: { fieldName: errorMessage } for invalid fields; empty object if valid

export function validateStep1(values, t) {
  const errors = {};
  const req = (msgKey) => t ? t(msgKey) : 'Required';

  if (!values.firstName?.trim()) errors.firstName = req('form.required') || 'First name is required';
  if (!values.lastName?.trim()) errors.lastName = req('form.required') || 'Last name is required';
  if (!values.email?.trim()) {
    errors.email = req('form.required') || 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = t ? t('form.invalidEmail') : 'Invalid email format';
  }
  if (!values.phone?.trim()) {
    errors.phone = req('form.required') || 'Phone is required';
  } else if (!/^\+?\d[\d\s-]{6,}$/.test(values.phone)) {
    errors.phone = t ? t('form.invalidPhone') : 'Invalid phone number';
  }
  if (!values.dateOfBirth?.trim()) {
    errors.dateOfBirth = req('form.required') || 'Date of birth is required';
  } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(values.dateOfBirth)) {
    errors.dateOfBirth = t ? t('form.invalidDate') : 'Invalid date (dd/mm/yyyy)';
  }
  if (!values.gender?.trim()) errors.gender = req('form.required') || 'Gender is required';

  if (!values.password) {
    errors.password = req('form.required') || 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = t ? t('form.weakPassword') : 'Password must be at least 8 characters';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = req('form.required') || 'Confirm your password';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = t ? t('form.passwordMismatch') : 'Passwords do not match';
  }
  return errors;
}

export function validateStep2(values, t) {
  const errors = {};
  const numOrEmpty = (v) => v === undefined || v === null || v === '' || /^\d+(\.\d+)?$/.test(String(v));

  if (!numOrEmpty(values.height)) errors.height = t ? t('form.invalidNumber') : 'Height must be a number';
  if (!numOrEmpty(values.weight)) errors.weight = t ? t('form.invalidNumber') : 'Weight must be a number';

  // Optional fields but can validate basic formats
  if (values.bloodType && !/^(A|B|AB|O)[+-]$/.test(values.bloodType)) {
    errors.bloodType = t ? t('form.invalidBloodType') : 'Invalid blood type (e.g., A+, O-)';
  }
  if (values.smokingStatus && !['none','former','current'].includes(String(values.smokingStatus).toLowerCase())) {
    errors.smokingStatus = t ? t('form.invalidSelection') : 'Invalid smoking status';
  }
  // Free-text areas: no hard validation; trim length caps for sanity
  const longTextFields = [
    'knownAllergies',
    'currentMedications',
    'chronicConditions',
    'previousSurgeries'
  ];
  longTextFields.forEach((k) => {
    if (values[k] && String(values[k]).length > 1000) {
      errors[k] = t ? t('form.tooLong') : 'Text is too long';
    }
  });
  return errors;
}

export function validateStep3(values, t) {
  const errors = {};
  const req = (msgKey) => t ? t(msgKey) : 'Required';

  if (!values.emergencyContactName?.trim()) errors.emergencyContactName = req('form.required') || 'Contact name is required';
  if (!values.emergencyContactPhone?.trim()) {
    errors.emergencyContactPhone = req('form.required') || 'Contact phone is required';
  } else if (!/^\+?\d[\d\s-]{6,}$/.test(values.emergencyContactPhone)) {
    errors.emergencyContactPhone = t ? t('form.invalidPhone') : 'Invalid phone number';
  }
  if (!values.emergencyContactRelation?.trim()) errors.emergencyContactRelation = req('form.required') || 'Relationship is required';

  // Optional exercise frequency; if provided must be one of allowed values
  if (values.exerciseFrequency && !['none','weekly','daily'].includes(String(values.exerciseFrequency).toLowerCase())) {
    errors.exerciseFrequency = t ? t('form.invalidSelection') : 'Invalid exercise frequency';
  }

  // Consent checkboxes
  if (!values.agreeTerms) errors.agreeTerms = t ? t('form.mustAgree') : 'You must agree to the Terms of Service and Privacy Policy';
  if (!values.consentStorage) errors.consentStorage = t ? t('form.mustConsent') : 'You must consent to data storage';

  return errors;
}

export function isValid(errors) {
  return !errors || Object.keys(errors).length === 0;
}
