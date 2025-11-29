

export default function DoctorInfoCard({ doctor }) {
  return (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 h-full">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Dr. {doctor.name}
      </h2>
      
      <div className="text-gray-700 space-y-3">
        
        <p className="flex items-start">
          <span className="font-semibold w-24 block text-sm">Name:</span> 
          <span className="text-base">{doctor.name}</span>
        </p>
        <p className="flex items-start">
          <span className="font-semibold w-24 block text-sm">Email:</span> 
          <span className="text-base">{doctor.email}</span>
        </p>
        <p className="flex items-start">
          <span className="font-semibold w-24 block text-sm">Specialty:</span> 
          <span className="text-base">{doctor.specialization}</span>
        </p>
        <p className="flex items-start">
          <span className="font-semibold w-24 block text-sm">License No.:</span> 
          <span className="text-base">{doctor.licenseNumber}</span>
        </p>
        <p className="flex items-start">
          <span className="font-semibold w-24 block text-sm">City:</span> 
          <span className="text-base">{doctor.city}</span>
        </p>
        <p className="flex items-start">
          <span className="font-semibold w-24 block text-sm">Hospital:</span> 
          <span className="text-base">{doctor.hospital}</span>
        </p>
      </div>
    </div>
  );
}