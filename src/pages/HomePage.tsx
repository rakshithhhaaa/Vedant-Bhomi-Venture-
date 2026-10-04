import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Zap,
  Leaf,
  Droplet,
  ArrowRight,
  MessageSquare,
  ChevronRight,
  Sparkles,
  Building,
  CheckCircle2,
  MapPin,
  Compass,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { ImagePlaceholder } from '../components/common/ImagePlaceholder';
import { LiteYouTube } from '../components/common/LiteYouTube';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { getFeaturedCatalogueItems, getVisibleVideos, getVisibleTestimonials, formatServiceAreas, formatBuildAcross } from '../lib/content';
import { SERVICES_LIST } from '../lib/constants';
import { formatPrice, getWhatsAppUrl } from '../lib/imageUtils';

export const HomePage: React.FC = () => {
  const { settings } = useSiteSettings();
  const featuredItems = getFeaturedCatalogueItems().slice(0, 4);
  const videoHighlights = getVisibleVideos().slice(0, 3);
  const testimonials = getVisibleTestimonials();

  const whatsappHref = getWhatsAppUrl(
    settings.whatsapp_number,
    settings.whatsappMessage || `Hello ${settings.companyName || 'Vedant Bhomi Venture'}, I would like to get a quote for eco-friendly construction. My location is: `
  );

  return (
    <div className="space-y-20 sm:space-y-28">
      <SEO
        title={`${settings.companyName || 'Vedant Bhomi Venture'} | Eco Friendly Construction (${settings.brandName || 'VEBCO'})`}
        description={settings.hero_subtext || `Vedant Bhomi Venture builds sustainable vernacular homes using CSEB mud bricks and interlocking bricks across Bangalore, Karnataka, Tamil Nadu, and Andhra Pradesh.`}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-terracotta-100/50 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-forest-100/40 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta-100/80 border border-terracotta-200 text-terracotta-800 text-xs sm:text-sm font-semibold tracking-wide">
                <Leaf className="w-4 h-4 text-forest-600" />
                <span>Zero Cement Mortar Bonding • Save 60% Cement & Sand</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-earth-900 tracking-tight leading-[1.15]">
                {settings.hero_headline || 'Sustainable Living Built with Earth & Precision'}
              </h1>

              <p className="text-base sm:text-lg text-earth-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {settings.hero_subtext}
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-forest-50 border border-forest-200 text-forest-800 text-xs font-semibold">
                <Compass className="w-4 h-4 text-forest-600 shrink-0" />
                <span>{formatServiceAreas(settings.serviceAreas)}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-base shadow-lg shadow-terracotta-700/20 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-terracotta-300"
                >
                  <span>Get a Free Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-semibold text-base shadow-md transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-forest-300"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>WhatsApp Us</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-t border-clay-200/80">
                <div className="p-2">
                  <span className="block text-2xl font-bold text-terracotta-600">60%</span>
                  <span className="text-xs text-earth-600 font-medium">Cement & Sand Saved</span>
                </div>
                <div className="p-2">
                  <span className="block text-2xl font-bold text-forest-700">100%</span>
                  <span className="text-xs text-earth-600 font-medium">Natural Earth Bricks</span>
                </div>
                <div className="p-2">
                  <span className="block text-2xl font-bold text-terracotta-700">Fast-Track</span>
                  <span className="text-xs text-earth-600 font-medium">Rapid Wall Assembly</span>
                </div>
                <div className="p-2">
                  <span className="block text-2xl font-bold text-earth-800">4°C-6°C</span>
                  <span className="text-xs text-earth-600 font-medium">Cooler Indoor Climate</span>
                </div>
              </div>
            </div>

            {/* Right Visual (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-3xl bg-white p-4 shadow-xl border border-clay-200/80 space-y-4">
                  <div className="relative overflow-hidden rounded-2xl group">
                    <img
                      src="images/valiant-academy-amphitheater.webp"
                      alt="Valiant Academy - Institutional Campus at Kanakapura Road, Bangalore"
                      className="h-72 sm:h-80 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold bg-earth-900/80 backdrop-blur-sm text-white shadow-sm">
                      Completed Project
                    </div>
                  </div>
                  
                  <div className="p-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-2.5 py-1 rounded-md border border-forest-200">
                        Valiant Academy • Kanakapura Rd
                      </span>
                      <span className="text-xs font-bold text-terracotta-700">
                        CSEB Campus
                      </span>
                    </div>
                    <p className="text-xs text-earth-600">
                      Semicircular stone amphitheater & institutional academic blocks built with dry-stack interlocking earth bricks in Bangalore.
                    </p>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-earth-900 text-white p-4 rounded-2xl shadow-xl border border-clay-700 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-terracotta-500/20 text-terracotta-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-clay-200">High Density Strength</span>
                    <span className="block text-[11px] text-clay-400">Heavier & sturdier than baked bricks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REGIONAL SERVICE AREA BANNER (NEW SECTION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-clay-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-forest-700">
              Regional Coverage
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-earth-900">
              We Build Across {formatBuildAcross(settings.serviceAreas)}
            </h2>
            <p className="text-xs sm:text-sm text-earth-600">
              With our head office situated at Bommasandra Jigani Link Rd, Jigani, Karnataka, our engineering crews and CSEB block delivery networks serve clients throughout South India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-clay-50 border border-clay-200/80 space-y-2">
              <div className="flex items-center gap-2 text-terracotta-700 font-bold text-sm">
                <MapPin className="w-4 h-4" />
                <span>Bangalore & Region</span>
              </div>
              <p className="text-xs text-earth-600 leading-relaxed">
                Turnkey villas, urban eco-residences, and farmhouse projects across Greater Bangalore and satellite townships.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-clay-50 border border-clay-200/80 space-y-2">
              <div className="flex items-center gap-2 text-forest-700 font-bold text-sm">
                <MapPin className="w-4 h-4" />
                <span>Karnataka State</span>
              </div>
              <p className="text-xs text-earth-600 leading-relaxed">
                Ongoing projects in Mysore, Hosur border, Coastal Karnataka (Kumta resorts), and interior districts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-clay-50 border border-clay-200/80 space-y-2">
              <div className="flex items-center gap-2 text-terracotta-700 font-bold text-sm">
                <MapPin className="w-4 h-4" />
                <span>Tamil Nadu</span>
              </div>
              <p className="text-xs text-earth-600 leading-relaxed">
                Traditional courtyard homes and eco-cottages across Hosur, Chennai, Coimbatore, Dindigul, and Nilgiris.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-clay-50 border border-clay-200/80 space-y-2">
              <div className="flex items-center gap-2 text-forest-700 font-bold text-sm">
                <MapPin className="w-4 h-4" />
                <span>Andhra Pradesh</span>
              </div>
              <p className="text-xs text-earth-600 leading-relaxed">
                Climate-responsive homes, institutional buildings, and retreats tailored for high-thermal comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY INTERLOCKING BRICKS SECTION */}
      <section className="bg-clay-100/70 border-y border-clay-200/80 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-forest-700">
              Innovative Vernacular Technology
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-earth-900">
              Why Choose Interlocking Soil & CSEB Bricks?
            </h2>
            <p className="text-earth-700 text-sm sm:text-base">
              Interlocking bricks lock into each other to provide structural integrity without cement mortar bonding. A revolutionary approach that respects both tradition and modern engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-clay-200 hover:border-terracotta-300 transition-all hover:shadow-md space-y-3">
              <div className="w-12 h-12 rounded-xl bg-terracotta-50 text-terracotta-600 flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-earth-900">60% Cement & Sand Saved</h3>
              <p className="text-sm text-earth-600 leading-relaxed">
                Because blocks interlock precisely without mortar between horizontal joints, you eliminate large volumes of cement, sand, and plastering costs.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-clay-200 hover:border-forest-300 transition-all hover:shadow-md space-y-3">
              <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-earth-900">Cooler Interior Climate</h3>
              <p className="text-sm text-earth-600 leading-relaxed">
                Compressed earth bricks have exceptional thermal mass, regulating humidity and keeping indoor temperatures 4°C to 6°C cooler during peak summer months.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-clay-200 hover:border-sand-400 transition-all hover:shadow-md space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sand-100 text-sand-800 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-earth-900">Fast-Track Construction</h3>
              <p className="text-sm text-earth-600 leading-relaxed">
                Interlocking grooves allow rapid wall alignment and dry stacking. Speed of completion is up to 40% faster than conventional masonry workflows.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-clay-200 hover:border-terracotta-300 transition-all hover:shadow-md space-y-3">
              <div className="w-12 h-12 rounded-xl bg-terracotta-100/60 text-terracotta-800 flex items-center justify-center">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-earth-900">Minimal Water Usage</h3>
              <p className="text-sm text-earth-600 leading-relaxed">
                Curing water requirements are drastically reduced compared to conventional brickwork and plastering, preserving precious water resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED CATALOGUE MODELS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-forest-700">
              Popular Models & Turnkey Options
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-earth-900">
              Featured Eco-Home Models
            </h2>
          </div>
          <Link
            to="/catalogue"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-terracotta-700 hover:text-terracotta-800 group"
          >
            <span>View All Models & Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => {
            const hasRealImage = item.images && item.images.length > 0;
            const coverImage = hasRealImage ? item.images[0].image_url : null;
            const itemWhatsapp = getWhatsAppUrl(
              settings.whatsapp_number,
              `Hello ${settings.companyName || 'Vedant Bhomi Venture'}, I am interested in knowing more about "${item.title}". My location is: `
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
                      className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <ImagePlaceholder
                      title={item.title}
                      category={item.category}
                      className="h-56 w-full"
                    />
                  )}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-bold bg-white/90 backdrop-blur-sm text-earth-800 shadow-sm">
                    {item.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-earth-900 group-hover:text-terracotta-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-earth-600 mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-clay-100 flex items-center justify-between">
                    <div>
                      <span className="block text-[11px] font-medium text-earth-500">Starting Price</span>
                      <span className="text-base font-extrabold text-terracotta-700">
                        {formatPrice(item.price, item.price_unit)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={itemWhatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-forest-50 hover:bg-forest-100 text-forest-700 border border-forest-200 transition-colors"
                        title="Enquire on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                      <Link
                        to={`/catalogue/${item.slug}`}
                        className="p-2 rounded-lg bg-clay-100 hover:bg-terracotta-600 hover:text-white text-earth-800 transition-colors"
                        title="View Details"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. TURNKEY SERVICES BREAKDOWN */}
      <section className="bg-clay-100/50 py-16 sm:py-20 border-t border-clay-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-forest-700">
              Complete End-to-End Construction
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-earth-900">
              Turnkey Projects on Interlocking Bricks
            </h2>
            <p className="text-earth-700 text-sm sm:text-base">
              From design blueprints to final handover, we deliver tailored architectural solutions across residential, commercial, resort, and farmhouse sectors in South India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_LIST.map((srv, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-clay-200 space-y-4 hover:border-terracotta-300 transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-clay-100 text-terracotta-700 flex items-center justify-center">
                    <Building className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-clay-400">0{idx + 1}</span>
                </div>

                <h3 className="text-lg font-bold text-earth-900">{srv.title}</h3>
                <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
                  {srv.description}
                </p>

                <ul className="space-y-1.5 pt-2 border-t border-clay-100">
                  {srv.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-xs text-earth-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VIDEO REELS HIGHLIGHT */}
      {videoHighlights.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-forest-700">
                On-Site Execution
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-earth-900">
                Real Construction Video Walkthroughs
              </h2>
            </div>
            <Link
              to="/videos"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-terracotta-700 hover:text-terracotta-800 group"
            >
              <span>Watch All Videos</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoHighlights.map((vid) => (
              <div key={vid.id} className="space-y-2">
                <LiteYouTube
                  videoIdOrUrl={vid.youtube_id}
                  title={vid.title}
                  className="shadow-lg rounded-2xl"
                />
                <h4 className="text-sm font-bold text-earth-800 line-clamp-2 px-1">
                  {vid.title}
                </h4>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. TESTIMONIALS SECTION */}
      {testimonials.length > 0 && (
        <section className="bg-clay-100/80 py-16 sm:py-20 border-y border-clay-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-forest-700">
                Client Experiences
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-earth-900">
                Words from Homeowners
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-clay-200 flex flex-col justify-between space-y-4"
                >
                  <p className="text-sm text-earth-700 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="pt-3 border-t border-clay-100">
                    <span className="block font-bold text-sm text-earth-900">{t.client_name}</span>
                    {t.project_location && (
                      <span className="block text-xs text-earth-500">{t.project_location}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. FINAL CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-earth-900 via-earth-800 to-terracotta-900 text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-terracotta-500/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-5 text-center sm:text-left">
            <span className="inline-block text-xs font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full text-terracotta-300">
              Start Your Sustainable Project
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Ready to build an eco-friendly home?
            </h2>
            <p className="text-sm sm:text-base text-clay-200 leading-relaxed">
              Schedule a site consultation across {formatBuildAcross(settings.serviceAreas)} or request a detailed cost estimation for your CSEB / Interlocking brick house.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-sm shadow-xl transition-all"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
