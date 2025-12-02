"use client";

export default function Toast({ open, message, type = "info" }) {
  if (!open) return null;
  const base = "fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl shadow-md text-sm";
  const styles = {
    info: "bg-blue-600 text-white",
    success: "bg-green-600 text-white",
    warning: "bg-orange-500 text-white",
    error: "bg-red-600 text-white",
  };
  return <div className={`${base} ${styles[type]}`}>{message}</div>;
}
