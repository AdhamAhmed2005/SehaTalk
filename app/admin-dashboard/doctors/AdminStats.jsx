
import { Clock, Users } from 'lucide-react'; 


function StatCard({ title, value, detail, icon: Icon, color }) {
  return (
    <div className={`p-5 rounded-xl shadow-lg border border-gray-200 flex flex-col justify-between ${color}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-semibold text-gray-700 text-white">{title}</h3>
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

export default function AdminStats() {
    const statsData = [
        { title: "Pending Requests", value: 12, detail: "New submissions this week", icon: Clock, color: "bg-orange-500" },
        { title: "Total Approved", value: 254, detail: "Verified Doctors", icon: Users, color: "bg-green-600" },
        { title: "Rejected Last Month", value: 5, detail: "Total Rejected Cases", icon: Users, color: "bg-red-500" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statsData.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
}