// DoctorVerificationTable.jsx
import { Search } from 'lucide-react';
import DoctorRow from './DoctorRow'; 
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function DoctorVerificationTable({ doctors }) {
  const { t, isRTL } = useLanguage();
    return (
    <div className={`bg-white p-6 rounded-xl shadow-lg ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('admin.panel.doctorVerificationRequests')}</h2>
            
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
              <div className="relative w-full md:w-1/3">
                <input
                  type="text"
                  placeholder={t('admin.panel.searchPlaceholder')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              
              <select className="p-2 border border-gray-300 rounded-lg bg-white">
                <option value="pending">{t('admin.panel.filterLabel')}: {t('admin.panel.filterPending')}</option>
                <option value="newest">{t('admin.panel.sortByNewest')}</option>
              </select>
            </div>

            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className={`px-6 py-3 ${isRTL ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{t('admin.panel.doctorName')}</th>
                    <th className={`px-6 py-3 ${isRTL ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{t('admin.panel.specialty')}</th>
                    <th className={`px-6 py-3 ${isRTL ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{t('admin.panel.status')}</th>
                    <th className={`px-6 py-3 ${isRTL ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{t('admin.panel.actions')}</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {doctors && doctors.length > 0 ? (
                    doctors.map((doctor) => (
                      <DoctorRow key={doctor.id} doctor={doctor} isRTL={isRTL} /> 
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-8 text-gray-500">{t('admin.panel.noRequestsFound')}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
        </div>
    );
}