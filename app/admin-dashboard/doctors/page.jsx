import { Navbar } from "@/components/Navbar";

import AdminStats from './AdminStats';
import DoctorVerificationTable from './DoctorVerificationTable';


const MOCK_DOCTORS = [
    { id: 1, name: "Dr. Ahmed Ali", specialization: "Cardiology", status: "Pending", submittedAt: "2025-11-20" },
    { id: 2, name: "Dr. Sara Mahmoud", specialization: "Pediatrics", status: "Approved", submittedAt: "2025-11-18" },
    { id: 3, name: "Dr. Omar Hassan", specialization: "Neurology", status: "Rejected", submittedAt: "2025-11-15" },
];

export default function AdminDoctorsPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            
            <Navbar /> 
            
            
            <main className="pt-20 px-4 md:px-10 lg:px-20 mx-auto max-w-7xl">
                
               
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Admin Control Panel
                    </h1>
                    <AdminStats />
                </div>


                <DoctorVerificationTable doctors={MOCK_DOCTORS} />

                <hr className="my-8 border-gray-200" />

          
                
            </main>
        </div>
    );
}