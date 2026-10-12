import React from 'react';
import { X } from 'lucide-react';

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-neutral-900 rounded-sm overflow-hidden shadow-2xl border border-neutral-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={onClose}
            className="p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[80vh] flex items-center justify-center bg-black">
          <img
            src={imageUrl}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[80vh] object-contain"
          />
        </div>

        <div className="p-4 bg-neutral-900 text-white flex items-center justify-between border-t border-neutral-800">
          <span className="text-sm font-semibold">{title}</span>
          <span className="text-xs text-neutral-400">Thiên Phú Hotel · 56 Tân Hương</span>
        </div>
      </div>
    </div>
  );
};
