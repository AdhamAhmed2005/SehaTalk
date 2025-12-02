import React from "react";
import { X, AlertCircle, Info } from "lucide-react";

export function SimpleModal({ open, onClose, title, message, children, type = "info" }) {
  if (!open) return null;

  const typeStyles = {
    info: {
      border: "border-blue-200",
      header: "bg-gradient-to-r from-blue-50 to-blue-100",
      title: "text-blue-900",
      accent: "bg-blue-500",
      icon: "text-blue-500",
    },
    warning: {
      border: "border-orange-200",
      header: "bg-gradient-to-r from-orange-50 to-orange-100",
      title: "text-orange-900",
      accent: "bg-orange-500",
      icon: "text-orange-500",
    },
    error: {
      border: "border-red-200",
      header: "bg-gradient-to-r from-red-50 to-red-100",
      title: "text-red-900",
      accent: "bg-red-500",
      icon: "text-red-500",
    },
  };

  const styles = typeStyles[type] || typeStyles.info;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md animate-fadeIn p-4">
      <div className={`bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative border ${styles.border} animate-scaleIn`}>
        
        {/* Header with gradient background */}
        <div className={`${styles.header} px-6 py-5 flex items-start justify-between`}>
          <div className="flex items-start gap-3 flex-1">
            {type === "warning" && <AlertCircle className={`${styles.icon} w-6 h-6 shrink-0 mt-0.5`} />}
            {type === "info" && <Info className={`${styles.icon} w-6 h-6 shrink-0 mt-0.5`} />}
            <h2 className={`text-xl font-bold ${styles.title} tracking-tight leading-snug`}>
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`${styles.icon} hover:${styles.icon}/80 transition p-1 shrink-0`}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {children ? (
            <div className="max-h-[50vh] overflow-y-auto text-blue-800">
              {children}
            </div>
          ) : (
            <p className="text-gray-700 text-base leading-relaxed">{message}</p>
          )}
        </div>

        {/* Bottom accent bar + Actions */}
        <div className={`h-1 bg-gradient-to-r from-transparent via-${styles.accent}/40 to-transparent`}></div>
        <div className="px-6 py-4 bg-gray-50 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className={`px-5 py-2.5 ${styles.accent} text-white font-semibold rounded-xl 
                       hover:${styles.accent}/90 transition focus:outline-none focus:ring-2 
                       focus:ring-${styles.accent}/50 shadow-md hover:shadow-lg`}
          >
            Close
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.28s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
