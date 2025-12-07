"use client";

import { useState, useEffect } from "react";
import { isPatientAuthenticated } from "../../lib/utils/questionUtils.js";
import { useRouter } from "next/navigation";
import { MessageCircle, ArrowBigUp, Eye } from "lucide-react";
import { SearchFilterBar } from "../SearchFilterBar.jsx";
import { VerifiedBadge } from "../VerifiedBadge.jsx";
import { Card, CardContent } from "../ui/card.jsx";
import { Badge } from "../ui/badge.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.jsx";
import { useLanguage } from "../../lib/i18n/LanguageProvider";
import MedicalSpinner from "../MedicalSpinner.jsx";
import Link from "next/link";
import { SimpleModal } from "../ui/SimpleModal.jsx";
import Toast from "../ui/Toast.jsx";
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
		const [toast, setToast] = useState({ open: false, message: '', type: 'info' });
		const showToast = (message, type = 'info') => {
			setToast({ open: true, message, type });
			setTimeout(() => setToast({ open: false, message: '', type }), 2000);
		};
	const [replies, setReplies] = useState({});
	const [expandedQuestions, setExpandedQuestions] = useState(() => {
		if (typeof window !== 'undefined') return new Set(JSON.parse(localStorage.getItem('expandedQuestions') || '[]'));
		return new Set();
	});
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

	const [modal, setModal] = useState({ open: false, title: '', message: '', onClose: null, content: null });
	const showModal = (title, message, onClose, content = null) => setModal({ open: true, title, message, onClose, content });

	useEffect(() => {
		async function fetchQuestions() {
			setLoading(true);
			try {
				const params = new URLSearchParams();
				if (searchQuery) params.append('search', searchQuery);
				if (category && category !== 'all') params.append('category', category);
				if (sortBy) params.append('sortBy', sortBy);
				// Request only non-completed from server when possible (defensive)
				params.append('completed', 'false');
				const res = await fetch(`/api/questions?${params.toString()}`);
				if (res.ok) {
					const data = await res.json();
					// Filter out completed questions (client-side defensive filter)
					const rawList = data.data || [];
					const visible = rawList.filter((q) => !isQuestionCompleted(q));
					setQuestions(visible);
					// Fetch upvote/replies counts only for visible questions
					const ids = visible.map((q) => q._id || q.id).filter(Boolean);
					const counts = {};
					await Promise.all(
						ids.map(async (qid) => {
							try {
								const r = await fetch(`/api/questions/${qid}/upvote`);
								if (r.ok) {
									const c = await r.json();
									counts[qid] = c.upvotes ?? 0;
								}
								// Also fetch replies count for display
								const rr = await fetch(`/api/questions/${qid}/replies`);
								if (rr.ok) {
									const list = await rr.json();
									setReplies((prev) => ({ ...prev, [qid]: Array.isArray(list?.data) ? list.data.length : 0 }));
								}
							} catch {}
						})
					);
					setLikes((prev) => ({ ...prev, ...counts }));
				}
			} catch (e) {
				// Optionally handle error
			} finally {
				setLoading(false);
			}
		}
		fetchQuestions();
	}, [searchQuery, category, sortBy]);

	// Helper: robust check for completed questions
	const isQuestionCompleted = (q) => {
		if (!q) return false;
		// boolean flags
		if (q.completed === true || q.isCompleted === true || q.closed === true) return true;
		// string flags
		if (String(q.completed) === "true") return true;
		// common status values that indicate finished/resolved
		const status = (q.status || "").toString().toLowerCase();
		if (["completed", "closed", "resolved", "done", "answered"].includes(status)) return true;
		// fallback: check for a completedAt / closedAt timestamp
		if (q.completedAt || q.closedAt || q.resolvedAt) return true;
		return false;
	};

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

	// Upvote handler (guests/patients can view counts but cannot upvote)
	const handleUpvote = async (question) => {
		if (!currentUser) {
			const content = (
				<div className="space-y-3">
					<p className="text-gray-700">Join our community to upvote and help others find the best answers.</p>
					<div className="flex flex-col items-stretch gap-2">
						<Link href="/auth/login" className="px-4 py-2 bg-primary text-white rounded-md text-sm font-semibold text-center">Sign In</Link>
						<div className="text-center text-sm text-gray-600">or</div>
						<Link href="/auth/options" className="px-4 py-2 bg-blue-100 text-blue-700 border border-blue-300 rounded-md text-sm font-semibold text-center">Don't have an account? Sign Up</Link>
					</div>
				</div>
			);
			showModal(
				"Sign in to Upvote",
				null,
				() => setModal((m) => ({ ...m, open: false })),
				content
			);
			return;
		}

		try {
			const res = await fetch(`/api/questions/${question._id}/upvote`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			if (res.ok) {
				const data = await res.json();
				setLikes((l) => ({
					...l,
					[question._id]: data.upvotes ?? ((l[question._id] || 0) + 1),
				}));
				const updated = new Set(upvotedQuestions);
				updated.add(question._id);
				setUpvotedQuestions(updated);
				localStorage.setItem('upvotedQuestions', JSON.stringify(Array.from(updated)));
			} else if (res.status === 409) {
				showToast('You already upvoted this question.', 'info');
			}
		} catch (e) {
			showToast("We couldn't record your upvote. Please try again.", 'error');
		}
	};

// Reply handler
const [currentUser, setCurrentUser] = useState(null);
useEffect(() => {
	fetchCurrentUser().then(setCurrentUser);
}, []);

	const handleReply = async (question) => {
		if (!currentUser || currentUser.role !== "doctor") {
			// Patients and guests: fetch replies and show in modal
			try {
				const rr = await fetch(`/api/questions/${question._id}/replies`);
				if (rr.ok) {
					const list = await rr.json();
					const items = Array.isArray(list?.data) ? list.data : [];
					const content = (
						<div className="space-y-4">
							{items.length === 0 ? (
								<p className="text-gray-600">{t('explore.noRepliesYet')}</p>
							) : (
								items.map((r) => (
									<div key={r._id} className="flex items-start gap-3">
										<img src={r.user_id?.avatarUrl} alt={r.user_id?.name} className="w-8 h-8 rounded-full object-cover" />
										<div>
											<p className="text-sm text-gray-800"><span className="font-medium">{r.user_id?.name}</span> — {r.user_id?.specialty}</p>
											<p className="text-gray-700">{r.content}</p>
											<p className="text-xs text-gray-500">{new Date(r.created_at).toLocaleString()}</p>
										</div>
									</div>
								))
							)}
						</div>
					);
					showModal(
						t('explore.questionRepliesTitle'),
						null,
						() => setModal((m) => ({ ...m, open: false })),
						content
					);
				} else {
					showToast('Could not load replies.', 'error');
				}
			} catch {
				showToast('Could not load replies.', 'error');
			}
			return;
		}
		// Only doctors can write replies
		const reply = window.prompt(t('explore.replyPrompt'));
		if (reply && reply.trim()) {
			try {
				const res = await fetch(`/api/questions/${question._id}/replies`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ content: reply }),
				});
				if (res.ok) {
					// refresh replies count from server to avoid drift
					const rr = await fetch(`/api/questions/${question._id}/replies`);
					if (rr.ok) {
						const list = await rr.json();
						setReplies((r) => ({ ...r, [question._id]: Array.isArray(list?.data) ? list.data.length : (r[question._id] || 0) }));
					}
					showToast('Reply posted', 'success');
				}
			} catch (e) {
				showModal(t('common.error'), t('explore.errorReplying'), () => setModal((m) => ({ ...m, open: false })));
			}
		}
	};

	// Toggle expanded state for question description (used on small screens)
	const toggleExpand = (qid) => {
		setExpandedQuestions((prev) => {
			const next = new Set(prev);
			if (next.has(qid)) next.delete(qid);
			else next.add(qid);
			if (typeof window !== 'undefined') {
				localStorage.setItem('expandedQuestions', JSON.stringify(Array.from(next)));
			}
			return next;
		});
	};

	return (
		<div className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
			<Toast open={toast.open} message={toast.message} type={toast.type} />
			<SimpleModal
				open={modal.open}
				title={modal.title}
				message={modal.message}
				onClose={modal.onClose || (() => setModal((m) => ({ ...m, open: false })))}
			>
				{modal.content ? (
					modal.content
				) : modal.question && Array.isArray(modal.question.replies) && modal.question.replies.length > 0 ? (
					<div className="space-y-6">
						{modal.question.replies.map((reply, idx) => (
							<div key={reply._id || idx} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-primary/20">
								<div className="flex items-center gap-3 mb-2">
									<span className="font-bold text-primary">
										{reply.doctor?.name ? `${t('explore.doctorPrefix')} ${reply.doctor.name}` : t('explore.unknownDoctor')}
									</span>
									{reply.doctor?.specialty && (
										<span className="text-xs text-blue-700 bg-blue-100 rounded px-2 py-0.5 ml-2">{reply.doctor.specialty}</span>
									)}
									{reply.doctor?.verified && (
										<span className="text-xs text-green-700 bg-green-100 rounded px-2 py-0.5 ml-2">{t('explore.verifiedDoctor')}</span>
									)}
								</div>
								<div className="text-gray-900 dark:text-gray-100 whitespace-pre-line">{reply.content}</div>
							</div>
						))}
					</div>
				) : modal.question ? (
					<div className="text-gray-700 dark:text-gray-200 text-center py-8 text-lg font-medium">{t('explore.noRepliesYet')}</div>
				) : null}
			</SimpleModal>
			{/* HERO SECTION */}
			<section className="hero-bg pt-24 pb-16 px-4">
				<div className="container mx-auto max-w-6xl text-center">
					<div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-primary/20 mb-6 mt-6 shadow-sm">
						<div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
						<span className="text-sm font-medium text-primary">{t('explore.hero.badgeLine')}</span>
					</div>

					<h1 className="text-4xl sm:text-5xl font-bold mb-6 text-blue-900">
						{isRTL ? (
							<>
								{t('explore.hero.h1Prefix')} <span className="section-header">{t('explore.hero.h1Span')}</span>
							</>
						) : (
							<>
								{t('explore.hero.h1Prefix')} <span className="section-header">{t('explore.hero.h1Span')}</span>
							</>
						)}
					</h1>

					<p className="text-lg sm:text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed mb-10">{t('explore.hero.subtitle')}</p>

					{/* Quick Stats */}
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
						{[
							["+5,000", t('explore.stats.questions')],
							["+200", t('explore.stats.doctors')],
							["+15", t('explore.stats.specialties')],
							["98%", t('explore.stats.verified')],
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
								{t('explore.findYourAnswer')}
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
							<h2 className="text-2xl font-bold text-blue-900 mb-1">{t('explore.recentQuestionsTitle')}</h2>
							<p className="text-blue-600">{t('explore.recentQuestionsSubtitle')}</p>
						</div>

						<div className="hidden sm:flex items-center gap-2 text-sm text-blue-600">
								<div className="flex items-center gap-1">
								<div className="w-3 h-3 rounded-full bg-green-400"></div>
								<span>{t('explore.verifiedAnswersAvailable')}</span>
							</div>
						</div>
					</div>
				</div>

				{/* QUESTIONS LIST */}
				<div className="space-y-6">
								 {loading ? (
										 <div className="py-10">
											 <MedicalSpinner />
										 </div>
					 ) : questions.length === 0 ? (
						 <div className="text-center text-blue-700 py-10">{t('explore.noQuestions')}</div>
					) : questions.filter(q => !isQuestionCompleted(q)).map((question) => {
						const qid = question._id || question.id;
						return (
						<Card
							key={qid}
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
										className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5 ${
											isRTL ? "sm:flex-row-reverse" : ""
										}`}
									>
										 <Avatar className="w-14 h-14 border-2 border-primary/20 shadow-sm flex-shrink-0">
												 <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
														 {question.patient?.name?.charAt(0) || "?"}
												 </AvatarFallback>
												 {question.patient?.avatarUrl && (
													 <AvatarImage src={question.patient.avatarUrl} alt={question.patient.name} />
												 )}
										 </Avatar>

										<div className="flex-1 w-full">
											<div
												className={`flex items-center gap-2 text-blue-600 mb-2 ${
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

											<div className={`flex flex-wrap gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
												   <Badge className="bg-primary/10 text-primary border-primary/20 font-medium capitalize">
													   {question.category?.name || t(`categories.${question.category}`) || question.category}
												   </Badge>

												   {Array.isArray(question.replies) && question.replies.some(r => r.doctor?.verified) && (
													   <VerifiedBadge
														   className="h-6 text-green-500"
														   title={t('explore.verifiedDoctor')}
													   />
												   )}
											</div>
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
										   <p className={`text-blue-700 mb-6 text-lg leading-relaxed ${expandedQuestions.has(qid) ? '' : 'line-clamp-2'}`}>
											   {typeof question.description === "object"
												 ? question.description[language] || question.description.en || Object.values(question.description)[0]
												 : question.description}
										   </p>

										   
										   {/* Show expand/collapse only for questions that are NOT completed */}
										   {!isQuestionCompleted(question) && (
											   <div className="sm:hidden mb-4">
												   <button
													   className="text-sm text-primary font-medium"
													   onClick={() => toggleExpand(qid)}
												   >
													   {expandedQuestions.has(qid) ? '' : 'show more'}
												   </button>
											   </div>
										   )}
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
											<span className="text-sm hidden sm:inline">{t('explore.labels.replies')}</span>
										</div>

										{/* Views */}
										   <div className="flex items-center gap-2 text-blue-600">
											   <Eye className="w-5 h-5" />
											   <span className="font-medium">
												   {(question.viewsCount ?? 0).toLocaleString()}
											   </span>
											   <span className="text-sm hidden sm:inline">{t('explore.labels.views')}</span>
										   </div>

										{/* Upvotes */}
										   <div
											   className="
												flex items-center gap-2 cursor-pointer text-blue-600 hover:text-primary transition
											  "
											   onClick={() => handleUpvote(question)}
										   >
											<ArrowBigUp className="w-5 h-5" />
											   <span className="font-medium">
												   {likes[question._id] ?? 0}
											   </span>
											<span className="text-sm hidden sm:inline">{t('explore.labels.upvotes')}</span>
										</div>
									</div>
								</div>

								{/* Bottom Accent */}
								   <div className="h-1 bg-linear-to-r from-transparent via-primary/40 to-transparent"></div>
							</CardContent>
						</Card>
						);
					})}
				</div>
			</div>
		</div>
	);
}
