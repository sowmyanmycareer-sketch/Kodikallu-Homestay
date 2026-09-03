import React, { useState } from 'react';
import { X, Calendar, Users, Phone, MessageCircle, ShieldCheck, Sparkles, Check, ArrowRight } from 'lucide-react';
import { ROOM_PACKAGES, RESORT_DETAILS } from '../data/resortData';
import { RoomPackage } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDates?: { checkIn: string; checkOut: string; guests: number };
  initialRoom?: RoomPackage | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialDates,
  initialRoom,
}) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(initialDates?.checkIn || formatDate(tomorrow));
  const [checkOut, setCheckOut] = useState(initialDates?.checkOut || formatDate(dayAfter));
  const [guests, setGuests] = useState(initialDates?.guests || 2);
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    initialRoom?.id || ROOM_PACKAGES[0].id
  );
  const [includeMeals, setIncludeMeals] = useState<boolean>(false);
  const [includeBonfire, setIncludeBonfire] = useState<boolean>(true);
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  if (!isOpen) return null;

  const selectedRoom = ROOM_PACKAGES.find((r) => r.id === selectedRoomId) || ROOM_PACKAGES[0];

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
  const calculatedNights = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));

  const baseTotal = selectedRoom.pricePerNight * calculatedNights;
  const mealsCost = includeMeals ? 650 * guests * calculatedNights : 0;
  const totalEstimated = baseTotal + mealsCost;

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Reservation Inquiry - Kodikallu Homestay*%0A%0A` +
      `*Guest Name:* ${guestName || 'Guest'}%0A` +
      `*Phone:* ${guestPhone || 'Not provided'}%0A` +
      `*Room:* ${selectedRoom.name} (₹${selectedRoom.pricePerNight}/night)%0A` +
      `*Check-in:* ${checkIn} (12:00 PM)%0A` +
      `*Check-out:* ${checkOut} (10:00 AM)%0A` +
      `*Nights:* ${calculatedNights}%0A` +
      `*Guests:* ${guests}%0A` +
      `*Meals Package:* ${includeMeals ? 'Yes (Lunch & Dinner requested)' : 'Breakfast only (Complimentary)'}%0A` +
      `*Campfire:* ${includeBonfire ? 'Yes (Requested)' : 'No'}%0A` +
      `*Estimated Total:* ₹${totalEstimated.toLocaleString('en-IN')}%0A` +
      (specialRequests ? `*Special Request:* ${specialRequests}%0A` : '') +
      `%0APlease confirm room availability. Thank you!`;

    window.open(`https://wa.me/${RESORT_DETAILS.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <div
      id="booking-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#2c3327]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="booking-modal-dialog"
        className="bg-[#fdfcf8] w-full max-w-2xl rounded-[4px] shadow-2xl border border-[rgba(74,93,67,0.2)] overflow-hidden my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#2c3327] text-[#fdfcf8] p-6 sm:p-7 flex items-center justify-between border-b border-[rgba(212,175,55,0.25)]">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] px-2.5 py-0.5 rounded-[2px] text-[10px] font-sans font-semibold uppercase tracking-[1.5px] mb-1.5">
              <Sparkles className="w-3 h-3" />
              <span>Direct Booking Rate • Best Price</span>
            </div>
            <h3 className="font-serif text-2xl font-normal text-[#fdfcf8]">
              Reserve Your Stay at Kodikallu
            </h3>
            <p className="font-serif text-xs text-stone-300/85 mt-0.5 font-light">
              Direct host confirmation • Free cancellation up to 24 hours prior
            </p>
          </div>
          <button
            id="close-booking-modal-btn"
            onClick={onClose}
            className="p-2 rounded-[2px] bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleWhatsAppBooking} className="p-6 sm:p-8 space-y-6">
          {/* Room Selection */}
          <div>
            <label htmlFor="room-select-input" className="block text-[11px] font-sans font-semibold uppercase tracking-[1.5px] text-[#2c3327] mb-2">
              Select Stay Option
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ROOM_PACKAGES.map((room) => (
                <button
                  type="button"
                  key={room.id}
                  id={`select-room-${room.id}-btn`}
                  onClick={() => setSelectedRoomId(room.id)}
                  className={`p-3 rounded-[4px] border text-left transition-all cursor-pointer ${
                    selectedRoomId === room.id
                      ? 'border-[#4a5d43] bg-white ring-1 ring-[#4a5d43]'
                      : 'border-[rgba(74,93,67,0.2)] bg-white/70 hover:bg-white'
                  }`}
                >
                  <p className="font-serif text-xs text-[#2c3327] font-normal line-clamp-1">{room.name}</p>
                  <p className="text-xs text-[#4a5d43] font-sans font-semibold mt-1">
                    ₹{room.pricePerNight} <span className="text-[10px] text-stone-500 font-normal">/ night</span>
                  </p>
                  <p className="text-[10px] text-stone-500 mt-0.5 font-sans">{room.capacity}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Dates & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
            <div>
              <label htmlFor="modal-check-in-input" className="block text-[10px] font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Check-in (12:00 PM)
              </label>
              <input
                id="modal-check-in-input"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-white border border-[rgba(74,93,67,0.25)] rounded-[4px] px-3 py-2 text-xs font-medium text-[#2c3327] focus:ring-1 focus:ring-[#4a5d43] outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="modal-check-out-input" className="block text-[10px] font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Check-out (10:00 AM)
              </label>
              <input
                id="modal-check-out-input"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-white border border-[rgba(74,93,67,0.25)] rounded-[4px] px-3 py-2 text-xs font-medium text-[#2c3327] focus:ring-1 focus:ring-[#4a5d43] outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="modal-guests-input" className="block text-[10px] font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Guests
              </label>
              <select
                id="modal-guests-input"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-white border border-[rgba(74,93,67,0.25)] rounded-[4px] px-3 py-2 text-xs font-medium text-[#2c3327] focus:ring-1 focus:ring-[#4a5d43] outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Add-on Options */}
          <div className="clean-card p-4 bg-white space-y-3 font-sans">
            <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#2c3327] block">
              Customize Experience
            </span>

            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeBonfire}
                  onChange={(e) => setIncludeBonfire(e.target.checked)}
                  className="rounded text-[#4a5d43] focus:ring-[#4a5d43]"
                />
                <span className="text-xs font-medium text-[#2c3327]">
                  Night Campfire Setup under Stars
                </span>
              </div>
              <span className="text-[10px] font-semibold text-[#4a5d43] uppercase tracking-wider">Included Free</span>
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeMeals}
                  onChange={(e) => setIncludeMeals(e.target.checked)}
                  className="rounded text-[#4a5d43] focus:ring-[#4a5d43]"
                />
                <div>
                  <span className="text-xs font-medium text-[#2c3327] block">
                    Full Meal Package (Home-style Lunch & Dinner)
                  </span>
                  <span className="text-[10px] text-stone-500 font-light">
                    Akki rotti, ragi mudde, chicken curry / country veg
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#2c3327]">+₹650 / person</span>
            </label>
          </div>

          {/* Guest Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
            <div>
              <label htmlFor="modal-guest-name-input" className="block text-[10px] font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Your Full Name
              </label>
              <input
                id="modal-guest-name-input"
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-white border border-[rgba(74,93,67,0.25)] rounded-[4px] px-3 py-2 text-xs text-[#2c3327] focus:ring-1 focus:ring-[#4a5d43] outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="modal-guest-phone-input" className="block text-[10px] font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Mobile Number
              </label>
              <input
                id="modal-guest-phone-input"
                type="tel"
                placeholder="e.g. 98802 XXXXX"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="w-full bg-white border border-[rgba(74,93,67,0.25)] rounded-[4px] px-3 py-2 text-xs text-[#2c3327] focus:ring-1 focus:ring-[#4a5d43] outline-none"
                required
              />
            </div>
          </div>

          {/* Price Summary Breakdown */}
          <div className="clean-card p-4 bg-white font-sans">
            <div className="flex items-center justify-between text-xs text-stone-600 mb-1.5">
              <span>
                {selectedRoom.name} ({calculatedNights} {calculatedNights === 1 ? 'night' : 'nights'})
              </span>
              <span>₹{baseTotal.toLocaleString('en-IN')}</span>
            </div>
            {includeMeals && (
              <div className="flex items-center justify-between text-xs text-stone-600 mb-1.5">
                <span>Lunch & Dinner ({guests} guests × {calculatedNights} days)</span>
                <span>₹{mealsCost.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-xs text-[#4a5d43] mb-2 font-medium">
              <span>Traditional South Indian Breakfast</span>
              <span>INCLUDED</span>
            </div>

            <div className="pt-2 border-t border-[rgba(74,93,67,0.15)] flex items-baseline justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#2c3327]">
                  Estimated Total
                </span>
                <p className="text-[10px] text-stone-500 font-light">Pay directly at homestay / UPI</p>
              </div>
              <div className="text-right">
                <span className="font-serif text-2xl font-normal text-[#2c3327]">
                  ₹{totalEstimated.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-stone-500 block font-light">+ taxes (if applicable)</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2 font-sans">
            <button
              id="confirm-booking-whatsapp-btn"
              type="submit"
              className="w-full py-3 px-4 rounded-[4px] bg-[#d4af37] hover:bg-[#c29e2f] text-[#2c3327] font-semibold text-xs uppercase tracking-wider shadow-2xs flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Reservation Request on WhatsApp</span>
            </button>

            <a
              id="call-host-modal-btn"
              href={`tel:${RESORT_DETAILS.phone}`}
              className="w-full py-2.5 px-4 rounded-[4px] border border-[rgba(74,93,67,0.25)] bg-white hover:bg-[#4a5d43]/5 text-[#2c3327] font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors text-center"
            >
              <Phone className="w-3.5 h-3.5 text-[#4a5d43]" />
              <span>Call Owner: {RESORT_DETAILS.formattedPhone}</span>
            </a>
          </div>

          <p className="text-[11px] font-sans text-center text-stone-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4a5d43]" />
            <span>Free cancellation up to 24 hours prior to check-in. No advance payment needed.</span>
          </p>
        </form>
      </div>
    </div>
  );
};
