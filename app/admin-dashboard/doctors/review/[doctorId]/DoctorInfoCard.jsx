

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function DoctorInfoCard({ doctor }) {
  const { t, isRTL } = useLanguage();
  return (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 h-full pt-5">
      <h2 className={`text-xl font-bold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
        {t('admin.panel.review.drPrefix')} {doctor.name}
      </h2>
      <div className="text-gray-700 space-y-3">
        <p className="flex items-start">
          <span className="font-semibold w-24 block text-sm">{t('admin.panel.review.nameLabel')}</span>
          <span className="text-base">{doctor.name}</span>
        </p>
        <p className="flex items-start">
          <span className="font-semibold w-24 block text-sm">{t('admin.panel.review.emailLabel')}</span>
          <span className="text-base">{doctor.email}</span>
        </p>
        <p className="flex items-start">
          <span className="font-semibold w-24 block text-sm">{t('admin.panel.review.specialtyLabel')}</span>
          <span className="text-base">{doctor.specialty}</span>
        </p>
        {doctor.bio && (
          <p className="flex items-start">
            <span className="font-semibold w-24 block text-sm">{t('admin.panel.review.bioLabel')}</span>
            <span className="text-base">{doctor.bio}</span>
          </p>
        )}
        {/* Add more fields if needed */}
      </div>
    </div>
  );
}