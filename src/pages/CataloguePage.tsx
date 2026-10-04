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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <SEO
        title="Eco House Models & Bricks Catalogue | Vedaanth ECO Buildcon"
        description="Explore VEBCO's eco-friendly house models, CSEB mud brick turnkey packages, resorts, and raw interlocking earth brick rates in Bangalore."
      />

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-100 text-terracotta-800 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          Turnkey Eco Construction
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-earth-900 tracking-tight">
          House Models & Building Catalogue
        </h1>
        <p className="text-sm sm:text-base text-earth-700 leading-relaxed">
          Transparent turnkey rates for CSEB and interlocking mud brick construction in Bangalore and South India. All prices are customizable based on site specifics and architectural layout.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-clay-200 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-earth-400" />
            <input
              type="text"
              placeholder="Search house models, bricks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-clay-50 border border-clay-300 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:bg-white text-earth-800"
            />
          </div>

          <div className="text-xs text-earth-500 font-medium">
            Showing <span className="font-bold text-earth-900">{filteredItems.length}</span> of {items.length} options
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <Filter className="w-4 h-4 text-earth-500 shrink-0 mr-1" />
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
      </div>

      {/* Catalogue Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-clay-200 space-y-3">
          <p className="text-earth-600 font-medium">No models match your search or filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-terracotta-600 hover:underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => {
            const hasRealImage = item.images && item.images.length > 0;
            const coverImage = hasRealImage ? item.images[0].image_url : null;
            const itemWhatsapp = getWhatsAppUrl(
              settings.whatsapp_number,
              `Hello Vedaanth ECO Buildcon, I would like to inquire about "${item.title}". Please share quotation details.`
            );

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-clay-200 transition-all duration-300 flex flex-col group"
              >
                <div className="relative overflow-hidden">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={item.title}
                      className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <ImagePlaceholder
                      title={item.title}
                      category={item.category}
                      className="h-60 w-full"
                    />
                  )}
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-md text-xs font-bold bg-white/90 backdrop-blur-sm text-earth-800 shadow-sm border border-clay-100">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-earth-900 group-hover:text-terracotta-700 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-earth-600 mt-2 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-clay-100 space-y-4">
                    <div>
                      <span className="block text-xs font-semibold text-earth-500 uppercase tracking-wider">
                        Estimate / Rate
                      </span>
                      <span className="text-xl font-extrabold text-terracotta-700">
                        {formatPrice(item.price, item.price_unit)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={itemWhatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-forest-50 hover:bg-forest-100 text-forest-700 border border-forest-200 text-xs font-bold transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Enquire</span>
                      </a>
                      <Link
                        to={`/catalogue/${item.slug}`}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-bold transition-colors shadow-sm"
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
