import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Filter, Youtube, MessageSquare } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Lightbox } from '../components/common/Lightbox';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { getVisibleGalleryImages } from '../lib/content';

export const GalleryPage: React.FC = () => {
  const { settings } = useSiteSettings();
  const images = getVisibleGalleryImages();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = useMemo(() => {
    const cats = new Set<string>(['All', 'Residential', 'Resort', 'Commercial', 'Farmhouse', 'Academic']);
    images.forEach((img) => {
      if (img.category) cats.add(img.category);
    });
    return Array.from(cats);
  }, [images]);

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'All') return images;
    return images.filter((img) => img.category === selectedCategory);
  }, [images, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <SEO
        title={`Project Gallery | ${settings.companyName || 'Vedant Bhomi Venture'} (${settings.brandName || 'VEBCO'})`}
        description={`Browse real completed CSEB and interlocking mud brick institutional, residential, resort, and commercial project photographs by ${settings.companyName || 'Vedant Bhomi Venture'} in Bangalore and across Karnataka, Tamil Nadu, and Andhra Pradesh.`}
      />

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="section-label">
          <Camera className="w-3.5 h-3.5" />
          Real Site Photography
        </span>
        <h1 className="section-title">
          Completed Architectural Gallery
        </h1>
        <p className="section-subtitle">
          Explore genuine photography of our CSEB mud brick villas, exposed brick cottages, filler slab ceilings, and sustainable institutional architecture.
        </p>
      </div>

      {images.length === 0 ? (
        /* Zero Images Empty State */
        <div className="max-w-3xl mx-auto rounded-3xl card-earthen p-8 sm:p-12 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-sand text-terracotta flex items-center justify-center mx-auto shadow-inner border border-clay/20">
            <Camera className="w-8 h-8" strokeWidth={1.5} />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl font-bold text-earth">
              Real Project Photos Being Synchronized
            </h3>
            <p className="text-sm text-earth/70 max-w-lg mx-auto leading-relaxed">
              We only display authentic, un-doctored photographs of our genuine on-site construction across Karnataka, Tamil Nadu, and Andhra Pradesh. New high-resolution site photos will appear here as uploaded.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sand/60 border border-clay/20 text-xs text-earth/80 flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="font-semibold text-terracotta">In the meantime, explore our live video records:</span>
            <Link
              to="/videos"
              className="btn-primary inline-flex items-center gap-1.5 py-2 px-4 text-xs"
            >
              <Youtube className="w-4 h-4" />
              <span>Watch Video Walkthroughs</span>
            </Link>
          </div>

          <div className="pt-2">
            <a
              href={settings.whatsapp_catalogue_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-forest hover:underline"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Or browse the official WhatsApp Photo Catalogue</span>
            </a>
          </div>
        </div>
      ) : (
        /* Image Grid with Filter */
        <div className="space-y-8">
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <Filter className="w-4 h-4 text-earth/50 mr-1 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-terracotta text-cream shadow-sm'
                    : 'bg-white/80 text-earth/80 hover:bg-white hover:text-earth border border-clay/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative overflow-hidden aspect-[4/3] rounded-2xl bg-sand border border-clay/20 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
              >
                <img
                  src={img.image_url}
                  alt={img.caption || 'Project photo'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth/90 via-earth/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-cream">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-clay">
                    {img.category}
                  </span>
                  {img.caption && (
                    <p className="text-sm font-semibold mt-1 line-clamp-2 leading-snug">{img.caption}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && filteredImages.length > 0 && (
        <Lightbox
          isOpen={lightboxIndex !== null}
          images={filteredImages.map((img) => ({ url: img.image_url, caption: img.caption }))}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </div>
  );
};
