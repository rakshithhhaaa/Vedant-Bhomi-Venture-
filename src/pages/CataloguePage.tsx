import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MessageSquare, ChevronRight, Layers } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { ImagePlaceholder } from '../components/common/ImagePlaceholder';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { getVisibleCatalogueItems } from '../lib/content';
import { formatPrice, getWhatsAppUrl } from '../lib/imageUtils';

export const CataloguePage: React.FC = () => {
  const { settings } = useSiteSettings();
  const items = getVisibleCatalogueItems();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const cats = new Set<string>(['All']);
    items.forEach((item) => {
      if (item.category) cats.add(item.category);
    });
    return Array.from(cats);
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <SEO
        title={`Eco House Models & Bricks Catalogue | ${settings.companyName || 'Vedant Bhomi Venture'}`}
        description={`Explore ${settings.companyName || 'Vedant Bhomi Venture'}'s eco-friendly house models, CSEB mud brick turnkey packages, resorts, and raw interlocking earth brick rates.`}
      />

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="section-label">
          <Layers className="w-3.5 h-3.5" />
          Turnkey Eco Construction
        </span>
        <h1 className="section-title">
          House Models & Architectural Catalogue
        </h1>
        <p className="section-subtitle">
          Turnkey eco-friendly construction models and CSEB earth brick packages across Karnataka, Tamil Nadu, and Andhra Pradesh. All plans are engineered for natural thermal comfort and site-specific topography.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="bg-sand/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-clay/30 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-earth/40" />
            <input
              type="text"
              placeholder="Search house models, bricks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 border border-clay/30 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta text-earth placeholder-earth/40 transition-all shadow-sm"
            />
          </div>

          <div className="text-xs text-earth/60 font-medium">
            Showing <span className="font-bold text-earth">{filteredItems.length}</span> of {items.length} options
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <Filter className="w-4 h-4 text-earth/50 shrink-0 mr-1" />
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
      </div>

      {/* Catalogue Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="card-earthen p-12 text-center space-y-3">
          <p className="text-earth/70 font-medium">No models match your search or filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-terracotta hover:underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const hasRealImage = item.images && item.images.length > 0;
            const coverImage = hasRealImage ? item.images[0].image_url : null;
            const itemWhatsapp = getWhatsAppUrl(
              settings.whatsapp_number,
              `Hello ${settings.companyName || 'Vedant Bhomi Venture'}, I would like a quote for ${item.title}. My location is: `
            );

            return (
              <div
                key={item.id}
                className="card-earthen overflow-hidden flex flex-col group"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                  ) : (
                    <ImagePlaceholder
                      title={item.title}
                      category={item.category}
                      className="w-full h-full"
                    />
                  )}
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-cream/90 backdrop-blur-md text-earth shadow-sm border border-clay/20">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2">
                    <h2 className="font-serif text-xl font-bold text-earth group-hover:text-terracotta transition-colors leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-earth/70 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-clay/20 space-y-4">
                    <div>
                      <span className="block text-[11px] font-semibold text-earth/50 uppercase tracking-widest">
                        Price
                      </span>
                      <span className="font-serif text-xl font-bold text-terracotta">
                        Contact for price
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a
                        href={itemWhatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-forest/10 hover:bg-forest/20 text-forest border border-forest/20 text-xs font-bold transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Enquire</span>
                      </a>
                      <Link
                        to={`/catalogue/${item.slug}`}
                        className="btn-primary py-2.5 px-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
