export interface RoomType {
  id: string;
  name: string;
  subtitle: string;
  hourlyFirst: number; // e.g. 90000 or 120000
  hourlyNext: number; // e.g. 30000
  overnightPrice?: number; // e.g. 350000 (áp dụng từ sau 19h đến 12h trưa hôm sau)
  dailyPrice?: number; // e.g. 450000 (áp dụng từ 14h đến 12h trưa hôm sau)
  hasDailyConsultation?: boolean; // Có bán ngày đêm nhưng liên hệ hotline để được nhân viên tư vấn
  images: string[];
  capacity: string;
  bedType: string;
  size: string;
  features: string[];
  description: string;
  isPopular?: boolean;
}

export type StayType = 'hourly' | 'overnight' | 'full_day';

export interface BookingFormState {
  fullName: string;
  phone: string;
  customerEmail?: string;
  roomTypeId: string;
  stayType: StayType;
  hours: number;
  checkInDate: string;
  checkInTime: string;
  note: string;
}
