import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  images: Array<{ url: string; caption?: string; title?: string }>;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
    },
    [isOpen, currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || images.length === 0) return null;

  const current = images[currentIndex] || images[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-earth/95 backdrop-blur-md p-4 sm:p-6 transition-all duration-300">
      {/* Top Header / Actions */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-10 text-cream">
        <span className="text-sm font-medium tracking-wide text-clay">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-terracotta text-cream transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta cursor-pointer"
          aria-label="Close image lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center">
        <img
          src={current.url}
          alt={current.caption || current.title || 'Project photo'}
          className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-300 border border-clay/20"
        />

        {(current.caption || current.title) && (
          <div className="mt-4 text-center text-cream text-sm sm:text-base font-medium max-w-2xl px-5 py-2 rounded-full bg-earth-800/90 backdrop-blur-md border border-clay/30 shadow-lg">
            {current.caption || current.title}
          </div>
        )}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1)}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-earth-800/90 hover:bg-terracotta text-cream transition-all shadow-xl border border-clay/30 focus:outline-none focus:ring-2 focus:ring-terracotta cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0)}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-earth-800/90 hover:bg-terracotta text-cream transition-all shadow-xl border border-clay/30 focus:outline-none focus:ring-2 focus:ring-terracotta cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
};
