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
    <footer className="bg-earth-900 text-clay-200 border-t border-earth-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-earth-800">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-terracotta-600 flex items-center justify-center text-white shadow-md">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-serif text-lg sm:text-xl font-bold text-white tracking-tight">
                  {settings.companyName || 'Vedant Bhomi Venture'}
                </span>
                <span className="block text-xs font-semibold text-terracotta-400 tracking-wider uppercase">
                  {settings.brandName || 'Vedaanth ECO Buildcon (VEBCO)'}
                </span>
              </div>
            </div>

            <p className="text-sm text-clay-300 leading-relaxed">
              {settings.companyName || 'Vedant Bhomi Venture'} (also known as {settings.brandName || 'Vedaanth ECO Buildcon / VEBCO'}) specializes in sustainable vernacular architecture using Compressed Stabilized Earth Blocks (CSEB) and interlocking soil brick technology. 60% less cement, naturally cool interiors, and fast-track execution.
            </p>

            <div className="p-3 rounded-xl bg-earth-800/70 border border-earth-700/80 text-xs text-clay-300 flex items-center gap-2">
              <Map className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium">{formatServiceAreas(settings.serviceAreas)}</span>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={settings.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-earth-800 hover:bg-terracotta-700 text-xs font-medium text-white transition-colors border border-earth-700"
                aria-label="Visit YouTube Channel"
              >
                <Youtube className="w-4 h-4 text-red-500" />
                <span>YouTube Channel</span>
              </a>

              <a
                href={settings.whatsapp_catalogue_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-earth-800 hover:bg-forest-700 text-xs font-medium text-white transition-colors border border-earth-700"
                aria-label="View WhatsApp Catalogue"
              >
                <MessageSquare className="w-4 h-4 text-green-400" />
                <span>WhatsApp Catalogue</span>
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white border-l-2 border-terracotta-500 pl-2">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-clay-300">
              <li>
                <Link to="/" className="hover:text-terracotta-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/catalogue" className="hover:text-terracotta-400 transition-colors">
                  Catalogue & Models
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-terracotta-400 transition-colors">
                  Projects Gallery
                </Link>
              </li>
              <li>
                <Link to="/videos" className="hover:text-terracotta-400 transition-colors">
                  Construction Videos
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-terracotta-400 transition-colors">
                  About & Technology
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-terracotta-400 transition-colors">
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Turnkey Services (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white border-l-2 border-forest-500 pl-2">
              Eco Solutions
            </h3>
            <ul className="space-y-2 text-sm text-clay-300">
              <li>CSEB Mud Brick Homes</li>
              <li>Budget Interlocking Houses</li>
              <li>Traditional Courtyard Villas</li>
              <li>Resorts & Farmhouses</li>
              <li>Commercial Buildings</li>
              <li>Filler Slab Construction</li>
              <li>Interlocking Soil Bricks Supply</li>
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white border-l-2 border-clay-400 pl-2">
              Head Office & Contact
            </h3>
            <ul className="space-y-3 text-sm text-clay-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-terracotta-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white text-xs uppercase tracking-wider">Head Office</span>
                  <span>{settings.address}</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-forest-400 shrink-0" />
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-green-400 shrink-0" />
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {settings.whatsapp_number}
                </a>
              </li>
              <li className="flex flex-col gap-1 pl-7">
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
                    className="hover:text-white transition-colors text-xs text-clay-400 pl-0"
                  >
                    {settings.email_secondary}
                  </a>
                )}
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-sand-400 shrink-0" />
                <span>{settings.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-clay-400">
          <p>© {currentYear} {settings.companyName || 'Vedant Bhomi Venture'} ({settings.brandName || 'VEBCO'}). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-forest-400">
              <Sparkles className="w-3.5 h-3.5" />
              100% Eco-Friendly Vernacular Architecture
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
