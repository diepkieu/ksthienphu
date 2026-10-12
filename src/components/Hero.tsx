import React from 'react';
import { Phone, Clock, MapPin, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { HotelLogo } from './HotelLogo';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative pt-24 sm:pt-28 pb-16 lg:pb-24 bg-gradient-to-b from-[#f7f6f3] via-[#f3f1eb] to-[#ece8de] overflow-hidden border-b border-[#e5dfd3]">
      {/* Subtle luxury ambient glow */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#bfa168]/08 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Typography & Text Requirements */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Elegant Sub-badge with Gold accent */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ede8dc] border border-[#d6cbba] text-[#7a5e31] text-xs font-semibold tracking-wider uppercase mb-4 w-fit shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#bfa168] animate-pulse"></span>
              <span className="whitespace-nowrap">56 Tân Hương · Tân Phú · Phục vụ 24/24</span>
            </div>

            {/* Hotel Brand Name with Royal Crest Logo */}
            <div className="flex items-center gap-3 mb-2.5">
              <HotelLogo size="sm" showText={false} className="shrink-0" />
              <h2 className="font-brand-title text-xl sm:text-2xl lg:text-3xl font-bold tracking-[0.16em] text-[#1c1917] uppercase leading-none whitespace-nowrap">
                THIÊN&#160;PHÚ&#160;HOTEL
              </h2>
            </div>

            {/* Primary Headline */}
            <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1a1815] leading-[1.2] tracking-tight mb-5">
              Không gian riêng tư – <br className="hidden sm:inline" />
              <span className="gold-gradient-text font-serif italic whitespace-nowrap">Nghỉ ngơi linh hoạt theo giờ</span>
            </h1>

            {/* Exact Required Paragraph in luxury warm card */}
            <div className="text-base sm:text-[17px] text-[#423e38] leading-relaxed font-normal mb-8 max-w-2xl bg-white/80 backdrop-blur-xs p-5 rounded-sm border-l-3 border-[#c5a059] shadow-xs">
              <p>{HOTEL_INFO.intro}</p>
            </div>

            {/* Quick Pricing Highlights Banner with warm gold badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="bg-[#ffffff] p-3.5 rounded-sm border border-[#e5dfd3] shadow-xs hover:border-[#c5a059] transition-all group">
                <span className="text-[11px] font-bold uppercase text-[#8c734b] tracking-wider block whitespace-nowrap">Phòng Mini</span>
                <span className="text-xl font-bold text-[#1c1917] block mt-0.5 whitespace-nowrap">
                  90.000<span className="text-xs font-medium text-[#736e65]">Đ</span>
                </span>
                <span className="text-[11px] text-[#5e584f] block font-medium whitespace-nowrap">giờ đầu · +30k/h tiếp</span>
              </div>
              <div className="bg-[#ffffff] p-3.5 rounded-sm border border-[#e5dfd3] shadow-xs hover:border-[#c5a059] transition-all group">
                <span className="text-[11px] font-bold uppercase text-[#8c734b] tracking-wider block whitespace-nowrap">Phòng Đơn/Mặt tiền</span>
                <span className="text-xl font-bold text-[#1c1917] block mt-0.5 whitespace-nowrap">
                  120.000<span className="text-xs font-medium text-[#736e65]">Đ</span>
                </span>
                <span className="text-[11px] text-[#5e584f] block font-medium whitespace-nowrap">giờ đầu · +30k/h tiếp</span>
              </div>
              <div className="bg-[#ffffff] p-3.5 rounded-sm border border-[#e5dfd3] shadow-xs hover:border-[#c5a059] transition-all group">
                <span className="text-[11px] font-bold uppercase text-[#9f7d3a] tracking-wider block whitespace-nowrap">Qua đêm từ</span>
                <span className="text-xl font-bold text-[#9f7d3a] block mt-0.5 whitespace-nowrap">
                  350.000<span className="text-xs font-medium text-[#736e65]"> vnđ</span>
                </span>
                <span className="text-[11px] text-[#2e6244] block font-semibold whitespace-nowrap">Sau 19h – 12h trưa</span>
              </div>
              <div className="bg-[#ffffff] p-3.5 rounded-sm border border-[#e5dfd3] shadow-xs hover:border-[#c5a059] transition-all group">
                <span className="text-[11px] font-bold uppercase text-[#9f7d3a] tracking-wider block whitespace-nowrap">Ngày đêm từ</span>
                <span className="text-xl font-bold text-[#9f7d3a] block mt-0.5 whitespace-nowrap">
                  450.000<span className="text-xs font-medium text-[#736e65]"> vnđ</span>
                </span>
                <span className="text-[11px] text-[#2e6244] block font-semibold whitespace-nowrap">14h – 12h trưa hôm sau</span>
              </div>
            </div>

            {/* CTA Buttons with Gold & Rich Charcoal Styling */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onOpenBooking}
                className="px-7 py-3.5 rounded-sm bg-[#1c1917] hover:bg-[#2b2723] text-[#fbf7ee] font-medium text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 group cursor-pointer border border-[#c5a059]/40 whitespace-nowrap"
              >
                <span className="whitespace-nowrap">Đặt phòng theo giờ ngay</span>
                <ArrowRight className="w-4 h-4 text-[#e8c68a] group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              <a
                href={`tel:${HOTEL_INFO.hotlineRaw}`}
                className="px-6 py-3.5 rounded-sm bg-[#ffffff] hover:bg-[#f6f3eb] text-[#1c1917] font-semibold text-sm sm:text-base border border-[#d6cdbd] transition-all flex items-center justify-center gap-2 shadow-xs group whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#9f7d3a] group-hover:scale-110 transition-transform shrink-0" />
                <span className="whitespace-nowrap">Hotline:&#160;<span className="font-bold">{HOTEL_INFO.hotline}</span></span>
              </a>

              <a
                href="#bang-gia-phong"
                className="px-4 py-3.5 text-[#6c6456] hover:text-[#1c1917] text-sm font-semibold text-center transition-colors underline-offset-4 hover:underline whitespace-nowrap"
              >
                Bảng giá chi tiết →
              </a>
            </div>

            {/* Quick Guarantees bar */}
            <div className="mt-8 pt-6 border-t border-[#dfd8cb] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#524d44] font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#9f7d3a]" />
                <span>Không gian riêng tư & kín đáo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#9f7d3a]" />
                <span>Phòng sạch sẽ thay mới 100%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#9f7d3a]" />
                <span>Nhận phòng nhanh trong 2 phút</span>
              </div>
            </div>
          </div>

          {/* Right Column: Real Hotel Photography Showcase with Warm Aesthetic Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Real Hotel Room Image */}
              <div className="relative rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(28,25,23,0.18)] border-3 border-white bg-neutral-200 group">
                <img
                  src="/images/regenerated_image_1791791398973.jpg"
                  alt="Không gian phòng khách sạn Thiên Phú sang trọng, sạch sẽ"
                  referrerPolicy="no-referrer"
                  className="w-full h-[370px] sm:h-[430px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Badge in image with warm glassmorphism */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-sm border border-[#e8dfcf] shadow-xl">
                  <div className="flex items-center justify-between text-[#1c1917]">
                    <div>
                      <p className="text-[11px] font-bold tracking-wider uppercase text-[#9f7d3a]">
                        THIÊN PHÚ HOTEL · PHỤC VỤ 24/24
                      </p>
                      <p className="text-sm sm:text-base font-bold text-[#1c1917] mt-0.5">
                        Phòng sạch tinh tươm – Giường êm ái
                      </p>
                    </div>
                    <div className="text-right pl-2 border-l border-[#e8dfcf]">
                      <span className="text-[10px] text-[#736e65] uppercase block font-semibold">Chỉ từ</span>
                      <span className="text-lg font-bold text-[#9f7d3a]">90.000Đ</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Overlapping Real Hotel Images */}
              <div className="hidden sm:grid grid-cols-2 gap-3 mt-3">
                <div className="rounded-sm overflow-hidden border-2 border-white shadow-md h-28 bg-neutral-200 relative group">
                  <img
                    src="/images/hero_room_tidy_1791786853001.jpg"
                    alt="Phòng nghỉ chuẩn bị sạch sẽ tại Thiên Phú"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/hero_room_tidy.jpg';
                    }}
                  />
                  <div className="absolute bottom-1.5 left-2 bg-[#1c1917]/85 text-[10px] text-[#e8c68a] px-2 py-0.5 rounded-xs font-semibold">
                    ✓ Sạch sẽ & Khử khuẩn
                  </div>
                </div>

                <div className="rounded-sm overflow-hidden border-2 border-white shadow-md h-28 bg-neutral-200 relative group">
                  <img
                    src="/images/hero_room_window_1791786865755.jpg"
                    alt="Phòng mặt tiền thoáng sáng ngắm phố"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/hero_room_window.jpg';
                    }}
                  />
                  <div className="absolute bottom-1.5 left-2 bg-[#1c1917]/85 text-[10px] text-[#e8c68a] px-2 py-0.5 rounded-xs font-semibold">
                    ✓ Mặt tiền thoáng sáng
                  </div>
                </div>
              </div>

              {/* Floating Verified Tag in warm gold */}
              <div className="absolute -top-3 -right-3 bg-[#1c1917] text-[#e8c68a] text-xs px-4 py-1.5 rounded-full font-semibold shadow-xl border border-[#c5a059]/60 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Nghỉ ngơi linh hoạt</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
