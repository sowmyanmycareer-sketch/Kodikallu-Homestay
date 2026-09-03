import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Share2 } from 'lucide-react';
import { ResortImage } from '../types';

interface ImageLightboxModalProps {
  currentImage: ResortImage | null;
  images: ResortImage[];
  onClose: () => void;
  onNavigate: (nextImage: ResortImage) => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  currentImage,
  images,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    if (!currentImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentImage, images]);

  if (!currentImage) return null;

  const currentIndex = images.findIndex((img) => img.id === currentImage.id);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % images.length;
    onNavigate(images[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    onNavigate(images[prevIdx]);
  };

  return (
    <div
      id="lightbox-overlay"
      className="fixed inset-0 z-50 bg-[#2c3327]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Controls Bar */}
      <div
        className="flex items-center justify-between text-white z-10 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase bg-white/10 px-2.5 py-1 rounded-[2px] text-stone-300">
            {currentIndex + 1} / {images.length}
          </span>
          <span className="text-[10px] uppercase tracking-[1.5px] text-[#d4af37] font-semibold bg-black/40 px-2 py-0.5 rounded-[2px] border border-[rgba(212,175,55,0.4)]">
            {currentImage.category}
          </span>
        </div>

        <button
          id="close-lightbox-btn"
          onClick={onClose}
          className="p-2 rounded-[2px] bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.url}
          alt={currentImage.title}
          className="max-h-[75vh] max-w-full object-contain rounded-[4px] shadow-2xl transition-all duration-300 select-none border border-white/10"
          referrerPolicy="no-referrer"
        />

        {/* Previous Button */}
        <button
          id="lightbox-prev-btn"
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 p-3 rounded-[2px] bg-black/60 hover:bg-black/80 text-white transition-all backdrop-blur-xs cursor-pointer border border-white/20 hover:scale-105"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          id="lightbox-next-btn"
          onClick={handleNext}
          className="absolute right-2 sm:right-4 p-3 rounded-[2px] bg-black/60 hover:bg-black/80 text-white transition-all backdrop-blur-xs cursor-pointer border border-white/20 hover:scale-105"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Caption & Thumbnail Bar */}
      <div
        className="text-center max-w-2xl mx-auto text-white z-10 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-serif text-lg sm:text-xl font-normal text-[#fdfcf8]">
          {currentImage.title}
        </h3>
        <p className="font-serif text-xs sm:text-sm text-stone-300/80 mt-1 line-clamp-2 font-light">
          {currentImage.description}
        </p>

        {/* Thumbnail Strip */}
        <div className="mt-3 flex items-center justify-center gap-1.5 overflow-x-auto pb-1 max-w-full hide-scrollbar">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => onNavigate(img)}
              className={`relative w-12 h-8 rounded-[2px] overflow-hidden shrink-0 transition-all cursor-pointer ${
                idx === currentIndex ? 'ring-2 ring-[#d4af37] scale-105 opacity-100' : 'opacity-40 hover:opacity-80'
              }`}
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
