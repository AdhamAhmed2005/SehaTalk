
import { Clock, Users } from 'lucide-react'; 
import { useLanguage } from "@/lib/i18n/LanguageProvider";


function StatCard({ title, value, detail, icon: Icon, color }) {
  return (
    <div className={`p-5 rounded-xl shadow-lg border border-gray-200 flex flex-col justify-between ${color}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <div className="p-1 rounded-full bg-white/30">
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      
      <div>
        <p className="text-3xl font-extrabold text-white">{value}</p>
        <p className="text-sm font-medium text-white/80 mt-1">{detail}</p>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';

export default function AdminStats() {
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    pendingCount: 0,
    newThisWeek: 0,
    approvedCount: 0,
    rejectedLastMonth: 0,
    totalRejected: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const res = await fetch('/api/admin-stats');
        const data = await res.json();
        setStats(data);
      } catch (e) {
        // fallback: keep zeros
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statsData = [
    { title: t("admin.panel.pendingRequests"), value: loading ? '...' : stats.pendingCount, detail: `${t("admin.panel.newSubmissionsThisWeek")}: ${loading ? '...' : stats.newThisWeek}`, icon: Clock, color: "bg-orange-500" },
    { title: t("admin.panel.totalApproved"), value: loading ? '...' : stats.approvedCount, detail: t("admin.panel.verifiedDoctors"), icon: Users, color: "bg-green-600" },
    { title: t("admin.panel.rejectedLastMonth"), value: loading ? '...' : stats.rejectedLastMonth, detail: `${t("admin.panel.totalRejectedCases")}: ${loading ? '...' : stats.totalRejected}`, icon: Users, color: "bg-red-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statsData.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}