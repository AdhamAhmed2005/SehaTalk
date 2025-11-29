"use client";

import { useState } from 'react';
import { MessageCircle, ThumbsUp, Eye } from 'lucide-react';
import { SearchFilterBar } from '../SearchFilterBar.jsx';
import { VerifiedBadge } from '../VerifiedBadge.jsx';
import { Card, CardContent } from '../ui/card.jsx';
import { Badge } from '../ui/badge.jsx';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx';
import { useLanguage } from '../../lib/i18n/LanguageProvider';
import Link from 'next/link';

const mockQuestions = [
  {
    id: 1,
    title: {
      ar: "ما هي العلامات المبكرة لمرض السكري؟",
      en: "What are the early signs of diabetes?"
    },
    content: {
      ar: "أشعر بعطش متزايد وتبول متكرر. هل يجب أن أقلق بشأن مرض السكري؟",
      en: "I've been experiencing increased thirst and frequent urination. Should I be concerned about diabetes?"
    },
    category: "general-health",
    author: "أحمد م.",
    authorAvatar: "",
    replies: 3,
    views: 245,
    likes: 12,
    hasVerifiedReply: true,
    createdAt: {
      ar: "منذ ساعتين",
      en: "2 hours ago"
    },
  },
  {
    id: 2,
    title: {
      ar: "أفضل التمارين لألم أسفل الظهر؟",
      en: "Best exercises for lower back pain?"
    },
    content: {
      ar: "أعاني من ألم مزمن في أسفل الظهر من الجلوس على المكتب. ما التمارين التي تنصحون بها؟",
      en: "I have chronic lower back pain from sitting at a desk. What exercises would you recommend?"
    },
    category: "orthopedics",
    author: "نور ك.",
    authorAvatar: "",
    replies: 5,
    views: 432,
    likes: 28,
    hasVerifiedReply: true,
    createdAt: {
      ar: "منذ 5 ساعات",
      en: "5 hours ago"
    },
  },
  {
    id: 3,
    title: {
      ar: "كيفية إدارة القلق بطرق طبيعية؟",
      en: "How to manage anxiety naturally?"
    },
    content: {
      ar: "أبحث عن طرق طبيعية لتقليل القلق بدون دواء. أي اقتراحات؟",
      en: "Looking for natural ways to reduce anxiety without medication. Any suggestions?"
    },
    category: "psychiatry",
    author: "ليلى س.",
    authorAvatar: "",
    replies: 7,
    views: 567,
    likes: 45,
    hasVerifiedReply: true,
    createdAt: {
      ar: "منذ يوم واحد",
      en: "1 day ago"
    },
  },
  {
    id: 4,
    title: {
      ar: "نظام غذائي صحي لارتفاع ضغط الدم؟",
      en: "Healthy diet for high blood pressure?"
    },
    content: {
      ar: "تم تشخيصي مؤخراً بارتفاع ضغط الدم. ما التغييرات الغذائية التي يجب أن أقوم بها؟",
      en: "Recently diagnosed with high blood pressure. What dietary changes should I make?"
    },
    category: "cardiology",
    author: "يوسف أ.",
    authorAvatar: "",
    replies: 4,
    views: 321,
    likes: 19,
    hasVerifiedReply: true,
    createdAt: {
      ar: "منذ يوم واحد",
      en: "1 day ago"
    },
  },
  {
    id: 5,
    title: {
      ar: "طفح جلدي على الذراعين - ما قد يكون؟",
      en: "Skin rash on arms - what could it be?"
    },
    content: {
      ar: "لدي طفح جلدي أحمر ومثير للحكة على ذراعي لمدة أسبوع. هل يجب أن أراجع طبيب الجلدية؟",
      en: "I've had a red, itchy rash on my arms for a week. Should I see a dermatologist?"
    },
    category: "dermatology",
    author: "مريم ح.",
    authorAvatar: "",
    replies: 2,
    views: 198,
    likes: 8,
    hasVerifiedReply: true,
    createdAt: {
      ar: "منذ يومين",
      en: "2 days ago"
    },
  },
];

