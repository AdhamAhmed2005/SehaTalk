import { Metadata } from 'next';
import { PatientDashboardContent } from './PatientDashboardContent.jsx';

export const metadata = {
  title: 'Patient Dashboard - SehaTalk',
  description: 'Manage your health questions, view medical history, and track consultations with verified doctors.',
  keywords: 'patient dashboard, medical questions, health tracking, doctor consultations',
};

export default function PatientDashboardPage() {
  return <PatientDashboardContent />;
}