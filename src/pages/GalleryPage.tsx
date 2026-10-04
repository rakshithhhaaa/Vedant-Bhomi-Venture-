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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <SEO
        title={`Project Gallery | ${settings.companyName || 'Vedant Bhomi Venture'} (${settings.brandName || 'VEBCO'})`}
        description={`Browse real completed CSEB and interlocking mud brick institutional, residential, resort, and commercial project photographs by ${settings.companyName || 'Vedant Bhomi Venture'} in Bangalore and across Karnataka, Tamil Nadu, and Andhra Pradesh.`}
      />

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5" />
          Real Site Photography
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-earth-900 tracking-tight">
          Completed Projects Gallery
        </h1>
        <p className="text-sm sm:text-base text-earth-700 leading-relaxed">
          Explore genuine photography of our CSEB mud brick villas, exposed brick cottages, filler slab ceilings, and sustainable commercial architecture.
        </p>
      </div>

      {images.length === 0 ? (
        /* Zero Images Empty State (Strict Image Rule: Clean, informative, no broken boxes) */
        <div className="max-w-3xl mx-auto rounded-3xl bg-white border border-clay-200 p-8 sm:p-12 text-center shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-clay-100 text-terracotta-600 flex items-center justify-center mx-auto shadow-inner">
            <Camera className="w-8 h-8" strokeWidth={1.5} />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-earth-900">
              Real Project Photos Being Synchronized
            </h3>
            <p className="text-sm text-earth-600 max-w-lg mx-auto leading-relaxed">
              We only display authentic, un-doctored photographs of our genuine on-site construction in Bangalore and South India. New high-resolution site photos will appear here as uploaded.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-clay-50 border border-clay-200/80 text-xs text-earth-700 flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="font-semibold text-terracotta-700">In the meantime, explore our live video records:</span>
            <Link
              to="/videos"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold transition-colors"
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
              className="inline-flex items-center gap-2 text-xs font-bold text-forest-700 hover:underline"
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
            <Filter className="w-4 h-4 text-earth-500 mr-1 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-terracotta-600 text-white shadow-sm'
                    : 'bg-clay-100 text-earth-700 hover:bg-clay-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative overflow-hidden rounded-2xl bg-clay-100 border border-clay-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-72"
              >
                <img
                  src={img.image_url}
                  alt={img.caption || 'VEBCO Project'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-earth-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta-300">
                    {img.category}
                  </span>
                  {img.caption && (
                    <p className="text-sm font-semibold mt-0.5 line-clamp-2">{img.caption}</p>
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
