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
  Building2,
  CheckCircle2,
  MapPin,
  Compass,
  Layers,
  ArrowUpRight,
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
    <div className="space-y-24 sm:space-y-32 -mt-4">
      <SEO
        title={`${settings.companyName || 'Vedant Bhomi Venture'} | High-End Earthen Architecture (${settings.brandName || 'VEBCO'})`}
        description={settings.hero_subtext || `Vedant Bhomi Venture crafts sustainable vernacular homes using CSEB mud bricks and interlocking earth brick technology across Bangalore, Karnataka, Tamil Nadu, and Andhra Pradesh.`}
      />

      {/* 1. HERO SECTION: Full-Bleed Real Photograph with Soft Dark Gradient */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
        {/* Full-bleed Real Project Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="images/valiant-academy-amphitheater.webp"
            alt="Earthen Vernacular Campus Architecture by Vedant Bhomi Venture"
            className="w-full h-full object-cover object-center scale-105 transform animate-in fade-in duration-1000"
            loading="eager"
          />
          {/* Dark Earthen Gradient Overlay for Perfect Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-earth via-earth/70 to-earth/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-earth/90 via-earth/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
          <div className="max-w-3xl space-y-6 sm:space-y-8 text-left animate-fade-rise">
            {/* Small uppercase accent label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cream text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-300" />
              <span>Vernacular Architecture & CSEB Engineering</span>
            </div>

            {/* Large editorial serif headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08]">
              {settings.hero_headline || 'Sustainable Living Built with Earth & Precision'}
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-xl text-cream/90 font-light leading-relaxed max-w-2xl">
              {settings.hero_subtext}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/contact"
                className="btn-primary min-h-[50px] px-8 text-base shadow-lg shadow-terracotta-900/30"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass min-h-[50px] px-8 text-base"
              >
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Service Area Tag Line Under Buttons */}
            <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm text-cream/75 font-medium tracking-wide">
              <Compass className="w-4 h-4 text-terracotta-300 shrink-0" />
              <span>Serving {formatServiceAreas(settings.serviceAreas)} • Head Office in Jigani, Karnataka</span>
            </div>
          </div>
        </div>

        {/* Soft Organic Curved Divider at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-1 pointer-events-none">
          <svg
            className="w-full h-8 sm:h-14 text-cream fill-current"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
          >
            <path d="M0,32 C320,78 720,85 1440,32 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* 2. FACT-ONLY TRUST STRIP: Text-Only Four Core Advantages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-[#E8DFC8] p-8 sm:p-12 shadow-[0_4px_24px_rgba(43,29,20,0.04)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#E8DFC8]">
            {/* Item 1 */}
            <div className="sm:pr-6 pt-4 sm:pt-0 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-earth/10 text-earth flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-earth">No cement mortar for bonding</h3>
              <p className="text-xs sm:text-sm text-earth/70 leading-relaxed">
                Precision interlocking earth blocks lock firmly into each other, giving the wall exceptional structural strength without mortar joints.
              </p>
            </div>

            {/* Item 2 */}
            <div className="sm:px-6 pt-6 sm:pt-0 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center mb-3">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-earth">Saves about 60% of cement and sand</h3>
              <p className="text-xs sm:text-sm text-earth/70 leading-relaxed">
                Dry-stack alignment and exposed brick aesthetics eliminate mortar consumption and exterior plastering.
              </p>
            </div>

            {/* Item 3 */}
            <div className="sm:px-6 pt-6 sm:pt-0 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-earth">Naturally cooler interiors</h3>
              <p className="text-xs sm:text-sm text-earth/70 leading-relaxed">
                High thermal mass of stabilized earth blocks moderates indoor temperatures naturally throughout the year.
              </p>
            </div>

            {/* Item 4 */}
            <div className="sm:pl-6 pt-6 sm:pt-0 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-clay/10 text-clay flex items-center justify-center mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-earth">Fast-track construction</h3>
              <p className="text-xs sm:text-sm text-earth/70 leading-relaxed">
                Self-aligning interlocking blocks speed up structural wall assembly without waiting for mortar drying.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATALOGUE MODELS: 4:3 Image-First Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="section-label">Earthen Living Models</span>
            <h2 className="section-title">Featured Turnkey Projects</h2>
          </div>
          <Link
            to="/catalogue"
            className="inline-flex items-center gap-2 text-sm font-bold text-terracotta hover:text-terracotta-700 transition-colors group"
          >
            <span>Explore Complete Catalogue</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {featuredItems.map((item) => {
            const hasRealImage = item.images && item.images.length > 0;
            const coverImage = hasRealImage ? item.images[0].image_url : null;
            const itemWhatsapp = getWhatsAppUrl(
              settings.whatsapp_number,
              `Hello ${settings.companyName || 'Vedant Bhomi Venture'}, I would like a quote for ${item.title}. My location is: `
            );

            return (
              <div
                key={item.id}
                className="card-earthen group"
              >
                {/* 4:3 Aspect Ratio Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand/40">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <ImagePlaceholder
                      title={item.title}
                      category={item.category}
                      className="w-full h-full rounded-none"
                    />
                  )}
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-earth shadow-sm">
                    {item.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-earth group-hover:text-terracotta transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-earth/70 line-clamp-2 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8DFC8]/60 flex items-center justify-between">
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider font-semibold text-clay">Price</span>
                      <span className="text-sm sm:text-base font-serif font-bold text-terracotta">
                        Contact for price
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={itemWhatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-forest/10 hover:bg-forest text-forest hover:text-white transition-all duration-200"
                        title="Enquire on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                      <Link
                        to={`/catalogue/${item.slug}`}
                        className="p-2.5 rounded-xl bg-sand hover:bg-terracotta hover:text-white text-earth transition-all duration-200"
                        title="View Project Blueprint"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. ALTERNATING DARK EARTH SECTION: The Science & Craft of CSEB */}
      <section className="bg-earth text-cream py-24 sm:py-32 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-terracotta/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-clay">
              Vernacular Material Science
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Crafted from Earth. Engineered for Generations.
            </h2>
            <p className="text-cream/80 text-base sm:text-lg font-light leading-relaxed">
              We replace resource-heavy baked bricks and excessive cement mortars with precision Compressed Stabilized Earth Blocks (CSEB) and self-locking soil bricks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/[0.04] border border-white/10 space-y-4 hover:border-clay/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-terracotta/20 text-terracotta-300 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">Interlocking Strength</h3>
              <p className="text-sm text-cream/70 leading-relaxed font-light">
                Interlocking bricks lock into each other for wall strength. No cement mortar is needed for bonding, creating rigid, self-aligning masonry.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.04] border border-white/10 space-y-4 hover:border-clay/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-forest/20 text-forest-300 flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">Environment-Friendly</h3>
              <p className="text-sm text-cream/70 leading-relaxed font-light">
                They save cement, sand and water during construction, significantly lowering the environmental impact while keeping interiors naturally cooler.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.04] border border-white/10 space-y-4 hover:border-clay/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-clay/20 text-clay-300 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">High Density & Fast-Track</h3>
              <p className="text-sm text-cream/70 leading-relaxed font-light">
                Compressed earth blocks are heavier than normal baked bricks, and construction work can be completed in fast-track mode without mortar drying delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. REGIONAL COVERAGE: Bangalore, Karnataka, Tamil Nadu & Andhra Pradesh */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-sand/50 border border-[#E8DFC8] p-8 sm:p-14 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="section-label">Regional Operational Footprint</span>
            <h2 className="section-title">
              We Build Across {formatBuildAcross(settings.serviceAreas)}
            </h2>
            <p className="section-subtitle mx-auto">
              With our head office situated at Bommasandra Jigani Link Rd, Jigani, Karnataka, our engineering crews and CSEB block delivery networks serve projects across all three southern states.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-2xl bg-white border border-[#E8DFC8]/70 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-terracotta font-serif font-bold text-base">
                <MapPin className="w-4 h-4 text-terracotta" />
                <span>Bangalore & Region</span>
              </div>
              <p className="text-xs sm:text-sm text-earth/70 leading-relaxed">
                Turnkey vernacular villas, eco-residences, and farmhouse projects across Greater Bangalore and Kanakapura Road.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8DFC8]/70 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-forest font-serif font-bold text-base">
                <MapPin className="w-4 h-4 text-forest" />
                <span>Karnataka State</span>
              </div>
              <p className="text-xs sm:text-sm text-earth/70 leading-relaxed">
                Ongoing projects in Mysore, coastal retreats in Kumta, and agricultural retreats throughout Karnataka.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8DFC8]/70 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-terracotta font-serif font-bold text-base">
                <MapPin className="w-4 h-4 text-terracotta" />
                <span>Tamil Nadu</span>
              </div>
              <p className="text-xs sm:text-sm text-earth/70 leading-relaxed">
                Traditional courtyard homes and eco-cottages across Hosur border, Dindigul, Chennai, and Nilgiris.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8DFC8]/70 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-forest font-serif font-bold text-base">
                <MapPin className="w-4 h-4 text-forest" />
                <span>Andhra Pradesh</span>
              </div>
              <p className="text-xs sm:text-sm text-earth/70 leading-relaxed">
                Climate-responsive homes, institutional campus architecture, and high thermal comfort retreats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TURNKEY SOLUTIONS BREAKDOWN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="section-label">End-to-End Execution</span>
          <h2 className="section-title">
            Turnkey Earthen Construction
          </h2>
          <p className="section-subtitle mx-auto">
            From architectural conceptualisation to master masonry and final handover, we craft spaces tailored to your climate and lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {SERVICES_LIST.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-[#E8DFC8]/70 shadow-[0_4px_20px_-4px_rgba(43,29,20,0.05)] hover:border-terracotta/40 transition-all duration-300 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-sand/70 text-terracotta flex items-center justify-center">
                    <Building2 className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold text-earth">{srv.title}</h3>
                <p className="text-xs sm:text-sm text-earth/70 leading-relaxed font-normal">
                  {srv.description}
                </p>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-[#E8DFC8]/50">
                {srv.features.map((feat, fidx) => (
                  <li key={fidx} className="flex items-center gap-2.5 text-xs sm:text-sm text-earth/80">
                    <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 7. VIDEO REELS HIGHLIGHT */}
      {videoHighlights.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="section-label">On-Site Documentation</span>
              <h2 className="section-title">Construction Video Records</h2>
            </div>
            <Link
              to="/videos"
              className="inline-flex items-center gap-2 text-sm font-bold text-terracotta hover:text-terracotta-700 transition-colors group"
            >
              <span>Watch Video Walkthroughs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {videoHighlights.map((vid) => (
              <div key={vid.id} className="space-y-3">
                <LiteYouTube
                  videoIdOrUrl={vid.youtube_id}
                  title={vid.title}
                  className="shadow-md rounded-2xl overflow-hidden border border-[#E8DFC8]"
                />
                <h4 className="font-serif text-base font-bold text-earth line-clamp-2 px-1 leading-snug">
                  {vid.title}
                </h4>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. CLIENT TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="section-label">Client Experiences</span>
            <h2 className="section-title">Words from Homeowners</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8DFC8] flex flex-col justify-between space-y-6"
              >
                <p className="font-serif text-base text-earth/80 italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-[#E8DFC8]/60">
                  <span className="block font-bold text-sm text-earth">{t.client_name}</span>
                  {t.project_location && (
                    <span className="block text-xs text-clay mt-0.5">{t.project_location}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 9. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-earth text-white p-10 sm:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-terracotta/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6 text-center sm:text-left">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] bg-white/10 px-3.5 py-1.5 rounded-full text-terracotta-300">
              Start Your Sustainable Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.15]">
              Ready to build a climate-responsive home?
            </h2>
            <p className="text-base sm:text-lg text-cream/80 font-light leading-relaxed">
              Schedule an on-site consultation across {formatBuildAcross(settings.serviceAreas)} or request an engineering cost estimation for your CSEB / Interlocking brick build.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/contact"
                className="btn-primary min-h-[48px] px-8 text-base shadow-xl"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass min-h-[48px] px-8 text-base"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Instant WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
