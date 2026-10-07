"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Compass,
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  Heart,
  Share2,
  Plus,
  Check,
  Navigation,
  Sparkles,
  Info,
  Calendar,
  Shield,
  Layers,
  ChevronRight,
  Eye,
  Camera,
  Trees,
  CheckCircle2,
  ExternalLink,
  Phone,
  Building,
  Car,
  Sun,
  Sunrise,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VisitPlanDrawer from "@/components/VisitPlanDrawer";
import AuthModal from "@/components/AuthModal";
import { amparaAttractions, Attraction } from "@/data/amparaData";

function AttractionDetailContent() {
  const params = useParams();
  const id = (params?.id as string) || "senanayake-samudraya";

  // Match attraction or default to Senanayake Samudraya
  const attraction =
    amparaAttractions.find((a) => a.id === id) || amparaAttractions[0];

  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<"morning" | "afternoon">("morning");
  const [isAddedToPlan, setIsAddedToPlan] = useState(true);
  const [isPlanDrawerOpen, setIsPlanDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("explore");

  const [visitPlan, setVisitPlan] = useState<Attraction[]>([
    amparaAttractions[0],
    amparaAttractions[3],
  ]);

  const handleTogglePlan = (attr: Attraction) => {
    if (visitPlan.some((p) => p.id === attr.id)) {
      setVisitPlan(visitPlan.filter((p) => p.id !== attr.id));
      if (attr.id === attraction.id) setIsAddedToPlan(false);
    } else {
      setVisitPlan([...visitPlan, attr]);
      if (attr.id === attraction.id) setIsAddedToPlan(true);
    }
  };

  const otherNearbyAttractions = amparaAttractions.filter(
    (a) => a.id !== attraction.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-[#0284c7] selection:text-white flex flex-col justify-between">
      
      {/* 1. Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenPlan={() => setIsPlanDrawerOpen(true)}
        planCount={visitPlan.length}
      />

      {/* 2. Breadcrumb & Directory Link */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-medium">
          
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-[#0084d1] flex items-center gap-1">
              <span>⌂ Home</span>
            </Link>
            <span>/</span>
            <Link href="/#explore" className="hover:text-[#0084d1]">
              Explore
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">
              {attraction.name}
            </span>
          </div>

          <Link
            href="/#explore"
            className="inline-flex items-center gap-1 text-slate-600 hover:text-[#0084d1] font-bold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Explore Directory</span>
          </Link>

        </div>
      </div>

      {/* Main Page Content */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 space-y-8 flex-1">
        
        {/* 3. Hero Visual Gallery Stack Header */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Main Large Hero Image (Left 8 cols) */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden min-h-[360px] sm:min-h-[440px] flex flex-col justify-between p-6 sm:p-8 border border-slate-200/80 shadow-md group">
            
            {/* Background Image */}
            <Image
              src="/images/hero-bg.jpg"
              alt="Senanayake Samudraya Reservoir Sunset"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover object-center transform group-hover:scale-102 transition-transform duration-1000 ease-out"
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-slate-950/40" />

            {/* Top Bar Badges & Actions */}
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                  <Compass className="w-3.5 h-3.5 text-sky-400" />
                  <span>10-15KM INTERMEDIATE RING</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-sky-300 text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>12.4 km from Ampara Town</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all cursor-pointer ${
                    isFavorite
                      ? "bg-red-500/90 border-red-400 text-white"
                      : "bg-slate-900/50 border-white/20 text-white hover:bg-white hover:text-red-500"
                  }`}
                  title="Favorite"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? "fill-white" : ""}`} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard!");
                    }
                  }}
                  className="w-9 h-9 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer"
                  title="Share destination"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Title & Tags */}
            <div className="relative z-10 space-y-2 mt-auto pt-16">
              
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 bg-emerald-500/90 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full backdrop-blur-md">
                  ✓ ECOLOGICAL LANDMARK
                </span>
                <span className="inline-flex items-center gap-1 bg-black/50 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/10">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9 (540+ Reviews)</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-black/50 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/10">
                  <Clock className="w-3 h-3 text-sky-400" />
                  <span>Open All Day (Sunrise-Sunset recommended)</span>
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                Senanayake Samudraya Reservoir
              </h1>

              <p className="text-slate-200 text-xs sm:text-sm font-medium">
                Known locally as the Sea of Senanayake & Inginiyagala Reservoir • Built 1949
              </p>
            </div>

          </div>

          {/* Right Gallery Stack (Right 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            
            {/* Thumb 1: Traditional Outrigger Boats */}
            <div className="relative h-28 sm:h-32 rounded-2xl overflow-hidden border border-slate-200/80 group">
              <Image
                src="/images/login-bg.jpg"
                alt="Outrigger Lagoon Views"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute bottom-2 left-3 text-[11px] font-bold text-white flex items-center gap-1 drop-shadow-sm">
                🛶 Outrigger Lagoon Views
              </span>
            </div>

            {/* Thumb 2: Shoreline Wildlife */}
            <div className="relative h-28 sm:h-32 rounded-2xl overflow-hidden border border-slate-200/80 group">
              <Image
                src="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=600&q=80"
                alt="Shoreline Wildlife"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute bottom-2 left-3 text-[11px] font-bold text-white flex items-center gap-1 drop-shadow-sm">
                🐘 Shoreline Wildlife
              </span>
            </div>

            {/* Thumb 3: Inginiyagala Peaks */}
            <div className="relative h-28 sm:h-32 rounded-2xl overflow-hidden border border-slate-200/80 group">
              <Image
                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80"
                alt="Inginiyagala Peaks"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute bottom-2 left-3 text-[11px] font-bold text-white flex items-center gap-1 drop-shadow-sm">
                ⛰️ Inginiyagala Peaks
              </span>
            </div>

            {/* Thumb 4: +6 More Panoramic Gallery */}
            <button
              type="button"
              className="relative h-20 rounded-2xl overflow-hidden bg-gradient-to-r from-[#006699] to-[#0284c7] text-white p-3 flex items-center justify-between px-5 hover:brightness-105 transition-all cursor-pointer shadow-sm group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-black">+6 More</div>
                  <div className="text-[10px] text-sky-100 font-semibold">
                    View Gallery & Panoramas
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-sky-200 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

        </section>

        {/* 4. Action Bar & 5 Key Metric Cards */}
        <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          
          {/* Highlights Overview & Action CTAs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-150">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#0084d1] mb-1">
                <span className="w-2 h-2 rounded-full bg-[#0084d1]" />
                <span>25KM RADIAL HIGHLIGHTS OVERVIEW</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                Sri Lanka&apos;s monumental inland sea — panoramic water horizons, tranquil boat safaris, and wild elephant shores, nestled strictly within 12.4 km of Ampara&apos;s core.
              </p>
            </div>

            {/* Top Action CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => handleTogglePlan(attraction)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
                  isAddedToPlan
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-[#0084d1] hover:bg-[#0070b3] text-white"
                }`}
              >
                {isAddedToPlan ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Visit Plan</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>+ Add to Visit Plan</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("location-map");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-4 py-2.5 rounded-full bg-sky-50 hover:bg-sky-100 text-[#0084d1] border border-sky-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>View on Map</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  window.open("https://maps.google.com/?q=Senanayake+Samudraya+Ampara", "_blank");
                }}
                className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions</span>
              </button>
            </div>
          </div>

          {/* 5 Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            
            {/* Metric 1 */}
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0084d1] flex items-center justify-center shrink-0">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 leading-tight">12.4 km</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">From Ampara</div>
                <div className="text-[9px] text-slate-400">Base of Ampara</div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0084d1] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 leading-tight">06:00 - 09:30</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Safari Hours</div>
                <div className="text-[9px] text-slate-400">& 15:30 - 18:00 PM</div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 leading-tight">Free / Bund</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Entry / Tariff</div>
                <div className="text-[9px] text-slate-400">Boat: LKR 3,500+</div>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0084d1] flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 leading-tight">2.5 - 3.5 hrs</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Recommended Visit</div>
                <div className="text-[9px] text-slate-400">Half day relax</div>
              </div>
            </div>

            {/* Metric 5 */}
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 leading-tight">Paved A25</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Road Mobility</div>
                <div className="text-[9px] text-slate-400">Any car/bus/scooter</div>
              </div>
            </div>

          </div>

        </section>

        {/* 5. 2-Column Main Section (About & Visitor Guide vs One-Day Plan & Details) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: About & Field Tips (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* About the Inland Sea */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-lg font-black text-slate-900">
                <Info className="w-5 h-5 text-[#0084d1]" />
                <h2>About the Inland Sea</h2>
              </div>

              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-normal">
                <p>
                  Engineered in 1949 as the crowning achievement of the Gal Oya Development Scheme spearheaded by independent Sri Lanka&apos;s first Prime Minister, Rt. Hon. D.S. Senanayake, this reservoir covers an astounding water spread of over 7,800 hectares (nearly 77 square kilometers). Far more than an irrigation masterwork, it endured essential civil engineering principles that transformed the parched scrub plains of the East into a flourishing sanctuary.
                </p>
                <p>
                  What makes Senanayake Samudraya globally singular is its status as Sri Lanka&apos;s premier open-water boat safari destination. Hemmed in by the jagged granite silhouette of Mount Inginiyagala and Dimbula, peaceful motorized dinghies navigate tranquil lake channels where wild Asian elephants swim between wooded islets. In the serene morning mist, rare White-bellied Sea Eagles dive into the mirrors of water, while Native cormorants dry their plumage atop petrified forest trunks that rise gracefully from the deep basin.
                </p>
              </div>

              {/* Quote Callout */}
              <div className="bg-sky-50/70 border-l-4 border-[#0084d1] rounded-r-2xl p-4 text-xs italic text-slate-700 mt-4 leading-relaxed font-medium">
                &ldquo;Standing on the Inginiyagala bund as dusk gathers is akin to gazing over an ocean cradled in the arms of ancient mountains — absolute calm unbroken by modern noise.&rdquo;
              </div>
            </div>

            {/* Visitor Guide & Field Tips */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900">
                  Visitor Guide & Field Tips
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">
                  Updated March 2024
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                
                {/* Tip 1 */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-sky-100 text-[#0084d1] flex items-center justify-center mb-2">
                      <Sunrise className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-slate-900 leading-snug">
                      Boat Safari Bookings
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      Boats launch from the Inginiyagala Wildlife Jetty. Register early before 07:00 AM for birdlife or after 03:45 PM for swimming elephants.
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-[#0084d1] pt-2">
                    Guidance & Jetty →
                  </div>
                </div>

                {/* Tip 2 */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                      <Trees className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-slate-900 leading-snug">
                      Eco-Etiquette Buffer
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      Zero plastic waste permitted along the bund. Boat operators are mandated to preserve a 50-meter buffer from swimming elephants.
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-emerald-700 pt-2">
                    Wildlife Guidelines →
                  </div>
                </div>

                {/* Tip 3 */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-slate-900 leading-snug">
                      Recommended Gear
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      High SPF sunscreen, wide-brim hat, telephoto lens (200-500mm for wildlife), reusable canteen, and light rainproof windbreaker.
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-indigo-700 pt-2">
                    Morning Gear Warning →
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Add to Plan & Practical Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Add to Your One-Day Plan Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-5">
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  TRIP SEQUENCING
                </span>
                <span className="text-[10px] font-bold text-[#0084d1] bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                  OPTIMIZED ROUTE
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  Add to Your One-Day Plan
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Seamlessly combine with Deegawapi & Buddhangala within the 25km radius.
                </p>
              </div>

              {/* Time Slot Selector */}
              <div>
                <div className="text-[11px] font-bold text-slate-700 uppercase mb-2">
                  Select Time Slot
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSlot("morning")}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      selectedSlot === "morning"
                        ? "bg-sky-50 border-[#0084d1] ring-2 ring-sky-100 text-slate-900"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center gap-1">
                      <span>🌅 Morning</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      07:00 AM - 10:30 AM
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedSlot("afternoon")}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      selectedSlot === "afternoon"
                        ? "bg-sky-50 border-[#0084d1] ring-2 ring-sky-100 text-slate-900"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center gap-1">
                      <span>🌤 Afternoon</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      02:30 PM - 05:30 PM
                    </div>
                  </button>
                </div>
              </div>

              {/* Metrics Box */}
              <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2 text-xs border border-slate-200/80">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    <Car className="w-3.5 h-3.5" /> Transit from town:
                  </span>
                  <span className="font-bold text-slate-800">~15 mins</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Suggested stay:
                  </span>
                  <span className="font-bold text-slate-800">3.0 Hours</span>
                </div>

                {/* Progress bar */}
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 mb-1">
                    <span>Radial Plan 1-Day Load</span>
                    <span className="text-[#0084d1] font-bold">35% day capacity</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#0084d1] h-1.5 rounded-full w-[35%]" />
                  </div>
                </div>
              </div>

              {/* Add Stop CTA */}
              <button
                type="button"
                onClick={() => handleTogglePlan(attraction)}
                className="w-full bg-[#0084d1] hover:bg-[#0070b3] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isAddedToPlan ? "Stop Added to Plan" : "Add This Stop to Plan"}</span>
              </button>

              {/* Drawer trigger link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsPlanDrawerOpen(true)}
                  className="text-xs font-bold text-[#0084d1] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Open My Planner Timeline</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Practical Details Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-base font-black text-slate-900">
                <Compass className="w-4 h-4 text-[#0084d1]" />
                <h3>Practical Details</h3>
              </div>

              <div className="space-y-3.5 text-xs text-slate-600 divide-y divide-slate-100">
                
                <div className="pt-2 flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Opening Hours</div>
                    <div className="text-slate-500 mt-0.5">
                      Open daily from 06:00 AM - 06:30 PM (Bund entry). Boat operations cease at sunset.
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex items-start gap-2.5">
                  <Building className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Governing Authority</div>
                    <div className="text-slate-500 mt-0.5">
                      Irrigation Department & Department of Wildlife Conservation (Gal Oya Sector).
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex items-start gap-2.5">
                  <Trees className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Onsite Facilities</div>
                    <div className="text-slate-500 mt-0.5">
                      Paved parking lot, scenic viewing platforms, sanitary facilities, near-ring coconut stalls.
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Visitor Assistance</div>
                    <div className="text-slate-500 mt-0.5 font-medium">
                      +94 63 222 2000 (Ampara Tourism Desk)
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </section>

        {/* 6. Location & Access Map Section */}
        <section id="location-map" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-[#0084d1]">
                25 KM PHYSICAL SECTOR
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Location & Access Map
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Direct Navigable Access</span>
            </span>
          </div>

          {/* Map Graphic Box */}
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-200 bg-[#e5f3f0]">
            
            {/* SVG Interactive Visualized Map of Gal Oya / Senanayake Samudraya */}
            <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
              {/* Lake Water Reservoir Shape */}
              <path
                d="M 150 180 Q 250 120 380 160 T 550 210 Q 650 260 720 220 L 780 320 Q 580 380 400 340 Q 220 380 120 300 Z"
                fill="#bbf0f7"
                stroke="#67e8f9"
                strokeWidth="3"
              />
              
              {/* Surrounding Park Greenery */}
              <circle cx="220" cy="200" r="140" fill="#dcfce7" opacity="0.6" />
              <circle cx="500" cy="260" r="160" fill="#dcfce7" opacity="0.6" />

              {/* Road Lines */}
              <path
                d="M 80 80 Q 260 140 450 190 T 700 240"
                stroke="#f97316"
                strokeWidth="4"
                strokeDasharray="6 4"
                fill="none"
              />
              
              {/* Main Highway A25 */}
              <path
                d="M 100 350 Q 280 280 460 210 T 720 120"
                stroke="#0284c7"
                strokeWidth="5"
                fill="none"
              />

              {/* Map Labels */}
              <text x="210" y="160" fill="#047857" fontSize="13" fontWeight="bold">Gal Oya Valley National Park</text>
              <text x="460" y="170" fill="#0369a1" fontSize="15" fontWeight="900">Inginiyagala Dam</text>
              <text x="500" y="130" fill="#0f766e" fontSize="12" fontWeight="bold">Polwatta</text>
              <text x="420" y="80" fill="#e11d48" fontSize="13" fontWeight="bold">Gal Oya Lake Club</text>

              {/* Destination Pin */}
              <g transform="translate(460, 200)">
                <circle cx="0" cy="0" r="10" fill="#ef4444" className="animate-ping" opacity="0.75" />
                <circle cx="0" cy="0" r="8" fill="#ef4444" />
                <circle cx="0" cy="0" r="3" fill="#ffffff" />
              </g>

              {/* Ampara Town Departure Pin */}
              <g transform="translate(100, 350)">
                <circle cx="0" cy="0" r="8" fill="#0284c7" />
                <circle cx="0" cy="0" r="3" fill="#ffffff" />
                <text x="15" y="5" fill="#0f172a" fontSize="12" fontWeight="bold">Ampara Town (0.0 km)</text>
              </g>
            </svg>

            {/* Bottom floating route badge */}
            <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200/90 shadow-lg flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0084d1]" />
                  <span>12.4 km from Ampara Clock Tower</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Est. 15 min drive via Inginiyagala Road (B350 / A25) • Smooth asphalt
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.open("https://maps.google.com/?q=Senanayake+Samudraya+Ampara", "_blank")}
                  className="bg-[#0084d1] hover:bg-[#0070b3] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                >
                  GPS Navigation
                </button>
              </div>
            </div>

          </div>

          {/* 3 Waypoint Segments */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-sky-100 text-[#0084d1] flex items-center justify-center font-bold text-xs">
                1
              </span>
              <div>
                <div className="text-xs font-bold text-slate-900">Ampara Town</div>
                <div className="text-[10px] text-slate-500">0.0 km departure point</div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-sky-100 text-[#0084d1] flex items-center justify-center font-bold text-xs">
                2
              </span>
              <div>
                <div className="text-xs font-bold text-slate-900">Gal Oya Entrance</div>
                <div className="text-[10px] text-slate-500">9.8 km checkpoint</div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                3
              </span>
              <div>
                <div className="text-xs font-bold text-slate-900">Inginiyagala Dam</div>
                <div className="text-[10px] text-slate-500">12.4 km destination</div>
              </div>
            </div>
          </div>

        </section>

        {/* 7. More Places to Explore Nearby Section */}
        <section className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-[#0084d1]">
                ⭐ 25KM RADIAL CIRCUIT
              </div>
              <h3 className="text-xl font-black text-slate-900">
                More Places to Explore Nearby
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Coordinate seamless, multi-stop itineraries reachable within a 20-30 minute drive.
              </p>
            </div>

            <Link
              href="/#explore"
              className="text-xs font-bold text-[#0084d1] hover:underline inline-flex items-center gap-1 shrink-0"
            >
              <span>Explore All 25km Horizons</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherNearbyAttractions.map((item) => (
              <Link
                key={item.id}
                href={`/attraction/${item.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md text-[10px] font-extrabold px-2 py-0.5 rounded-full text-slate-800">
                    {item.distanceKm} km
                  </div>
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                <div className="p-3.5">
                  <div className="text-[10px] font-bold text-[#0084d1] uppercase">
                    {item.category}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#0084d1] transition-colors line-clamp-1 mt-0.5">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </section>

      </main>

      {/* Drawers & Modals */}
      <VisitPlanDrawer
        isOpen={isPlanDrawerOpen}
        onClose={() => setIsPlanDrawerOpen(false)}
        visitPlan={visitPlan}
        onRemove={(id) => setVisitPlan(visitPlan.filter((p) => p.id !== id))}
        onClear={() => setVisitPlan([])}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* 8. Global Footer */}
      <Footer />

    </div>
  );
}

export default function AttractionDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-3 border-sky-200 border-t-[#0084d1] animate-spin" />
            <span className="text-xs font-bold text-slate-500">
              Loading destination details...
            </span>
          </div>
        </div>
      }
    >
      <AttractionDetailContent />
    </Suspense>
  );
}
