
'use client'; 

import { useState } from 'react';


function DocumentPreview({ doc, doctorStatus }) {
    
    const canShowApprovedBadge = doc.status === 'Approved' && doctorStatus === 'Approved';

    return (
        <div className="relative w-28 h-24 bg-gray-200 rounded-md overflow-hidden shadow-sm flex items-center justify-center cursor-pointer hover:shadow-lg transition">
            
            <span className="text-sm text-gray-500 font-medium">
                {doc.type}
            </span>
            
            {canShowApprovedBadge && ( 
                <div className=" absolute top-1 right-1 px-1 text-xs bg-green-500 text-white rounded mr-2">Approved</div>
            )}
        </div>
    );
}




export default function DecisionPanel({ doctor }) {
  const [rejectionReason, setRejectionReason] = useState('');
  
  const handleDecision = (action) => {
    if (action === 'Reject' && !rejectionReason.trim()) {
      alert('Please provide a reason for rejection.');
      return;
    }
    alert(`${action}ing application for ${doctor.name}. Reason: ${rejectionReason}`);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-xl text-white h-full flex flex-col justify-between">
      
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Attached Documents</h3>
        <div className="flex space-x-4 mb-6">
            {doctor.documents.map((doc, index) => (
                <DocumentPreview key={index} doc={doc} />
            ))}
        </div>
      </div>

  
      <div className="space-y-4">
        
       
        <textarea
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          placeholder="Reason for Rejection (Required for Reject)"
          className="w-full p-3 rounded-lg text-white border border-gray-300 focus:ring-red-500 focus:border-red-500"
          rows="2"
        />

        
        <div className="flex space-x-4">
          <button
            onClick={() => handleDecision('Approve')}
            className="flex-1 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition shadow-md mr-2"
          >
            Approve Doctor
          </button>
          <button
            onClick={() => handleDecision('Reject')}
            className="flex-1 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition shadow-md"
          >
            Reject Doctor
          </button>
        </div>
      </div>
      
    </div>
  );
}