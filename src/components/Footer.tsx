import React from 'react';
import { Star, MapPin, Phone, MessageCircle, Heart, Shield, Navigation } from 'lucide-react';
import { RESORT_DETAILS } from '../data/resortData';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#2c3327] text-stone-300 pt-16 pb-12 border-t border-[rgba(212,175,55,0.2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[2px] border border-[rgba(212,175,55,0.4)] bg-[#4a5d43] flex items-center justify-center text-[#fdfcf8] font-serif text-lg">
                K
              </div>
              <div>
                <h3 className="font-serif text-xl font-normal text-[#fdfcf8] tracking-wide">
                  {RESORT_DETAILS.name}
                </h3>
                <p className="font-serif text-xs text-[#d4af37]">
                  {RESORT_DETAILS.kannadaName}
                </p>
              </div>
            </div>

            <p className="font-serif text-xs sm:text-sm text-stone-300/80 leading-relaxed font-light">
              A tranquil countryside home stay and nature resort nestled under the granite rocks of 
              Tadikavagilu, Karnataka. Designed for authentic slow-living, family rejuvenation, 
              and starlit campfire gatherings.
            </p>

            <div className="flex items-center gap-2 pt-1 font-sans">
              <a
                id="footer-google-badge"
                href={RESORT_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-white/5 border border-[rgba(212,175,55,0.3)] px-3 py-1 rounded-[2px] text-xs font-medium text-[#d4af37] hover:bg-white/10 transition-colors"
              >
                <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                <span>4.8 on Google Maps (226 Reviews)</span>
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-2 space-y-3 font-sans">
            <h4 className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#d4af37]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#overview" className="hover:text-white transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#photo-gallery" className="hover:text-white transition-colors">
                  Image Reel
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors">
                  The Experience
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  Cottages & Suites
                </a>
              </li>
              <li>
                <a href="#prices" className="hover:text-white transition-colors">
                  Compare Prices
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-white transition-colors">
                  Resort Amenities
                </a>
              </li>
            </ul>
          </div>

          {/* Highlights & Values */}
          <div className="lg:col-span-3 space-y-3 font-sans">
            <h4 className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#d4af37]">
              Stay Highlights
            </h4>
            <ul className="space-y-2 text-xs text-stone-300/80">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#d4af37]" />
                <span>Check-in: 12:00 PM | Check-out: 10:00 AM</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#d4af37]" />
                <span>Freshwater swimming pool & lawn games</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#d4af37]" />
                <span>Evening bonfire with music & barbecue</span>
              </li>
              <li className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span className="text-stone-300">LGBTQ+ Friendly verified</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#4a5d43] shrink-0" />
                <span>Free cancellation up to 24 hours</span>
              </li>
            </ul>
          </div>

          {/* Location & Quick Contact */}
          <div className="lg:col-span-3 space-y-3 font-sans">
            <h4 className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#d4af37]">
              Direct Contact
            </h4>
            <div className="text-xs space-y-2 text-stone-300/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>{RESORT_DETAILS.address}</span>
              </p>
              <p className="flex items-center gap-2 text-stone-400">
                <Navigation className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Plus Code: {RESORT_DETAILS.plusCode}</span>
              </p>
              <p className="flex items-center gap-2 font-medium text-white pt-1">
                <Phone className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a href={`tel:${RESORT_DETAILS.phone}`} className="hover:text-[#d4af37] transition-colors">
                  {RESORT_DETAILS.formattedPhone}
                </a>
              </p>
            </div>

            <div className="pt-2">
              <button
                id="footer-book-btn"
                onClick={onOpenBooking}
                className="w-full bg-[#d4af37] hover:bg-[#c29e2f] text-[#2c3327] font-sans text-xs uppercase tracking-wider font-semibold py-2.5 px-4 rounded-[4px] transition-all shadow-2xs cursor-pointer"
              >
                Check Availability & Book
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4 font-sans">
          <p>© {new Date().getFullYear()} Kodikallu Homestay (ಕೋಡಿಕಲ್ಲು ತಂಗುದಾಣ). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href={RESORT_DETAILS.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-stone-200">
              Google Maps Listing
            </a>
            <span>•</span>
            <a href={`tel:${RESORT_DETAILS.phone}`} className="hover:text-stone-200">
              Call 098802 80320
            </a>
            <span>•</span>
            <span className="text-stone-400">Tadikavagilu, Karnataka 562159</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
