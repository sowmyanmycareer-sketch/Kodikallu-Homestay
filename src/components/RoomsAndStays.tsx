import React, { useState } from 'react';
import { Users, Bed, Check, Sparkles, Clock, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { ROOM_PACKAGES } from '../data/resortData';
import { RoomPackage } from '../types';

interface RoomsAndStaysProps {
  onSelectRoomToBook: (room: RoomPackage) => void;
}

export const RoomsAndStays: React.FC<RoomsAndStaysProps> = ({ onSelectRoomToBook }) => {
  // Track active gallery photo index per room
  const [activePhotoIdx, setActivePhotoIdx] = useState<Record<string, number>>({});

  const handleNextPhoto = (roomId: string, total: number) => {
    setActivePhotoIdx((prev) => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % total,
    }));
  };

  const handlePrevPhoto = (roomId: string, total: number) => {
    setActivePhotoIdx((prev) => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + total) % total,
    }));
  };

  return (
    <section id="rooms" className="py-16 md:py-24 bg-[#fdfcf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="clean-tag mb-2">
            <span>Accommodations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#2c3327]">
            Rooms & Rustic Cottages
          </h2>
          <p className="font-serif text-[#2c3327]/80 text-sm sm:text-base mt-2">
            Crafted with local stone, wood, and clay tiles to blend into the Karnataka countryside. 
            All rooms come with comfortable bedding, modern bathrooms, and hill views.
          </p>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ROOM_PACKAGES.map((room) => {
            const currentImgIdx = activePhotoIdx[room.id] || 0;
            const currentImgUrl = room.gallery[currentImgIdx] || room.image;

            return (
              <div
                key={room.id}
                id={`room-card-${room.id}`}
                className="clean-card overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-[#4a5d43]"
              >
                <div>
                  {/* Image Carousel Container */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-stone-900 border-b border-[rgba(74,93,67,0.12)]">
                    <img
                      src={currentImgUrl}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                    {/* Price Pill */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#2c3327] px-3 py-1.5 rounded-[4px] border border-[rgba(74,93,67,0.2)] shadow-xs text-right font-sans">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-stone-500">₹</span>
                        <span className="text-lg font-serif font-medium text-[#2c3327]">
                          {room.pricePerNight.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-stone-500">/ night</span>
                      </div>
                      <span className="text-[10px] text-stone-400 line-through">
                        ₹{room.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Gallery Navigation Arrows */}
                    {room.gallery.length > 1 && (
                      <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
                        <button
                          id={`room-prev-img-${room.id}-btn`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevPhoto(room.id, room.gallery.length);
                          }}
                          className="p-1.5 rounded-[4px] bg-black/60 hover:bg-black/85 text-white transition-colors pointer-events-auto backdrop-blur-xs cursor-pointer"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          id={`room-next-img-${room.id}-btn`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextPhoto(room.id, room.gallery.length);
                          }}
                          className="p-1.5 rounded-[4px] bg-black/60 hover:bg-black/85 text-white transition-colors pointer-events-auto backdrop-blur-xs cursor-pointer"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Dots indicator */}
                    {room.gallery.length > 1 && (
                      <div className="absolute bottom-2.5 inset-x-0 flex justify-center gap-1.5">
                        {room.gallery.map((_, i) => (
                          <span
                            key={i}
                            className={`h-1.5 rounded-[2px] transition-all ${
                              i === currentImgIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Room Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1 font-sans">
                      <span className="font-serif italic text-[#4a5d43] font-medium">
                        {room.kannadaName}
                      </span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3 text-stone-400" />
                        Check-in 12 PM
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-normal text-[#2c3327] group-hover:text-[#4a5d43] transition-colors">
                      {room.name}
                    </h3>

                    <p className="font-serif text-[#2c3327]/75 text-xs mt-1.5 leading-relaxed font-light">
                      {room.tagline}
                    </p>

                    {/* Capacity & Bed Info Pills */}
                    <div className="mt-4 pt-3 border-t border-[rgba(74,93,67,0.12)] flex items-center gap-4 text-xs font-sans text-[#2c3327]/80">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#4a5d43]" />
                        <span>{room.capacity}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-[#4a5d43]" />
                        <span>{room.bedType}</span>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="mt-4 space-y-2 font-sans">
                      {room.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#2c3327]/80">
                          <Check className="w-3.5 h-3.5 text-[#4a5d43] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0 font-sans">
                  <div className="text-[10px] uppercase tracking-wider text-[#4a5d43] font-medium bg-[#4a5d43]/5 py-1 px-2.5 rounded-[2px] border border-[rgba(74,93,67,0.15)] mb-3 text-center">
                    {room.cancellation}
                  </div>
                  <button
                    id={`reserve-room-${room.id}-btn`}
                    onClick={() => onSelectRoomToBook(room)}
                    className="w-full bg-[#4a5d43] hover:bg-[#3d4d37] text-white font-medium uppercase tracking-wider py-2.5 px-4 rounded-[4px] shadow-2xs transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Reserve Room</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
