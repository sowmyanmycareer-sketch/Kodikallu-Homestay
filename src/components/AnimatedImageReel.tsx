import React, { useState, useRef } from 'react';
import { Play, Pause, Maximize2, Sparkles, Filter, ChevronLeft, ChevronRight, Gauge } from 'lucide-react';
import { RESORT_IMAGES } from '../data/resortData';
import { ResortImage } from '../types';

interface AnimatedImageReelProps {
  onSelectImage: (image: ResortImage) => void;
}

export const AnimatedImageReel: React.FC<AnimatedImageReelProps> = ({ onSelectImage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [scrollSpeed, setScrollSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');

  const categories = [
    { id: 'all', label: 'All Photos (12)' },
    { id: 'scenery', label: 'Hills & Nature' },
    { id: 'rooms', label: 'Cottages & Stays' },
    { id: 'pool', label: 'Swimming Pool' },
    { id: 'dining', label: 'Authentic Food' },
    { id: 'activities', label: 'Campfire & Games' },
  ];

  const filteredImages = selectedCategory === 'all'
    ? RESORT_IMAGES
    : RESORT_IMAGES.filter((img) => img.category === selectedCategory);

  // Divide images into two reels for visually captivating parallax scrolling
  const firstReel = filteredImages.slice(0, Math.ceil(filteredImages.length / 2));
  const secondReel = filteredImages.slice(Math.ceil(filteredImages.length / 2));

  // If filtered set is small, repeat items so marquee scrolls seamlessly
  const repeatToMinimum = (arr: ResortImage[], min: number = 6): ResortImage[] => {
    if (arr.length === 0) return RESORT_IMAGES.slice(0, 6);
    let result = [...arr];
    while (result.length < min) {
      result = [...result, ...arr];
    }
    return result;
  };

  const topTrack = repeatToMinimum(firstReel.length > 0 ? firstReel : filteredImages);
  const bottomTrack = repeatToMinimum(secondReel.length > 0 ? secondReel : filteredImages);

  const speedStyles = {
    slow: 'duration-[60s]',
    normal: 'duration-[40s]',
    fast: 'duration-[22s]',
  };

  // Scroll manual helpers
  const topScrollRef = useRef<HTMLDivElement>(null);
  const bottomScrollRef = useRef<HTMLDivElement>(null);

  const handleManualNudge = (direction: 'left' | 'right') => {
    const offset = direction === 'left' ? -320 : 320;
    if (topScrollRef.current) {
      topScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
    if (bottomScrollRef.current) {
      bottomScrollRef.current.scrollBy({ left: -offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="photo-gallery" className="py-16 md:py-24 bg-[#2c3327] text-[#fdfcf8] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[#d4af37] text-[11px] font-sans font-medium uppercase tracking-[2px] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Animated Visual Reel</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#fdfcf8]">
              Glimpse into Life at Kodikallu
            </h2>
            <p className="font-serif text-stone-300 text-sm sm:text-base mt-2 max-w-2xl font-light opacity-90 leading-relaxed">
              Immerse yourself in our continuous scrolling photo reel. Hover or click any photograph 
              to pause and examine the tranquil cottages, scenic hills, and campfire evenings.
            </p>
          </div>

          {/* Interactive Animation Controls */}
          <div className="flex flex-wrap items-center gap-2.5 bg-black/30 p-2 rounded-[4px] border border-white/10 backdrop-blur-md self-start md:self-auto font-sans">
            {/* Play/Pause Toggle */}
            <button
              id="toggle-animation-play-pause-btn"
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-medium uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title={isPaused ? 'Resume scrolling animation' : 'Pause scrolling animation'}
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 text-[#d4af37] fill-[#d4af37]" />
                  <span>Play</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 text-[#d4af37] fill-[#d4af37]" />
                  <span>Pause</span>
                </>
              )}
            </button>

            {/* Speed Selector */}
            <div className="flex items-center gap-1 text-xs text-stone-300 pl-2 border-l border-white/15">
              <Gauge className="w-3.5 h-3.5 text-stone-400 mr-1" />
              <button
                id="speed-slow-btn"
                onClick={() => setScrollSpeed('slow')}
                className={`px-2 py-1 rounded-[2px] text-[11px] font-medium transition-colors cursor-pointer ${
                  scrollSpeed === 'slow' ? 'bg-[#4a5d43] text-white font-bold' : 'hover:text-white'
                }`}
              >
                0.5x
              </button>
              <button
                id="speed-normal-btn"
                onClick={() => setScrollSpeed('normal')}
                className={`px-2 py-1 rounded-[2px] text-[11px] font-medium transition-colors cursor-pointer ${
                  scrollSpeed === 'normal' ? 'bg-[#4a5d43] text-white font-bold' : 'hover:text-white'
                }`}
              >
                1x
              </button>
              <button
                id="speed-fast-btn"
                onClick={() => setScrollSpeed('fast')}
                className={`px-2 py-1 rounded-[2px] text-[11px] font-medium transition-colors cursor-pointer ${
                  scrollSpeed === 'fast' ? 'bg-[#4a5d43] text-white font-bold' : 'hover:text-white'
                }`}
              >
                2x
              </button>
            </div>

            {/* Manual Nudge Arrows */}
            <div className="flex items-center gap-1 border-l border-white/15 pl-2">
              <button
                id="nudge-left-btn"
                onClick={() => handleManualNudge('left')}
                className="p-1.5 rounded-[2px] hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="nudge-right-btn"
                onClick={() => handleManualNudge('right')}
                className="p-1.5 rounded-[2px] hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar font-sans">
          <Filter className="w-3.5 h-3.5 text-stone-400 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`filter-category-${cat.id}-btn`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-[4px] text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#4a5d43] text-white shadow-xs'
                  : 'bg-black/25 text-stone-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dual Animated Infinite Scrolling Filmstrip Tracks */}
      <div className="space-y-6 relative group/container">
        {/* Left and Right Fade Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#2c3327] via-[#2c3327]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#2c3327] via-[#2c3327]/80 to-transparent z-10" />

        {/* Track 1: Scrolls Left */}
        <div
          ref={topScrollRef}
          className="overflow-x-auto hide-scrollbar flex"
        >
          <div
            className={`flex gap-5 shrink-0 animate-marquee ${speedStyles[scrollSpeed]}`}
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {/* Original Items */}
            {topTrack.map((img, idx) => (
              <div
                key={`top-orig-${img.id}-${idx}`}
                onClick={() => onSelectImage(img)}
                className="group relative w-72 sm:w-88 aspect-[16/10] shrink-0 rounded-[4px] overflow-hidden cursor-pointer border border-white/15 bg-stone-900 shadow-md transition-transform duration-300 hover:scale-[1.02] hover:border-[#d4af37]"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Card Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-[1.5px] text-[#d4af37] bg-black/60 border border-white/10 px-2 py-0.5 rounded-[2px]">
                      {img.category}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[11px] font-sans text-stone-300 bg-black/70 px-2 py-0.5 rounded-[2px]">
                      <Maximize2 className="w-3 h-3 text-[#d4af37]" />
                      <span>View</span>
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-normal mt-1.5 leading-snug line-clamp-1 group-hover:text-[#d4af37] transition-colors">
                    {img.title}
                  </h3>
                  <p className="font-serif text-xs text-stone-300 mt-1 line-clamp-2 opacity-80 font-light">
                    {img.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Duplicated Items for seamless loop */}
            {topTrack.map((img, idx) => (
              <div
                key={`top-dup-${img.id}-${idx}`}
                onClick={() => onSelectImage(img)}
                className="group relative w-72 sm:w-88 aspect-[16/10] shrink-0 rounded-[4px] overflow-hidden cursor-pointer border border-white/15 bg-stone-900 shadow-md transition-transform duration-300 hover:scale-[1.02] hover:border-[#d4af37]"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-[1.5px] text-[#d4af37] bg-black/60 border border-white/10 px-2 py-0.5 rounded-[2px]">
                      {img.category}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[11px] font-sans text-stone-300 bg-black/70 px-2 py-0.5 rounded-[2px]">
                      <Maximize2 className="w-3 h-3 text-[#d4af37]" />
                      <span>View</span>
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-normal mt-1.5 leading-snug line-clamp-1 group-hover:text-[#d4af37] transition-colors">
                    {img.title}
                  </h3>
                  <p className="font-serif text-xs text-stone-300 mt-1 line-clamp-2 opacity-80 font-light">
                    {img.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Scrolls Right (Reverse) */}
        <div
          ref={bottomScrollRef}
          className="overflow-x-auto hide-scrollbar flex"
        >
          <div
            className={`flex gap-5 shrink-0 animate-marquee-reverse ${speedStyles[scrollSpeed]}`}
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {/* Original Items */}
            {bottomTrack.map((img, idx) => (
              <div
                key={`btm-orig-${img.id}-${idx}`}
                onClick={() => onSelectImage(img)}
                className="group relative w-72 sm:w-88 aspect-[16/10] shrink-0 rounded-[4px] overflow-hidden cursor-pointer border border-white/15 bg-stone-900 shadow-md transition-transform duration-300 hover:scale-[1.02] hover:border-[#4a5d43]"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-[1.5px] text-[#4a5d43] bg-white px-2 py-0.5 rounded-[2px]">
                      {img.category}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[11px] font-sans text-stone-300 bg-black/70 px-2 py-0.5 rounded-[2px]">
                      <Maximize2 className="w-3 h-3 text-[#d4af37]" />
                      <span>View</span>
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-normal mt-1.5 leading-snug line-clamp-1 group-hover:text-[#d4af37] transition-colors">
                    {img.title}
                  </h3>
                  <p className="font-serif text-xs text-stone-300 mt-1 line-clamp-2 opacity-80 font-light">
                    {img.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Duplicated Items for seamless loop */}
            {bottomTrack.map((img, idx) => (
              <div
                key={`btm-dup-${img.id}-${idx}`}
                onClick={() => onSelectImage(img)}
                className="group relative w-72 sm:w-88 aspect-[16/10] shrink-0 rounded-[4px] overflow-hidden cursor-pointer border border-white/15 bg-stone-900 shadow-md transition-transform duration-300 hover:scale-[1.02] hover:border-[#4a5d43]"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-[1.5px] text-[#4a5d43] bg-white px-2 py-0.5 rounded-[2px]">
                      {img.category}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[11px] font-sans text-stone-300 bg-black/70 px-2 py-0.5 rounded-[2px]">
                      <Maximize2 className="w-3 h-3 text-[#d4af37]" />
                      <span>View</span>
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-normal mt-1.5 leading-snug line-clamp-1 group-hover:text-[#d4af37] transition-colors">
                    {img.title}
                  </h3>
                  <p className="font-serif text-xs text-stone-300 mt-1 line-clamp-2 opacity-80 font-light">
                    {img.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Helper Text */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex items-center justify-between text-xs font-sans text-stone-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] inline-block" />
          Hover over any picture to pause reel • Click to enlarge
        </span>
        <span className="hidden sm:inline-block text-stone-500">
          Showing 12 high-resolution resort captures
        </span>
      </div>
    </section>
  );
};
