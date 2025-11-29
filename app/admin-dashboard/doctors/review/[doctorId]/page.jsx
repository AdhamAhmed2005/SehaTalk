

import DoctorInfoCard from './DoctorInfoCard';
import DecisionPanel from './DecisionPanel';


const MOCK_DOCTOR_DETAILS = {
  id: 'doc_12345',
  name: 'Dr. Ahmed Yassin',
  email: 'ahmed.yassin@example.com',
  specialization: 'Internal Medicine',
  licenseNumber: 'Vnced Illogical License',
  city: 'City blvvd lionned',
  hospital: 'Clinic Hospital & Blcnstie',
  submittedAt: '2023-01-30',
  documents: [
    { type: 'ID Card', status: 'Approved', previewUrl: '/path/to/doc1.jpg' },
    { type: 'License', status: 'View/Reject', previewUrl: '/path/to/doc2.jpg' },
  ],
};


export default async function DoctorReviewPage({ params }) {
  const doctorId = params.doctorId;
  
 
  const doctor = MOCK_DOCTOR_DETAILS;

  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-45">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-2xl border border-gray-200">
        
     
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Review Doctor Application</h1>
     
          <button className="text-gray-500 hover:text-gray-900 text-2xl font-light">
            &times;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
     
          <DoctorInfoCard doctor={doctor} />

        
          <DecisionPanel doctor={doctor} />
        </div>
        
       
        <div className="mt-8 pt-4 border-t text-sm text-gray-500">
          Submitted: {doctor.submittedAt}
        </div>

      </div>
    </div>
  );
}