import React from "react";
import { X } from "lucide-react";

export function SimpleModal({ open, onClose, title, message, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 relative border border-blue-200 animate-scaleIn">

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-blue-700 hover:text-blue-900 transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-blue-900 tracking-tight">
          {title}
        </h2>

        {children ? (
          <div className="mb-6 max-h-[60vh] overflow-y-auto text-blue-800">
            {children}
          </div>
        ) : (
          <p
            className="mb-6 text-blue-800 text-lg leading-relaxed"
            style={{ wordBreak: "break-word" }}
          >
            {message}
          </p>
        )}

        <div className="flex justify-end">
          <button
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-sm 
                       hover:bg-blue-700 transition focus:outline-none focus:ring-2 
                       focus:ring-blue-300"
            onClick={onClose}
          >
            OK
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
