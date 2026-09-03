import React from 'react';
import { Check, ShieldCheck, Sparkles, ExternalLink, Calendar, Phone } from 'lucide-react';
import { PRICE_PROVIDERS, RESORT_DETAILS } from '../data/resortData';

interface PriceComparisonProps {
  onOpenBooking: () => void;
}

export const PriceComparison: React.FC<PriceComparisonProps> = ({ onOpenBooking }) => {
  return (
    <section id="prices" className="py-16 md:py-24 bg-[#fdfcf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="clean-tag mb-2">
            <span>Verified Portal Rates</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#2c3327]">
            Compare Prices & Save
          </h2>
          <p className="font-serif text-[#2c3327]/80 text-sm sm:text-base mt-2">
            We believe in honest, transparent hospitality. Compare rates found across leading travel portals 
            with our direct-from-host pricing for Kodikallu Homestay.
          </p>
        </div>

        {/* Pricing Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PRICE_PROVIDERS.map((provider) => (
            <div
              key={provider.name}
              className={`rounded-[4px] p-6 flex flex-col justify-between transition-all duration-300 relative ${
                provider.isDirect
                  ? 'bg-[#2c3327] text-[#fdfcf8] shadow-md border border-[rgba(212,175,55,0.4)] md:-translate-y-2'
                  : 'clean-card text-[#2c3327]'
              }`}
            >
              {/* Badge for Best Value */}
              {provider.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#2c3327] text-[10px] font-sans font-semibold uppercase tracking-[1.5px] py-1 px-3.5 rounded-[2px] shadow-xs whitespace-nowrap">
                  {provider.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 border-b pb-4 mb-4 border-[rgba(74,93,67,0.15)]">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{provider.logo}</span>
                    <h3 className={`font-serif text-base font-normal ${provider.isDirect ? 'text-white' : 'text-[#2c3327]'}`}>
                      {provider.name}
                    </h3>
                  </div>
                  {provider.isDirect && (
                    <span className="text-[10px] font-sans uppercase tracking-wider bg-[#4a5d43] text-white px-2 py-0.5 rounded-[2px]">
                      Direct
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="mb-4 font-sans">
                  <span className={`text-[11px] uppercase tracking-wider ${provider.isDirect ? 'text-stone-300' : 'text-stone-500'}`}>
                    Per night (Base Rate)
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xs">₹</span>
                    <span className={`font-serif text-3xl sm:text-4xl font-normal ${provider.isDirect ? 'text-[#d4af37]' : 'text-[#2c3327]'}`}>
                      {provider.price.toLocaleString('en-IN')}
                    </span>
                    <span className={`text-xs ${provider.isDirect ? 'text-stone-300' : 'text-stone-500'}`}>
                      + taxes
                    </span>
                  </div>
                  <p className={`text-xs mt-2 flex items-center gap-1.5 font-sans ${provider.isDirect ? 'text-[#d4af37]' : 'text-[#4a5d43]'}`}>
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>{provider.cancellationText}</span>
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 text-xs py-4 border-t border-[rgba(74,93,67,0.15)] font-sans">
                  <li className="flex items-center gap-2">
                    <Check className={`w-3.5 h-3.5 shrink-0 ${provider.isDirect ? 'text-[#d4af37]' : 'text-[#4a5d43]'}`} />
                    <span>Private Room / Cottage Stay</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className={`w-3.5 h-3.5 shrink-0 ${provider.isDirect ? 'text-[#d4af37]' : 'text-[#4a5d43]'}`} />
                    <span>Pool Access & Secure Parking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className={`w-3.5 h-3.5 shrink-0 ${provider.isDirect ? 'text-[#d4af37]' : 'text-[#4a5d43]'}`} />
                    <span>
                      {provider.isDirect
                        ? 'Complimentary Karnataka Breakfast Included'
                        : 'Breakfast optional addon'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className={`w-3.5 h-3.5 shrink-0 ${provider.isDirect ? 'text-[#d4af37]' : 'text-[#4a5d43]'}`} />
                    <span>
                      {provider.isDirect
                        ? 'Direct Host WhatsApp Assistance (098802 80320)'
                        : 'OTA Customer Support'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-[rgba(74,93,67,0.15)] font-sans">
                {provider.isDirect ? (
                  <button
                    id="price-direct-book-btn"
                    onClick={onOpenBooking}
                    className="w-full bg-[#d4af37] hover:bg-[#c49f2b] text-[#2c3327] font-medium uppercase tracking-wider py-3 px-4 rounded-[4px] shadow-2xs transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#2c3327]" />
                    <span>Book Direct & Save ₹150–₹250</span>
                  </button>
                ) : (
                  <a
                    href={RESORT_DETAILS.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white hover:bg-[#4a5d43]/5 text-[#2c3327] font-medium uppercase tracking-wider py-3 px-4 rounded-[4px] border border-[rgba(74,93,67,0.25)] shadow-2xs transition-all flex items-center justify-center gap-1.5 text-xs text-center"
                  >
                    <span>View on {provider.name}</span>
                    <ExternalLink className="w-3 h-3 text-stone-500" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Callout Banner */}
        <div className="mt-12 clean-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[rgba(74,93,67,0.2)] bg-white">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-[#2c3327] text-base sm:text-lg font-normal">
              Planning a Group Outing or Family Reunion?
            </h4>
            <p className="font-serif text-xs sm:text-sm text-[#2c3327]/80 font-light">
              Get special custom packages with full meals (Breakfast, Lunch & Dinner) and dedicated campfire setups.
            </p>
          </div>
          <a
            id="call-host-custom-package-btn"
            href={`tel:${RESORT_DETAILS.phone}`}
            className="inline-flex items-center gap-2 bg-[#4a5d43] hover:bg-[#3d4d37] text-white text-xs font-sans uppercase tracking-wider font-medium py-2.5 px-4 rounded-[4px] shadow-2xs transition-all whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Call 098802 80320 for Group Rates</span>
          </a>
        </div>
      </div>
    </section>
  );
};
