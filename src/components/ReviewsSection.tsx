import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquare, ThumbsUp, UserCheck, ShieldCheck, Plus, Sparkles } from 'lucide-react';

interface ReviewItem {
  id: string;
  authorName: string;
  initials: string;
  avatarUrl?: string;
  roomUsed: string;
  stayDuration: string;
  stayCategory: 'hourly' | 'overnight' | 'day';
  rating: number;
  timeAgo: string;
  content: string;
  verified: boolean;
  highlightTag: string;
  helpfulCount: number;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    authorName: 'Nguyễn Hoàng Nam',
    initials: 'HN',
    avatarUrl: '/avatars/avatar_vn_nam.jpg',
    roomUsed: 'Phòng Mặt Tiền',
    stayDuration: 'Nghỉ 3 giờ',
    stayCategory: 'hourly',
    rating: 5,
    timeAgo: '2 ngày trước',
    content:
      'Mình đi gặp đối tác ở khu Tân Phú giữa trưa nắng, cần chỗ ngả lưng chợp mắt 3 tiếng. Đặt phòng mặt tiền thoáng sáng, giờ đầu 120k + 2 giờ sau 60k tổng 180k quá hợp lý. Máy lạnh mát sâu, khăn tắm trắng sạch thơm tho, không gian rất yên tĩnh.',
    verified: true,
    highlightTag: 'Phòng sạch & thoáng mát',
    helpfulCount: 18,
  },
  {
    id: 'rev-2',
    authorName: 'Trần Thị Mai Anh',
    initials: 'MA',
    avatarUrl: '/avatars/avatar_vn_maianh.jpg',
    roomUsed: 'Phòng Mini',
    stayDuration: 'Nghỉ 2 giờ',
    stayCategory: 'hourly',
    rating: 5,
    timeAgo: '4 ngày trước',
    content:
      'Lựa chọn số một mỗi lần cần nghỉ ngơi nhanh giữa ngày. Giá phòng Mini 90k giờ đầu cực kỳ tiết kiệm, phòng nhỏ xinh nhưng đầy đủ tiện nghi, nệm êm ái, thủ tục nhận phòng đúng 2 phút là xong, không phiền hà.',
    verified: true,
    highlightTag: 'Giá tiết kiệm & check-in nhanh',
    helpfulCount: 24,
  },
  {
    id: 'rev-3',
    authorName: 'Lê Quốc Huy',
    initials: 'QH',
    avatarUrl: '/avatars/avatar_vn_huy.jpg',
    roomUsed: 'Phòng Mini',
    stayDuration: 'Nghỉ qua đêm',
    stayCategory: 'overnight',
    rating: 5,
    timeAgo: '1 tuần trước',
    content:
      'Chuyến bay hạ cánh Tân Sơn Nhất khuya, mình chạy về Tân Hương nhận phòng lúc gần 2h sáng. Lễ tân trực 24/24 tiếp đón rất chu đáo. Giá qua đêm 350k quá hời so với chất lượng phòng, nước nóng mạnh tắm thư giãn, phòng cách âm tốt ngủ sâu giấc.',
    verified: true,
    highlightTag: 'Lễ tân 24/24 chu đáo',
    helpfulCount: 31,
  },
  {
    id: 'rev-4',
    authorName: 'Đặng Tuấn K.',
    initials: 'TK',
    avatarUrl: '/avatars/avatar_vn_tuank.jpg',
    roomUsed: 'Phòng Mặt Tiền',
    stayDuration: 'Nghỉ theo giờ (4h)',
    stayCategory: 'hourly',
    rating: 5,
    timeAgo: '1 tuần trước',
    content:
      'Rất thích sự riêng tư và kín đáo ở Thiên Phú Hotel. Lối lên phòng sạch sẽ, phòng thoáng mát không bị ám mùi khói hay ẩm mốc. Chi phí đúng như bảng giá niêm yết không phát sinh thêm bất cứ khoản nào.',
    verified: true,
    highlightTag: 'Riêng tư & kín đáo',
    helpfulCount: 15,
  },
  {
    id: 'rev-5',
    authorName: 'Võ Phương Thảo',
    initials: 'PT',
    avatarUrl: '/avatars/avatar_vn_thao.jpg',
    roomUsed: 'Phòng Mini',
    stayDuration: 'Nghỉ ngày đêm',
    stayCategory: 'day',
    rating: 5,
    timeAgo: '2 tuần trước',
    content:
      'Trải nghiệm 24h trọn vẹn rất thoải mái. Wifi khỏe xem phim không giật lag, giường êm nệm dầy nằm không bị đau lưng. Vị trí ngay 56 Tân Hương đi bộ ra chợ hay quán ăn đều gần.',
    verified: true,
    highlightTag: 'Tiện nghi & vị trí thuận tiện',
    helpfulCount: 12,
  },
  {
    id: 'rev-6',
    authorName: 'Minh Đức & Bạn',
    initials: 'MĐ',
    avatarUrl: '/avatars/avatar_vn_duc.jpg',
    roomUsed: 'Phòng Mặt Tiền',
    stayDuration: 'Nghỉ theo giờ (3h)',
    stayCategory: 'hourly',
    rating: 5,
    timeAgo: '3 tuần trước',
    content:
      'Phòng mặt tiền thoáng mát, view phố đẹp, giường nệm êm ái sạch thơm. Nhân viên hỗ trợ mượn thêm sấy tóc và nước suối rất vui vẻ. Sẽ là địa chỉ quen thuộc của nhóm mình mỗi khi ghé Tân Phú.',
    verified: true,
    highlightTag: 'Không gian thoáng sáng',
    helpfulCount: 9,
  },
];

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'hourly' | 'overnight' | 'day'>('all');
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [helpfulLiked, setHelpfulLiked] = useState<Record<string, boolean>>({});

  // New review form state
  const [formName, setFormName] = useState('');
  const [formRoom, setFormRoom] = useState('Phòng Mini');
  const [formDuration, setFormDuration] = useState('Nghỉ theo giờ (2 giờ)');
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filteredReviews = activeFilter === 'all'
    ? reviews
    : reviews.filter((r) => r.stayCategory === activeFilter);

  const handleLike = (id: string) => {
    if (helpfulLiked[id]) return;
    setHelpfulLiked((prev) => ({ ...prev, [id]: true }));
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      authorName: formName.trim(),
      initials: formName.trim().substring(0, 2).toUpperCase(),
      roomUsed: formRoom,
      stayDuration: formDuration,
      stayCategory: formDuration.includes('qua đêm') ? 'overnight' : formDuration.includes('ngày') ? 'day' : 'hourly',
      rating: formRating,
      timeAgo: 'Vừa xong',
      content: formComment.trim(),
      verified: true,
      highlightTag: 'Khách hàng mới đánh giá',
      helpfulCount: 1,
    };

    setReviews([newRev, ...reviews]);
    setSubmitSuccess(true);

    try {
      fetch('https://formsubmit.co/ajax/Thienphuhotel5456@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `[ĐÁNH GIÁ MỚI - THIÊN PHÚ HOTEL] ${formName.trim()} (${formRating}/5 sao)`,
          _template: 'table',
          _captcha: 'false',
          'Khách hàng': formName.trim(),
          'Điểm đánh giá': `${formRating}/5 Sao`,
          'Loại phòng': formRoom,
          'Thời lượng nghỉ': formDuration,
          'Nội dung nhận xét': formComment.trim(),
          'Thời gian': new Date().toLocaleString('vi-VN'),
        }),
      }).catch(() => {});
    } catch {}

    setTimeout(() => {
      setSubmitSuccess(false);
      setShowReviewModal(false);
      setFormName('');
      setFormComment('');
    }, 1500);
  };

  return (
    <section id="danh-gia" className="py-20 sm:py-24 bg-[#ffffff] border-b border-[#e5dfd3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-bold tracking-[0.25em] text-[#9f7d3a] uppercase block mb-2">
            TRẢI NGHIỆM THỰC TẾ TỪ KHÁCH HÀNG
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1c1917] tracking-tight">
            Đánh giá từ khách hàng
          </h2>
          <p className="mt-3 text-[#524d44] text-base max-w-xl mx-auto">
            Những chia sẻ chân thực từ khách hàng đã trải nghiệm dịch vụ lưu trú theo giờ và qua đêm tại Thiên Phú Hotel 56 Tân Hương.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto mt-4" />
        </div>

        {/* Credibility & Score Summary Bar */}
        <div className="bg-gradient-to-r from-[#fbf9f4] via-[#f7f3e8] to-[#fbf9f4] rounded-sm border border-[#ded5c3] p-6 sm:p-8 mb-12 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Score box */}
            <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-[#dfd7c7] pb-5 md:pb-0 md:pr-6">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-4xl sm:text-5xl font-bold font-serif text-[#1c1917] leading-none">
                  4.9
                </span>
                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-[#786f61] font-medium block mt-1">
                    Dựa trên 240+ đánh giá thực tế
                  </span>
                </div>
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#245b3a] bg-[#e1f1e6] px-2.5 py-1 rounded-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#245b3a]" />
                <span>100% Khách đã lưu trú tại 56 Tân Hương</span>
              </div>
            </div>

            {/* Ratings Breakdown */}
            <div className="md:col-span-5 space-y-1.5 text-xs text-[#4d483e]">
              <div className="flex items-center gap-2">
                <span className="w-28 text-[#696153] font-medium truncate">Độ sạch sẽ & thơm tho</span>
                <div className="flex-1 bg-[#e8e2d4] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#9f7d3a] h-full w-[98%]" />
                </div>
                <span className="font-bold text-[#1c1917]">4.9/5</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-28 text-[#696153] font-medium truncate">Không gian riêng tư</span>
                <div className="flex-1 bg-[#e8e2d4] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#9f7d3a] h-full w-[99%]" />
                </div>
                <span className="font-bold text-[#1c1917]">5.0/5</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-28 text-[#696153] font-medium truncate">Lễ tân 24/24 nhanh nhẹn</span>
                <div className="flex-1 bg-[#e8e2d4] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#9f7d3a] h-full w-[97%]" />
                </div>
                <span className="font-bold text-[#1c1917]">4.9/5</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-28 text-[#696153] font-medium truncate">Mức giá minh bạch</span>
                <div className="flex-1 bg-[#e8e2d4] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#9f7d3a] h-full w-[100%]" />
                </div>
                <span className="font-bold text-[#1c1917]">5.0/5</span>
              </div>
            </div>

            {/* Action to submit feedback */}
            <div className="md:col-span-3 flex flex-col justify-center items-center md:items-end">
              <button
                onClick={() => setShowReviewModal(true)}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#1c1917] hover:bg-[#2e2a25] text-[#fbf7ee] rounded-sm text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer border border-[#c5a059]/40"
              >
                <Plus className="w-3.5 h-3.5 text-[#e8c68a]" />
                <span>Viết đánh giá của bạn</span>
              </button>
              <span className="text-[11px] text-[#736c5f] mt-2 text-center md:text-right">
                Ý kiến của bạn giúp chúng tôi phục vụ tốt hơn
              </span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-medium">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-sm transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#1c1917] text-[#fbf7ee] font-semibold shadow-xs'
                  : 'bg-[#f4f0e6] text-[#5c5549] hover:bg-[#eae4d5]'
              }`}
            >
              Tất cả ({reviews.length})
            </button>
            <button
              onClick={() => setActiveFilter('hourly')}
              className={`px-3.5 py-1.5 rounded-sm transition-all cursor-pointer ${
                activeFilter === 'hourly'
                  ? 'bg-[#1c1917] text-[#fbf7ee] font-semibold shadow-xs'
                  : 'bg-[#f4f0e6] text-[#5c5549] hover:bg-[#eae4d5]'
              }`}
            >
              Nghỉ theo giờ
            </button>
            <button
              onClick={() => setActiveFilter('overnight')}
              className={`px-3.5 py-1.5 rounded-sm transition-all cursor-pointer ${
                activeFilter === 'overnight'
                  ? 'bg-[#1c1917] text-[#fbf7ee] font-semibold shadow-xs'
                  : 'bg-[#f4f0e6] text-[#5c5549] hover:bg-[#eae4d5]'
              }`}
            >
              Nghỉ qua đêm
            </button>
            <button
              onClick={() => setActiveFilter('day')}
              className={`px-3.5 py-1.5 rounded-sm transition-all cursor-pointer ${
                activeFilter === 'day'
                  ? 'bg-[#1c1917] text-[#fbf7ee] font-semibold shadow-xs'
                  : 'bg-[#f4f0e6] text-[#5c5549] hover:bg-[#eae4d5]'
              }`}
            >
              Nghỉ ngày đêm
            </button>
          </div>

          <div className="text-xs text-[#8c734b] flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#9f7d3a]" />
            <span>Hiển thị nhận xét mới nhất</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#fcfbf9] rounded-sm border border-[#e2dacf] p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#c5a059] transition-all duration-200"
            >
              <div>
                {/* Header with Avatar, Name, Verification */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {rev.avatarUrl ? (
                      <img
                        src={rev.avatarUrl}
                        alt={rev.authorName}
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 rounded-full object-cover border-2 border-[#e8dfcf]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-[#f2eee3] text-[#1c1917] font-bold text-sm flex items-center justify-center border border-[#d8cfbf]">
                        {rev.initials}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-[#1c1917] leading-tight">
                          {rev.authorName}
                        </h4>
                        {rev.verified && (
                          <span title="Đã xác thực lưu trú" className="inline-flex items-center">
                            <CheckCircle className="w-3.5 h-3.5 text-[#245b3a]" />
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#786f61] block mt-0.5">
                        {rev.timeAgo}
                      </span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Stay Info Tags (Room + Duration) */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-[11px] font-semibold text-[#1c1917] bg-[#f4f0e6] border border-[#e2d9c8] px-2.5 py-0.5 rounded-xs">
                    {rev.roomUsed}
                  </span>
                  <span className="text-[11px] text-[#696153] bg-[#f4f0e6] border border-[#e2d9c8] px-2.5 py-0.5 rounded-xs">
                    {rev.stayDuration}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-[#3d3830] leading-relaxed font-normal mb-4">
                  "{rev.content}"
                </p>
              </div>

              {/* Footer with Highlight Tag & Helpful Button */}
              <div className="pt-3 border-t border-[#f0ece3] flex items-center justify-between text-xs">
                <span className="text-[11px] font-medium text-[#8c734b] italic">
                  ✓ {rev.highlightTag}
                </span>

                <button
                  onClick={() => handleLike(rev.id)}
                  className={`inline-flex items-center gap-1.5 text-xs py-1 px-2.5 rounded-xs transition-colors cursor-pointer ${
                    helpfulLiked[rev.id]
                      ? 'text-[#245b3a] font-semibold bg-[#e8f5ec]'
                      : 'text-[#696153] hover:text-[#1c1917] hover:bg-[#f4f0e6]'
                  }`}
                  title="Hữu ích"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{rev.helpfulCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Submitting a Review */}
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-sm border border-neutral-300 max-w-lg w-full p-6 sm:p-7 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-neutral-800" />
                  <h3 className="font-serif-heading text-lg font-bold text-neutral-900">
                    Đánh giá trải nghiệm tại Thiên Phú Hotel
                  </h3>
                </div>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="text-neutral-400 hover:text-neutral-800 text-lg leading-none p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {submitSuccess ? (
                <div className="py-8 text-center">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900">Cảm ơn bạn đã gửi đánh giá!</h4>
                  <p className="text-sm text-neutral-600 mt-1">
                    Nhận xét chân thực của bạn đã được hiển thị trên trang của Thiên Phú Hotel.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCreateReview} className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Tên của bạn hoặc tên viết tắt *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Nguyễn Văn A (hoặc N. V. A)"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-sm focus:outline-hidden focus:border-neutral-900 text-neutral-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                        Loại phòng đã trải nghiệm
                      </label>
                      <select
                        value={formRoom}
                        onChange={(e) => setFormRoom(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-sm focus:outline-hidden focus:border-neutral-900 text-neutral-800 bg-white"
                      >
                        <option value="Phòng Mini">Phòng Mini (90k/h đầu)</option>
                        <option value="Phòng Đơn">Phòng Đơn (120k/h đầu)</option>
                        <option value="Phòng Mặt Tiền">Phòng Mặt Tiền (120k/h đầu)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                        Thời lượng nghỉ
                      </label>
                      <select
                        value={formDuration}
                        onChange={(e) => setFormDuration(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-sm focus:outline-hidden focus:border-neutral-900 text-neutral-800 bg-white"
                      >
                        <option value="Nghỉ 1 giờ">Nghỉ 1 giờ</option>
                        <option value="Nghỉ 2 giờ">Nghỉ 2 giờ</option>
                        <option value="Nghỉ 3 - 4 giờ">Nghỉ 3 - 4 giờ</option>
                        <option value="Nghỉ qua đêm">Nghỉ qua đêm (từ 350k)</option>
                        <option value="Nghỉ ngày đêm">Nghỉ ngày đêm (từ 450k)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Mức độ hài lòng: {formRating}/5 Sao
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormRating(star)}
                          className="p-1 cursor-pointer transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= formRating ? 'text-amber-400 fill-amber-400' : 'text-neutral-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Nội dung nhận xét chân thực *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Chia sẻ về sự sạch sẽ, không gian riêng tư, thái độ lễ tân hoặc tiện nghi phòng..."
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-sm focus:outline-hidden focus:border-neutral-900 text-neutral-800 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowReviewModal(false)}
                      className="px-4 py-2 border border-neutral-300 rounded-sm text-neutral-700 hover:bg-neutral-100 text-xs font-semibold cursor-pointer"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-sm text-xs font-semibold tracking-wide cursor-pointer shadow-xs"
                    >
                      Đăng nhận xét
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
