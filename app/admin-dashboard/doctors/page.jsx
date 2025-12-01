"use client";
import { Navbar } from "@/components/Navbar";

import AdminStats from './AdminStats';
import DoctorVerificationTable from './DoctorVerificationTable';
import { useEffect, useState } from 'react';
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function AdminDoctorsPage() {
    const { t } = useLanguage();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDoctors() {
            setLoading(true);
            try {
                const res = await fetch('/api/pending-doctors');
                const data = await res.json();
                setDoctors(data.map(doc => ({
                    id: doc._id,
                    name: doc.name,
                    specialization: doc.specialty,
                    status: doc.status,
                    submittedAt: doc.submittedAt ? new Date(doc.submittedAt).toLocaleDateString() : '',
                })));
            } catch (e) {
                setDoctors([]);
            } finally {
                setLoading(false);
            }
        }
        fetchDoctors();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar /> 
            <main className="pt-20 px-4 md:px-10 lg:px-20 mx-auto max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-5xl font-bold text-gray-800 mb-6 pt-20 pb-10 text-center">
                        {t('admin.panel.title')}
                    </h1>
                    <AdminStats />
                </div>
                <DoctorVerificationTable doctors={doctors} loading={loading} />
                <hr className="my-8 border-gray-200" />
            </main>
        </div>
    );
}