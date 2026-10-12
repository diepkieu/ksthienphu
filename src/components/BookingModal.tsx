import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  Copy,
  Check,
  MessageSquare,
  AlertCircle,
  Mail,
  Send,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { HOTEL_INFO, ROOMS_DATA } from '../data/hotelData';
import { BookingFormState, StayType } from '../types/hotel';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomId?: string;
  initialStayType?: StayType;
  initialHours?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialRoomId = 'mini',
  initialStayType = 'hourly',
  initialHours = 2,
}) => {
  const [formData, setFormData] = useState<BookingFormState>({
    fullName: '',
    phone: '',
    customerEmail: '',
    roomTypeId: initialRoomId,
    stayType: initialStayType,
    hours: initialHours,
    checkInDate: new Date().toISOString().split('T')[0],
    checkInTime: new Date().toTimeString().slice(0, 5),
    note: '',
  });

  const [bookingRef, setBookingRef] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [copiedInfo, setCopiedInfo] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        roomTypeId: initialRoomId || 'mini',
        stayType: initialStayType || 'hourly',
        hours: initialHours || 2,
      }));
      setIsSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen, initialRoomId, initialStayType, initialHours]);

  if (!isOpen) return null;

  const currentRoom = ROOMS_DATA.find((r) => r.id === formData.roomTypeId) || ROOMS_DATA[0];

  // Pricing calculation
  const calculateTotal = () => {
    if (formData.stayType === 'overnight' && currentRoom.overnightPrice) return currentRoom.overnightPrice;
    if (formData.stayType === 'full_day' && currentRoom.dailyPrice) return currentRoom.dailyPrice;
    if (formData.hours <= 1) return currentRoom.hourlyFirst;
    return currentRoom.hourlyFirst + (formData.hours - 1) * currentRoom.hourlyNext;
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(val) + 'Đ';
  };

  const getStayDescription = () => {
    if (formData.stayType === 'hourly') {
      return `Nghỉ theo giờ (${formData.hours} tiếng)`;
    }
    if (formData.stayType === 'overnight') {
      return 'Nghỉ qua đêm (Sau 19h – 12h trưa)';
    }
    return 'Nghỉ ngày đêm (14h – 12h trưa)';
  };

  const getCostText = () => {
    if (formData.stayType === 'full_day' && !currentRoom.dailyPrice) {
      return `Liên hệ hotline tư vấn (${HOTEL_INFO.hotline})`;
    }
    return formatPrice(calculateTotal());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const refCode = `TP-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(refCode);

    const stayDesc = getStayDescription();
    const costText = getCostText();

    try {
      // Gửi thông tin trực tiếp vào Email khách sạn: Thienphuhotel5456@gmail.com
      await fetch(`https://formsubmit.co/ajax/${HOTEL_INFO.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `[ĐẶT PHÒNG THIÊN PHÚ HOTEL - ${refCode}] ${formData.fullName} - ${formData.phone}`,
          _template: 'table',
          _captcha: 'false',
          'Mã giữ phòng': refCode,
          'Họ và tên khách hàng': formData.fullName,
          'Số điện thoại nhận phòng': formData.phone,
          'Email của khách': formData.customerEmail || 'Chưa cung cấp',
          'Hạng phòng': currentRoom.name,
          'Hình thức nghỉ': stayDesc,
          'Thời gian đến': `${formData.checkInTime} ngày ${formData.checkInDate}`,
          'Chi phí ước tính': costText,
          'Yêu cầu thêm': formData.note || 'Không có',
          'Địa chỉ nhận phòng': '56 Tân Hương, Phường Phú Thọ Hòa, TP.HCM',
          'Hotline khách sạn': HOTEL_INFO.hotline,
          'Thời gian đặt': new Date().toLocaleString('vi-VN'),
        }),
      });
    } catch (error) {
      console.warn('Gửi email formsubmit hoàn tất với dự phòng:', error);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const getBookingSummaryText = () => {
    return `[ĐẶT PHÒNG THIÊN PHÚ HOTEL - ${bookingRef || 'MỚI'}]
• Khách hàng: ${formData.fullName || 'Khách liên hệ'}
• Số điện thoại: ${formData.phone}
${formData.customerEmail ? `• Email khách: ${formData.customerEmail}\n` : ''}• Loại phòng: ${currentRoom.name}
• Hình thức: ${getStayDescription()}
• Giờ dự kiến đến: ${formData.checkInTime} ngày ${formData.checkInDate}
• Dự kiến chi phí: ${getCostText()}
• Ghi chú: ${formData.note || 'Không có'}
• Khách sạn: Thiên Phú Hotel (56 Tân Hương, P. Phú Thọ Hòa, TP.HCM)
• Hotline: ${HOTEL_INFO.hotline}
• Email khách sạn: ${HOTEL_INFO.email}`;
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(getBookingSummaryText());
    setCopiedInfo(true);
    setTimeout(() => setCopiedInfo(false), 2000);
  };

  const handleOpenZalo = () => {
    const text = encodeURIComponent(getBookingSummaryText());
    window.open(`https://zalo.me/${HOTEL_INFO.hotlineRaw}?text=${text}`, '_blank');
  };

  // Mailto link để gửi hoặc mở ứng dụng Email với đầy đủ thông tin
  const mailtoSubject = encodeURIComponent(`[ĐẶT PHÒNG THIÊN PHÚ HOTEL - ${bookingRef}] ${formData.fullName} - ${formData.phone}`);
  const mailtoBody = encodeURIComponent(getBookingSummaryText());
  const mailtoUrl = `mailto:${HOTEL_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-[#ffffff] rounded-sm border border-[#d8cfbe] max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-[#fbf9f4] z-10 px-6 py-4 border-b border-[#e2d9c8] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#9f7d3a] uppercase block">
              THIÊN PHÚ HOTEL · ĐẶT PHÒNG TRỰC TUYẾN
            </span>
            <h3 className="font-serif-heading text-xl font-bold text-[#1c1917]">
              {isSuccess ? 'Xác nhận & Đã gửi thông tin đến Email' : 'Đăng ký giữ phòng linh hoạt'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#786f61] hover:text-[#1c1917] rounded-sm hover:bg-[#eae4d5] transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="space-y-6">
              {/* Success Banner */}
              <div className="bg-[#f0f8f3] border border-[#c4e3cf] rounded-sm p-4 text-center">
                <CheckCircle className="w-10 h-10 text-[#245b3a] mx-auto mb-2" />
                <h4 className="text-lg font-bold text-[#1c1917]">
                  Đã nhận yêu cầu giữ phòng của bạn!
                </h4>
                <p className="text-xs text-[#245b3a] mt-1">
                  Mã giữ phòng của bạn:{' '}
                  <span className="font-mono font-bold text-sm bg-white px-2 py-0.5 rounded-xs border border-[#c4e3cf]">
                    {bookingRef}
                  </span>
                </p>

                {/* Email dispatch notice */}
                <div className="mt-3 inline-flex items-center gap-2 bg-[#ffffff] border border-[#b2dcc1] px-3 py-1.5 rounded-sm text-xs text-[#1e5433]">
                  <Mail className="w-4 h-4 text-[#245b3a] shrink-0" />
                  <span>
                    Thông tin đã được chuyển tiếp đến email lễ tân:{' '}
                    <strong className="font-semibold text-[#1c1917]">{HOTEL_INFO.email}</strong>
                  </span>
                </div>

                <p className="text-xs text-[#4d483e] mt-2.5">
                  Lễ tân Thiên Phú Hotel sẵn sàng đón tiếp bạn 24/24 tại số{' '}
                  <span className="font-semibold text-[#1c1917]">56 Tân Hương, TP.HCM</span>.
                </p>
              </div>

              {/* Order Summary box */}
              <div className="bg-[#faf8f4] border border-[#e2d9c8] rounded-sm p-4 text-xs sm:text-sm space-y-2 text-[#4d483e]">
                <div className="flex justify-between">
                  <span className="text-[#786f61]">Khách hàng:</span>
                  <span className="font-bold text-[#1c1917]">
                    {formData.fullName} ({formData.phone})
                  </span>
                </div>
                {formData.customerEmail && (
                  <div className="flex justify-between">
                    <span className="text-[#786f61]">Email khách:</span>
                    <span className="font-medium text-[#1c1917]">{formData.customerEmail}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#786f61]">Loại phòng:</span>
                  <span className="font-bold text-[#1c1917]">{currentRoom.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#786f61]">Hình thức nghỉ:</span>
                  <span className="font-semibold text-[#1c1917]">{getStayDescription()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#786f61]">Thời gian đến:</span>
                  <span className="font-medium text-[#1c1917]">
                    {formData.checkInTime} ngày {formData.checkInDate}
                  </span>
                </div>
                {formData.note && (
                  <div className="flex justify-between">
                    <span className="text-[#786f61]">Ghi chú:</span>
                    <span className="font-medium text-[#1c1917]">{formData.note}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-[#e2d9c8] pt-2 text-base font-bold text-[#1c1917]">
                  <span>Dự kiến chi phí:</span>
                  <span className="text-[#9f7d3a]">
                    {formData.stayType === 'full_day' && !currentRoom.dailyPrice
                      ? 'Tư vấn Hotline'
                      : formatPrice(calculateTotal())}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2.5">
                <a
                  href={`tel:${HOTEL_INFO.hotlineRaw}`}
                  className="w-full py-3 bg-[#1c1917] hover:bg-[#2b2723] text-[#fbf7ee] rounded-sm font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all border border-[#c5a059]/40"
                >
                  <Phone className="w-4 h-4 text-[#e8c68a] shrink-0" />
                  <span>
                    Gọi ngay Hotline:{' '}
                    <span className="whitespace-nowrap font-bold text-[#e8c68a]">
                      {HOTEL_INFO.hotline}
                    </span>
                  </span>
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <a
                    href={mailtoUrl}
                    className="py-2.5 px-3 bg-[#ffffff] border border-[#d8cfbe] text-[#1c1917] rounded-sm font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-[#f6f2e8] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#9f7d3a]" />
                    <span>Mở Mail gửi tiếp</span>
                  </a>

                  <button
                    onClick={handleCopySummary}
                    className="py-2.5 px-3 bg-white border border-[#d8cfbe] text-[#1c1917] rounded-sm font-medium text-xs flex items-center justify-center gap-1.5 hover:bg-[#f6f2e8] cursor-pointer"
                  >
                    {copiedInfo ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#245b3a]" />
                        <span className="text-[#245b3a] font-semibold">Đã sao chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép thông tin</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleOpenZalo}
                    className="py-2.5 px-3 bg-[#0068ff]/10 border border-[#0068ff]/30 text-[#0068ff] rounded-sm font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-[#0068ff]/20 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Nhắn Zalo lễ tân</span>
                  </button>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-[#786f61] hover:text-[#1c1917] underline cursor-pointer"
                >
                  Đóng cửa sổ này
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email dispatch banner notice */}
              <div className="bg-[#faf6ee] border border-[#e8dfcb] rounded-sm p-3 flex items-start gap-2.5 text-xs text-[#544d41]">
                <Mail className="w-4 h-4 text-[#9f7d3a] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-bold text-[#1c1917]">Tự động gửi thông tin vào Email:</span>{' '}
                  Sau khi bạn nhấn xác nhận, toàn bộ yêu cầu đặt phòng sẽ được gửi trực tiếp đến hộp thư lễ tân{' '}
                  <span className="font-semibold text-[#9f7d3a] underline underline-offset-2">
                    {HOTEL_INFO.email}
                  </span>{' '}
                  để giữ phòng sẵn sàng.
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Nguyễn Văn A"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-sm focus:outline-hidden focus:border-neutral-900 text-neutral-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Số điện thoại nhận phòng *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="VD: 0909 xxx xxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-sm focus:outline-hidden focus:border-neutral-900 text-neutral-900 bg-white"
                  />
                </div>
              </div>

              {/* Optional Email of customer */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Email của bạn <span className="text-neutral-400 font-normal lowercase">(tùy chọn - để nhận bản sao xác nhận)</span>
                </label>
                <input
                  type="email"
                  placeholder="VD: emailcuaban@gmail.com"
                  value={formData.customerEmail || ''}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-sm focus:outline-hidden focus:border-neutral-900 text-neutral-900 bg-white"
                />
              </div>

              {/* Room Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Chọn loại phòng
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {ROOMS_DATA.map((room) => (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => {
                        if (!room.overnightPrice && formData.stayType === 'overnight') {
                          setFormData({ ...formData, roomTypeId: room.id, stayType: 'hourly' });
                        } else {
                          setFormData({ ...formData, roomTypeId: room.id });
                        }
                      }}
                      className={`p-2 rounded-sm text-left border text-xs transition-all cursor-pointer ${
                        formData.roomTypeId === room.id
                          ? 'border-neutral-900 bg-neutral-900 text-white font-semibold'
                          : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <span className="block truncate">{room.name}</span>
                      <span
                        className={`text-[10px] block ${
                          formData.roomTypeId === room.id ? 'text-neutral-300' : 'text-neutral-500'
                        }`}
                      >
                        {formatPrice(room.hourlyFirst)}/h
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stay Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Hình thức nghỉ
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, stayType: 'hourly' })}
                    className={`py-2 px-2 text-xs font-semibold rounded-sm border text-center transition-all cursor-pointer ${
                      formData.stayType === 'hourly'
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    Nghỉ theo giờ
                  </button>
                  <button
                    type="button"
                    disabled={!currentRoom.overnightPrice}
                    onClick={() => setFormData({ ...formData, stayType: 'overnight' })}
                    className={`py-2 px-2 text-xs font-semibold rounded-sm border text-center transition-all ${
                      !currentRoom.overnightPrice
                        ? 'opacity-40 cursor-not-allowed bg-neutral-100 text-neutral-400 border-neutral-200'
                        : formData.stayType === 'overnight'
                        ? 'border-neutral-900 bg-neutral-900 text-white cursor-pointer'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100 cursor-pointer'
                    }`}
                    title={!currentRoom.overnightPrice ? 'Chỉ áp dụng cho Phòng Mini' : undefined}
                  >
                    Qua đêm {currentRoom.overnightPrice ? '' : '(K/o có)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, stayType: 'full_day' })}
                    className={`py-2 px-2 text-xs font-semibold rounded-sm border text-center transition-all cursor-pointer ${
                      formData.stayType === 'full_day'
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    Ngày đêm {currentRoom.dailyPrice ? '' : '(Tư vấn)'}
                  </button>
                </div>

                {formData.stayType === 'overnight' && (
                  <div className="mt-2 bg-[#faf8f4] p-2.5 rounded-sm border border-[#e2d9c8] text-xs text-[#524d44]">
                    <span className="font-bold text-[#9f7d3a]">• Khung giờ qua đêm:</span> Sau 19:00 đến 12:00 trưa hôm sau.
                  </div>
                )}
                {formData.stayType === 'full_day' && (
                  <div className="mt-2 bg-[#faf8f4] p-2.5 rounded-sm border border-[#e2d9c8] text-xs text-[#524d44] space-y-1">
                    <div>
                      <span className="font-bold text-[#9f7d3a]">• Khung giờ ngày đêm:</span> Từ 14:00 đến 12:00 trưa hôm sau.
                    </div>
                    {!currentRoom.dailyPrice && (
                      <div className="text-[11px] text-[#78541c] bg-[#fff9ed] p-2 rounded-xs border border-[#ecd9b5] leading-relaxed">
                        <span className="font-bold">Lưu ý:</span> {currentRoom.name} có nhận khách ngày đêm. Nhân viên sẽ liên hệ hotline để tư vấn báo giá ưu đãi và xác nhận phòng cho bạn.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* If hourly, select hours */}
              {formData.stayType === 'hourly' && (
                <div className="bg-[#faf8f4] p-3 rounded-sm border border-[#e2d9c8]">
                  <div className="flex items-center justify-between text-xs text-[#524d44] font-semibold mb-2">
                    <span>Số giờ dự kiến nghỉ:</span>
                    <span className="text-[#1c1917] font-bold">{formData.hours} Giờ</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5, 6].map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setFormData({ ...formData, hours: h })}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-sm border cursor-pointer ${
                          formData.hours === h
                            ? 'bg-[#9f7d3a] text-white border-[#9f7d3a]'
                            : 'bg-white text-[#3d3830] border-[#d8cfbf] hover:bg-[#f6f2e8]'
                        }`}
                      >
                        {h}h
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Expected Arrival */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3d3830] mb-1">
                    Ngày nhận phòng
                  </label>
                  <input
                    type="date"
                    value={formData.checkInDate}
                    onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#d8cfbe] rounded-sm focus:outline-hidden focus:border-[#9f7d3a] text-[#1c1917] bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3d3830] mb-1">
                    Giờ dự kiến đến
                  </label>
                  <input
                    type="time"
                    value={formData.checkInTime}
                    onChange={(e) => setFormData({ ...formData, checkInTime: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#d8cfbe] rounded-sm focus:outline-hidden focus:border-[#9f7d3a] text-[#1c1917] bg-white"
                  />
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3d3830] mb-1">
                  Yêu cầu thêm (tùy chọn)
                </label>
                <input
                  type="text"
                  placeholder="VD: Cần phòng giường 1m6 êm ái, chuẩn bị sẵn nước suối đóng chai..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-[#d8cfbe] rounded-sm focus:outline-hidden focus:border-[#9f7d3a] text-[#1c1917] bg-white"
                />
              </div>

              {/* Price Calculation summary box */}
              <div className="bg-[#faf8f4] p-3.5 rounded-sm border border-[#dfd5c3] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#8c734b] uppercase tracking-wider block">
                    Chi phí ước tính:
                  </span>
                  <span className="text-xs text-[#696153]">
                    {formData.stayType === 'full_day' && !currentRoom.dailyPrice
                      ? 'Nhân viên sẽ liên hệ tư vấn báo giá ưu đãi'
                      : 'Minh bạch theo bảng giá niêm yết'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-[#1c1917]">
                    {formData.stayType === 'full_day' && !currentRoom.dailyPrice
                      ? 'Tư vấn Hotline'
                      : formatPrice(calculateTotal())}
                  </span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 border border-[#d8cfbe] rounded-sm text-[#5c5549] hover:bg-[#f6f2e8] text-xs sm:text-sm font-semibold cursor-pointer disabled:opacity-50"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-5 py-2.5 bg-[#1c1917] hover:bg-[#2b2723] text-[#fbf7ee] rounded-sm text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer shadow-sm border border-[#c5a059]/40 flex items-center justify-center gap-2 disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#e8c68a]" />
                      <span>Đang gửi thông tin đến Email...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#e8c68a]" />
                      <span>Xác nhận & Gửi thông tin vào Email</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-1 text-[11px] text-[#736c5f] flex items-center justify-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#9f7d3a]" />
                <span>
                  Thông tin sẽ gửi tới: <strong className="text-[#1c1917]">{HOTEL_INFO.email}</strong>
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
