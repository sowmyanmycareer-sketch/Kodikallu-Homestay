import React from 'react';
import { Waves, Flame, UtensilsCrossed, Mountain, Trophy, Heart, PawPrint, Car, Wifi, Sparkles } from 'lucide-react';
import { AMENITIES } from '../data/resortData';

export const AmenitiesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves':
        return <Waves className="w-5 h-5 text-[#4a5d43]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#d4af37]" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-[#4a5d43]" />;
      case 'Mountain':
        return <Mountain className="w-5 h-5 text-[#2c3327]" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-[#d4af37]" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-[#4a5d43]" />;
      case 'PawPrint':
        return <PawPrint className="w-5 h-5 text-[#4a5d43]" />;
      case 'Car':
        return <Car className="w-5 h-5 text-[#2c3327]" />;
      case 'Wifi':
        return <Wifi className="w-5 h-5 text-[#4a5d43]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#4a5d43]" />;
    }
  };

  return (
    <section id="amenities" className="py-16 md:py-24 bg-[#fdfcf8] border-y border-[rgba(74,93,67,0.12)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="clean-tag mb-2">
            <span>Resort Facilities</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#2c3327]">
            Thoughtful Amenities for Mind & Body
          </h2>
          <p className="font-serif text-[#2c3327]/80 text-sm sm:text-base mt-2">
            Everything you need for an unhurried, restorative weekend stay. From refreshing pool dips 
            under the sun to crackling campfires under star-filled village skies.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AMENITIES.map((amenity) => (
            <div
              key={amenity.id}
              className="clean-card p-6 flex flex-col justify-between group transition-all duration-300 hover:border-[#4a5d43]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-[4px] bg-[#4a5d43]/5 border border-[rgba(74,93,67,0.15)] flex items-center justify-center transition-transform group-hover:scale-105">
                    {getIcon(amenity.iconName)}
                  </div>
                  {amenity.badge && (
                    <span className="text-[10px] font-sans uppercase font-semibold tracking-[1.5px] px-2 py-0.5 rounded-[2px] bg-[#4a5d43]/10 text-[#4a5d43] border border-[rgba(74,93,67,0.2)]">
                      {amenity.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-lg font-normal text-[#2c3327] mb-2 group-hover:text-[#4a5d43] transition-colors">
                  {amenity.title}
                </h3>
                <p className="font-serif text-[#2c3327]/75 text-xs sm:text-sm leading-relaxed font-light">
                  {amenity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
