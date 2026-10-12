import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, Copy, Check, Navigation, ShieldCheck } from 'lucide-react';
import { HOTEL_INFO, FAQS } from '../data/hotelData';

interface LocationSectionProps {
  onOpenBooking: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenBooking }) => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(HOTEL_INFO.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <section id="vi-tri-lien-he" className="py-20 sm:py-24 bg-[#f4f2eb] border-b border-[#e5dfd3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold tracking-[0.25em] text-[#9f7d3a] uppercase block mb-2">
            ĐỊA CHỈ & LIÊN HỆ TRỰC TIẾP
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1c1917] tracking-tight">
            Vị trí thuận tiện tại Tân Hương
          </h2>
          <p className="mt-3 text-[#524d44] text-base max-w-xl mx-auto">
            Dễ tìm, dễ di chuyển, không gian riêng tư và kín đáo ngay trung tâm quận Tân Phú.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto mt-4" />
        </div>

        {/* Contact Info & Interactive Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Column: Official Contact Card */}
          <div className="lg:col-span-5 bg-white rounded-sm border border-[#ded5c3] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="border-b border-[#f0ece3] pb-5 mb-6">
                <span className="text-xs font-bold tracking-[0.25em] text-[#9f7d3a] uppercase block mb-1">
                  THÔNG TIN CHÍNH THỨC
                </span>
                <h3 className="font-brand-title text-2xl font-bold text-[#1c1917] tracking-wider whitespace-nowrap">
                  {HOTEL_INFO.name}
                </h3>
                <p className="text-xs text-[#736c5f] mt-1 whitespace-nowrap">
                  Khách sạn nghỉ ngơi theo giờ & qua đêm tiện nghi
                </p>
              </div>

              {/* Exact address & details from prompt */}
              <div className="space-y-5 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-sm bg-[#f6f2e8] text-[#9f7d3a] shrink-0 mt-0.5 border border-[#e2d9c8]">
                    <MapPin className="w-5 h-5 text-[#9f7d3a]" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-[#8c734b] uppercase tracking-wider block whitespace-nowrap">
                      Địa chỉ:
                    </span>
                    <p className="font-semibold text-[#1c1917] text-base mt-0.5">
                      {HOTEL_INFO.address}
                    </p>
                    <button
                      onClick={handleCopyAddress}
                      className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-[#736c5f] hover:text-[#1c1917] font-medium cursor-pointer whitespace-nowrap"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#245b3a]" />
                          <span className="text-[#245b3a] font-semibold whitespace-nowrap">Đã sao chép địa chỉ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="whitespace-nowrap">Sao chép địa chỉ</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Hotline */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-sm bg-[#f6f2e8] text-[#9f7d3a] shrink-0 mt-0.5 border border-[#e2d9c8]">
                    <Phone className="w-5 h-5 text-[#9f7d3a]" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-[#8c734b] uppercase tracking-wider block whitespace-nowrap">
                      Hotline đặt phòng & hỗ trợ:
                    </span>
                    <a
                      href={`tel:${HOTEL_INFO.hotlineRaw}`}
                      className="font-bold text-[#1c1917] text-xl tracking-wide hover:underline inline-block mt-0.5 whitespace-nowrap"
                    >
                      {HOTEL_INFO.hotline}
                    </a>
                    <span className="text-xs text-[#245b3a] font-medium block whitespace-nowrap">
                      Nhận cuộc gọi 24/7 · Tư vấn phòng trống tức thì
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-sm bg-[#f6f2e8] text-[#9f7d3a] shrink-0 mt-0.5 border border-[#e2d9c8]">
                    <Mail className="w-5 h-5 text-[#9f7d3a]" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-[#8c734b] uppercase tracking-wider block whitespace-nowrap">
                      Email liên hệ:
                    </span>
                    <a
                      href={`mailto:${HOTEL_INFO.email}`}
                      className="font-bold text-[#1c1917] text-base sm:text-lg tracking-wide hover:underline inline-block mt-0.5 break-all"
                    >
                      {HOTEL_INFO.email}
                    </a>
                    <span className="text-xs text-[#245b3a] font-medium block">
                      Tự động tiếp nhận toàn bộ thông tin đặt phòng từ form trên website
                    </span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-sm bg-[#f6f2e8] text-[#9f7d3a] shrink-0 mt-0.5 border border-[#e2d9c8]">
                    <Clock className="w-5 h-5 text-[#9f7d3a]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#8c734b] uppercase tracking-wider block">
                      Thời gian phục vụ:
                    </span>
                    <p className="font-bold text-[#1c1917] text-base mt-0.5">
                      {HOTEL_INFO.workingHours}
                    </p>
                    <span className="text-xs text-[#736c5f]">
                      Đón khách bất kỳ thời điểm nào trong ngày và đêm
                    </span>
                  </div>
                </div>
              </div>

              {/* Slogan pill from prompt */}
              <div className="mt-8 p-3.5 rounded-sm bg-[#faf8f4] border border-[#e8dfcf] text-center">
                <p className="text-xs sm:text-sm font-semibold text-[#1c1917] font-serif italic">
                  "{HOTEL_INFO.slogan}"
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t border-[#f0ece3] flex flex-col sm:flex-row gap-3">
              <a
                href={HOTEL_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#1c1917] hover:bg-[#2e2a25] text-[#fbf7ee] rounded-sm text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs border border-[#c5a059]/40"
              >
                <Navigation className="w-4 h-4 text-[#e8c68a]" />
                <span>Chỉ đường trên Google Maps</span>
              </a>
              <button
                onClick={onOpenBooking}
                className="py-3 px-4 bg-white hover:bg-[#f6f2e8] border border-[#d8cfbe] text-[#1c1917] rounded-sm text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                Đặt trước
              </button>
            </div>
          </div>

          {/* Right Column: Google Maps Embed & Nearby Landmarks */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white rounded-sm border border-[#ded5c3] overflow-hidden shadow-xs">
            <div className="relative h-[340px] sm:h-[380px] w-full bg-neutral-200">
              <iframe
                title="Bản đồ vị trí Thiên Phú Hotel 56 Tân Hương"
                src="https://maps.google.com/maps?q=56+T%C3%A2n+H%C6%B0%C6%A1ng%2C+Ph%C6%B0%E1%BB%9Dng+Ph%C3%BA+Th%E1%BB%8D+H%C3%B2a%2C+T%C3%A2n+Ph%C3%BA%2C+H%E1%BB%93+Ch%C3%AD+Minh&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map Floating badge */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-[#ded5c3] shadow-md text-xs font-bold text-[#1c1917] flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                <span>56 Tân Hương, P. Phú Thọ Hòa</span>
              </div>
            </div>

            {/* Nearby Highlights */}
            <div className="p-6 bg-[#faf8f4] border-t border-[#ded5c3]">
              <span className="text-xs font-bold text-[#3d3830] uppercase tracking-wider block mb-3">
                Khoảng cách đến các địa điểm lân cận:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#5c5549]">
                <div className="p-2.5 bg-white rounded-xs border border-[#e2d9c8]">
                  <span className="font-bold text-[#1c1917] block">Chợ Tân Hương</span>
                  <span className="text-[#736c5f]">Cách ~150m (2 phút)</span>
                </div>
                <div className="p-2.5 bg-white rounded-xs border border-[#e2d9c8]">
                  <span className="font-bold text-[#1c1917] block">Aeon Mall Tân Phú</span>
                  <span className="text-[#736c5f]">Cách ~1.5km (5 phút)</span>
                </div>
                <div className="p-2.5 bg-white rounded-xs border border-[#e2d9c8]">
                  <span className="font-bold text-[#1c1917] block">Lũy Bán Bích</span>
                  <span className="text-[#736c5f]">Cách ~600m</span>
                </div>
                <div className="p-2.5 bg-white rounded-xs border border-[#e2d9c8]">
                  <span className="font-bold text-[#1c1917] block">Sân bay TSN</span>
                  <span className="text-[#736c5f]">Khoảng 15 phút</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto bg-white rounded-sm border border-[#ded5c3] p-6 sm:p-8">
          <h3 className="font-serif-heading text-2xl font-bold text-[#1c1917] mb-6 text-center">
            Câu hỏi thường gặp khi đặt phòng tại Thiên Phú Hotel
          </h3>
          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-[#e2d9c8] rounded-sm overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 text-left font-semibold text-sm sm:text-base text-[#1c1917] flex items-center justify-between bg-[#faf8f4] hover:bg-[#f3eee3] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#9f7d3a] font-bold ml-2 text-lg">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="p-4 bg-white text-sm text-[#4d483e] leading-relaxed border-t border-[#f0ece3]">
                      {faq.a}
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
