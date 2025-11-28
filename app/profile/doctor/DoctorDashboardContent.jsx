"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Plus,
  Calendar,
  User,
  Bell,
  Stethoscope,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  TrendingUp
} from "lucide-react";
import { Button } from "../../../components/ui/button.jsx";
import { Card, CardContent } from "../../../components/ui/card.jsx";

export function DoctorDashboardContent() {
  // Mock doctor and stats data
  const [doctor] = useState({
    name: "Dr. Ahmed El-Sayed",
    specialty: "Cardiologist",
    email: "ahmed.elsayed@clinic.com",
    profileComplete: 92,
    since: "March 2022"
  });

  const [stats] = useState({
    upcomingAppointments: 6,
    todaysPatients: 4,
    unreadMessages: 3,
    monthlyEarnings: "$4,200"
  });

  const [appointments] = useState([
    { id: "a1", patient: "Mona Khaled", time: "Today • 10:30 AM", type: "In-person", status: "scheduled" },
    { id: "a2", patient: "Omar Youssef", time: "Today • 01:00 PM", type: "Teleconsult", status: "pending" },
    { id: "a3", patient: "Fatma Ali", time: "Tomorrow • 09:00 AM", type: "In-person", status: "scheduled" }
  ]);

  const [patients] = useState([
    { id: "p1", name: "Mona Khaled", lastVisit: "2 months ago", condition: "Hypertension" },
    { id: "p2", name: "Omar Youssef", lastVisit: "1 week ago", condition: "Chest Pain" },
    { id: "p3", name: "Fatma Ali", lastVisit: "3 months ago", condition: "Diabetes" }
  ]);

  const getStatusBadge = (status) => {
    if (status === "scheduled") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
          <Calendar className="w-3 h-3" /> Scheduled
        </span>
      );
    }
    if (status === "pending") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
          <Clock className="w-3 h-3" /> Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
        <CheckCircle className="w-3 h-3" /> Completed
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Welcome back, {doctor.name}</h1>
              <p className="text-blue-600 mt-2">{doctor.specialty} • Manage your clinic and consultations</p>
            </div>
            <Button className="bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg font-medium" asChild>
              <Link href="/appointments/new">
                <Plus className="w-5 h-5 mr-2" />
                New Appointment
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="medical-card border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{stats.upcomingAppointments}</div>
              <div className="text-sm text-blue-600">Upcoming Appointments</div>
            </CardContent>
          </Card>
          <Card className="medical-card border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <User className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{stats.todaysPatients}</div>
              <div className="text-sm text-blue-600">Today's Patients</div>
            </CardContent>
          </Card>
          <Card className="medical-card border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <MessageSquare className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{stats.unreadMessages}</div>
              <div className="text-sm text-blue-600">Unread Messages</div>
            </CardContent>
          </Card>
          <Card className="medical-card border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{stats.monthlyEarnings}</div>
              <div className="text-sm text-blue-600">Monthly Earnings</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2">
            <Card className="medical-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                    <Stethoscope className="w-6 h-6" />
                    Upcoming Appointments
                  </h2>
                  <Button variant="outline" className="text-blue-600 border-blue-200" asChild>
                    <Link href="/appointments">View All</Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  {appointments.map((appt) => (
                    <div key={appt.id} className="p-4 border border-blue-100 rounded-xl hover:shadow-md transition-shadow flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusBadge(appt.status)}
                          <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">{appt.type}</span>
                        </div>
                        <h3 className="font-semibold text-blue-900 mb-1">{appt.patient}</h3>
                        <div className="text-sm text-blue-600 flex items-center gap-4">
                          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{appt.time}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/appointments/${appt.id}`}><Eye className="w-4 h-4" /></Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link href={`/appointments/${appt.id}/complete`}>Mark Done</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {appointments.length === 0 && (
                  <div className="text-center py-12">
                    <Stethoscope className="w-16 h-16 text-blue-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">No upcoming appointments</h3>
                    <p className="text-blue-600 mb-4">Create a new appointment to get started</p>
                    <Button className="btn-primary" asChild>
                      <Link href="/appointments/new">New Appointment</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="medical-card border-0 shadow-lg mt-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                    <User className="w-5 h-5" /> Recent Patients
                  </h3>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/patients">View All</Link>
                  </Button>
                </div>

                <div className="space-y-3">
                  {patients.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-3 border border-blue-50 rounded">
                      <div>
                        <div className="font-medium text-blue-900">{p.name}</div>
                        <div className="text-sm text-blue-600">{p.condition} • Last: {p.lastVisit}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/patients/${p.id}`}>View</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/patients/${p.id}/notes`}><FileText className="w-4 h-4" /></Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="medical-card border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" /> Profile
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-blue-600 mb-2">
                    <span>Profile Completion</span>
                    <span>{doctor.profileComplete}%</span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-2">
                    <div
                      className="bg-linear-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${doctor.profileComplete}%` }}
                    />
                  </div>
                  <p className="text-sm text-blue-700">Member since {doctor.since}</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/profile/settings">Edit Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="medical-card border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/appointments">
                      <Calendar className="w-4 h-4 mr-2" /> Appointments
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/patients">
                      <User className="w-4 h-4 mr-2" /> My Patients
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/messages">
                      <MessageSquare className="w-4 h-4 mr-2" /> Messages
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/reports">
                      <TrendingUp className="w-4 h-4 mr-2" /> Reports
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Small fallback for the Plus icon used above to avoid importing extra icon variable name conflicts
function PlusIconFallback() {
  return <svg className="w-4 h-4 mr-2 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" /></svg>;
}