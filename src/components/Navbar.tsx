import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Star, Menu, X, Calendar, MessageCircle } from 'lucide-react';
import { RESORT_DETAILS } from '../data/resortData';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Notification Bar */}
      <div id="top-announcement-bar" className="bg-[#2c3327] text-stone-300 text-xs py-2 px-4 border-b border-[rgba(74,93,67,0.2)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 font-sans">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 bg-[#4a5d43]/30 text-[#d4af37] px-2.5 py-0.5 rounded-sm font-medium text-xs border border-[rgba(74,93,67,0.3)]">
              <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
              {RESORT_DETAILS.rating} on Google (226 reviews)
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-stone-300/80 text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#4a5d43]" />
              Tadikavagilu, Karnataka • Plus Code: {RESORT_DETAILS.plusCode}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline-block text-stone-400 font-normal">
              Check-in: {RESORT_DETAILS.checkIn} • Check-out: {RESORT_DETAILS.checkOut}
            </span>
            <a
              id="topbar-phone-link"
              href={`tel:${RESORT_DETAILS.phone}`}
              className="inline-flex items-center gap-1.5 font-medium text-stone-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{RESORT_DETAILS.formattedPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        id="main-navigation"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#fdfcf8]/95 backdrop-blur-md shadow-xs border-b border-[rgba(74,93,67,0.12)] py-3'
            : 'bg-[#fdfcf8] border-b border-[rgba(74,93,67,0.1)] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-sm bg-[#4a5d43] flex items-center justify-center text-white shadow-2xs font-serif font-bold text-lg">
              K
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans text-lg sm:text-xl font-bold tracking-[2px] uppercase text-[#4a5d43]">
                  {RESORT_DETAILS.name}
                </span>
                <span className="text-[10px] tracking-wider uppercase bg-[#4a5d43]/10 text-[#4a5d43] px-2 py-0.5 rounded-sm font-sans font-semibold border border-[rgba(74,93,67,0.15)]">
                  Homestay
                </span>
              </div>
              <p className="text-[11px] text-[#2c3327]/60 font-sans tracking-wider">
                {RESORT_DETAILS.kannadaName} • Tadikavagilu
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-sans uppercase tracking-[1.2px] text-[#2c3327]/80">
            <a href="#overview" className="hover:text-[#4a5d43] transition-colors py-1">
              Overview
            </a>
            <a href="#photo-gallery" className="hover:text-[#4a5d43] transition-colors py-1 flex items-center gap-1.5">
              <span>Photo Reel</span>
              <span className="text-[9px] bg-[#d4af37]/20 text-[#2c3327] font-bold px-1.5 py-0.2 rounded-sm">
                Animated
              </span>
            </a>
            <a href="#experience" className="hover:text-[#4a5d43] transition-colors py-1">
              Experiences
            </a>
            <a href="#rooms" className="hover:text-[#4a5d43] transition-colors py-1">
              Stay
            </a>
            <a href="#prices" className="hover:text-[#4a5d43] transition-colors py-1">
              Rates
            </a>
            <a href="#amenities" className="hover:text-[#4a5d43] transition-colors py-1">
              Amenities
            </a>
            <a href="#reviews" className="hover:text-[#4a5d43] transition-colors py-1">
              Reviews
            </a>
            <a href="#location" className="hover:text-[#4a5d43] transition-colors py-1">
              Location
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3 font-sans">
            <a
              id="whatsapp-chat-button"
              href={`https://wa.me/${RESORT_DETAILS.whatsapp}?text=Hi%2C%20I%20would%20like%20to%20inquire%20about%20stay%20at%20Kodikallu%20Homestay.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium uppercase tracking-wider text-[#2c3327] bg-white hover:bg-[#4a5d43]/5 rounded-sm border border-[rgba(74,93,67,0.2)] transition-all shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#4a5d43]" />
              <span>WhatsApp</span>
            </a>

            <button
              id="nav-book-now-button"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white bg-[#4a5d43] hover:bg-[#3d4d37] rounded-sm shadow-xs transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Check Availability</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-sm text-[#2c3327] hover:text-[#4a5d43] hover:bg-stone-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div id="mobile-navigation-dropdown" className="lg:hidden border-t border-[rgba(74,93,67,0.15)] bg-[#fdfcf8] px-4 pt-4 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-3 font-sans text-xs uppercase tracking-[1.5px] text-[#2c3327]">
              <a
                href="#overview"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-sm hover:bg-[#4a5d43]/10"
              >
                Overview
              </a>
              <a
                href="#photo-gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-sm hover:bg-[#4a5d43]/10 flex items-center justify-between"
              >
                <span>Photo Reel</span>
                <span className="text-[10px] bg-[#d4af37]/20 text-[#2c3327] px-2 py-0.5 rounded-sm font-bold">
                  Animated
                </span>
              </a>
              <a
                href="#experience"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-sm hover:bg-[#4a5d43]/10"
              >
                Experiences
              </a>
              <a
                href="#rooms"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-sm hover:bg-[#4a5d43]/10"
              >
                Stay
              </a>
              <a
                href="#prices"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-sm hover:bg-[#4a5d43]/10"
              >
                Rates (Compare Portals)
              </a>
              <a
                href="#amenities"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-sm hover:bg-[#4a5d43]/10"
              >
                Amenities (Pool, Campfire)
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-sm hover:bg-[#4a5d43]/10"
              >
                Reviews (4.8★)
              </a>
              <a
                href="#location"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-sm hover:bg-[#4a5d43]/10"
              >
                Location & Directions
              </a>

              <div className="pt-3 border-t border-[rgba(74,93,67,0.15)] flex flex-col gap-2">
                <button
                  id="mobile-book-now-button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-[#4a5d43] text-white font-medium uppercase tracking-wider text-xs shadow-xs"
                >
                  <Calendar className="w-4 h-4 text-[#d4af37]" />
                  <span>Check Availability & Book</span>
                </button>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <a
                    href={`tel:${RESORT_DETAILS.phone}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-sm border border-[rgba(74,93,67,0.2)] bg-white text-[#2c3327] text-xs font-medium uppercase tracking-wider"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#4a5d43]" />
                    <span>Call Host</span>
                  </a>
                  <a
                    href={`https://wa.me/${RESORT_DETAILS.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-sm border border-[rgba(74,93,67,0.2)] bg-[#4a5d43]/10 text-[#2c3327] text-xs font-medium uppercase tracking-wider"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#4a5d43]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
