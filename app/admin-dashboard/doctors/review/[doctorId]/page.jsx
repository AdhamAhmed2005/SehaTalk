

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DoctorInfoCard from './DoctorInfoCard';
import DecisionPanel from './DecisionPanel';
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function DoctorReviewPage() {
  const { t, isRTL } = useLanguage();
  const params = useParams();
  const doctorId = params?.doctorId;
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!doctorId) return;
    async function fetchDoctor() {
      setLoading(true);
      try {
        const res = await fetch(`/api/pending-doctors/${doctorId}`);
        if (!res.ok) throw new Error("Doctor not found");
        const data = await res.json();
        setDoctor(data);
        setError(null);
      } catch (e) {
        setError(e.message);
        setDoctor(null);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctor();
  }, [doctorId]);

  if (loading) {
    return <div className="p-10 text-center text-gray-500">{t('common.loading')}</div>;
  }
  if (error || !doctor) {
    return <div className="p-10 text-center text-red-600">{error || t('doctors.noDoctors')}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-45" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{t('admin.panel.review.title')}</h1>
          <button className="text-gray-500 hover:text-gray-900 text-2xl font-light" aria-label={t('admin.panel.review.close')}>&times;</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <DoctorInfoCard doctor={doctor} />
          <DecisionPanel doctor={doctor} />
        </div>
        <div className="mt-8 pt-4 border-t text-sm text-gray-500">
          {t('admin.panel.review.submittedLabel')} {doctor.submittedAt ? new Date(doctor.submittedAt).toLocaleDateString() : ''}
        </div>
      </div>
    </div>
  );
}