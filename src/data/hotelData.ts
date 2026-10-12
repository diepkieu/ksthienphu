import { RoomType } from '../types/hotel';

export const HOTEL_INFO = {
  name: 'THIÊN\u00A0PHÚ HOTEL',
  shortName: 'Thiên\u00A0Phú Hotel',
  tagline: 'Không gian riêng tư – Nghỉ ngơi linh hoạt theo giờ',
  intro:
    'Bạn cần một nơi nghỉ ngơi riêng tư trong vài giờ? Thiên Phú Hotel mang đến giải pháp lưu trú theo giờ linh hoạt, tiện lợi và tiết kiệm chi phí, phù hợp cho những ai cần nghỉ ngơi, thư giãn hoặc có không gian riêng tư giữa lịch trình bận rộn.',
  address: '56 Tân Hương, Phường Phú Thọ Hòa, TP. Hồ Chí Minh',
  hotline: '0768\u00A0708\u00A0755',
  hotlineRaw: '0768708755',
  email: 'Thienphuhotel5456@gmail.com',
  workingHours: 'Phục vụ 24/24',
  slogan: 'Thiên Phú Hotel – Linh hoạt thời gian, thoải mái không gian.',
  closingStatement:
    'Dù bạn cần nghỉ ngơi ngắn hạn, thư giãn giữa ngày hay tìm một không gian riêng tư, Thiên Phú Hotel luôn sẵn sàng phục vụ.',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=56+T%C3%A2n+H%C6%B0%C6%A1ng%2C+Ph%C6%B0%E1%BB%9Dng+Ph%C3%BA+Th%E1%BB%8D+H%C3%B2a%2C+TP.+H%E1%BB%93+Ch%C3%AD+Minh',
  zaloUrl: 'https://zalo.me/0768708755',
};

export const PLANNING_POINTS = [
  {
    id: 'time',
    title: 'Chọn thời gian',
    description: 'Chủ động lựa chọn khung giờ nghỉ phù hợp với lịch trình của bạn.',
    detail: 'Nhận phòng bất kỳ lúc nào trong ngày, thủ tục nhanh chóng trong 2 phút.',
    icon: 'Clock',
  },
  {
    id: 'room',
    title: 'Chọn loại phòng',
    description: 'Phòng mini, phòng đơn hoặc phòng mặt tiền.',
    detail: 'Cấu hình phòng sạch sẽ, tiện nghi phù hợp cho cá nhân nghỉ ngơi hoặc cặp đôi thư giãn.',
    icon: 'BedDouble',
  },
  {
    id: 'duration',
    title: 'Lựa chọn thời lượng',
    description: 'Nghỉ ngơi theo giờ, dễ dàng sắp xếp thời gian.',
    detail: 'Từ 1 giờ, 2 giờ ngắn hạn đến nghỉ qua đêm hay trọn ngày đêm linh hoạt.',
    icon: 'Calendar',
  },
  {
    id: 'price',
    title: 'Chi phí rõ ràng',
    description: 'Giá phòng minh bạch, giờ tiếp theo được tính theo bảng giá niêm yết.',
    detail: 'Không phát sinh phụ phí ẩn, bảng giá rõ ràng công khai tại quầy lễ tân.',
    icon: 'ReceiptCheck',
  },
];

export const WHY_CHOOSE_POINTS = [
  {
    id: 'privacy',
    title: 'Không gian riêng tư, thoải mái',
    desc: 'Thiết kế phòng cách âm chu đáo, không gian ấm cúng, kín đáo, mang lại sự thư giãn tuyệt đối sau những giờ làm việc mệt mỏi.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'clean',
    title: 'Phòng nghỉ được chuẩn bị sạch sẽ',
    desc: 'Quy trình vệ sinh khử khuẩn nghiêm ngặt, ga gối nệm thay mới 100% sau mỗi lượt khách, thơm tho và thoáng đãng.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'checkin',
    title: 'Thủ tục nhận phòng thuận tiện',
    desc: 'Quy trình check-in siêu tốc chỉ trong 2 phút, bảo mật thông tin cá nhân của khách hàng tuyệt đối và chuyên nghiệp.',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'support247',
    title: 'Lễ tân phục vụ 24/24',
    desc: 'Đội ngũ nhân viên luôn túc trực ngày đêm, sẵn sàng hỗ trợ chu đáo từ khăn tắm, đồ uống đến mọi yêu cầu riêng tư của bạn.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'location',
    title: 'Vị trí thuận tiện tại Tân Hương, TP. Hồ Chí Minh',
    desc: 'Tọa lạc tại số 56 đường Tân Hương, ngay trung tâm giao thương sôi động, thuận tiện di chuyển, không gian riêng tư và kín đáo.',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
  },
];

