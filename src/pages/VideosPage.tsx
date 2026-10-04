import React, { useState, useMemo } from 'react';
import { Youtube, Search, ExternalLink } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { LiteYouTube } from '../components/common/LiteYouTube';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { getVisibleVideos } from '../lib/content';

export const VideosPage: React.FC = () => {
  const { settings } = useSiteSettings();
  const videos = getVisibleVideos();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = useMemo(() => {
    return videos.filter((vid) =>
      vid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (vid.description && vid.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [videos, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <SEO
        title="Construction Videos & Site Walkthroughs | Vedaanth ECO Buildcon"
        description="Watch real site construction videos, CSEB mud brick pressing, dry-stack interlocking wall tests, and finished traditional courtyard house tours by VEBCO."
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider">
          <Youtube className="w-3.5 h-3.5 text-red-600" />
          VEBCO YouTube Channel
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-earth-900 tracking-tight">
          Real Construction Videos & On-Site Reels
        </h1>
        <p className="text-sm sm:text-base text-earth-700 leading-relaxed">
          Witness authentic on-site engineering, filler slab installation, traditional courtyard builds at Hosur, Bangalore, and Dindigul, and the raw strength of CSEB interlocking blocks.
        </p>

        <div className="pt-2 flex justify-center">
          <a
            href={settings.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
          >
            <Youtube className="w-4 h-4" />
            <span>Visit & Subscribe on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-earth-400" />
        <input
          type="text"
          placeholder="Search videos by project title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-clay-300 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-earth-900 shadow-sm"
        />
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVideos.map((vid) => (
          <div
            key={vid.id}
            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg border border-clay-200 transition-all duration-300 flex flex-col justify-between"
          >
            <LiteYouTube
              videoIdOrUrl={vid.youtube_id}
              title={vid.title}
              className="rounded-t-3xl rounded-b-none"
            />
            <div className="p-5 space-y-2">
              <h2 className="text-base font-bold text-earth-900 leading-snug line-clamp-2">
                {vid.title}
              </h2>
              {vid.description && (
                <p className="text-xs text-earth-600 line-clamp-2 leading-relaxed">
                  {vid.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-clay-200">
          <p className="text-earth-600 text-sm">No videos match your search query.</p>
        </div>
      )}
    </div>
  );
};
