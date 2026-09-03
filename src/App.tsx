import React, { useState } from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AnimatedImageReel } from './components/AnimatedImageReel';
import { InteractiveScrollExperience } from './components/InteractiveScrollExperience';
import { RoomsAndStays } from './components/RoomsAndStays';
import { PriceComparison } from './components/PriceComparison';
import { AmenitiesSection } from './components/AmenitiesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationAndContact } from './components/LocationAndContact';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ImageLightboxModal } from './components/ImageLightboxModal';
import { RESORT_DETAILS, RESORT_IMAGES } from './data/resortData';
import { ResortImage, RoomPackage } from './types';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoomToBook, setSelectedRoomToBook] = useState<RoomPackage | null>(null);
  const [prefilledDates, setPrefilledDates] = useState<{
    checkIn: string;
    checkOut: string;
    guests: number;
  } | undefined>(undefined);

  const [activeLightboxImage, setActiveLightboxImage] = useState<ResortImage | null>(null);

  const handleOpenBooking = () => {
    setSelectedRoomToBook(null);
    setIsBookingModalOpen(true);
  };

  const handleOpenBookingWithDates = (checkIn: string, checkOut: string, guests: number) => {
    setPrefilledDates({ checkIn, checkOut, guests });
    setSelectedRoomToBook(null);
    setIsBookingModalOpen(true);
  };

  const handleSelectRoomToBook = (room: RoomPackage) => {
    setSelectedRoomToBook(room);
    setIsBookingModalOpen(true);
  };

  const handleOpenLightbox = (image: ResortImage) => {
    setActiveLightboxImage(image);
  };

  return (
    <div className="min-h-screen bg-[#fdfcf8] text-[#2c3327] flex flex-col selection:bg-[#4a5d43] selection:text-white pb-16 sm:pb-0">
      {/* Top Sticky Header */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Live Availability Search */}
        <HeroSection onOpenBookingWithDates={handleOpenBookingWithDates} />

        {/* Core Requested Feature: Animated Dual-Track Continuous Image Reel */}
        <AnimatedImageReel onSelectImage={handleOpenLightbox} />

        {/* Interactive Scroll Story Experience */}
        <InteractiveScrollExperience />

        {/* Rooms & Cottages Catalog */}
        <RoomsAndStays onSelectRoomToBook={handleSelectRoomToBook} />

        {/* Real Rate Comparison (Direct vs Goibibo ₹2,821 vs MakeMyTrip ₹2,926) */}
        <PriceComparison onOpenBooking={handleOpenBooking} />

        {/* Resort Facilities & Amenities */}
        <AmenitiesSection />

        {/* Google Reviews Showcase (4.8 ★ with 226 ratings) */}
        <ReviewsSection />

        {/* Directions, Interactive Map & Travel Guide */}
        <LocationAndContact />
      </main>

      {/* Rich Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Booking and Reservation Calculator Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialDates={prefilledDates}
        initialRoom={selectedRoomToBook}
      />

      {/* Fullscreen Image Lightbox Modal */}
      <ImageLightboxModal
        currentImage={activeLightboxImage}
        images={RESORT_IMAGES}
        onClose={() => setActiveLightboxImage(null)}
        onNavigate={(nextImage) => setActiveLightboxImage(nextImage)}
      />

      {/* Mobile Floating Bottom Bar for Instant Booking & Calling */}
      <div className="fixed bottom-0 inset-x-0 z-30 sm:hidden bg-[#fdfcf8]/95 backdrop-blur-md border-t border-[rgba(74,93,67,0.15)] p-2.5 shadow-lg flex items-center gap-2">
        <a
          id="mobile-sticky-call-btn"
          href={`tel:${RESORT_DETAILS.phone}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-sm bg-white text-[#2c3327] font-medium text-xs border border-[rgba(74,93,67,0.15)] uppercase tracking-wider"
        >
          <Phone className="w-3.5 h-3.5 text-[#4a5d43]" />
          <span>Call</span>
        </a>

        <a
          id="mobile-sticky-whatsapp-btn"
          href={`https://wa.me/${RESORT_DETAILS.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-sm bg-[#4a5d43]/10 text-[#2c3327] font-medium text-xs border border-[rgba(74,93,67,0.2)] uppercase tracking-wider"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#4a5d43]" />
          <span>WhatsApp</span>
        </a>

        <button
          id="mobile-sticky-book-btn"
          onClick={handleOpenBooking}
          className="flex-[2] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-sm bg-[#4a5d43] hover:bg-[#3d4d37] text-white font-medium text-xs uppercase tracking-wider shadow-sm cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Check Rates</span>
        </button>
      </div>
    </div>
  );
}
