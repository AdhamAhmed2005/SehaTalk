"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../../../components/ui/button.jsx";
import { Card, CardContent } from "../../../components/ui/card.jsx";

export default function NewAppointmentPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    patient: "",
    date: "",
    time: "",
    type: "In-person",
    notes: ""
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.patient || !form.date || !form.time) {
      setError("Please fill patient, date and time.");
      return;
    }
    setSubmitting(true);
    try {
      // ...mock save: replace with real API call
      await new Promise((r) => setTimeout(r, 700));
      router.push("/appointments");
    } catch (err) {
      setError("Failed to create appointment.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900">New Appointment</h1>
          <Link href="/appointments" className="text-sm text-slate-600">Back to Appointments</Link>
        </div>

        <Card className="max-w-2xl mx-auto bg-white border border-gray-100 shadow-sm">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-blue-700 mb-1">Patient name</label>
                <input
                  name="patient"
                  value={form.patient}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-slate-700 bg-white"
                  placeholder="Enter patient full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-blue-700 mb-1">Date</label>
                  <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-slate-700 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-blue-700 mb-1">Time</label>
                  <input
                    name="time"
                    type="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-slate-700 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-blue-700 mb-1">Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-slate-700 bg-white"
                >
                  <option>In-person</option>
                  <option>Teleconsult</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-blue-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-slate-700 bg-white"
                  rows={4}
                  placeholder="Optional notes for the appointment"
                />
              </div>

              {error && <div className="text-sm text-red-600">{error}</div>}

              <div className="flex items-center gap-3">
                <Button type="submit" className="bg-blue-600 text-white" disabled={submitting}>
                  {submitting ? "Creating..." : "Create Appointment"}
                </Button>
                <Link href="/appointments" className="text-sm text-slate-600">Cancel</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