export const ROOMS_DATA: RoomType[] = [
  {
    id: 'mini',
    name: 'PHÒNG MINI',
    subtitle: 'Nghỉ ngơi gọn gàng, tiết kiệm tối đa',
    hourlyFirst: 90000,
    hourlyNext: 30000,
    overnightPrice: 350000,
    dailyPrice: 450000,
    images: [
      '/images/regenerated_image_1791791403948.jpg',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
    ],
    capacity: '1 - 2 người',
    bedType: '1 Giường đôi 1m6 êm ái',
    size: '16m²',
    features: ['Máy lạnh 2 chiều', 'Wifi tốc độ cao', 'Phòng tắm khép kín', 'Nước nóng lạnh 24/7', 'Khăn tắm thay mới', 'Smart TV'],
    description: 'Lựa chọn lý tưởng cho khách cần chợp mắt nhanh 1-2 tiếng hoặc nghỉ trưa riêng tư giữa ngày bận rộn với mức giá siêu tiết kiệm.',
    isPopular: true,
  },
  {
    id: 'single',
    name: 'PHÒNG ĐƠN',
    subtitle: 'Rộng rãi, yên tĩnh, thoải mái trọn vẹn',
    hourlyFirst: 120000,
    hourlyNext: 30000,
    images: [
      '/images/regenerated_image_1791791406515.jpg',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
    ],
    capacity: '1 - 2 người',
    bedType: '1 Giường đôi 1m6 êm ái',
    size: '22m²',
    features: ['Giường đệm lò xo cao cấp', 'Điều hòa mát sâu', 'Wifi băng thông rộng', 'Bàn làm việc / trang điểm', 'Vệ sinh khử khuẩn 100%', 'Nước suối đóng chai'],
    description: 'Không gian rộng rãi, thoáng mát, đệm lò xo êm ái giúp bạn phục hồi năng lượng nhanh chóng sau giờ làm việc căng thẳng. Có bán gói ngày đêm (14h – 12h trưa hôm sau) – liên hệ hotline để được nhân viên tư vấn.',
    isPopular: false,
    hasDailyConsultation: true,
  },
  {
    id: 'street-view',
    name: 'PHÒNG MẶT TIỀN',
    subtitle: 'View thoáng sáng, ban công ngắm phố',
    hourlyFirst: 120000,
    hourlyNext: 30000,
    images: [
      '/images/regenerated_image_1791791409115.jpg',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85',
    ],
    capacity: '1 - 2 người',
    bedType: '1 Giường đôi 1m6 êm ái',
    size: '26m²',
    features: ['Cửa sổ kính lớn đón sáng', 'View hướng phố Tân Hương', 'Rèm chắn sáng 2 lớp', 'Hệ thống đèn ambient ấm cúng', 'Phòng tắm vách kính', 'Nước suối đóng chai'],
    description: 'Phòng sở hữu cửa sổ lớn hướng mặt tiền Tân Hương mát mẻ, rèm cản sáng dày dặn đảm bảo sự riêng tư tuyệt đối. Có bán gói ngày đêm (14h – 12h trưa hôm sau) – liên hệ hotline để được nhân viên tư vấn.',
    isPopular: true,
    hasDailyConsultation: true,
  },
];

export const AMENITIES_LIST = [
  { name: 'Nệm êm & Ga gối sạch thơm 100%', icon: 'BedDouble', desc: 'Thay mới sau mỗi lượt khách' },
  { name: 'Máy lạnh điều hòa mát lạnh', icon: 'Wind', desc: 'Làm lạnh nhanh, êm ái' },
  { name: 'Wifi cáp quang tốc độ cao', icon: 'Wifi', desc: 'Miễn phí cho mọi phòng' },
  { name: 'Nước nóng lạnh 24/24', icon: 'ShowerHead', desc: 'Áp lực nước mạnh thư giãn' },
  { name: 'Lễ tân phục vụ 24/24', icon: 'Clock', desc: 'Phục vụ chu đáo bất kể giờ nào' },
  { name: 'Riêng tư & Cách âm tốt', icon: 'ShieldCheck', desc: 'Tuyệt đối kín đáo, an ninh' },
  { name: 'Smart TV giải trí', icon: 'Tv', desc: 'Xem Youtube, phim thả ga' },
  { name: 'Vệ sinh phòng sạch sẽ 100%', icon: 'Sparkles', desc: 'Khăn tắm, ga gối thay mới thơm tho' },
];

export const FAQS = [
  {
    q: 'Khách sạn có nhận khách vào ban đêm không?',
    a: 'Có. Thiên Phú Hotel phục vụ xuyên suốt 24/24. Quý khách có thể đến nhận phòng vào bất kỳ khung giờ nào trong ngày và đêm.',
  },
  {
    q: 'Cách tính tiền nghỉ theo giờ như thế nào?',
    a: 'Đối với Phòng Mini: Giờ đầu tiên là 90.000Đ, mỗi giờ tiếp theo là 30.000Đ. Đối với Phòng Đơn & Phòng Mặt Tiền: Giờ đầu tiên là 120.000Đ, mỗi giờ tiếp theo là 30.000Đ. Chi phí minh bạch, tính theo đúng thời gian quý khách sử dụng.',
  },
  {
    q: 'Giá qua đêm và ngày đêm áp dụng như thế nào?',
    a: 'Giá nghỉ qua đêm chỉ từ 350.000Đ (áp dụng từ sau 19h00 đến 12h00 trưa hôm sau) và giá nghỉ ngày đêm chỉ từ 450.000Đ (áp dụng từ 14h00 đến 12h00 trưa hôm sau) được niêm yết cho Phòng Mini. Đối với Phòng Đơn và Phòng Mặt Tiền, khách sạn có nhận đặt gói ngày đêm (14h00 – 12h00 trưa hôm sau), quý khách vui lòng liên hệ hotline 0768 708 755 để được nhân viên tư vấn và báo giá ưu đãi tốt nhất.',
  },
  {
    q: 'Thủ tục nhận phòng có phức tạp không?',
    a: 'Thủ tục cực kỳ nhanh chóng và đơn giản (chỉ mất khoảng 1-2 phút) nhằm tối ưu thời gian nghỉ ngơi và bảo đảm sự riêng tư của quý khách.',
  },
];