export function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const { t, isRTL, language } = useLanguage();

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="hero-bg pt-24 pb-16 px-4">
        <div className={`container mx-auto max-w-6xl ${isRTL ? 'text-center' : 'text-center'}`}>
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-6 mt-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">مجتمع الأسئلة والأجوبة المباشر</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-blue-900 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
            {isRTL ? (
              <>
                استكشف <span className="section-header">الأسئلة الصحية</span>
              </>
            ) : (
              <>
                Explore <span className="section-header">Health Questions</span>
              </>
            )}
          </h1>
          <p className="text-xl text-blue-700 leading-relaxed max-w-3xl mx-auto mb-8 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
            {isRTL ? (
              'تصفح آلاف الأسئلة الصحية التي أجاب عليها أطباء مصريون معتمدون. تعلم من المناقشات الطبية الحقيقية واعثر على إجابات لمخاوفك الصحية.'
            ) : (
              'Browse thousands of health questions answered by verified Egyptian doctors. Learn from real medical discussions and find answers to your health concerns.'
            )}
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">+5,000</div>
              <div className="text-sm text-blue-600">{isRTL ? 'سؤال' : 'Questions'}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">+200</div>
              <div className="text-sm text-blue-600">{isRTL ? 'طبيب' : 'Doctors'}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">+15</div>
              <div className="text-sm text-blue-600">{isRTL ? 'تخصص' : 'Specialties'}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">98%</div>
              <div className="text-sm text-blue-600">{isRTL ? 'معتمد' : 'Verified'}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl -mt-8 pb-12 relative z-10">

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="medical-card border-0 shadow-xl rounded-2xl overflow-hidden">
            <div className="bg-linear-to-r from-primary/5 to-primary/10 px-6 py-4 border-b border-primary/10">
              <h3 className={`text-lg font-semibold text-blue-900 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                {isRTL ? 'اعثر على إجابتك' : 'Find Your Answer'}
              </h3>
            </div>
            <div className="p-6">
              <SearchFilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                category={category}
                onCategoryChange={setCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>
          </div>
        </div>

        {/* Questions Section Header */}
        <div className="mb-8">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : 'text-left'} dir={isRTL ? 'rtl' : 'ltr'}>
              <h2 className="text-2xl font-bold text-blue-900 mb-2">{isRTL ? 'الأسئلة الحديثة' : 'Recent Questions'}</h2>
              <p className="text-blue-600">{isRTL ? 'أحدث الأسئلة الصحية من مجتمعنا' : 'Latest health questions from our community'}</p>
            </div>
            <div className={`hidden sm:flex items-center gap-2 text-sm text-blue-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span dir={isRTL ? 'rtl' : 'ltr'}>{isRTL ? 'إجابات موثقة متوفرة' : 'Verified answers available'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {mockQuestions.map((question, index) => (
            <Card key={question.id} className="medical-card hover:shadow-xl transition-all duration-300 border-0 rounded-2xl overflow-hidden group">
              <CardContent className="p-0">
                <div className={`p-8 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                  <div className={`flex gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {/* Author Avatar */}
                    <div className="shrink-0">
                      <Avatar className="w-14 h-14 border-2 border-primary/20">
                        <AvatarFallback className="bg-linear-to-br from-primary/10 to-primary/20 text-primary text-lg font-bold">
                          {question.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className={`flex items-start justify-between mb-4 gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                          <Link href={`/post/${question.id}`} className="block group-hover:scale-[1.01] transition-transform">
                            <h3 className={`text-xl font-semibold mb-3 text-blue-900 group-hover:text-primary transition-colors leading-tight ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                              {question.title[language]}
                            </h3>
                          </Link>
                          <div className={`flex items-center gap-3 text-blue-600 mb-4 ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                            <span className="font-medium">{question.author}</span>
                            <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                            <span className="text-sm">{question.createdAt[language]}</span>
                          </div>
                        </div>
                        <div className={`flex items-center gap-3 shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Badge variant="secondary" className="bg-linear-to-r from-primary/10 to-primary/20 text-primary border-primary/30 font-medium capitalize">
                            {t(`categories.${question.category}`)}
                          </Badge>
                          {question.hasVerifiedReply && (
                            <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm" title="إجابة طبيب موثق"></div>
                          )}
                        </div>
                      </div>

                      <p className={`text-blue-700 mb-6 line-clamp-2 text-lg leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                        {question.content[language]}
                      </p>

                      {/* Enhanced Stats */}
                      <div className={`flex items-center ${isRTL ? 'justify-between flex-row-reverse' : 'justify-between'}`}>
                        <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className={`flex items-center gap-2 text-blue-600 hover:text-primary transition-colors cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <MessageCircle className="w-5 h-5" />
                            <span className="font-medium">{question.replies}</span>
                            <span className="text-sm hidden sm:inline">{isRTL ? 'ردود' : 'replies'}</span>
                          </div>
                          <div className={`flex items-center gap-2 text-blue-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Eye className="w-5 h-5" />
                            <span className="font-medium">{question.views.toLocaleString()}</span>
                            <span className="text-sm hidden sm:inline">{isRTL ? 'مشاهدة' : 'views'}</span>
                          </div>
                          <div className={`flex items-center gap-2 text-blue-600 hover:text-primary transition-colors cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <ThumbsUp className="w-5 h-5" />
                            <span className="font-medium">{question.likes}</span>
                            <span className="text-sm hidden sm:inline">{isRTL ? 'إعجاب' : 'likes'}</span>
                          </div>
                        </div>
                        
                        {question.hasVerifiedReply && (
                          <div className={`${isRTL ? 'mr-auto pr-2 md:pr-4' : 'ml-auto pl-2 md:pl-4'}`}>
                            <VerifiedBadge className={`${isRTL ? 'mr-3' : 'ml-3'}`} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Gradient bottom border */}
                <div className="h-1 bg-linear-to-r from-primary/0 via-primary/30 to-primary/0"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
