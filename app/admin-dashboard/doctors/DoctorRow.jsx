// DoctorRow.jsx
import Link from 'next/link';
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function DoctorRow({ doctor, isRTL }) {
  const { t } = useLanguage();
    const mapSpecialty = (spec) => {
      if (!spec) return "";
      const key = spec.toLowerCase().replace(/\s+/g, "");
      switch (key) {
        case "pediatrics":
          return t('admin.panel.specialtyMap.pediatrics');
        case "cardiology":
          return t('admin.panel.specialtyMap.cardiology');
        case "dermatology":
          return t('admin.panel.specialtyMap.dermatology');
        case "internalmedicine":
          return t('admin.panel.specialtyMap.internalMedicine');
        case "orthopedics":
          return t('admin.panel.specialtyMap.orthopedics');
        case "neurology":
          return t('admin.panel.specialtyMap.neurology');
        case "psychiatry":
          return t('admin.panel.specialtyMap.psychiatry');
        case "surgery":
          return t('admin.panel.specialtyMap.surgery');
        case "ent":
          return t('admin.panel.specialtyMap.ent');
        case "gastroenterology":
          return t('admin.panel.specialtyMap.gastroenterology');
        case "ophthalmology":
          return t('admin.panel.specialtyMap.ophthalmology');
        case "urology":
          return t('admin.panel.specialtyMap.urology');
        case "gynecology":
          return t('admin.panel.specialtyMap.gynecology');
        default:
          return spec;
      }
    };
  const statusClasses = {
    Pending: "bg-yellow-100 text-yellow-800",
    Approved: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };
  const statusColor = statusClasses[doctor.status] || "bg-gray-100 text-gray-800";
  const submissionDate = doctor.submittedAt || "N/A";

  return (
    <tr>
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
        {doctor.name}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${isRTL ? 'text-right' : 'text-left'}`}>
        {mapSpecialty(doctor.specialization)}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${isRTL ? 'text-right' : 'text-left'}`}>
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
          {doctor.status === 'Pending'
            ? t('admin.panel.statusPending')
            : doctor.status === 'Approved'
            ? t('admin.panel.statusApproved')
            : doctor.status === 'Rejected'
            ? t('admin.panel.statusRejected')
            : doctor.status}
        </span>
          <div className="text-xs text-gray-400 mt-1">
            {t('admin.panel.submitted')}: {submissionDate}
          </div>
      </td>
      <td className={`px-6 py-4 whitespace-nowrap ${isRTL ? 'text-right' : 'text-left'} text-sm font-medium space-x-2`}>
        <Link 
          href={`/admin-dashboard/doctors/review/${doctor.id}`} 
          className="text-blue-600 hover:text-blue-800 transition duration-150 ml-2"
        >
          {t('admin.panel.reviewFile')}
        </Link>
       
      </td>
    </tr>
  );
}