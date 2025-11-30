// DoctorRow.jsx
import Link from 'next/link';

export default function DoctorRow({ doctor }) {
  const statusClasses = {
    Pending: "bg-yellow-100 text-yellow-800",
    Approved: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };
  const statusColor = statusClasses[doctor.status] || "bg-gray-100 text-gray-800";
  const submissionDate = doctor.submittedAt || "N/A";

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {doctor.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {doctor.specialization}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
          {doctor.status}
        </span>
        <div className="text-xs text-gray-400 mt-1">
           Submitted: {submissionDate}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium space-x-2">
        <Link 
          href={`/admin-dashboard/doctors/review/${doctor.id}`} 
          className="text-blue-600 hover:text-blue-800 transition duration-150 ml-2"
        >
          Review File
        </Link>
       
      </td>
    </tr>
  );
}