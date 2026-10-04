import React from 'react';
import { Camera, Layers } from 'lucide-react';

interface ImagePlaceholderProps {
  title?: string;
  category?: string;
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  title,
  category,
  className = 'h-64 w-full',
  iconSize = 'md',
  showBadge = true,
}) => {
  const iconDimensions = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
  }[iconSize];

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#EDE4D6]/70 border border-[#DFD3C0] p-6 text-center select-none ${className}`}
      aria-label={title ? `Image placeholder for ${title}` : 'Real project photo coming soon'}
    >
      {/* Subtle earthen texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#2B1D14 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-[85%] space-y-2">
        <div className="w-12 h-12 rounded-xl bg-white/70 border border-[#DFD3C0] shadow-sm flex items-center justify-center text-clay mb-1">
          <Camera className={iconDimensions} strokeWidth={1.5} />
        </div>

        {category && showBadge && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase text-clay bg-white/80 border border-[#DFD3C0] px-2.5 py-0.5 rounded-full">
            <Layers className="w-3 h-3" />
            {category}
          </span>
        )}

        {title && (
          <h4 className="font-serif text-sm font-bold text-earth line-clamp-2 leading-tight">
            {title}
          </h4>
        )}

        <p className="text-[11px] text-earth/60 font-medium">
          Authentic site photo slot
        </p>
      </div>
    </div>
  );
};
