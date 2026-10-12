import React, { useState } from 'react';
import { BedDouble, Users, Maximize, Check, Phone, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { ROOMS_DATA, HOTEL_INFO } from '../data/hotelData';
import { RoomType } from '../types/hotel';

interface RoomsSectionProps {
  onOpenBooking: (roomTypeId?: string) => void;
  onPreviewImage: (imageUrl: string, title: string) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ onOpenBooking, onPreviewImage }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredRooms = activeTab === 'all'
    ? ROOMS_DATA
    : ROOMS_DATA.filter(r => r.id === activeTab);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(val) + 'Đ';
  };

  return (
    <section id="bang-gia-phong" className="py-20 sm:py-24 bg-[#ffffff] border-b border-[#e5dfd3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-bold tracking-[0.25em] text-[#9f7d3a] uppercase block mb-2">
            BẢNG GIÁ NIÊM YẾT MINH BẠCH · KHÔNG PHÁT SINH
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1c1917] tracking-tight">
            Đặt phòng theo giờ ngay hôm nay
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto mt-4 mb-6" />

        </div>

        {/* Room Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-sm text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-[#1c1917] text-[#fbf7ee] shadow-sm'
                : 'bg-[#f5f2ea] text-[#5c5549] hover:bg-[#eae5d8]'
            }`}
          >
            Tất cả phòng ({ROOMS_DATA.length})
          </button>
          {ROOMS_DATA.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveTab(r.id)}
              className={`px-4 py-2 rounded-sm text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === r.id
                  ? 'bg-[#1c1917] text-[#fbf7ee] shadow-sm'
                  : 'bg-[#f5f2ea] text-[#5c5549] hover:bg-[#eae5d8]'
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* Rooms Grid with Real Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-[#fcfbf9] rounded-sm border border-[#e2dcce] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#c5a059] transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image & Quick Price Tag */}
              <div>
                <div className="relative h-64 sm:h-72 overflow-hidden bg-neutral-200">
                  <img
                    src={room.images[0]}
                    alt={`${room.name} - Thiên Phú Hotel`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      if (room.images[1]) {
                        (e.currentTarget as HTMLImageElement).src = room.images[1];
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10 opacity-90" />

                  {/* Room Tag */}
                  <div className="absolute top-3 left-3 bg-[#1c1917]/90 backdrop-blur-xs text-[#fbf7ee] text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider border border-[#c5a059]/40">
                    {room.name}
                  </div>

                  {/* Preview Image Button */}
                  <button
                    onClick={() => onPreviewImage(room.images[0], `${room.name} - Thiên Phú Hotel`)}
                    className="absolute top-3 right-3 bg-white/95 hover:bg-white text-[#1c1917] p-2 rounded-sm shadow-md transition-all cursor-pointer"
                    title="Xem ảnh lớn"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Hourly Badge with gold highlight */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#d8cfbe] block font-medium">
                        Nghỉ theo giờ
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-white">
                        {formatPrice(room.hourlyFirst)}
                        <span className="text-xs font-normal text-[#d8cfbe]"> /giờ đầu</span>
                      </span>
                    </div>
                    <div className="text-right bg-black/50 backdrop-blur-xs px-3 py-1.5 rounded-sm border border-white/20">
                      <span className="text-[10px] text-[#e0d9cc] block font-medium">Giờ tiếp theo</span>
                      <span className="text-sm font-bold text-[#f5ecd8]">+{formatPrice(room.hourlyNext)}</span>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#1c1917]">
                      {room.name}
                    </h3>
                    <div className="text-xs text-[#8c734b] font-semibold flex items-center gap-1.5 bg-[#f6f2e8] px-2.5 py-1 rounded-xs">
                      <span>{room.bedType}</span>
                    </div>
                  </div>

                  <p className="text-xs font-medium text-[#7a7263] italic mb-4">
                    {room.subtitle}
                  </p>

                  <p className="text-sm text-[#4d483e] leading-relaxed mb-5">
                    {room.description}
                  </p>

                  {/* Rate Comparison Pills */}
                  {room.overnightPrice && room.dailyPrice ? (
                    <div className="grid grid-cols-2 gap-2 p-3 bg-[#f5f2ea] rounded-sm mb-5 text-xs border border-[#eae4d5]">
                      <div>
                        <span className="text-[#736c5f] block">Gói qua đêm:</span>
                        <span className="font-bold text-[#1c1917] text-sm">
                          từ {formatPrice(room.overnightPrice)}
                        </span>
                        <span className="text-[11px] text-[#635b4f] block mt-0.5 font-medium">
                          Sau 19h – 12h trưa
                        </span>
                      </div>
                      <div>
                        <span className="text-[#736c5f] block">Gói ngày đêm:</span>
                        <span className="font-bold text-[#1c1917] text-sm">
                          từ {formatPrice(room.dailyPrice)}
                        </span>
                        <span className="text-[11px] text-[#635b4f] block mt-0.5 font-medium">
                          14h – 12h trưa hôm sau
                        </span>
                      </div>
                    </div>
                  ) : room.hasDailyConsultation ? (
                    <div className="p-3 bg-[#fbf9f4] rounded-sm mb-5 text-xs border border-[#e6dfcf] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[#736c5f] font-medium">Gói ngày đêm (14h – 12h):</span>
                        <span className="font-bold text-[#8c734b] bg-white px-2.5 py-0.5 rounded-xs border border-[#dfd5c2]">
                          Có bán ngày đêm
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-1.5 border-t border-[#ede7d8] text-[11px]">
                        <span className="text-[#615a4d]">Tư vấn & báo giá ưu đãi:</span>
                        <a
                          href={`tel:${HOTEL_INFO.hotlineRaw}`}
                          className="font-bold text-[#9f7d3a] hover:text-[#1c1917] flex items-center gap-1 underline"
                        >
                          <Phone className="w-3 h-3" />
                          Hotline: {HOTEL_INFO.hotline}
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-[#f5f2ea] rounded-sm mb-5 text-xs border border-[#eae4d5] flex items-center justify-between">
                      <span className="text-[#736c5f]">Hình thức đặt phòng:</span>
                      <span className="font-semibold text-[#8c734b] text-xs bg-white px-2.5 py-1 rounded-xs border border-[#e2d9c8]">
                        Chỉ áp dụng nghỉ theo giờ
                      </span>
                    </div>
                  )}

                  {/* Features list */}
                  <div className="space-y-1.5 mb-2">
                    <span className="text-xs font-bold text-[#3d3830] uppercase tracking-wider block mb-2">
                      Tiện nghi phòng:
                    </span>
                    <div className="grid grid-cols-2 gap-y-1.5 gap-x-2">
                      {room.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-[#524d43]">
                          <Check className="w-3.5 h-3.5 text-[#9f7d3a] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0">
                <div className="border-t border-[#eee9dc] pt-4 flex items-center gap-3">
                  <button
                    onClick={() => onOpenBooking(room.id)}
                    className="flex-1 py-3 bg-[#1c1917] hover:bg-[#2e2a25] text-[#fbf7ee] rounded-sm text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs border border-[#c5a059]/40"
                  >
                    <span>Đặt phòng này</span>
                    <ArrowRight className="w-4 h-4 text-[#e8c68a]" />
                  </button>

                  <a
                    href={`tel:${HOTEL_INFO.hotlineRaw}`}
                    className="px-4 py-3 bg-white hover:bg-[#f6f2e8] border border-[#d8cfbe] text-[#1c1917] rounded-sm text-sm font-semibold transition-all flex items-center justify-center gap-1.5"
                    title="Gọi hotline đặt ngay"
                  >
                    <Phone className="w-4 h-4 text-[#9f7d3a]" />
                    <span className="hidden sm:inline">Gọi ngay</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};
