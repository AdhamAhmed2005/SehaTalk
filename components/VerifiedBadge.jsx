import { CheckCircle2 } from 'lucide-react';

export function VerifiedBadge({ className = "" }) {
  return (
    <div className={`inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 ${className}`}>
      <CheckCircle2 className="w-4 h-4 fill-current" />
      <span className="text-sm font-medium">Doctor Verified</span>
    </div>
  );
}
