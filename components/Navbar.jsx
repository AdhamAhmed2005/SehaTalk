"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Stethoscope,
  ChevronDown,
  Search,
  Bell,
  User,
  Shield,
  Phone,
  MessageSquare,
  Plus,
  AlertCircle,
} from "lucide-react";
import { Button } from "./ui/button.jsx";
import { useLanguage } from "../lib/i18n/LanguageProvider";
import { fetchCurrentUser } from "../lib/utils/authClient";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, isRTL } = useLanguage();
  // Auth state
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    fetchCurrentUser().then(u => {
      setUser(u);
      setLoadingUser(false);
    });
  }, []);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div
          className={`flex justify-between items-center h-18 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          {/* Enhanced Logo */}
          <Link
            href="/"
            className={` flex items-center hover:opacity-80 transition-all group ${
              isRTL ? "space-x-reverse space-x-3" : "space-x-3"
            }`}
          >
            <div className="relative">
              <Stethoscope className=" heartbeat h-9 w-9 text-primary group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div
              className={`flex flex-col ${isRTL ? "text-right" : "text-left"}`}
            >
              <span className="text-xl font-bold text-blue-800 leading-tight">
                SehaTalk
              </span>
              <span className="text-xs text-blue-800 font-medium hidden sm:block">
                منصة الرعاية الصحية
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-4">
            {loadingUser ? null : user ? (
              <Link href={user.role === 'doctor' ? "/profile/doctor" : "/profile/patient"} className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-lg border border-blue-100 min-w-[100px] max-w-[180px] hover:bg-blue-100 transition-colors">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-sm border border-primary/10">
                  {user.name?.charAt(0) || '?'}
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="font-medium text-blue-900 truncate max-w-[100px] text-sm underline">{user.name}</span>
                  <span className="text-xs text-blue-600 capitalize">{user.role === 'doctor' ? (isRTL ? 'طبيب' : 'Doctor') : (isRTL ? 'مريض' : 'Patient')}</span>
                </div>
              </Link>
            ) : null}
          </div>
          <div
            className={`hidden lg:flex items-center gap-6 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <Link
              href="/explore"
              className="text-blue-700 hover:text-primary font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              {t("nav.browse")}
            </Link>
            <Link
              href="/categories"
              className="text-blue-700 hover:text-primary font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              {t("nav.categories")}
            </Link>
            <Link
              href="/doctors"
              className={`flex items-center text-blue-700 hover:text-primary font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-50 ${
                isRTL
                  ? "flex-row-reverse space-x-reverse space-x-2"
                  : "space-x-2"
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>{t("nav.doctors")}</span>
            </Link>
            <Link
              href="/about"
              className="text-blue-700 hover:text-primary font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              {t("nav.about")}
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div
            className={`hidden lg:flex items-center gap-3 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Ask Question - Always redirect to ask-question page */}
            {/* Ask Question - Always redirect to ask-question page */}
            <Button
              className="bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md font-medium"
              asChild
            >
              <Link
                href="/ask-question"
                className={`flex items-center ${
                  isRTL
                    ? "flex-row-reverse space-x-reverse space-x-2"
                    : "space-x-2"
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>{t("nav.askQuestion")}</span>
              </Link>
            </Button>
            {!loadingUser && !user && (
              <>
                <Button
                  variant="outline"
                  className="border-primary/30 text-primary hover:bg-primary/5 font-medium hover:text-blue-600"
                  asChild
                >
                  <Link href="/auth/login">{t("nav.signIn")}</Link>
                </Button>
                <Button
                  className="bg-linear-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-lg font-medium px-6"
                  asChild
                >
                  <Link href="/auth">{t("nav.getStarted")}</Link>
                </Button>
              </>
            )}
            {!loadingUser && user && (
              <div
                className={`flex items-center gap-3 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <Button
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 font-medium"
                  onClick={() => {
                    fetch('/auth/logout', { method: 'POST' })
                      .then(() => window.location.href = '/');
                  }}
                >
                  {t("nav.signOut")}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-blue-700 hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-blue-100 bg-white/98 backdrop-blur-md">
            <div className="p-4">
              {/* Mobile Menu Items */}
              <div className="space-y-2">
                {/* Language Switcher */}
                <div className="flex justify-center pb-4 border-b border-blue-100 mb-4">
                  <LanguageSwitcher />
                </div>

                {/* Ask Question - Always redirect to ask-question page */}
                <Link
                  href="/ask-question"
                  className={`flex items-center gap-3 text-green-600 hover:text-green-700 hover:bg-green-50 font-medium transition-colors py-3 px-4 rounded-lg ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Plus className="w-5 h-5" />
                  <span>{t("nav.askQuestion")}</span>
                </Link>
                <Link
                  href="/explore"
                  className={`flex items-center gap-3 text-blue-700 hover:text-primary hover:bg-blue-50 font-medium transition-colors py-3 px-4 rounded-lg ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Search className="w-5 h-5" />
                  <span>{t("nav.browse")}</span>
                </Link>
                <Link
                  href="/categories"
                  className={`flex items-center gap-3 text-blue-700 hover:text-primary hover:bg-blue-50 font-medium transition-colors py-3 px-4 rounded-lg ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <ChevronDown className="w-5 h-5" />
                  <span>{t("nav.categories")}</span>
                </Link>
                <Link
                  href="/doctors"
                  className={`flex items-center gap-3 text-blue-700 hover:text-primary hover:bg-blue-50 font-medium transition-colors py-3 px-4 rounded-lg ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Stethoscope className="w-5 h-5" />
                  <span>{t("nav.doctors")}</span>
                </Link>
                <Link
                  href="/about"
                  className={`flex items-center gap-3 text-blue-700 hover:text-primary hover:bg-blue-50 font-medium transition-colors py-3 px-4 rounded-lg ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>{t("nav.about")}</span>
                </Link>
                {!loadingUser && user && (
                  <Link
                    href="/dashboard/patient"
                    className={`flex items-center gap-3 text-blue-700 hover:text-primary hover:bg-blue-50 font-medium transition-colors py-3 px-4 rounded-lg ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>{t("nav.dashboard")}</span>
                  </Link>
                )}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="flex flex-col gap-3 pt-6 border-t border-blue-100 mt-6">
                {!loadingUser && !user && (
                  <>
                    <Button
                      variant="outline"
                      className="border-primary/30 text-primary hover:bg-primary/5 w-full py-3 font-medium"
                      asChild
                    >
                      <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                        {t("nav.signIn")}
                      </Link>
                    </Button>
                    <Button
                      className="bg-linear-to-r from-primary to-blue-600 text-white shadow-lg w-full py-3 font-medium"
                      asChild
                    >
                      <Link href="/auth" onClick={() => setIsOpen(false)}>
                        {t("nav.getStarted")}
                      </Link>
                    </Button>
                  </>
                )}
                {!loadingUser && user && (
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50 w-full py-3"
                    onClick={() => {
                      setIsOpen(false);
                      fetch('/auth/logout', { method: 'POST' })
                        .then(() => window.location.href = '/');
                    }}
                  >
                    {t("nav.signOut")}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
