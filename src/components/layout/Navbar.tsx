import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, Layers } from 'lucide-react';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { formatServiceAreas } from '../../lib/content';
import { getWhatsAppUrl } from '../../lib/imageUtils';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { settings } = useSiteSettings();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalogue', path: '/catalogue' },
    { name: 'Projects Gallery', path: '/gallery' },
    { name: 'Videos', path: '/videos' },
    { name: 'About & Technology', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const whatsappHref = getWhatsAppUrl(
    settings.whatsapp_number,
    settings.whatsappMessage || `Hello ${settings.companyName || 'Vedant Bhomi Venture'}, I would like to consult on an eco-friendly construction project. My location is: `
  );

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-clay-50/95 backdrop-blur-md shadow-sm border-b border-clay-200 py-3'
          : 'bg-clay-50/80 backdrop-blur-sm border-b border-clay-200/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-terracotta-600 flex items-center justify-center text-white shadow-md shadow-terracotta-900/10 group-hover:bg-terracotta-700 transition-colors">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-xl font-bold tracking-tight text-earth-900 group-hover:text-terracotta-700 transition-colors">
                {settings.companyName || 'Vedant Bhomi Venture'}
              </span>
              <span className="block text-[11px] font-medium tracking-wider uppercase text-forest-700">
                {settings.brandName || 'Vedaanth ECO Buildcon (VEBCO)'} • {settings.tagline || 'Eco Friendly Construction'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'text-terracotta-700 bg-terracotta-50 font-semibold'
                    : 'text-earth-700 hover:text-terracotta-600 hover:bg-clay-100/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Quick CTA Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-2 text-xs font-semibold text-earth-700 hover:text-terracotta-600 px-3 py-2 rounded-lg border border-clay-300 hover:border-terracotta-300 transition-colors"
              title={`Call ${settings.companyName || 'Vedant Bhomi Venture'}`}
            >
              <Phone className="w-3.5 h-3.5 text-forest-600" />
              <span>{settings.phone}</span>
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold bg-forest-600 hover:bg-forest-700 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-earth-700 hover:bg-clay-200 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta-400"
            aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-clay-50 border-b border-clay-200 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-2.5 rounded-lg text-base font-medium ${
                  isActive(link.path)
                    ? 'text-terracotta-700 bg-terracotta-50 font-semibold'
                    : 'text-earth-800 hover:bg-clay-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-clay-200 grid grid-cols-2 gap-2">
            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg bg-clay-200 text-earth-800 hover:bg-clay-300"
            >
              <Phone className="w-4 h-4 text-forest-600" />
              <span>Call Us</span>
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg bg-forest-600 text-white hover:bg-forest-700"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
