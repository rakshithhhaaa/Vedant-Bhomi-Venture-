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
          ? 'bg-cream/95 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(43,29,20,0.06)] border-b border-[#E8DFC8] py-3'
          : 'bg-cream/80 backdrop-blur-sm border-b border-[#E8DFC8]/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-terracotta flex items-center justify-center text-white shadow-sm group-hover:bg-terracotta-700 transition-colors">
              <Layers className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.8} />
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-xl font-bold tracking-tight text-earth group-hover:text-terracotta transition-colors">
                {settings.companyName || 'Vedant Bhomi Venture'}
              </span>
              <span className="block text-[11px] font-medium tracking-wider uppercase text-clay">
                {settings.brandName || 'Vedaanth ECO Buildcon (VEBCO)'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-terracotta bg-terracotta/10 font-semibold'
                    : 'text-earth/80 hover:text-terracotta hover:bg-black/[0.03]'
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
              className="flex items-center gap-2 text-xs font-semibold text-earth hover:text-terracotta px-3.5 py-2.5 rounded-xl border border-earth/15 hover:border-terracotta/40 bg-white/50 hover:bg-white transition-all duration-200"
              title={`Call ${settings.companyName || 'Vedant Bhomi Venture'}`}
            >
              <Phone className="w-3.5 h-3.5 text-forest" />
              <span>{settings.phone}</span>
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold bg-forest hover:bg-forest-700 text-white px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all duration-200"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl text-earth hover:bg-black/[0.04] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-cream border-b border-[#E8DFC8] px-4 pt-3 pb-6 space-y-3 animate-fade-rise">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-terracotta bg-terracotta/10 font-semibold'
                    : 'text-earth hover:bg-black/[0.03]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E8DFC8] grid grid-cols-2 gap-2">
            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl bg-white border border-[#E8DFC8] text-earth hover:bg-cream-200 transition-colors"
            >
              <Phone className="w-4 h-4 text-forest" />
              <span>Call Us</span>
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl bg-forest text-white hover:bg-forest-700 transition-colors"
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
