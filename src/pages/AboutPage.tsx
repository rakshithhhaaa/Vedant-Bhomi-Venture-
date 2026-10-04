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
      step: '01',
      title: 'Site Analysis & Climate Consultation',
      description: 'We analyze your plot orientation, solar path, wind direction, and soil properties across Bangalore, Karnataka, Tamil Nadu, or Andhra Pradesh to engineer an energy-positive vernacular design.',
      icon: Compass,
    },
    {
      step: '02',
      title: 'Architectural Blueprint & 3D Modeling',
      description: 'Custom architectural layouts including central courtyards, filler slabs, open verandahs, and passive cooling airflow channels.',
      icon: Building2,
    },
    {
      step: '03',
      title: 'Precision CSEB & Interlocking Brick Selection',
      description: 'High-density Compressed Stabilized Earth Blocks manufactured under strict hydraulic compaction for maximum compressive strength.',
      icon: Layers,
    },
    {
      step: '04',
      title: 'Fast-Track Mortar-Free Construction',
      description: 'Blocks are dry-stacked with precision locking grooves. Eliminates mortar drying wait times and reduces cement & sand by up to 60%.',
      icon: Hammer,
    },
    {
      step: '05',
      title: 'Handover & Sustainable Living',
      description: 'Complete interior and exterior finish handover. Enjoy a durable, naturally cool home with zero recurring plaster maintenance costs.',
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
        description={`Learn how ${settings.companyName || 'Vedant Bhomi Venture'} (${settings.brandName || 'VEBCO'}) utilizes CSEB and interlocking earth brick technology to save 60% cement and build faster homes across ${formatBuildAcross(settings.serviceAreas)}.`}
      />

      {/* 1. HERO STORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-terracotta-100 text-terracotta-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Vernacular Architecture Pioneers
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-forest-700 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
                <Compass className="w-3.5 h-3.5" />
                {formatServiceAreas(settings.serviceAreas)}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-earth-900 tracking-tight leading-tight">
              Building Enduring Homes in Harmony with Nature
            </h1>

            <p className="text-base sm:text-lg text-earth-700 leading-relaxed">
              {settings.about_story}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-clay-200 shadow-sm space-y-1">
                <span className="text-2xl font-bold text-terracotta-600">60%</span>
                <p className="text-xs font-semibold text-earth-800">Cement & Sand Reduction</p>
                <p className="text-[11px] text-earth-500">Eliminates thick mortar joints and wall plastering.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-clay-200 shadow-sm space-y-1">
                <span className="text-2xl font-bold text-forest-700">Zero Mortar</span>
                <p className="text-xs font-semibold text-earth-800">Geometric Dry-Stack Lock</p>
                <p className="text-[11px] text-earth-500">Self-aligning shear keys transfer structural loads.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-5 border border-clay-200 shadow-xl space-y-4">
              <div className="relative overflow-hidden rounded-2xl group">
                <img
                  src="images/valiant-academy-courtyard.webp"
                  alt="Valiant Academy - Vernacular CSEB Courtyard at Kanakapura Road, Bangalore"
                  className="h-80 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold bg-earth-900/80 backdrop-blur-sm text-white shadow-sm">
                  Valiant Academy • Kanakapura Rd
                </div>
              </div>
              <div className="p-2 text-center space-y-1">
                <h3 className="text-sm font-bold text-earth-900">
                  {settings.companyName || 'Vedant Bhomi Venture'}
                </h3>
                <p className="text-xs text-[#7A685F] font-medium">
                  Also known as {settings.brandName || 'Vedaanth ECO Buildcon (VEBCO)'}
                </p>
                <p className="text-xs text-forest-700 font-semibold flex items-center justify-center gap-1 pt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Head Office: Jigani, Karnataka</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE SCIENCE BEHIND CSEB & INTERLOCKING BRICKS */}
      <section className="bg-clay-100/70 border-y border-clay-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-forest-700">
              Material Engineering
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-earth-900">
              The Technology Explained
            </h2>
            <p className="text-sm sm:text-base text-earth-700">
              How Compressed Stabilized Earth Blocks (CSEB) and Interlocking Soil Bricks transform sustainable construction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-7 border border-clay-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-earth-900">Interlocking Groove Mechanism</h3>
              <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
                Each brick features precision-cast male and female shear keys that lock firmly with adjacent blocks. This interlock provides superior horizontal stability without relying on wet cement mortar bonding.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-clay-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-earth-900">High Density & Structural Mass</h3>
              <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
                Interlocking soil compressed bricks are significantly heavier and denser than conventional baked red bricks. This high mass delivers excellent structural load resistance and natural sound dampening.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-clay-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sand-100 text-sand-800 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-earth-900">Fast-Track Mode Completion</h3>
              <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
                Because masons do not need to lay and level wet mortar between every course, wall assembly proceeds with unmatched speed. Projects are completed up to 40% faster than conventional builds.
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-clay-200 shadow-sm overflow-hidden space-y-4">
            <h3 className="text-lg font-bold text-earth-900 text-center sm:text-left">
              Interlocking CSEB vs Conventional Baked Bricks
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-clay-200 text-earth-500 font-semibold uppercase text-[11px]">
                    <th className="py-3 px-4">Parameter</th>
                    <th className="py-3 px-4 text-terracotta-700 font-bold">VEBCO Interlocking CSEB</th>
                    <th className="py-3 px-4 text-earth-600">Conventional Baked Bricks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-clay-100 text-earth-800">
                  <tr>
                    <td className="py-3 px-4 font-bold">Mortar Requirement</td>
                    <td className="py-3 px-4 text-forest-700 font-semibold">Zero mortar bonding (Self-locking)</td>
                    <td className="py-3 px-4 text-earth-600">Heavy cement mortar required</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Cement & Sand Usage</td>
                    <td className="py-3 px-4 text-forest-700 font-semibold">~60% Saved</td>
                    <td className="py-3 px-4 text-earth-600">100% full consumption</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Indoor Temperature</td>
                    <td className="py-3 px-4 text-forest-700 font-semibold">4°C to 6°C cooler (High thermal mass)</td>
                    <td className="py-3 px-4 text-earth-600">Heats up rapidly</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Wall Plastering</td>
                    <td className="py-3 px-4 text-forest-700 font-semibold">Optional (Exposed aesthetic is popular)</td>
                    <td className="py-3 px-4 text-earth-600">Mandatory double-coat plastering</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Water Requirement</td>
                    <td className="py-3 px-4 text-forest-700 font-semibold">Minimal curing water</td>
                    <td className="py-3 px-4 text-earth-600">Intensive continuous curing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STEP-BY-STEP PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-forest-700">
            How We Work
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-earth-900">
            Our 5-Stage Turnkey Process
          </h2>
          <p className="text-sm sm:text-base text-earth-700">
            From initial plot visit across {formatBuildAcross(settings.serviceAreas)} to delivering your finished key, our disciplined execution ensures quality and transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-clay-200 shadow-sm flex flex-col justify-between space-y-4 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-terracotta-700 bg-terracotta-50 px-2.5 py-1 rounded-md">
                    {step.step}
                  </span>
                  <Icon className="w-5 h-5 text-earth-500" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-earth-900 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-earth-600 mt-2 leading-relaxed">
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
        <div className="rounded-3xl bg-forest-900 text-white p-8 sm:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Consult with Our Eco-Architects
            </h2>
            <p className="text-sm text-forest-200 leading-relaxed">
              Visit our head office in Jigani, Karnataka or send your floor requirement to get a complimentary feasibility assessment across {formatBuildAcross(settings.serviceAreas)}.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-sm text-center shadow-lg transition-all"
            >
              Contact Us
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm text-center border border-white/20 transition-all flex items-center justify-center gap-2"
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
