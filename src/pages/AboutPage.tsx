import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  ShieldCheck,
  Zap,
  Building2,
  Compass,
  Hammer,
  KeyRound,
  MessageSquare,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { ImagePlaceholder } from '../components/common/ImagePlaceholder';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { formatServiceAreas, formatBuildAcross } from '../lib/content';
import { getWhatsAppUrl } from '../lib/imageUtils';

export const AboutPage: React.FC = () => {
  const { settings } = useSiteSettings();

  const processSteps = [
    {
      title: 'Site Analysis & Climate Consultation',
      description: 'We analyze your plot orientation, solar path, wind direction, and soil properties across Bangalore, Karnataka, Tamil Nadu, or Andhra Pradesh to engineer an energy-positive vernacular design.',
      icon: Compass,
    },
    {
      title: 'Architectural Blueprint & 3D Modeling',
      description: 'Custom architectural layouts including central courtyards, filler slabs, open verandahs, and passive cooling airflow channels.',
      icon: Building2,
    },
    {
      title: 'Precision CSEB & Interlocking Brick Selection',
      description: 'High-density Compressed Stabilized Earth Blocks manufactured under strict hydraulic compaction for maximum compressive strength.',
      icon: Layers,
    },
    {
      title: 'Fast-Track Mortar-Free Construction',
      description: 'Blocks are dry-stacked with precision locking grooves. Eliminates mortar drying wait times and saves about 60% of cement and sand.',
      icon: Hammer,
    },
    {
      title: 'Handover & Sustainable Living',
      description: 'Complete interior and exterior finish handover. Enjoy a durable, naturally cooler home with zero recurring plaster maintenance costs.',
      icon: KeyRound,
    },
  ];

  const whatsappHref = getWhatsAppUrl(
    settings.whatsapp_number,
    settings.whatsappMessage || `Hello ${settings.companyName || 'Vedant Bhomi Venture'}, I would like to schedule an architectural consultation for an eco-friendly project. My location is: `
  );

  return (
    <div className="space-y-20 sm:space-y-28 py-10 sm:py-14">
      <SEO
        title={`About Us & Science of CSEB | ${settings.companyName || 'Vedant Bhomi Venture'} (${settings.brandName || 'VEBCO'})`}
        description={`Learn how ${settings.companyName || 'Vedant Bhomi Venture'} (${settings.brandName || 'VEBCO'}) utilizes CSEB and interlocking earth brick technology to save about 60% of cement and sand across ${formatBuildAcross(settings.serviceAreas)}.`}
      />

      {/* 1. HERO STORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="section-label">
                <Sparkles className="w-3.5 h-3.5" />
                Vernacular Architecture Pioneers
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-forest bg-forest/10 px-3 py-1 rounded-full border border-forest/20">
                <Compass className="w-3.5 h-3.5" />
                {formatServiceAreas(settings.serviceAreas)}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-earth tracking-tight leading-tight">
              Building Enduring Homes in Harmony with Nature
            </h1>

            <p className="text-base sm:text-lg text-earth/80 leading-relaxed">
              {settings.about_story}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="card-earthen p-5 space-y-1">
                <h3 className="font-serif text-base font-bold text-terracotta">Saves about 60% of cement and sand</h3>
                <p className="text-xs text-earth/70 leading-relaxed">Eliminates thick mortar joints and exterior wall plastering.</p>
              </div>

              <div className="card-earthen p-5 space-y-1">
                <h3 className="font-serif text-base font-bold text-forest">No cement mortar for bonding</h3>
                <p className="text-xs text-earth/70 leading-relaxed">Self-aligning shear keys transfer structural loads seamlessly.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card-earthen p-4 space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl group bg-sand">
                <img
                  src="images/valiant-academy-courtyard.webp"
                  alt="Valiant Academy - Vernacular CSEB Courtyard at Kanakapura Road, Bangalore"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-earth/85 backdrop-blur-md text-cream shadow-sm">
                  Valiant Academy • Kanakapura Rd
                </div>
              </div>
              <div className="p-2 text-center space-y-1">
                <h3 className="font-serif text-base font-bold text-earth">
                  {settings.companyName || 'Vedant Bhomi Venture'}
                </h3>
                <p className="text-xs text-earth/70 font-medium">
                  Also known as {settings.brandName || 'Vedaanth ECO Buildcon (VEBCO)'}
                </p>
                <p className="text-xs text-forest font-semibold flex items-center justify-center gap-1 pt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Head Office: Jigani, Karnataka</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE SCIENCE BEHIND CSEB (DARK EARTH SECTION - PLAIN LANGUAGE EXPLANATION) */}
      <section className="bg-earth text-cream py-16 sm:py-24 border-y border-clay/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-clay">
              Vernacular Material Science
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream">
              The Science Behind CSEB Technology
            </h2>
            <p className="text-sm sm:text-base text-cream/70 leading-relaxed">
              How Compressed Stabilized Earth Blocks (CSEB) and Interlocking Soil Bricks transform sustainable construction through geometric alignment, resource savings, and natural thermal comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-earth-800/80 rounded-2xl p-7 border border-clay/20 space-y-4 shadow-lg backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-terracotta/20 text-terracotta flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-cream">Interlocking Strength</h3>
              <p className="text-xs sm:text-sm text-cream/70 leading-relaxed">
                Interlocking bricks lock into each other for wall strength. No cement mortar is needed for bonding, creating rigid, self-aligning masonry that stands the test of time.
              </p>
            </div>

            <div className="bg-earth-800/80 rounded-2xl p-7 border border-clay/20 space-y-4 shadow-lg backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-forest/20 text-forest-300 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-cream">Environment-Friendly</h3>
              <p className="text-xs sm:text-sm text-cream/70 leading-relaxed">
                They save cement, sand and water during construction, significantly lowering the environmental impact while keeping interiors naturally cooler.
              </p>
            </div>

            <div className="bg-earth-800/80 rounded-2xl p-7 border border-clay/20 space-y-4 shadow-lg backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-clay/20 text-clay flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-cream">High Density & Fast-Track</h3>
              <p className="text-xs sm:text-sm text-cream/70 leading-relaxed">
                Compressed earth blocks are heavier than normal baked bricks, and construction work can be completed in fast-track mode without mortar drying delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STEP-BY-STEP PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="section-label">
            How We Work
          </span>
          <h2 className="section-title">
            Our Turnkey Process
          </h2>
          <p className="section-subtitle">
            From initial plot visit across {formatBuildAcross(settings.serviceAreas)} to delivering your finished key, our disciplined execution ensures quality and transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="card-earthen p-6 flex flex-col justify-between space-y-4 relative"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-sand text-terracotta flex items-center justify-center border border-clay/20">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-base font-bold text-earth leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-earth/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-earth text-cream p-8 sm:p-14 shadow-2xl border border-clay/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream">
              Consult with Our Eco-Architects
            </h2>
            <p className="text-sm text-cream/70 leading-relaxed">
              Visit our head office in Jigani, Karnataka or send your floor requirement to get a complimentary feasibility assessment across {formatBuildAcross(settings.serviceAreas)}.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              to="/contact"
              className="btn-primary w-full sm:w-auto px-7 py-3.5 text-center text-sm font-bold shadow-lg"
            >
              Contact Us
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass w-full sm:w-auto px-7 py-3.5 text-center text-sm font-bold flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
