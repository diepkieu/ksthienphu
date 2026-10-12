import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface FloatingCallButtonProps {
  onOpenBooking: () => void;
}

export const FloatingCallButton: React.FC<FloatingCallButtonProps> = ({ onOpenBooking }) => {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2.5">
      {/* Quick Zalo Button */}
      <a
        href={HOTEL_INFO.zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-[#0068ff] hover:bg-[#0052cc] text-white py-2 px-3 sm:px-3.5 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 border border-white/30"
        title="Nhắn Zalo lễ tân"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-semibold">
          Chat Zalo 24/7
        </span>
        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
      </a>

      {/* Quick Booking Button */}
      <button
        onClick={onOpenBooking}
        className="group flex items-center gap-2 bg-[#1c1917] hover:bg-[#2b2723] text-[#fbf7ee] py-2 px-3 sm:px-3.5 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 border border-[#c5a059]/60 cursor-pointer"
        title="Đặt phòng nhanh"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-semibold text-[#e8c68a]">
          Đặt phòng theo giờ
        </span>
        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-[#e8c68a]" />
      </button>

      {/* Primary Hotline Direct Dial Button with Gold Glow */}
      <a
        href={`tel:${HOTEL_INFO.hotlineRaw}`}
        className="relative flex items-center gap-2.5 bg-gradient-to-r from-[#1c1917] to-[#2b2723] text-white py-3 px-4 sm:px-5 rounded-full shadow-[0_10px_30px_rgba(28,25,23,0.4)] hover:shadow-[0_12px_35px_rgba(197,160,89,0.35)] transition-all transform hover:scale-105 border border-[#c5a059] whitespace-nowrap"
        title={`Gọi Hotline ${HOTEL_INFO.hotline}`}
      >
        <span className="relative flex h-3 w-3 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
        </span>
        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#e8c68a] animate-bounce shrink-0" />
        <span className="text-xs sm:text-sm font-bold tracking-wide text-[#fbf7ee] whitespace-nowrap">
          {HOTEL_INFO.hotline}
        </span>
      </a>
    </div>
  );
};
