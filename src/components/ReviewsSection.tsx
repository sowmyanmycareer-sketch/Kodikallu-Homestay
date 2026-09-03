import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, ExternalLink, MessageSquare, Sparkles } from 'lucide-react';
import { GUEST_REVIEWS, RESORT_DETAILS } from '../data/resortData';

export const ReviewsSection: React.FC = () => {
  const [likes, setLikes] = useState<Record<string, number>>({});

  const handleLike = (reviewId: string) => {
    setLikes((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1,
    }));
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#fdfcf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Rating Summary Box */}
          <div className="lg:col-span-4 clean-card p-6 sm:p-8 bg-white">
            <div className="clean-tag mb-4">
              <span>Google Maps Verified Reviews</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-serif text-5xl sm:text-6xl font-normal text-[#2c3327]">
                {RESORT_DETAILS.rating}
              </span>
              <div>
                <div className="flex items-center text-[#d4af37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
                  ))}
                </div>
                <p className="font-sans text-xs text-stone-500 mt-1">
                  Based on {RESORT_DETAILS.reviewCount} Google Maps reviews
                </p>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="mt-6 space-y-2 text-xs font-sans">
              <div className="flex items-center gap-2">
                <span className="w-12 text-[#2c3327]/80 font-medium">5 Star</span>
                <div className="flex-1 bg-stone-100 h-1.5 rounded-[2px] overflow-hidden">
                  <div className="bg-[#4a5d43] h-full rounded-[2px]" style={{ width: '88%' }} />
                </div>
                <span className="w-8 text-right text-stone-500">88%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-12 text-[#2c3327]/80 font-medium">4 Star</span>
                <div className="flex-1 bg-stone-100 h-1.5 rounded-[2px] overflow-hidden">
                  <div className="bg-[#4a5d43] h-full rounded-[2px]" style={{ width: '10%' }} />
                </div>
                <span className="w-8 text-right text-stone-500">10%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-12 text-[#2c3327]/80 font-medium">3 Star</span>
                <div className="flex-1 bg-stone-100 h-1.5 rounded-[2px] overflow-hidden">
                  <div className="bg-[#4a5d43] h-full rounded-[2px]" style={{ width: '2%' }} />
                </div>
                <span className="w-8 text-right text-stone-500">2%</span>
              </div>
            </div>

            {/* Google Maps External Badge */}
            <div className="mt-8 pt-6 border-t border-[rgba(74,93,67,0.15)] font-sans">
              <p className="font-serif text-xs text-[#2c3327]/80 mb-3 font-light">
                Read all real guest stories or write your own review directly on Google Maps.
              </p>
              <a
                id="view-all-google-reviews-btn"
                href={RESORT_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-[4px] border border-[rgba(74,93,67,0.25)] hover:bg-[#4a5d43]/5 text-[#2c3327] text-xs uppercase tracking-wider font-medium transition-colors"
              >
                <span>Read all on Google Maps</span>
                <ExternalLink className="w-3 h-3 text-stone-500" />
              </a>
            </div>
          </div>

          {/* Right Column: Review Cards Grid */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif text-2xl font-normal text-[#2c3327]">
                Guest Impressions
              </h3>
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#4a5d43] font-medium bg-[#4a5d43]/10 px-2.5 py-0.5 rounded-[2px] border border-[rgba(74,93,67,0.2)]">
                Authentic Reviews
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GUEST_REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="clean-card p-5 bg-white flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.avatar}
                          alt={review.author}
                          className="w-9 h-9 rounded-[2px] object-cover border border-[rgba(74,93,67,0.2)]"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="font-serif font-normal text-sm text-[#2c3327]">{review.author}</h4>
                          <p className="font-sans text-[10px] uppercase tracking-wider text-stone-500">{review.tripType}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-[#d4af37]">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37]" />
                        ))}
                      </div>
                    </div>

                    {/* Review Body */}
                    <p className="font-serif text-xs text-[#2c3327]/80 leading-relaxed italic font-light">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-3 border-t border-[rgba(74,93,67,0.12)] flex items-center justify-between text-[11px] text-stone-500 font-sans">
                    <span className="flex items-center gap-1 text-[#4a5d43]">
                      <CheckCircle className="w-3 h-3 text-[#4a5d43]" />
                      Verified Stay
                    </span>

                    <button
                      id={`like-review-${review.id}-btn`}
                      onClick={() => handleLike(review.id)}
                      className="flex items-center gap-1 text-stone-500 hover:text-[#2c3327] transition-colors cursor-pointer"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>Helpful ({review.helpfulCount + (likes[review.id] || 0)})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
