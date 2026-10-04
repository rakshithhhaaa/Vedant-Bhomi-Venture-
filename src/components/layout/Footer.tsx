import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Youtube,
  MessageSquare,
  Layers,
  Sparkles,
  Map,
  ArrowUpRight,
} from 'lucide-react';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { formatServiceAreas } from '../../lib/content';
import { getWhatsAppUrl } from '../../lib/imageUtils';

export const Footer: React.FC = () => {
  const { settings } = useSiteSettings();
  const currentYear = new Date().getFullYear();

  const whatsappHref = getWhatsAppUrl(
    settings.whatsapp_number,
    settings.whatsappMessage || `Hello ${settings.companyName || 'Vedant Bhomi Venture'}, I would like more information about your eco-friendly construction projects. My location is: `
  );

  return (
    <footer className="bg-earth text-cream/80 border-t border-white/5 pt-20 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Brand & Studio Profile (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-terracotta flex items-center justify-center text-white shadow-sm group-hover:bg-terracotta-700 transition-colors">
                <Layers className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <div>
                <span className="block font-serif text-xl font-bold text-white tracking-tight">
                  {settings.companyName || 'Vedant Bhomi Venture'}
                </span>
                <span className="block text-xs font-semibold text-clay tracking-wider uppercase">
                  {settings.brandName || 'Vedaanth ECO Buildcon (VEBCO)'}
                </span>
              </div>
            </Link>

            <p className="text-sm text-cream/70 leading-relaxed font-normal">
              {settings.companyName || 'Vedant Bhomi Venture'} (also known as {settings.brandName || 'Vedaanth ECO Buildcon / VEBCO'}) crafts climate-responsive vernacular architecture using Compressed Stabilized Earth Blocks (CSEB) and interlocking mud brick technology across South India.
            </p>

            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-cream/80 flex items-center gap-2.5">
              <Map className="w-4 h-4 text-forest-300 shrink-0" />
              <span className="font-medium">{formatServiceAreas(settings.serviceAreas)}</span>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <a
                href={settings.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-terracotta text-xs font-semibold text-white transition-all duration-200 border border-white/10"
                aria-label="Visit YouTube Channel"
              >
                <Youtube className="w-4 h-4 text-red-400" />
                <span>YouTube Channel</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/50" />
              </a>

              <a
                href={settings.whatsapp_catalogue_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-forest text-xs font-semibold text-white transition-all duration-200 border border-white/10"
                aria-label="View WhatsApp Catalogue"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Catalogue</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/50" />
              </a>
            </div>
          </div>

          {/* Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-clay">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-cream/70">
              <li>
                <Link to="/" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/catalogue" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Catalogue & Models
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Projects Gallery
                </Link>
              </li>
              <li>
                <Link to="/videos" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Construction Videos
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  About & Technology
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Vernacular Solutions (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-clay">
              Solutions
            </h3>
            <ul className="space-y-2.5 text-sm text-cream/70">
              <li>CSEB Mud Brick Homes</li>
              <li>Interlocking Soil Blocks</li>
              <li>Traditional Courtyards</li>
              <li>Filler Slab Ceilings</li>
              <li>Eco Resorts & Cottages</li>
              <li>Campus Architecture</li>
              <li>Farmhouses & Villas</li>
            </ul>
          </div>

          {/* Head Office & Direct Consultation (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-clay">
              Head Office & Contact
            </h3>
            <ul className="space-y-3.5 text-sm text-cream/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-terracotta-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white text-xs uppercase tracking-wider">Head Office</span>
                  <span className="text-cream/80 text-xs sm:text-sm leading-relaxed">{settings.address}</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-forest-300 shrink-0" />
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {settings.whatsapp_number}
                </a>
              </li>
              <li className="flex flex-col gap-1.5 pl-7">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-terracotta-400 -ml-7 shrink-0" />
                  <a
                    href={`mailto:${settings.email_primary}`}
                    className="hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    {settings.email_primary}
                  </a>
                </div>
                {settings.email_secondary && (
                  <a
                    href={`mailto:${settings.email_secondary}`}
                    className="hover:text-white transition-colors text-xs text-cream/60"
                  >
                    {settings.email_secondary}
                  </a>
                )}
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-clay shrink-0" />
                <span className="text-xs sm:text-sm">{settings.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50">
          <p>© {currentYear} {settings.companyName || 'Vedant Bhomi Venture'} ({settings.brandName || 'VEBCO'}). All rights reserved.</p>
          <div className="flex items-center gap-2 text-forest-300 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sustainable Vernacular Architecture & CSEB Technology</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
