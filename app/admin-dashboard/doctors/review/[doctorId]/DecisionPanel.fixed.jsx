'use client';

import { useState } from 'react';
import { SimpleModal } from '../../../../components/ui/SimpleModal.jsx';

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
    const [modal, setModal] = useState({ open: false, title: '', message: '' });

    const handleDecision = (action) => {
        if (action === 'Reject' && !rejectionReason.trim()) {
            setModal({ open: true, title: 'Missing Reason', message: 'Please provide a reason for rejection.' });
            return;
        }
        if (action === 'Approve') {
            setModal({ open: true, title: 'Doctor Approved', message: `You have approved ${doctor.name}.` });
            // Add approve logic here
            return;
        }
        // For reject
        setModal({ open: true, title: 'Doctor Rejected', message: `You have rejected ${doctor.name}.\nReason: ${rejectionReason}` });
        // Add reject logic here
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-xl text-blue-900 h-full flex flex-col justify-between">
            <SimpleModal
                open={modal.open}
                title={modal.title}
                message={modal.message}
                onClose={() => setModal({ ...modal, open: false })}
            />
            <div>
                <h3 className="text-lg font-semibold mb-3">Attached Documents</h3>
                <div className="flex space-x-4 mb-6">
                    {doctor.documents.map((doc, index) => (
                        <DocumentPreview key={index} doc={doc} doctorStatus={doctor.status} />
                    ))}
                </div>
            </div>
            <div className="space-y-4">
                <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Reason for Rejection (Required for Reject)"
                    className="w-full p-3 rounded-lg bg-white text-blue-900 border border-gray-300 focus:ring-red-500 focus:border-red-500 shadow-sm placeholder:text-gray-400"
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
