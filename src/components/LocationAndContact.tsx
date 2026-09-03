import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Navigation, Copy, Check, Clock, Shield, ChevronDown, HelpCircle } from 'lucide-react';
import { RESORT_DETAILS, FAQS } from '../data/resortData';

export const LocationAndContact: React.FC = () => {
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const handleCopyPlusCode = () => {
    navigator.clipboard.writeText(RESORT_DETAILS.plusCode);
    setCopiedPlusCode(true);
    setTimeout(() => setCopiedPlusCode(false), 2500);
  };

  return (
    <section id="location" className="py-16 md:py-24 bg-[#fdfcf8] border-t border-[rgba(74,93,67,0.12)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="clean-tag mb-2">
            <span>Finding Us</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#2c3327]">
            Directions & Homestay Location
          </h2>
          <p className="font-serif text-[#2c3327]/80 text-sm sm:text-base mt-2">
            Located near the KPTCL office in Tadikavagilu, Karnataka. Just an easy 90-minute drive 
            from Bengaluru through country highways.
          </p>
        </div>

        {/* Location & Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 clean-card p-6 sm:p-8 bg-white space-y-6">
            <div>
              <span className="text-[10px] font-sans uppercase font-semibold tracking-[1.5px] text-[#4a5d43] bg-[#4a5d43]/10 px-2.5 py-0.5 rounded-[2px] border border-[rgba(74,93,67,0.2)]">
                Official Property Address
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#2c3327] mt-3">
                {RESORT_DETAILS.name}
              </h3>
              <p className="font-serif italic text-sm text-stone-500">
                {RESORT_DETAILS.kannadaName}
              </p>
              <p className="font-serif text-sm text-[#2c3327]/80 mt-2 font-light">
                {RESORT_DETAILS.address}
              </p>
            </div>

            {/* Plus Code Badge */}
            <div className="bg-[#fdfcf8] p-3.5 rounded-[4px] border border-[rgba(74,93,67,0.15)] flex items-center justify-between font-sans">
              <div>
                <span className="text-[10px] text-stone-500 uppercase font-semibold tracking-wider">
                  Google Plus Code
                </span>
                <p className="font-mono text-xs sm:text-sm font-semibold text-[#2c3327]">
                  {RESORT_DETAILS.plusCode}
                </p>
              </div>
              <button
                id="copy-plus-code-btn"
                onClick={handleCopyPlusCode}
                className="flex items-center gap-1 text-xs uppercase tracking-wider font-medium px-2.5 py-1.5 rounded-[4px] border border-[rgba(74,93,67,0.2)] hover:bg-[#4a5d43]/5 text-[#2c3327] transition-colors cursor-pointer"
              >
                {copiedPlusCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#4a5d43]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Check-In / Check-Out Timings */}
            <div className="grid grid-cols-2 gap-3 text-xs font-sans">
              <div className="bg-[#fdfcf8] p-3 rounded-[4px] border border-[rgba(74,93,67,0.15)]">
                <span className="text-stone-500 block uppercase tracking-wider text-[10px]">Check-in</span>
                <span className="font-serif text-[#2c3327] text-sm mt-0.5 block font-normal">
                  {RESORT_DETAILS.checkIn}
                </span>
              </div>
              <div className="bg-[#fdfcf8] p-3 rounded-[4px] border border-[rgba(74,93,67,0.15)]">
                <span className="text-stone-500 block uppercase tracking-wider text-[10px]">Check-out</span>
                <span className="font-serif text-[#2c3327] text-sm mt-0.5 block font-normal">
                  {RESORT_DETAILS.checkOut}
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-2.5 pt-2 font-sans">
              <a
                id="location-call-host-btn"
                href={`tel:${RESORT_DETAILS.phone}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-[4px] bg-[#4a5d43] hover:bg-[#3d4d37] text-white text-xs uppercase tracking-wider font-medium shadow-2xs transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Call Host: {RESORT_DETAILS.phone}</span>
              </a>

              <a
                id="location-whatsapp-btn"
                href={`https://wa.me/${RESORT_DETAILS.whatsapp}?text=Hello%20Kodikallu%20Homestay%2C%20I%20am%20looking%20for%20driving%20directions%20and%20booking%20availability.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-[4px] bg-[#2c3327] hover:bg-[#20251c] text-white text-xs uppercase tracking-wider font-medium shadow-2xs transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                id="location-google-maps-directions-btn"
                href={`https://www.google.com/maps/dir/?api=1&destination=${RESORT_DETAILS.coordinates.lat},${RESORT_DETAILS.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-[4px] border border-[rgba(74,93,67,0.25)] bg-white hover:bg-[#4a5d43]/5 text-[#2c3327] text-xs uppercase tracking-wider font-medium transition-all"
              >
                <Navigation className="w-3.5 h-3.5 text-[#4a5d43]" />
                <span>Google Maps Directions</span>
              </a>
            </div>
          </div>

          {/* Map Preview & Driving Route Guide */}
          <div className="lg:col-span-7 space-y-4">
            {/* Visual Map Frame */}
            <div className="rounded-[4px] overflow-hidden border border-[rgba(74,93,67,0.2)] shadow-xs bg-stone-100 relative">
              <div className="h-80 sm:h-96 w-full relative bg-stone-200">
                {/* Embedded Styled Map Iframe */}
                <iframe
                  title="Kodikallu Homestay Map Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src="https://maps.google.com/maps?q=12.802688,77.234975&hl=en&z=13&output=embed"
                />

                {/* Floating Interactive Pin Overlay */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs p-3 rounded-[4px] shadow-sm border border-[rgba(74,93,67,0.2)] text-xs max-w-xs font-sans">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4a5d43]" />
                    <span className="font-serif font-normal text-stone-900">Kodikallu Homestay</span>
                  </div>
                  <p className="text-stone-500 mt-1 text-[11px] leading-tight font-light">
                    R63M+3X Tadikavagilu, Karnataka
                  </p>
                  <div className="mt-2 pt-2 border-t border-[rgba(74,93,67,0.12)] flex items-center justify-between">
                    <span className="text-[#4a5d43] font-medium text-[11px]">4.8 ★ Google Rating</span>
                    <a
                      href={RESORT_DETAILS.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2c3327] font-medium hover:underline text-[11px]"
                    >
                      Open Maps ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Guide Tip Box */}
            <div className="clean-card p-4 sm:p-5 text-xs sm:text-sm text-[#2c3327] space-y-2 bg-white">
              <h4 className="font-serif text-[#2c3327] flex items-center gap-1.5 text-sm font-normal">
                <Navigation className="w-3.5 h-3.5 text-[#4a5d43]" />
                <span>How to Reach from Bangalore</span>
              </h4>
              <p className="font-serif text-[#2c3327]/80 leading-relaxed font-light text-xs sm:text-sm">
                Take the Kanakapura Main Road or NICE Road exit towards Ramanagara / Kanakapura. Continue 
                past Harohalli / Tadikavagilu towards the KPTCL landmark. The approach road is fully paved 
                and suitable for sedans, hatchbacks, SUVs, and motorbikes.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto pt-8 border-t border-[rgba(74,93,67,0.15)]">
          <div className="text-center mb-8">
            <div className="clean-tag mb-1">
              <span>Got Questions?</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#2c3327] mt-1">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="clean-card rounded-[4px] bg-white overflow-hidden"
                >
                  <button
                    id={`faq-toggle-${idx}-btn`}
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-serif text-[#2c3327] text-sm sm:text-base hover:bg-[#4a5d43]/5 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-500 transition-transform duration-200 shrink-0 ml-3 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 font-serif text-xs sm:text-sm text-[#2c3327]/80 leading-relaxed font-light border-t border-[rgba(74,93,67,0.1)] bg-[#fdfcf8]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
