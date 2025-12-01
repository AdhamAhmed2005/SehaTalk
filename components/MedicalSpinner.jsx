"use client";

export function MedicalSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-primary/5 to-primary/10">
      <div className="relative w-32 h-32">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin"></div>
        
        {/* Middle pulsing ring */}
        <div className="absolute inset-4 rounded-full border-2 border-primary/30 animate-pulse"></div>
        
        {/* Medical icon center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-primary animate-bounce"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 2v2"></path>
            <path d="M5 2v2"></path>
            <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"></path>
            <path d="M8 15a6 6 0 0 0 12 0v-3"></path>
            <circle cx="20" cy="10" r="2"></circle>
          </svg>
        </div>

        {/* Loading text */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <p className="text-center text-primary font-semibold">جاري التحميل...</p>
          <p className="text-center text-primary/60 text-xs">Loading...</p>
        </div>
      </div>
    </div>
  );
}

export default MedicalSpinner;
