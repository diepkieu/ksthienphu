import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PlanSection } from './components/PlanSection';
import { RoomsSection } from './components/RoomsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ImagePreviewModal } from './components/ImagePreviewModal';
import { FloatingCallButton } from './components/FloatingCallButton';
import { StayType } from './types/hotel';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [initialRoomId, setInitialRoomId] = useState<string>('mini');
  const [initialStayType, setInitialStayType] = useState<StayType>('hourly');
  const [initialHours, setInitialHours] = useState<number>(2);

  const [previewState, setPreviewState] = useState<{
    isOpen: boolean;
    imageUrl: string;
    title: string;
  }>({
    isOpen: false,
    imageUrl: '',
    title: '',
  });

  const handleOpenBooking = (roomId?: string) => {
    if (roomId) {
      setInitialRoomId(roomId);
    }
    setBookingOpen(true);
  };

  const handleOpenBookingWithPrefill = (
    roomId: string,
    stayType: StayType,
    hours: number
  ) => {
    setInitialRoomId(roomId);
    setInitialStayType(stayType);
    setInitialHours(hours);
    setBookingOpen(true);
  };

  const handlePreviewImage = (imageUrl: string, title: string) => {
    setPreviewState({
      isOpen: true,
      imageUrl,
      title,
    });
  };

  const handleClosePreview = () => {
    setPreviewState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f3] text-[#242220] font-sans selection:bg-[#9f7d3a] selection:text-white">
      {/* Fixed Luxury Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Landing Page Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 2. Lên kế hoạch nghỉ ngơi & Trình tính chi phí rõ ràng */}
        <PlanSection onOpenBookingWithPrefill={handleOpenBookingWithPrefill} />

        {/* 3. Đặt phòng theo giờ ngay hôm nay (Bảng giá niêm yết & Các loại phòng thực tế) */}
        <RoomsSection
          onOpenBooking={handleOpenBooking}
          onPreviewImage={handlePreviewImage}
        />

        {/* 4. Vị trí thuận tiện tại Tân Hương & Thông tin liên hệ, Bản đồ, FAQ */}
        <LocationSection onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Footer with Slogan and full contact */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Floating Action Hotline & Zalo Buttons */}
      <FloatingCallButton onOpenBooking={() => handleOpenBooking()} />

      {/* Booking Form Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialRoomId={initialRoomId}
        initialStayType={initialStayType}
        initialHours={initialHours}
      />

      {/* Lightbox Modal for Real Photography */}
      <ImagePreviewModal
        isOpen={previewState.isOpen}
        onClose={handleClosePreview}
        imageUrl={previewState.imageUrl}
        title={previewState.title}
      />
    </div>
  );
}
