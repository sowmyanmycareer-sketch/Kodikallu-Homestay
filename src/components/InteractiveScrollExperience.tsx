import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronLeft, ChevronRight, Pause, Play, MapPin } from 'lucide-react';
import { EXPERIENCE_STORIES, RESORT_DETAILS } from '../data/resortData';

export const InteractiveScrollExperience: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentStory = EXPERIENCE_STORIES[currentIndex];

  // Auto progression timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % EXPERIENCE_STORIES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % EXPERIENCE_STORIES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + EXPERIENCE_STORIES.length) % EXPERIENCE_STORIES.length);
  };

  return (
    <section id="experience" className="py-16 md:py-24 bg-[#fdfcf8] border-y border-[rgba(74,93,67,0.12)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="clean-tag mb-2">
            <span>The Homestay Experience</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#2c3327]">
            Life at Kodikallu
          </h2>
          <p className="font-serif text-[#2c3327]/80 text-sm sm:text-base mt-2">
            Explore what makes Kodikallu Homestay a restful retreat amidst Karnataka’s nature and rocky landscape.
          </p>

          {/* Interactive Chapter Indicator Tabs */}
          <div className="mt-8 flex items-center justify-center gap-2 overflow-x-auto pb-2 hide-scrollbar font-sans">
            {EXPERIENCE_STORIES.map((story, idx) => (
              <button
                key={story.id}
                id={`story-chapter-${idx}-btn`}
                onClick={() => setCurrentIndex(idx)}
                className={`px-3 py-1.5 rounded-[4px] text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentIndex === idx
                    ? 'bg-[#4a5d43] text-white shadow-2xs'
                    : 'bg-white text-[#2c3327] hover:bg-[#4a5d43]/5 border border-[rgba(74,93,67,0.18)]'
                }`}
              >
                <span className="opacity-60 text-[10px]">0{idx + 1}</span>
                <span>{story.tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Story Display Card with Motion Transitions */}
        <div className="clean-card p-6 sm:p-8 lg:p-10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Story Narrative */}
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-4 font-sans">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#4a5d43] bg-[#4a5d43]/10 px-2.5 py-0.5 rounded-[2px] border border-[rgba(74,93,67,0.2)]">
                  Chapter 0{currentIndex + 1} of 0{EXPERIENCE_STORIES.length}
                </span>
                <span className="text-xs font-serif italic text-stone-500">
                  {currentStory.kannadaSubtitle}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#2c3327] leading-tight">
                {currentStory.title}
              </h3>

              <p className="font-serif text-[#2c3327]/80 text-sm sm:text-base leading-relaxed">
                {currentStory.description}
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs text-[#2c3327]/70">
                <MapPin className="w-3.5 h-3.5 text-[#4a5d43]" />
                <span>{RESORT_DETAILS.address}</span>
              </div>

              {/* Navigation Controls & Auto-play Toggle */}
              <div className="pt-4 flex items-center justify-between border-t border-stone-200/60 font-sans">
                <div className="flex items-center gap-2">
                  <button
                    id="experience-prev-btn"
                    onClick={handlePrev}
                    className="p-2 rounded-[4px] border border-[rgba(74,93,67,0.2)] hover:bg-[#4a5d43]/5 text-[#2c3327] transition-colors cursor-pointer"
                    aria-label="Previous Chapter"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    id="experience-next-btn"
                    onClick={handleNext}
                    className="p-2 rounded-[4px] border border-[rgba(74,93,67,0.2)] hover:bg-[#4a5d43]/5 text-[#2c3327] transition-colors cursor-pointer"
                    aria-label="Next Chapter"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  id="experience-autoplay-toggle-btn"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#2c3327]/80 hover:text-[#2c3327] bg-[#4a5d43]/5 hover:bg-[#4a5d43]/10 border border-[rgba(74,93,67,0.15)] px-3 py-1.5 rounded-[4px] transition-colors cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3 h-3 text-[#d4af37]" />
                      <span>Pause Auto-cycle</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-[#4a5d43] fill-[#4a5d43]" />
                      <span>Auto-cycle</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Story Image Stage with Motion Animation */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative rounded-[4px] overflow-hidden shadow-md aspect-[16/10] bg-stone-100 border border-[rgba(74,93,67,0.15)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStory.id}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full h-full"
                  >
                    <img
                      src={currentStory.image}
                      alt={currentStory.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                    {/* Image Caption Pill */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs bg-black/70 backdrop-blur-xs px-3.5 py-2 rounded-[2px] border border-white/10 font-sans">
                      <span className="font-medium">{currentStory.title}</span>
                      <span className="text-[#d4af37] font-semibold uppercase tracking-wider text-[10px]">{currentStory.tag}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Indicator Dots */}
              <div className="mt-4 flex items-center justify-center gap-2">
                {EXPERIENCE_STORIES.map((_, idx) => (
                  <button
                    key={idx}
                    id={`progress-dot-${idx}-btn`}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-[2px] transition-all cursor-pointer ${
                      currentIndex === idx ? 'w-8 bg-[#4a5d43]' : 'w-2 bg-stone-300 hover:bg-stone-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
