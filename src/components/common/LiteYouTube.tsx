import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { extractYouTubeId } from '../../lib/imageUtils';

interface LiteYouTubeProps {
  videoIdOrUrl: string;
  title: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1';
}

export const LiteYouTube: React.FC<LiteYouTubeProps> = ({
  videoIdOrUrl,
  title,
  className = '',
  aspectRatio = '16/9',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);
  const videoId = extractYouTubeId(videoIdOrUrl);

  const aspectClass = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
  }[aspectRatio];

  if (!videoId) {
    return (
      <div className={`w-full ${aspectClass} bg-clay-200 rounded-xl flex items-center justify-center p-4 text-earth-600 text-sm ${className}`}>
        <span>Video unavailable</span>
      </div>
    );
  }

  // Thumbnails: hqdefault is universally available across all YouTube videos
  const thumbUrl = imgError
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl bg-earth-900 shadow-md transition-all duration-300 group border border-clay-200 ${aspectClass} ${className}`}
    >
      {isPlaying ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="relative w-full h-full text-left cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-terracotta-500 overflow-hidden"
          aria-label={`Play video: ${title}`}
        >
          {/* Background YouTube Thumbnail */}
          <img
            src={thumbUrl}
            alt={title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Vignette Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-earth-900/90 via-earth-900/40 to-transparent transition-opacity group-hover:opacity-90" />

          {/* Centered Play Button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-terracotta-600 text-white flex items-center justify-center shadow-2xl transition-all duration-300 transform group-hover:scale-115 group-hover:bg-terracotta-500 ring-4 ring-white/30">
              <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-white" />
            </div>
          </div>

          {/* Bottom Title Bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-terracotta-700/80 px-2 py-0.5 rounded text-terracotta-100 mb-1.5 backdrop-blur-sm">
              VEBCO Construction Reel
            </span>
            <p className="text-sm sm:text-base font-semibold line-clamp-2 drop-shadow-sm group-hover:text-terracotta-200 transition-colors">
              {title}
            </p>
          </div>
        </button>
      )}
    </div>
  );
};
