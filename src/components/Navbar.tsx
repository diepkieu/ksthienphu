import React, { useState, useEffect } from 'react';
import { Phone, Mail, Clock, Menu, X, MapPin } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { HotelLogo } from './HotelLogo';

interface NavbarProps {
  onOpenBooking: (roomTypeId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#fdfcfb]/95 backdrop-blur-md shadow-[0_4px_25px_rgba(28,25,23,0.07)] border-b border-[#e6e2d8] py-3'
          : 'bg-[#f7f6f3]/90 backdrop-blur-sm border-b border-[#ece8de] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center group shrink-0" aria-label="Thiên Phú Hotel">
            <HotelLogo size="sm" showText={true} />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4a463e]">
            <a
              href="#ke-hoach"
              className="hover:text-[#9f7d3a] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#bfa168] after:transition-all"
            >
              Lên kế hoạch nghỉ ngơi
            </a>
            <a
              href="#bang-gia-phong"
              className="hover:text-[#9f7d3a] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#bfa168] after:transition-all"
            >
              Bảng giá phòng
            </a>
            <a
              href="#vi-tri-lien-he"
              className="hover:text-[#9f7d3a] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#bfa168] after:transition-all"
            >
              Vị trí & Liên hệ
            </a>
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* 24/7 Hotline Button */}
            <a
              href={`tel:${HOTEL_INFO.hotlineRaw}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm border border-[#d8cfbe] bg-[#f2efe6] hover:bg-[#eae5d8] text-[#1c1917] text-xs sm:text-sm font-semibold transition-all group shadow-xs whitespace-nowrap shrink-0"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
              </span>
              <Phone className="w-3.5 h-3.5 text-[#9f7d3a] group-hover:scale-110 transition-transform shrink-0" />
              <span className="whitespace-nowrap font-bold tracking-wide">{HOTEL_INFO.hotline}</span>
            </a>

            {/* Book Now Button */}
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#1c1917] hover:bg-[#2e2a26] text-[#f4ecd8] border border-[#a6864d]/40 text-xs sm:text-sm font-medium tracking-wide shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Đặt phòng ngay</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 md:hidden shrink-0">
            <a
              href={`tel:${HOTEL_INFO.hotlineRaw}`}
              className="p-2 rounded-sm bg-[#f2efe6] border border-[#d8cfbe] text-[#1c1917] shrink-0"
              aria-label="Gọi hotline"
            >
              <Phone className="w-4 h-4 text-[#9f7d3a]" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-sm text-[#1c1917] hover:bg-[#eeece3] transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fdfcfb] border-b border-[#e6e2d8] px-5 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3.5 text-sm font-medium text-[#3a3731]">
            <div className="flex items-center gap-2 text-xs text-[#8c734b] pb-2 border-b border-[#ece8de]">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">{HOTEL_INFO.workingHours} · 56 Tân Hương, TP.HCM</span>
            </div>
            <a
              href="#ke-hoach"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#9f7d3a]"
            >
              Lên kế hoạch nghỉ ngơi
            </a>
            <a
              href="#bang-gia-phong"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#9f7d3a]"
            >
              Bảng giá phòng theo giờ
            </a>
            <a
              href="#vi-tri-lien-he"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#9f7d3a]"
            >
              Vị trí & Bản đồ đường đi
            </a>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 bg-[#1c1917] text-[#f4ecd8] border border-[#a6864d]/40 rounded-sm text-center font-medium shadow-sm whitespace-nowrap"
              >
                Đặt phòng theo giờ ngay
              </button>
              <a
                href={`tel:${HOTEL_INFO.hotlineRaw}`}
                className="w-full py-2.5 bg-[#f2efe6] border border-[#d8cfbe] text-[#1c1917] rounded-sm text-center font-semibold flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#9f7d3a] shrink-0" />
                <span className="whitespace-nowrap">Hotline:&#160;{HOTEL_INFO.hotline}</span>
              </a>
              <a
                href={`mailto:${HOTEL_INFO.email}`}
                className="w-full py-2 text-xs text-[#6e5d3b] hover:text-[#1c1917] text-center flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-[#9f7d3a] shrink-0" />
                <span className="truncate">{HOTEL_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
