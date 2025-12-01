"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { getRatingStars } from "@/lib/data/doctors";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getSpecialtyTranslationKey } from "@/lib/utils/specialtyTranslations";
export default function DoctorsContent({ doctors, specialties }) {
  const { t, isRTL } = useLanguage();
  const [searchName, setSearchName] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const scrollContainerRef = useRef(null);

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (selectedSpecialty === "All" || doc.specialty === selectedSpecialty)
  );

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const targetScroll = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-[90%] max-w-full mx-auto min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header Section */}
      <section className="hero-bg pt-24 pb-16 px-4 ">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              {t("doctors.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">
              {t("doctors.title")}
            </h1>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto">
              {t("doctors.subtitle")}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder={t("doctors.searchPlaceholder")}
              className="w-full h-14 px-6 rounded-full shadow-lg bg-white text-lg"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className=" py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          {/* Specialty Filters */}
          <div className="relative mb-8 group">
            {/* Scroll Buttons */}
            <button
              onClick={() => scroll('left')}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100 border border-gray-200"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            <button
              onClick={() => scroll('right')}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100 border border-gray-200 "
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Scrollable Container */}
            <div 
              ref={scrollContainerRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {specialties.map((spec, index) => (
                <Button
                  key={index}
                  onClick={() => setSelectedSpecialty(spec)}
                  variant={selectedSpecialty === spec ? "default " : "outline"}
                  className={`rounded-full whitespace-nowrap transition-all shrink-0  ${
                    selectedSpecialty === spec
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-white  hover:bg-primary/5 font-medium hover:text-blue-600"
                  }`}
                >
                  {t(getSpecialtyTranslationKey(spec))}
                </Button>
              ))}
            </div>

            {/* Fade Edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r from-gray-50 to-transparent hidden md:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-gray-50 to-transparent hidden md:block" />
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doc) => (
              <Card
                key={doc._id || doc.id}
                className="medical-card hover:shadow-xl transition-all duration-300 border-0"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-primary/80 flex items-center justify-center text-white text-xl font-bold shadow-md">
                      {doc.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {doc.name}
                      </h3>
                      <Badge variant="secondary" className="text-primary bg-primary/10 border-primary/20">
                        {doc.specialty}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-lg">
                        {getRatingStars(doc.rating)}
                      </span>
                      <span className="text-gray-500 text-xs">({doc.rating || 0})</span>
                    </div>
                    <span className="text-blue-700 font-medium">
                      {doc.experience} {t("doctors.yearsExp")}
                    </span>
                  </div>

                  {doc.location && (
                    <div className="mb-3 text-xs text-gray-600">
                      <span className="font-medium">📍 </span>{doc.location}
                    </div>
                  )}

                  {doc.bio && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {doc.bio}
                    </p>
                  )}

                  {doc.answeredQuestions > 0 && (
                    <div className="mb-4 flex gap-4 text-xs">
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary">{doc.answeredQuestions}</span>
                        <span className="text-gray-600">{t("doctors.answeredQuestions")}</span>
                      </div>
                    </div>
                  )}
                 
                  <Link href={`/profile/doctor/${doc.id || doc._id}`} className="w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90 rounded-full">
                      {t("doctors.bookAppointment")}
                    </Button>
                  </Link>
                    
                </CardContent>
              </Card>
            ))}

            {filteredDoctors.length === 0 && (
              <div className="col-span-full text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl text-gray-500">{t("doctors.noDoctors")}</p>
              </div>
            )}
          </div>

          {/* Stats Section */}
          {filteredDoctors.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-blue-700">
                {t("doctors.showing")} <span className="font-semibold text-primary">{filteredDoctors.length}</span> {t("doctors.of")} <span className="font-semibold">{doctors.length}</span> {t("doctors.doctors")}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
