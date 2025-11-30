"use client";

import { useState, useEffect } from "react";
import { isPatientAuthenticated } from "../../lib/utils/questionUtils.js";
import { useRouter } from "next/navigation";
import { MessageCircle, ThumbsUp, Eye } from "lucide-react";
import { SearchFilterBar } from "../SearchFilterBar.jsx";
import { VerifiedBadge } from "../VerifiedBadge.jsx";
import { Card, CardContent } from "../ui/card.jsx";
import { Badge } from "../ui/badge.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.jsx";
import { useLanguage } from "../../lib/i18n/LanguageProvider";
import Link from "next/link";

// ...existing code...
import { SimpleModal } from "../ui/SimpleModal.jsx";
import { fetchCurrentUser } from "../../lib/utils/authClient";

export function ExplorePage() {
	const [searchQuery, setSearchQuery] = useState(""); // This triggers DB fetch
	const [searchInput, setSearchInput] = useState(""); // This is the input value
	const [category, setCategory] = useState("all");
	const [sortBy, setSortBy] = useState("recent");
	const { t, isRTL, language } = useLanguage();
	const router = useRouter();

	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [likes, setLikes] = useState({});
	const [replies, setReplies] = useState({});
	const [upvotedQuestions, setUpvotedQuestions] = useState(() => {
		if (typeof window !== 'undefined') {
			return new Set(JSON.parse(localStorage.getItem('upvotedQuestions') || '[]'));
		}
		return new Set();
	});
	const [commentedQuestions, setCommentedQuestions] = useState(() => {
		if (typeof window !== 'undefined') {
			return new Set(JSON.parse(localStorage.getItem('commentedQuestions') || '[]'));
		}
		return new Set();
	});

	const [modal, setModal] = useState({ open: false, title: '', message: '', onClose: null });
	const showModal = (title, message, onClose) => setModal({ open: true, title, message, onClose });

	useEffect(() => {
		async function fetchQuestions() {
			setLoading(true);
			try {
				const params = new URLSearchParams();
				if (searchQuery) params.append('search', searchQuery);
				if (category && category !== 'all') params.append('category', category);
				if (sortBy) params.append('sortBy', sortBy);
				const res = await fetch(`/api/questions?${params.toString()}`);
				if (res.ok) {
					const data = await res.json();
					setQuestions(data.data || []);
				}
			} catch (e) {
				// Optionally handle error
			} finally {
				setLoading(false);
			}
		}
		fetchQuestions();
	}, [searchQuery, category, sortBy]);

	// Handler for search bar input
	const handleSearchInputChange = (val) => setSearchInput(val);
	const handleSearchInputKeyDown = (e) => {
		if (e.key === 'Enter') {
			setSearchQuery(searchInput);
		}
	};
	const handleSearchIconClick = () => {
		setSearchQuery(searchInput);
	};

	// Like handler
	const handleLike = async (question) => {
		if (!isPatientAuthenticated()) {
			showModal(
				isRTL ? "تسجيل الدخول مطلوب" : "Sign In Required",
				isRTL ? "يجب تسجيل الدخول لإضافة إعجاب." : "You must sign in to upvote."
				, () => {
					setModal((m) => ({ ...m, open: false }));
					router.push("/auth/patient");
				}
			);
			return;
		}
		if (upvotedQuestions.has(question._id)) {
			showModal(
				isRTL ? "تم الإعجاب مسبقًا" : "Already Upvoted",
				isRTL ? "لا يمكنك الإعجاب بنفس السؤال أكثر من مرة." : "You can only upvote a question once.",
				() => setModal((m) => ({ ...m, open: false }))
			);
			return;
		}
		try {
			const res = await fetch(`/api/questions/${question._id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ $inc: { likesCount: 1 } }),
			});
			if (res.ok) {
				setLikes((l) => ({
					...l,
					[question._id]: (l[question._id] || question.likesCount || 0) + 1,
				}));
				const updated = new Set(upvotedQuestions);
				updated.add(question._id);
				setUpvotedQuestions(updated);
				localStorage.setItem('upvotedQuestions', JSON.stringify(Array.from(updated)));
			}
		} catch (e) {
			showModal(
				isRTL ? "خطأ" : "Error",
				isRTL ? "حدث خطأ أثناء الإعجاب." : "Error while liking.",
				() => setModal((m) => ({ ...m, open: false }))
			);
		}
	};

// Reply handler
const [currentUser, setCurrentUser] = useState(null);
useEffect(() => {
	fetchCurrentUser().then(setCurrentUser);
}, []);

	const handleReply = async (question) => {
		if (!currentUser || currentUser.role !== "doctor") {
			// Show all replies in a modal for patients/guests
			showModal(
				isRTL ? "الردود على السؤال" : "Question Replies",
				null,
				() => setModal((m) => ({ ...m, open: false })),
				question // pass question for rendering replies
			);
			setModal((m) => ({ ...m, question }));
			return;
		}
		// Only doctors can write replies
		const reply = window.prompt(isRTL ? "اكتب ردك كطبيب:" : "Write your reply as a doctor:");
		if (reply && reply.trim()) {
			try {
				const res = await fetch(`/api/questions/${question._id}/replies`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ content: reply }),
				});
				if (res.ok) {
					setReplies((r) => ({
						...r,
						[question._id]: (r[question._id] || (Array.isArray(question.replies) ? question.replies.length : 0)) + 1,
					}));
				}
			} catch (e) {
				showModal(
					isRTL ? "خطأ" : "Error",
					isRTL ? "حدث خطأ أثناء إضافة الرد." : "Error while replying.",
					() => setModal((m) => ({ ...m, open: false }))
				);
			}
		}
	};

	return (
		<div className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
			<SimpleModal
				open={modal.open}
				title={modal.title}
				message={modal.message}
				onClose={modal.onClose || (() => setModal((m) => ({ ...m, open: false })))}
			>
				{modal.question && Array.isArray(modal.question.replies) && modal.question.replies.length > 0 ? (
					<div className="space-y-6">
						{modal.question.replies.map((reply, idx) => (
							<div key={reply._id || idx} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-primary/20">
								<div className="flex items-center gap-3 mb-2">
									<span className="font-bold text-primary">
										{reply.doctor?.name ? (isRTL ? `د. ${reply.doctor.name}` : `Dr. ${reply.doctor.name}`) : (isRTL ? "طبيب مجهول" : "Unknown Doctor")}
									</span>
									{reply.doctor?.specialty && (
										<span className="text-xs text-blue-700 bg-blue-100 rounded px-2 py-0.5 ml-2">{reply.doctor.specialty}</span>
									)}
									{reply.doctor?.verified && (
										<span className="text-xs text-green-700 bg-green-100 rounded px-2 py-0.5 ml-2">{isRTL ? "موثق" : "Verified"}</span>
									)}
								</div>
								<div className="text-gray-900 dark:text-gray-100 whitespace-pre-line">{reply.content}</div>
							</div>
						))}
					</div>
				) : modal.question ? (
					<div className="text-gray-700 dark:text-gray-200 text-center py-8 text-lg font-medium">{isRTL ? "لا توجد ردود بعد." : "No replies yet."}</div>
				) : null}
			</SimpleModal>
			{/* HERO SECTION */}
			<section className="hero-bg pt-24 pb-16 px-4">
				<div className="container mx-auto max-w-6xl text-center">
					<div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-primary/20 mb-6 mt-6 shadow-sm">
						<div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
						<span className="text-sm font-medium text-primary">
							{isRTL
								? "مجتمع الأسئلة والأجوبة المباشر"
								: "Live Health Q&A Community"}
						</span>
					</div>

					<h1 className="text-4xl sm:text-5xl font-bold mb-6 text-blue-900">
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

					<p className="text-lg sm:text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed mb-10">
						{isRTL
							? "تصفح آلاف الأسئلة الصحية التي أجاب عليها أطباء مصريون معتمدون."
							: "Browse thousands of health questions answered by verified Egyptian doctors."}
					</p>

					{/* Quick Stats */}
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
						{[
							["+5,000", isRTL ? "سؤال" : "Questions"],
							["+200", isRTL ? "طبيب" : "Doctors"],
							["+15", isRTL ? "تخصص" : "Specialties"],
							["98%", isRTL ? "معتمد" : "Verified"],
						].map(([num, label], i) => (
							<div key={i} className="text-center">
								<div className="text-2xl font-bold text-primary">{num}</div>
								<div className="text-sm text-blue-600">{label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CONTENT WRAPPER */}
			<div className="container mx-auto px-4 max-w-6xl -mt-8 pb-16 relative z-10">
				{/* Search / Filters */}
				<div className="mb-12">
					<div className="rounded-2xl overflow-hidden shadow-xl bg-white/70 backdrop-blur-lg border border-primary/10">
						   <div className="bg-linear-to-r from-primary/10 to-primary/5 px-6 py-4 border-b border-primary/20">
							<h3 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
								<span className="w-2 h-2 bg-primary rounded-full"></span>
								{isRTL ? "اعثر على إجابتك" : "Find Your Answer"}
							</h3>
						</div>

						<div className="p-6">
							<SearchFilterBar
								searchQuery={searchInput}
								onSearchChange={handleSearchInputChange}
								onSearchKeyDown={handleSearchInputKeyDown}
								onSearchIconClick={handleSearchIconClick}
								category={category}
								onCategoryChange={setCategory}
								sortBy={sortBy}
								onSortChange={setSortBy}
							/>
						</div>
					</div>
				</div>

				{/* HEADER */}
				<div className="mb-8">
					<div
						className={`flex items-center justify-between ${
							isRTL ? "flex-row-reverse" : ""
						}`}
					>
						<div className={isRTL ? "text-right" : "text-left"}>
							<h2 className="text-2xl font-bold text-blue-900 mb-1">
								{isRTL ? "الأسئلة الحديثة" : "Recent Questions"}
							</h2>
							<p className="text-blue-600">
								{isRTL
									? "أحدث الأسئلة الصحية من مجتمعنا"
									: "Latest health questions from our community"}
							</p>
						</div>

						<div className="hidden sm:flex items-center gap-2 text-sm text-blue-600">
							<div className="flex items-center gap-1">
								<div className="w-3 h-3 rounded-full bg-green-400"></div>
								<span>
									{isRTL ? "إجابات موثقة متوفرة" : "Verified answers available"}
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* QUESTIONS LIST */}
				<div className="space-y-6">
					 {loading ? (
						 <div className="text-center text-blue-700 py-10">{isRTL ? "جاري التحميل..." : "Loading..."}</div>
					 ) : questions.length === 0 ? (
						 <div className="text-center text-blue-700 py-10">{isRTL ? "لا توجد أسئلة متاحة." : "No questions available."}</div>
					) : questions.map((question) => (
						<Card
							key={question._id || question.id}
							className="
                bg-white/80 backdrop-blur-xl border border-blue-100 
                shadow-md hover:shadow-xl transition-all duration-300 
                rounded-2xl overflow-hidden group
              "
						>
							<CardContent className="p-0">
								<div
									className={`p-5 sm:p-7 ${isRTL ? "text-right" : "text-left"}`}
								>
									{/* Header Row */}
									<div
										className={`flex items-center gap-4 mb-5 ${
											isRTL ? "flex-row-reverse" : ""
										}`}
									>
										 <Avatar className="w-14 h-14 border-2 border-primary/20 shadow-sm">
												 <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
														 {question.patient?.name?.charAt(0) || "?"}
												 </AvatarFallback>
												 {question.patient?.avatarUrl && (
													 <AvatarImage src={question.patient.avatarUrl} alt={question.patient.name} />
												 )}
										 </Avatar>

										<div className="flex justify-between gap-2 flex-wrap">
											   <Badge className="bg-primary/10 text-primary border-primary/20 mt-3 font-medium capitalize">
												   {question.category?.name || t(`categories.${question.category}`) || question.category}
											   </Badge>

											   {Array.isArray(question.replies) && question.replies.some(r => r.doctor?.verified) && (
												   <VerifiedBadge
													   className="h-6 text-green-500"
													   title="Verified Doctor"
												   />
											   )}
										</div>
										<div
											className={`flex items-center gap-2 text-blue-600 mt-3 ${
												isRTL ? "flex-row-reverse" : ""
											}`}
										>
											 <span className="font-medium">{question.patient?.name}</span>
											 <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
											 <span className="text-sm">
													 {typeof question.createdAt === "object"
														 ? question.createdAt[language]
														 : new Date(question.createdAt).toLocaleString(language)}
											 </span>
                      </div>
									</div>

									{/* Title */}
																			 <Link href={`/post/${question._id || question.id}`}>
																				<h3
																						className="
												text-xl sm:text-2xl font-semibold text-blue-900 mb-3 
												group-hover:text-primary transition-colors leading-snug
											"
																				>
																							 {typeof question.title === "object"
																								 ? question.title[language] || question.title.en || Object.values(question.title)[0]
																								 : question.title}
																				</h3>
																		</Link>

									{/* Meta Info */}

									{/* Content Preview */}
									   <p className="text-blue-700 mb-6 line-clamp-2 text-lg leading-relaxed">
										   {typeof question.description === "object"
											 ? question.description[language] || question.description.en || Object.values(question.description)[0]
											 : question.description}
									   </p>

									{/* Stats Row */}
									<div
										className={`flex flex-wrap sm:flex-nowrap items-center gap-6 mt-2 ${
											isRTL ? "flex-row-reverse" : ""
										}`}
									>
										{/* Replies */}
										   <div
											   className="
												flex items-center gap-2 cursor-pointer text-blue-600 hover:text-primary transition
											  "
											   onClick={() => handleReply(question)}
										   >
											<MessageCircle className="w-5 h-5" />
											   <span className="font-medium">{replies[question._id] ?? (Array.isArray(question.replies) ? question.replies.length : 0)}</span>
											<span className="text-sm hidden sm:inline">
												{isRTL ? "ردود" : "replies"}
											</span>
										</div>

										{/* Views */}
										   <div className="flex items-center gap-2 text-blue-600">
											   <Eye className="w-5 h-5" />
											   <span className="font-medium">
												   {(question.viewsCount ?? 0).toLocaleString()}
											   </span>
											   <span className="text-sm hidden sm:inline">
												   {isRTL ? "مشاهدات" : "views"}
											   </span>
										   </div>

										{/* Likes */}
										   <div
											   className="
												flex items-center gap-2 cursor-pointer text-blue-600 hover:text-primary transition
											  "
											   onClick={() => handleLike(question)}
										   >
											<ThumbsUp className="w-5 h-5" />
											   <span className="font-medium">
												   {likes[question._id] ?? question.likesCount ?? 0}
											   </span>
											<span className="text-sm hidden sm:inline">
												{isRTL ? "إعجاب" : "likes"}
											</span>
										</div>
									</div>
								</div>

								{/* Bottom Accent */}
								   <div className="h-1 bg-linear-to-r from-transparent via-primary/40 to-transparent"></div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
