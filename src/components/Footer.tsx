import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUp, Navigation } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { HotelLogo } from './HotelLogo';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#171513] text-[#cfc8bd] pt-16 pb-12 border-t border-[#2d2925]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2d2925]">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <HotelLogo size="md" theme="dark" showText={true} />
            </div>

            <p className="text-sm text-[#a8a195] leading-relaxed font-light max-w-md">
              {HOTEL_INFO.intro}
            </p>

            {/* Slogan highlight */}
            <div className="p-3.5 bg-[#211e1b] rounded-sm border border-[#3b3630] max-w-md">
              <p className="text-xs sm:text-sm font-medium text-[#e8c68a] font-serif italic text-center">
                "{HOTEL_INFO.slogan}"
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059]">
              Điều hướng nhanh
            </h4>
            <ul className="space-y-2 text-sm text-[#b8b0a2]">
              <li>
                <a href="#ke-hoach" className="hover:text-[#e8c68a] transition-colors">
                  Lên kế hoạch nghỉ ngơi
                </a>
              </li>
              <li>
                <a href="#bang-gia-phong" className="hover:text-[#e8c68a] transition-colors">
                  Bảng giá phòng theo giờ
                </a>
              </li>
              <li>
                <a href="#vi-tri-lien-he" className="hover:text-[#e8c68a] transition-colors">
                  Vị trí & Chỉ đường
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details (Exact from prompt) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059]">
              Thông tin liên hệ
            </h4>
            <div className="space-y-3 text-sm text-[#cfc8bd]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>{HOTEL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#e8c68a] shrink-0" />
                <a
                  href={`tel:${HOTEL_INFO.hotlineRaw}`}
                  className="hover:underline font-bold text-[#e8c68a] text-base whitespace-nowrap"
                >
                  Hotline:&#160;<span className="whitespace-nowrap">{HOTEL_INFO.hotline}</span>
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c5a059] shrink-0" />
                <a
                  href={`mailto:${HOTEL_INFO.email}`}
                  className="hover:underline text-[#e8c68a] text-sm break-all"
                >
                  {HOTEL_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span className="whitespace-nowrap">{HOTEL_INFO.workingHours}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={onOpenBooking}
                className="px-4 py-2 bg-[#f4ecd8] hover:bg-white text-[#1c1917] rounded-sm text-xs font-semibold tracking-wide transition-all cursor-pointer"
              >
                Đặt phòng ngay
              </button>
              <a
                href={HOTEL_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#26221e] hover:bg-[#332e29] text-[#e8c68a] border border-[#3b3630] rounded-sm text-xs font-medium flex items-center gap-1.5 transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div>
            © {new Date().getFullYear()} {HOTEL_INFO.name}. Tất cả các quyền được bảo lưu.
          </div>
          <div className="flex items-center gap-6">
            <span>56 Tân Hương, P. Phú Thọ Hòa, TP.HCM</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Lên đầu trang</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
