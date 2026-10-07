"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Compass, MapPin, Target, ArrowRight, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (query: string) => void;
  selectedRadius: number;
  setSelectedRadius: (radius: number) => void;
  onExploreClick: () => void;
  onMapClick: () => void;
}

export default function Hero({
  searchQuery,
  setSearchQuery,
  onSearch,
  selectedRadius,
  setSelectedRadius,
  onExploreClick,
  onMapClick,
}: HeroProps) {
  const [showRadiusDropdown, setShowRadiusDropdown] = useState(false);
  const { t } = useLanguage();

  const popularTags = [
    "Senanayake Samudraya",
    "Deegawapi Stupa",
    "Gal Oya Safari",
    "Buddhangala",
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    onSearch(tag);
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between pt-12 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Hero Background Image with Gradient Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/hero-bg.jpg"
          alt="Ampara scenic landscape at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Subtle cinematic overlay to keep text perfectly legible while showing rich landscape colors */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/25 via-transparent to-slate-50/40" />
        {/* Soft bottom blend to transition smoothly to Browse section */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center pt-8 sm:pt-14 relative z-10">
        
        {/* Location / Radial Zone Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-xs mb-6 animate-fadeIn">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] animate-pulse" />
          <span className="text-xs font-bold text-slate-800 tracking-wide">
            {t("heroZonePill")}
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] mb-5 drop-shadow-xs">
          {t("heroTitleDiscover")}{" "}
          <span className="text-[#0084d1] text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#0ea5e9]">
            {t("heroTitleCity")}
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-800 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] mb-8">
          {t("heroSubtitle")}
          <span className="block sm:inline font-semibold text-slate-900">
            {t("heroSubtitleSuffix")}
          </span>
        </p>

        {/* Main Search Input Form */}
        <div className="w-full max-w-2xl mx-auto relative mb-4">
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white/95 backdrop-blur-md rounded-full p-2 pl-4 sm:pl-5 shadow-xl shadow-slate-900/10 border border-slate-200/90 flex items-center gap-2 transition-all duration-300 focus-within:ring-4 focus-within:ring-sky-200 focus-within:border-sky-400"
          >
            <Search className="w-5 h-5 text-slate-400 shrink-0 ml-1" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full bg-transparent text-slate-800 placeholder-slate-400 font-medium text-xs sm:text-sm focus:outline-none px-1"
            />

            {/* Radius Badge / Toggle Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowRadiusDropdown(!showRadiusDropdown)}
                className="shrink-0 hidden sm:flex items-center gap-1.5 bg-sky-50 hover:bg-sky-100 text-[#0284c7] border border-sky-200/80 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer"
              >
                <Target className="w-3.5 h-3.5" />
                <span>{t("withinRadius")} {selectedRadius} km</span>
              </button>

              {/* Radius Dropdown */}
              {showRadiusDropdown && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-30 min-w-[150px] text-left animate-fadeIn">
                  <div className="text-[11px] font-bold text-slate-400 uppercase px-3 py-1">Select Radius</div>
                  {[5, 15, 25].map((km) => (
                    <button
                      key={km}
                      type="button"
                      onClick={() => {
                        setSelectedRadius(km);
                        setShowRadiusDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                        selectedRadius === km ? "bg-sky-50 text-[#0284c7]" : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{t("withinRadius")} {km} km</span>
                      {selectedRadius === km && <span className="text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Submit Button */}
            <button
              type="submit"
              className="shrink-0 bg-[#006699] hover:bg-[#0284c7] text-white px-5 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{t("searchButton")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs mb-8">
          <span className="font-bold text-slate-700">{t("popularLabel")}</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="bg-white/80 hover:bg-white text-slate-800 font-semibold px-3 py-1 rounded-full border border-slate-200/80 shadow-2xs backdrop-blur-xs transition-all hover:scale-105 hover:border-sky-300 hover:text-[#0284c7] cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto bg-[#006699] hover:bg-[#0275a8] text-white px-7 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-sky-950/20 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>{t("ctaExplore")}</span>
            <Compass className="w-5 h-5" />
          </button>

          <button
            onClick={onMapClick}
            className="w-full sm:w-auto bg-white/85 hover:bg-white text-slate-800 hover:text-[#006699] border border-slate-200/90 backdrop-blur-md px-7 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <MapPin className="w-5 h-5 text-[#0284c7]" />
            <span>{t("ctaMap")}</span>
          </button>
        </div>
      </div>

      {/* 4 Bottom Key Metrics Stat Cards */}
      <div className="max-w-5xl mx-auto w-full mt-12 pt-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Card 1: 40+ Attractions */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 text-center border border-slate-200/80 shadow-md hover:shadow-lg transition-all group hover:-translate-y-1">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#006699] tracking-tight group-hover:scale-105 transition-transform">
              {t("stat1Number")}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              {t("stat1Label")}
            </div>
          </div>

          {/* Card 2: 25 km Radius */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 text-center border border-slate-200/80 shadow-md hover:shadow-lg transition-all group hover:-translate-y-1">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#006699] tracking-tight group-hover:scale-105 transition-transform">
              {t("stat2Number")}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              {t("stat2Label")}
            </div>
          </div>

          {/* Card 3: 1-Day Plans */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 text-center border border-slate-200/80 shadow-md hover:shadow-lg transition-all group hover:-translate-y-1">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#006699] tracking-tight group-hover:scale-105 transition-transform">
              {t("stat3Number")}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              {t("stat3Label")}
            </div>
          </div>

          {/* Card 4: 4.9 Satisfaction */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 text-center border border-slate-200/80 shadow-md hover:shadow-lg transition-all group hover:-translate-y-1">
            <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl lg:text-4xl font-black text-[#006699] tracking-tight group-hover:scale-105 transition-transform">
              <span>4.9</span>
              <Star className="w-6 h-6 fill-amber-400 text-amber-400 inline-block" />
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              {t("stat4Label")}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


