
'use client'; 

import { useState } from 'react';
import { SimpleModal } from '@/components/ui/SimpleModal.jsx';
import { useLanguage } from "@/lib/i18n/LanguageProvider";


function DocumentPreview({ doc, doctorStatus, t }) {
    
    const canShowApprovedBadge = doc.status === 'Approved' && doctorStatus === 'Approved';

    return (
        <div className="relative w-28 h-24 bg-gray-200 rounded-md overflow-hidden shadow-sm flex items-center justify-center cursor-pointer hover:shadow-lg transition">
            
            <span className="text-sm text-gray-500 font-medium">
                {doc.type === 'ID Card' ? t('admin.panel.review.idCard') : doc.type === 'License' ? t('admin.panel.review.license') : doc.type}
            </span>
            
            {canShowApprovedBadge && ( 
                <div className=" absolute top-1 right-1 px-1 text-xs bg-green-500 text-white rounded mr-2">{t('admin.panel.review.approvedBadge')}</div>
            )}
        </div>
    );
}




// ...existing code...

export default function DecisionPanel({ doctor }) {
    const { t, isRTL } = useLanguage();

    const [rejectionReason, setRejectionReason] = useState('');
    const [modal, setModal] = useState({ open: false, title: '', message: '' });
    const [loading, setLoading] = useState(false);
    const router = typeof window !== 'undefined' ? require('next/navigation').useRouter() : null;

    const handleDecision = async (action) => {
        if (action === 'Reject' && !rejectionReason.trim()) {
            setModal({ open: true, title: t('admin.panel.review.missingReasonTitle'), message: t('admin.panel.review.missingReasonMessage') });
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('/api/pending-doctors/review-status', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: doctor.id || doctor._id,
                    status: action === 'Approve' ? 'Approved' : 'Rejected',
                    rejectionReason: action === 'Reject' ? rejectionReason : undefined
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to update doctor');
            setModal({ open: true, title: action === 'Approve' ? t('admin.panel.review.modalApproveTitle') : t('admin.panel.review.modalRejectTitle'), message: `${t('admin.panel.review.modalActionMessagePrefix')}${action.toLowerCase()}${t('admin.panel.review.modalActionMessageSuffix')}${doctor.name}.` });
            setTimeout(() => {
                if (router) router.push('/admin-dashboard/doctors');
                else window.location.href = '/admin-dashboard/doctors';
            }, 1200);
        } catch (err) {
            setModal({ open: true, title: t('common.error'), message: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`p-6 bg-gray-50 rounded-lg shadow-xl text-blue-900 h-full flex flex-col justify-between ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <SimpleModal
                open={modal.open}
                title={modal.title}
                message={modal.message}
                onClose={() => setModal({ ...modal, open: false })}
            />
            <div>
                <h3 className="text-lg font-semibold mb-3">{t('admin.panel.review.attachedDocuments')}</h3>
                <div className="flex space-x-4 mb-6">
                    {(doctor.documents && doctor.documents.length > 0) ? (
                        doctor.documents.map((doc, index) => (
                            <DocumentPreview key={index} doc={doc} doctorStatus={doctor.status} t={t} />
                        ))
                    ) : (
                        <span className="text-gray-400">{t('admin.panel.review.noDocuments')}</span>
                    )}
                </div>
            </div>
            <div className="space-y-4">
                <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder={t('admin.panel.review.rejectionReasonPlaceholder')}
                    className="w-full p-3 rounded-lg bg-white text-blue-900 border border-gray-300 focus:ring-red-500 focus:border-red-500 shadow-sm placeholder:text-gray-400"
                    rows="2"
                />
                <div className="flex space-x-4">
                    <button
                        onClick={() => handleDecision('Approve')}
                        className="flex-1 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition shadow-md mr-2 disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? t('admin.panel.review.processing') : t('admin.panel.review.approveButton')}
                    </button>
                    <button
                        onClick={() => handleDecision('Reject')}
                        className="flex-1 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition shadow-md disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? t('admin.panel.review.processing') : t('admin.panel.review.rejectButton')}
                    </button>
                </div>
            </div>
        </div>
    );
}