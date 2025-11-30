import { CheckCircle2 } from 'lucide-react';

export function VerifiedBadge({ className = "" }) {
  return (
    <div className={`inline-flex items-center bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 mt-3 ${className}`}>
      <span className="text-sm font-medium">Verified Answer</span>
    </div>
  );
}
