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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <SEO
        title={`Construction Videos & Site Walkthroughs | ${settings.companyName || 'Vedant Bhomi Venture'}`}
        description={`Watch real site construction videos, CSEB mud brick pressing, dry-stack interlocking wall tests, and finished traditional courtyard house tours by ${settings.companyName || 'Vedant Bhomi Venture'}.`}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="section-label">
          <Youtube className="w-3.5 h-3.5 text-terracotta" />
          On-Site Video Records
        </span>
        <h1 className="section-title">
          Real Construction Videos & Project Reels
        </h1>
        <p className="section-subtitle">
          Witness authentic on-site engineering, filler slab installation, traditional courtyard builds, and the structural mass of CSEB interlocking blocks.
        </p>

        <div className="pt-2 flex justify-center">
          <a
            href={settings.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-dark text-cream font-bold text-xs sm:text-sm shadow-md transition-all"
          >
            <Youtube className="w-4 h-4" />
            <span>Visit & Subscribe on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-earth/40" />
        <input
          type="text"
          placeholder="Search videos by project title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 border border-clay/30 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta text-earth placeholder-earth/40 shadow-sm transition-all"
        />
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVideos.map((vid) => (
          <div
            key={vid.id}
            className="card-earthen overflow-hidden flex flex-col justify-between group"
          >
            <LiteYouTube
              videoIdOrUrl={vid.youtube_id}
              title={vid.title}
              className="rounded-t-2xl rounded-b-none border-0"
            />
            <div className="p-6 space-y-2">
              <h2 className="font-serif text-base font-bold text-earth leading-snug line-clamp-2 group-hover:text-terracotta transition-colors">
                {vid.title}
              </h2>
              {vid.description && (
                <p className="text-xs text-earth/70 line-clamp-2 leading-relaxed">
                  {vid.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="card-earthen p-12 text-center">
          <p className="text-earth/70 text-sm">No videos match your search query.</p>
        </div>
      )}
    </div>
  );
};
