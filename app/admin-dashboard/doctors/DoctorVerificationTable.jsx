// DoctorVerificationTable.jsx
import { Search } from 'lucide-react';
import DoctorRow from './DoctorRow'; 

export default function DoctorVerificationTable({ doctors }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Doctor Verification Requests</h2>
            
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
              <div className="relative w-full md:w-1/3">
                <input
                  type="text"
                  placeholder="Search by Name or Specialty..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              
              <select className="p-2 border border-gray-300 rounded-lg bg-white">
                <option value="pending">Filter: Pending</option>
                <option value="newest">Sort By: Newest</option>
              </select>
            </div>

            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {doctors && doctors.length > 0 ? (
                    doctors.map((doctor) => (
                      <DoctorRow key={doctor.id} doctor={doctor} /> 
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-8 text-gray-500">No verification requests found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
        </div>
    );
}