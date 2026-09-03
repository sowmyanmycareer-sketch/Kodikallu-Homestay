import React, { useState } from 'react';
import { Star, MapPin, Calendar, Users, ArrowRight, ShieldCheck, Waves, Flame, Heart, Phone, Sparkles } from 'lucide-react';
import { RESORT_DETAILS } from '../data/resortData';

interface HeroSectionProps {
  onOpenBookingWithDates: (checkIn: string, checkOut: string, guests: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBookingWithDates }) => {
  // Default dates: tomorrow and day after
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDate(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDate(dayAfter));
  const [guests, setGuests] = useState(2);

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBookingWithDates(checkIn, checkOut, guests);
  };

  return (
    <section id="overview" className="relative pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden bg-[#fdfcf8]">
      {/* Background Subtle Wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f7f5ed]/50 via-[#fdfcf8] to-[#fdfcf8] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges & Subtitle */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 font-sans">
          <div className="inline-flex items-center gap-2 bg-white border border-[rgba(74,93,67,0.15)] shadow-2xs px-3.5 py-1 rounded-[4px] text-xs text-[#2c3327]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4a5d43]" />
            <span className="font-semibold uppercase tracking-wider text-[11px] text-[#4a5d43]">Open for Reservations</span>
            <span className="text-stone-300">•</span>
            <span className="text-[#2c3327]/70 text-xs">Tadikavagilu, Karnataka</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              id="hero-google-rating-badge"
              href={RESORT_DETAILS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white hover:bg-[#4a5d43]/5 border border-[rgba(74,93,67,0.18)] px-3 py-1 rounded-[4px] text-xs font-sans text-[#2c3327] transition-colors"
            >
              <div className="flex items-center text-[#d4af37]">
                <Star className="w-3.5 h-3.5 fill-[#d4af37]" />
              </div>
              <span className="font-medium">{RESORT_DETAILS.rating} on Google</span>
              <span className="text-[#2c3327]/60">({RESORT_DETAILS.reviewCount} reviews)</span>
            </a>

            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-[#4a5d43] bg-white border border-[rgba(74,93,67,0.18)] px-2.5 py-1 rounded-[4px]">
              <Heart className="w-3 h-3 text-[#4a5d43]" />
              LGBTQ+ friendly
            </span>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Typography & Story */}
          <div className="lg:col-span-7">
            <div className="space-y-3">
              <div className="clean-tag flex items-center gap-2">
                <span>Authentic Karnataka Stay</span>
                <span className="opacity-40">•</span>
                <span className="font-serif normal-case tracking-normal text-xs opacity-90">{RESORT_DETAILS.kannadaName}</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#2c3327] leading-[1.12]">
                Serenity Amidst <br />
                <span className="italic font-serif">Granite Hills & Country Palms</span>
              </h1>

              <p className="font-serif text-base sm:text-lg text-[#2c3327]/80 leading-relaxed max-w-2xl pt-1">
                Escape to the serene hills of Tadikavagilu. Kodikallu Homestay is a peaceful rural sanctuary 
                featuring private cottages, freshwater swimming pool, country-style Karnataka cuisine, 
                and starlit campfire nights — starting from ₹2,699/night direct.
              </p>

              {/* Rating Star Indicator from Clean Minimalism theme */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-sans text-[#2c3327]/80 pt-2">
                <span className="text-[#d4af37] font-bold tracking-wider text-base">★★★★★</span>
                <span className="font-semibold text-[#2c3327]">{RESORT_DETAILS.rating} (226 Reviews)</span>
                <span className="opacity-40">•</span>
                <span className="opacity-70">Near KPTCL Office • Verified Stay</span>
              </div>
            </div>

            {/* Key Value Props Pill Row */}
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-sans text-[#2c3327]">
              <div className="flex items-center gap-1.5 bg-white border border-[rgba(74,93,67,0.15)] px-3 py-1.5 rounded-[4px] shadow-2xs">
                <Waves className="w-3.5 h-3.5 text-[#4a5d43]" />
                <span className="font-medium">Swimming Pool</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white border border-[rgba(74,93,67,0.15)] px-3 py-1.5 rounded-[4px] shadow-2xs">
                <Flame className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="font-medium">Evening Campfire</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white border border-[rgba(74,93,67,0.15)] px-3 py-1.5 rounded-[4px] shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4a5d43]" />
                <span className="font-medium">Free Cancellation</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white border border-[rgba(74,93,67,0.15)] px-3 py-1.5 rounded-[4px] shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-[#4a5d43]" />
                <span className="font-medium">~60 km from Bengaluru</span>
              </div>
            </div>

            {/* Direct Booking Comparison Card */}
            <div className="mt-6 bg-[#4a5d43]/5 border border-[rgba(74,93,67,0.2)] rounded-[4px] p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3 font-sans">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-[#4a5d43] tracking-widest bg-white px-2 py-0.5 rounded-[2px] border border-[rgba(74,93,67,0.2)]">
                    Best Rate Direct
                  </span>
                  <span className="text-xs text-[#2c3327]/60">Goibibo: ₹2,821 • MakeMyTrip: ₹2,926</span>
                </div>
                <p className="text-[#2c3327] font-medium text-sm mt-1">
                  Book direct from <span className="font-bold text-base text-[#4a5d43]">₹2,699</span> / night with Free Breakfast
                </p>
              </div>

              <a
                id="hero-call-host-btn"
                href={`tel:${RESORT_DETAILS.phone}`}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#2c3327] bg-white hover:bg-[#4a5d43]/10 px-3.5 py-2 rounded-[4px] border border-[rgba(74,93,67,0.25)] shadow-2xs transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#4a5d43]" />
                <span>Call 098802 80320</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[4px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-[rgba(74,93,67,0.15)] aspect-[4/3] group bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                alt="Kodikallu Homestay resort views and coconut groves"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c3327]/85 via-transparent to-black/10 pointer-events-none" />

              {/* Floating Overlay Info */}
              <div className="absolute bottom-4 left-4 right-4 text-white font-sans">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#d4af37]">
                      Nature Retreat & Cottage Stay
                    </p>
                    <h3 className="font-serif text-xl font-normal text-white">Kodikallu Hills & Greens</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-stone-300">From</span>
                    <p className="font-serif text-lg font-bold text-[#d4af37]">₹2,699</p>
                  </div>
                </div>
                <p className="text-xs text-stone-200 mt-1 line-clamp-1 font-normal opacity-90">
                  Near KPTCL office, Tadikavagilu • Plus Code R63M+3X
                </p>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-3 left-3 bg-[#2c3327]/90 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-[4px] flex items-center gap-1.5 border border-white/10 font-sans">
                <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
                <span className="font-medium">4.8 Rating (226 Reviews)</span>
              </div>
            </div>

            {/* Decorative Offset Image Card */}
            <div className="hidden sm:block absolute -bottom-5 -left-5 w-44 rounded-[4px] overflow-hidden shadow-lg border border-[rgba(74,93,67,0.15)] bg-white p-1">
              <img
                src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=400&q=80"
                alt="Refreshing swimming pool at Kodikallu Homestay"
                className="w-full h-24 object-cover rounded-[2px]"
                referrerPolicy="no-referrer"
              />
              <div className="p-1.5 text-[11px] font-sans">
                <p className="font-semibold text-[#2c3327]">Freshwater Pool</p>
                <p className="text-[#2c3327]/60">Open 7 AM - 7 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Availability Booking Card */}
        <div className="mt-12 clean-card p-5 sm:p-7 relative z-20">
          <form onSubmit={handleCheckAvailability} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end font-sans">
            {/* Check-In */}
            <div className="lg:col-span-3">
              <label htmlFor="check-in-date-input" className="block text-[11px] font-semibold uppercase tracking-[1px] text-[#2c3327]/70 mb-1.5">
                Check-in (from 12:00 PM)
              </label>
              <div className="relative">
                <input
                  id="check-in-date-input"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-[#fdfcf8] border border-stone-300 rounded-[4px] px-3 py-2.5 text-xs sm:text-sm font-medium text-[#2c3327] focus:outline-hidden focus:ring-1 focus:ring-[#4a5d43] focus:border-[#4a5d43]"
                  required
                />
              </div>
            </div>

            {/* Check-Out */}
            <div className="lg:col-span-3">
              <label htmlFor="check-out-date-input" className="block text-[11px] font-semibold uppercase tracking-[1px] text-[#2c3327]/70 mb-1.5">
                Check-out (by 10:00 AM)
              </label>
              <div className="relative">
                <input
                  id="check-out-date-input"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-[#fdfcf8] border border-stone-300 rounded-[4px] px-3 py-2.5 text-xs sm:text-sm font-medium text-[#2c3327] focus:outline-hidden focus:ring-1 focus:ring-[#4a5d43] focus:border-[#4a5d43]"
                  required
                />
              </div>
            </div>

            {/* Guests */}
            <div className="lg:col-span-3">
              <label htmlFor="guests-count-select" className="block text-[11px] font-semibold uppercase tracking-[1px] text-[#2c3327]/70 mb-1.5">
                Guests & Stay
              </label>
              <div className="relative">
                <select
                  id="guests-count-select"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-[#fdfcf8] border border-stone-300 rounded-[4px] px-3 py-2.5 text-xs sm:text-sm font-medium text-[#2c3327] focus:outline-hidden focus:ring-1 focus:ring-[#4a5d43] focus:border-[#4a5d43]"
                >
                  <option value={1}>1 Guest (Solo Traveler)</option>
                  <option value={2}>2 Guests (Couple / Friends)</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests (Family Room)</option>
                  <option value={6}>6 Guests (Family Suite)</option>
                  <option value={8}>8+ Guests (Group Getaway)</option>
                </select>
              </div>
            </div>

            {/* Submit Action */}
            <div className="lg:col-span-3">
              <button
                id="hero-check-availability-btn"
                type="submit"
                className="w-full clean-btn py-3 px-4 shadow-xs hover:bg-[#3d4d37] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Check Availability</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
              </button>
            </div>
          </form>

          <div className="mt-4 pt-3 border-t border-stone-200/60 flex flex-wrap items-center justify-between text-xs font-sans text-[#2c3327]/70 gap-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#4a5d43]">Free Cancellation</span>
              <span>•</span>
              <span>Direct Booking Advantage</span>
              <span>•</span>
              <span>Pay at Property</span>
            </div>
            <div>
              <span className="text-stone-400">Host Phone: </span>
              <a href={`tel:${RESORT_DETAILS.phone}`} className="font-semibold text-[#2c3327] hover:text-[#4a5d43] underline underline-offset-2">
                098802 80320
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
