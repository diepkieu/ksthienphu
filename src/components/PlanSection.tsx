import React, { useState } from 'react';
import { Clock, BedDouble, Calendar, Calculator, Check, ArrowRight, ShieldCheck, Tag, Phone } from 'lucide-react';
import { PLANNING_POINTS, ROOMS_DATA, HOTEL_INFO } from '../data/hotelData';

interface PlanSectionProps {
  onOpenBookingWithPrefill: (roomTypeId: string, stayType: 'hourly' | 'overnight' | 'full_day', hours: number) => void;
}

export const PlanSection: React.FC<PlanSectionProps> = ({ onOpenBookingWithPrefill }) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>('mini');
  const [planType, setPlanType] = useState<'hourly' | 'overnight' | 'full_day'>('hourly');
  const [selectedHours, setSelectedHours] = useState<number>(2);

  const selectedRoom = ROOMS_DATA.find((r) => r.id === selectedRoomId) || ROOMS_DATA[0];

  // Calculate transparent cost
  const calculateTotal = () => {
    if (planType === 'overnight' && selectedRoom.overnightPrice) {
      return selectedRoom.overnightPrice;
    }
    if (planType === 'full_day' && selectedRoom.dailyPrice) {
      return selectedRoom.dailyPrice;
    }
    // Hourly calculation: First hour + (hours - 1) * hourlyNext
    if (selectedHours <= 1) {
      return selectedRoom.hourlyFirst;
    }
    return selectedRoom.hourlyFirst + (selectedHours - 1) * selectedRoom.hourlyNext;
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(val) + 'Đ';
  };

  return (
    <section id="ke-hoach" className="py-20 bg-[#f3f1ea] border-b border-[#e5dfd3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-xs font-bold tracking-[0.25em] text-[#9f7d3a] uppercase block mb-2">
            THIÊN PHÚ HOTEL · QUY TRÌNH TIỆN LỢI
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1c1917] tracking-tight">
            Lên kế hoạch nghỉ ngơi
          </h2>
          <p className="mt-3 text-[#524d44] text-base leading-relaxed">
            Chủ động thời gian, lựa chọn không gian nghỉ ngơi phù hợp và tận hưởng mức chi phí tối ưu nhất cho lịch trình của bạn.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto mt-4" />
        </div>

        {/* 4 Core Planning Pillars (Exact text required) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PLANNING_POINTS.map((point, index) => {
            const icons = [Clock, BedDouble, Calendar, Calculator];
            const IconComponent = icons[index];

            return (
              <div
                key={point.id}
                className="bg-white p-6 rounded-sm border border-[#e5dfd3] shadow-xs hover:border-[#c5a059] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#f6f3ec] border border-[#d8cfbf] text-[#8c734b] flex items-center justify-center text-xs font-bold font-serif">
                      0{index + 1}
                    </span>
                    <div className="p-2.5 rounded-sm bg-[#f6f3ec] text-[#9f7d3a] group-hover:bg-[#1c1917] group-hover:text-[#e8c68a] transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#1c1917] mb-2 font-serif-heading">
                    {point.title}
                  </h3>

                  {/* Exact text from brief */}
                  <p className="text-sm font-medium text-[#4a453c] leading-normal mb-2">
                    {point.description}
                  </p>
                </div>

                <p className="text-xs text-[#7e7668] border-t border-[#f0ece3] pt-3 mt-2">
                  {point.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Estimator / Planning Tool */}
        <div className="bg-white rounded-sm border border-[#ded7c8] shadow-[0_12px_40px_rgba(28,25,23,0.06)] p-6 sm:p-8 lg:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a059]/05 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Controls */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 bg-[#f4f0e6] rounded-xs text-[#9f7d3a]">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1c1917] font-serif-heading">
                  Công cụ tính chi phí nghỉ ngơi minh bạch
                </h3>
              </div>
              <p className="text-sm text-[#5a544a] mb-6">
                Lựa chọn loại phòng và thời lượng nghỉ ngơi dự kiến để xem chi phí tính toán theo biểu giá niêm yết chính xác nhất:
              </p>

              {/* Step 1: Chọn loại phòng */}
              <div className="mb-5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#3d3830] block mb-2">
                  1. Chọn loại phòng:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {ROOMS_DATA.map((room) => (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => {
                        setSelectedRoomId(room.id);
                        if (!room.overnightPrice && planType === 'overnight') {
                          setPlanType('hourly');
                        }
                      }}
                      className={`py-2.5 px-3 rounded-sm text-xs font-semibold text-left border transition-all cursor-pointer ${
                        selectedRoomId === room.id
                          ? 'border-[#1c1917] bg-[#1c1917] text-[#fbf7ee] shadow-sm'
                          : 'border-[#e0d9cc] bg-[#fbf9f5] text-[#3d3830] hover:bg-[#f3efe6]'
                      }`}
                    >
                      <span className="block truncate">{room.name}</span>
                      <span className={`text-[10px] block mt-0.5 ${selectedRoomId === room.id ? 'text-[#d8be8d]' : 'text-[#8a8172]'}`}>
                        {formatPrice(room.hourlyFirst)}/h đầu
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Lựa chọn thời lượng */}
              <div className="mb-5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#3d3830] block mb-2">
                  2. Lựa chọn thời lượng nghỉ:
                </label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setPlanType('hourly')}
                    className={`py-2 px-3 text-xs font-semibold rounded-sm border transition-all cursor-pointer text-center ${
                      planType === 'hourly'
                        ? 'border-[#1c1917] bg-[#1c1917] text-[#fbf7ee]'
                        : 'border-[#e0d9cc] bg-[#fbf9f5] text-[#3d3830] hover:bg-[#f3efe6]'
                    }`}
                  >
                    Nghỉ theo giờ
                  </button>
                  <button
                    type="button"
                    disabled={!selectedRoom.overnightPrice}
                    onClick={() => setPlanType('overnight')}
                    className={`py-2 px-3 text-xs font-semibold rounded-sm border transition-all text-center ${
                      !selectedRoom.overnightPrice
                        ? 'opacity-40 cursor-not-allowed bg-[#f0ede6] text-[#8c8577] border-[#e0d9cc]'
                        : planType === 'overnight'
                        ? 'border-[#1c1917] bg-[#1c1917] text-[#fbf7ee] cursor-pointer'
                        : 'border-[#e0d9cc] bg-[#fbf9f5] text-[#3d3830] hover:bg-[#f3efe6] cursor-pointer'
                    }`}
                    title={!selectedRoom.overnightPrice ? 'Chỉ áp dụng cho Phòng Mini' : undefined}
                  >
                    Qua đêm {selectedRoom.overnightPrice ? '(từ 350k)' : '(k/o có)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlanType('full_day')}
                    className={`py-2 px-3 text-xs font-semibold rounded-sm border transition-all text-center cursor-pointer ${
                      planType === 'full_day'
                        ? 'border-[#1c1917] bg-[#1c1917] text-[#fbf7ee]'
                        : 'border-[#e0d9cc] bg-[#fbf9f5] text-[#3d3830] hover:bg-[#f3efe6]'
                    }`}
                  >
                    Ngày đêm {selectedRoom.dailyPrice ? '(từ 450k)' : '(Tư vấn Hotline)'}
                  </button>
                </div>

                {/* If hourly, select hours slider/buttons */}
                {planType === 'hourly' && (
                  <div className="bg-[#f9f7f2] p-3.5 rounded-sm border border-[#e5dfd3]">
                    <div className="flex items-center justify-between text-xs text-[#524d44] mb-2 font-medium">
                      <span>Thời lượng nghỉ theo giờ:</span>
                      <span className="font-bold text-[#1c1917] text-sm">{selectedHours} Giờ</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {[1, 2, 3, 4, 5, 6].map((h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setSelectedHours(h)}
                          className={`flex-1 min-w-[44px] py-1.5 text-xs font-bold rounded-sm border transition-all cursor-pointer ${
                            selectedHours === h
                              ? 'bg-[#9f7d3a] text-white border-[#9f7d3a]'
                              : 'bg-white text-[#3d3830] border-[#d8cfbf] hover:bg-[#f3efe6]'
                          }`}
                        >
                          {h}h
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Summary Card: Chi phí rõ ràng */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#f9f7f2] to-[#f2eee3] p-6 rounded-sm border border-[#dfd7c7] flex flex-col justify-between h-full shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#dfd7c7] mb-4">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#8c734b]">
                    Bảng tính chi phí rõ ràng
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#235837] bg-[#e1f1e6] px-2.5 py-0.5 rounded-full">
                    <Check className="w-3 h-3" /> Giá niêm yết
                  </span>
                </div>

                <div className="space-y-2 text-sm text-[#4a453c] mb-5">
                  <div className="flex justify-between">
                    <span className="text-[#736b5d]">Loại phòng:</span>
                    <span className="font-bold text-[#1c1917]">{selectedRoom.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#736b5d]">Hình thức nghỉ:</span>
                    <span className="font-semibold text-[#1c1917]">
                      {planType === 'hourly'
                        ? `Nghỉ ${selectedHours} giờ`
                        : planType === 'overnight'
                        ? 'Nghỉ qua đêm'
                        : 'Nghỉ trọn ngày đêm'}
                    </span>
                  </div>

                  {planType === 'hourly' && (
                    <>
                      <div className="flex justify-between text-xs text-[#696153] pt-1 border-t border-dashed border-[#dfd7c7]">
                        <span>• Giờ đầu tiên:</span>
                        <span className="font-medium text-[#1c1917]">{formatPrice(selectedRoom.hourlyFirst)}</span>
                      </div>
                      {selectedHours > 1 && (
                        <div className="flex justify-between text-xs text-[#696153]">
                          <span>• {selectedHours - 1} giờ tiếp theo ({formatPrice(selectedRoom.hourlyNext)}/h):</span>
                          <span className="font-medium text-[#1c1917]">{formatPrice((selectedHours - 1) * selectedRoom.hourlyNext)}</span>
                        </div>
                      )}
                    </>
                  )}

                  {planType === 'overnight' && (
                    <div className="text-xs text-[#696153] pt-1 border-t border-dashed border-[#dfd7c7] space-y-1">
                      <div className="font-semibold text-[#8c734b]">• Khung giờ: Sau 19:00 đến 12:00 trưa hôm sau.</div>
                      <div>• Chuẩn bị phòng sạch sẽ, nước nóng lạnh 24/24.</div>
                    </div>
                  )}

                  {planType === 'full_day' && (
                    <div className="text-xs text-[#696153] pt-1 border-t border-dashed border-[#dfd7c7] space-y-1.5">
                      <div className="font-semibold text-[#8c734b]">• Khung giờ: Từ 14:00 đến 12:00 trưa hôm sau.</div>
                      {selectedRoom.dailyPrice ? (
                        <div>• Không gian riêng tư trọn vẹn, nghỉ ngơi thoải mái.</div>
                      ) : (
                        <div className="bg-[#fff9ed] p-2.5 rounded-xs border border-[#ecd9b5] text-[#78541c] text-[11px] leading-relaxed">
                          <span className="font-bold">Lưu ý:</span> {selectedRoom.name} có nhận khách ngày đêm. Quý khách vui lòng liên hệ hotline <a href={`tel:${HOTEL_INFO.hotlineRaw}`} className="underline font-bold text-[#1c1917]">{HOTEL_INFO.hotline}</a> để được nhân viên tư vấn chi tiết và báo giá ưu đãi tốt nhất.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="bg-white p-4 rounded-sm border border-[#dfd7c7] mb-4 flex items-baseline justify-between shadow-xs">
                  <span className="text-xs font-bold text-[#8c734b] uppercase tracking-wide">
                    Tổng chi phí dự kiến:
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-[#1c1917]">
                    {planType === 'full_day' && !selectedRoom.dailyPrice
                      ? 'Tư vấn Hotline'
                      : formatPrice(calculateTotal())}
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => onOpenBookingWithPrefill(selectedRoom.id, planType, selectedHours)}
                    className="w-full py-3 bg-[#1c1917] hover:bg-[#2b2723] text-[#fbf7ee] rounded-sm font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm border border-[#c5a059]/40"
                  >
                    <span>{planType === 'full_day' && !selectedRoom.dailyPrice ? 'Giữ phòng & Yêu cầu tư vấn giá' : 'Đặt phòng theo cấu hình này'}</span>
                    <ArrowRight className="w-4 h-4 text-[#e8c68a]" />
                  </button>
                  {planType === 'full_day' && !selectedRoom.dailyPrice && (
                    <a
                      href={`tel:${HOTEL_INFO.hotlineRaw}`}
                      className="w-full py-2.5 bg-white hover:bg-[#f6f2e8] text-[#9f7d3a] border border-[#d8cfbe] rounded-sm font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Gọi Hotline {HOTEL_INFO.hotline} để được tư vấn ngay</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
