"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, Plus, Clock, CheckCircle, Eye, Heart, 
  User, Calendar, FileText, Settings, Bell, TrendingUp,
  Stethoscope, Award, Activity
} from 'lucide-react';
import { Button } from '../../../components/ui/button.jsx';
import { Card, CardContent } from '../../../components/ui/card.jsx';

export function PatientDashboardContent() {
  // Real user data
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const res = await fetch("/api/profile/me");
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setError("Could not load profile. Please sign in again.");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  // TODO: Replace with real questions fetch for this user
  const [questions] = useState([]);

  // TODO: Replace with real stats fetch for this user
  const [stats] = useState({
    totalQuestions: 0,
    answeredQuestions: 0,
    totalViews: 0,
    helpfulVotes: 0
  });

  const getStatusBadge = (status, urgency) => {
    if (status === 'answered') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
          <CheckCircle className="w-3 h-3" />
          Answered
        </span>
      );
    } else {
      const urgencyColor = urgency === 'high' ? 'text-red-700 bg-red-100' : 'text-yellow-700 bg-yellow-100';
      return (
        <span className={`inline-flex items-center gap-1 px-2 py-1 ${urgencyColor} rounded-full text-xs font-medium`}>
          <Clock className="w-3 h-3" />
          Pending
        </span>
      );
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading profile...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">{error}</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Welcome back, {user.name}!</h1>
              <p className="text-blue-600 mt-2">Manage your health questions and track your medical consultations</p>
            </div>
            <Button className="bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg font-medium" asChild>
              <Link href="/ask-question">
                <Plus className="w-5 h-5 mr-2" />
                Ask New Question
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="medical-card border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <MessageSquare className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{stats.totalQuestions}</div>
              <div className="text-sm text-blue-600">Total Questions</div>
            </CardContent>
          </Card>
          <Card className="medical-card border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{stats.answeredQuestions}</div>
              <div className="text-sm text-blue-600">Answered</div>
            </CardContent>
          </Card>
          <Card className="medical-card border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{stats.totalViews}</div>
              <div className="text-sm text-blue-600">Total Views</div>
            </CardContent>
          </Card>
          <Card className="medical-card border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{stats.helpfulVotes}</div>
              <div className="text-sm text-blue-600">Helpful Votes</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Recent Questions */}
            <Card className="medical-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                    <MessageSquare className="w-6 h-6" />
                    My Questions
                  </h2>
                  <Button variant="outline" className="text-blue-600 border-blue-200" asChild>
                    <Link href="/questions/my-questions">View All</Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  {questions.map((question) => (
                    <div key={question.id} className="p-4 border border-blue-100 rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getStatusBadge(question.status, question.urgency)}
                            <span className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded">
                              {question.category}
                            </span>
                            {question.isAnonymous && (
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                Anonymous
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-blue-900 mb-2 line-clamp-2">
                            <Link href={`/questions/${question.id}`} className="hover:text-primary transition-colors">
                              {question.title}
                            </Link>
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-blue-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {question.createdAt}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              {question.answerCount} answers
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {question.views} views
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/questions/${question.id}`}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {questions.length === 0 && (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-blue-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">No questions yet</h3>
                    <p className="text-blue-600 mb-4">Start by asking your first medical question</p>
                    <Button className="btn-primary" asChild>
                      <Link href="/ask-question">Ask Your First Question</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <Card className="medical-card border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Status
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-blue-600 mb-2">
                      <span>Profile Completion</span>
                      <span>{user.profileComplete}%</span>
                    </div>
                    <div className="w-full bg-blue-100 rounded-full h-2">
                      <div 
                        className="bg-linear-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${user.profileComplete}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm text-blue-700">
                    <p className="mb-2">Member since {user.memberSince}</p>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/profile/settings">
                        <Settings className="w-4 h-4 mr-2" />
                        Complete Profile
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
                    <Link href="/doctors">
                      <Stethoscope className="w-4 h-4 mr-2" />
                      Find Doctors
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/appointments">
                      <Calendar className="w-4 h-4 mr-2" />
                      My Appointments
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/medical-history">
                      <FileText className="w-4 h-4 mr-2" />
                      Medical History
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/notifications">
                      <Bell className="w-4 h-4 mr-2" />
                      Notifications
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
                    Regular check-ups are essential for maintaining good health. Consider scheduling annual visits with your primary care physician.
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