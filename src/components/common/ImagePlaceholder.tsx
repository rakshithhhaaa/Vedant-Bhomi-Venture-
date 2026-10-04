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
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  }[iconSize];

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-clay-100 to-clay-200 border border-clay-300/80 p-6 text-center shadow-inner select-none ${className}`}
      aria-label={title ? `Image placeholder for ${title}` : 'Real project photo coming soon'}
    >
      {/* Vernacular earth brick subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#7B5D46 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-[85%]">
        <div className="w-14 h-14 rounded-2xl bg-white/80 border border-clay-300 shadow-sm flex items-center justify-center text-terracotta-600 mb-3 transition-transform duration-300 hover:scale-105">
          <Camera className={iconDimensions} strokeWidth={1.5} />
        </div>

        {category && showBadge && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase text-forest-700 bg-forest-50 border border-forest-200 px-2.5 py-0.5 rounded-full mb-1.5">
            <Layers className="w-3 h-3" />
            {category}
          </span>
        )}

        {title && (
          <h4 className="text-sm font-semibold text-earth-800 line-clamp-2 leading-tight">
            {title}
          </h4>
        )}

        <p className="text-[11px] text-earth-500 mt-1 font-medium">
          Real project photo slot
        </p>
      </div>
    </div>
  );
};
