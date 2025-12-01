"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Calendar, Stethoscope, Settings, MessageSquare, CheckCircle, Eye, Heart, FileText, Bell, TrendingUp, Award, Activity } from "lucide-react";

export default function DoctorProfileContent() {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDoctor() {
      try {
        setLoading(true);
        const res = await fetch(`/api/doctors/${doctorId}`);
        if (!res.ok) throw new Error("Doctor not found");
        const data = await res.json();
        setDoctor(data);
      } catch (err) {
        setError("Could not load doctor profile.");
      } finally {
        setLoading(false);
      }
    }
    if (doctorId) fetchDoctor();
  }, [doctorId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading profile...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">{error}</div>;
  if (!doctor) return null;

  // Placeholder stats for demo (replace with real data if available)
  const stats = {
    totalAppointments: 42,
    totalPatients: 120,
    reviews: 18,
    rating: 4.7,
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-6">
              {doctor.avatarUrl ? (
                <img src={doctor.avatarUrl} alt={doctor.name} className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-3xl font-bold text-blue-800">
                  {doctor.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-blue-900">Dr. {doctor.name}</h1>
                <p className="text-blue-600 mt-2">{doctor.specialty} • {doctor.location} • Verified Doctor</p>
              </div>
            </div>
            <Button className="bg-primary text-white shadow-lg font-medium rounded-full px-6" asChild>
              <Link href={`/appointments/new?doctorId=${doctor._id}`}>Book Appointment</Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="medical-card border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{stats.totalAppointments}</div>
              <div className="text-sm text-blue-600">Appointments</div>
            </CardContent>
          </Card>
          <Card className="medical-card border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <User className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{stats.totalPatients}</div>
              <div className="text-sm text-blue-600">Patients</div>
            </CardContent>
          </Card>
          <Card className="medical-card border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{stats.reviews}</div>
              <div className="text-sm text-blue-600">Reviews</div>
            </CardContent>
          </Card>
          <Card className="medical-card border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Activity className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{stats.rating}</div>
              <div className="text-sm text-blue-600">Rating</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* About Doctor */}
            <Card className="medical-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                    <Stethoscope className="w-6 h-6" />
                    About Dr. {doctor.name}
                  </h2>
                </div>
                <div className="text-gray-700 mb-4 text-lg">{doctor.bio}</div>
                <div className="flex flex-col gap-2 mt-2 w-full">
                  <div className="flex justify-between text-sm text-blue-600">
                    <span>Specialty</span>
                    <span>{doctor.specialty}</span>
                  </div>
                  {doctor.location && (
                    <div className="flex justify-between text-sm text-blue-600">
                      <span>Location</span>
                      <span>{doctor.location}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-blue-600">
                    <span>Verified</span>
                    <span>{doctor.verified ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex justify-between text-sm text-blue-600">
                    <span>Joined</span>
                    <span>{doctor.createdAt ? new Date(doctor.createdAt).toLocaleDateString() : "-"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Placeholder for future: Recent Appointments, Reviews, etc. */}
            <Card className="medical-card border-0 shadow-lg mt-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" /> Recent Activity
                  </h3>
                </div>
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-blue-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">No recent activity</h3>
                  <p className="text-blue-600 mb-4">This doctor has not added any recent activity yet.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion (placeholder) */}
            <Card className="medical-card border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" /> Profile Status
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-blue-600 mb-2">
                      <span>Profile Completion</span>
                      <span>100%</span>
                    </div>
                    <div className="w-full bg-blue-100 rounded-full h-2">
                      <div 
                        className="bg-linear-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `100%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm text-blue-700">
                    <p className="mb-2">Member since {doctor.createdAt ? new Date(doctor.createdAt).toLocaleDateString() : "-"}</p>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/profile/settings">
                        <Settings className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="medical-card border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/appointments">
                      <Calendar className="w-4 h-4 mr-2" />
                      My Appointments
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/patients">
                      <User className="w-4 h-4 mr-2" />
                      My Patients
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/messages">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Messages
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/reports">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Reports
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Health Tips */}
            <Card className="medical-card border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Health Tip
                </h3>
                <div className="text-sm text-blue-700">
                  <p className="mb-3">
                    Stay up to date with the latest medical research and continue your professional development to provide the best care for your patients.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    More Health Tips
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
