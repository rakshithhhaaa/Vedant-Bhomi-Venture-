import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, ArrowUp, Send } from 'lucide-react';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { getWhatsAppUrl } from '../../lib/imageUtils';
import { Link } from 'react-router-dom';

export const FloatingContact: React.FC = () => {
  const { settings } = useSiteSettings();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappHref = getWhatsAppUrl(
    settings.whatsapp_number,
    settings.whatsappMessage || `Hello ${settings.companyName || 'Vedant Bhomi Venture'}, I would like to consult on an eco-friendly construction project.`
  );

  return (
    <>
      {/* Desktop & Tablet Floating Action Buttons (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-3 pointer-events-auto">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-earth/90 text-cream hover:bg-earth flex items-center justify-center shadow-xl backdrop-blur-md border border-clay/30 transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-terracotta cursor-pointer"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-forest hover:bg-forest/90 text-cream pl-4 pr-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-forest/30 border border-forest/30"
          aria-label={`Chat with ${settings.companyName || 'Vedant Bhomi Venture'} on WhatsApp`}
        >
          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-6 h-6 fill-cream" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-clay rounded-full" />
          </div>
          <div className="text-left leading-tight">
            <span className="block text-[11px] font-medium text-cream/70 uppercase tracking-wider">
              Direct Engineering Line
            </span>
            <span className="block text-sm font-bold text-cream">
              Chat on WhatsApp
            </span>
          </div>
        </a>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-cream/95 backdrop-blur-md border-t border-clay/30 px-3 py-2 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 bg-sand text-earth rounded-xl text-xs font-bold border border-clay/20 active:bg-sand/70 transition-all"
        >
          <Phone className="w-4 h-4 text-forest" />
          <span>Call Now</span>
        </a>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 bg-forest text-cream rounded-xl text-xs font-bold active:bg-forest/90 shadow-sm transition-all"
        >
          <MessageSquare className="w-4 h-4 fill-cream" />
          <span>WhatsApp</span>
        </a>

        <Link
          to="/contact"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 bg-terracotta text-cream rounded-xl text-xs font-bold active:bg-terracotta-dark shadow-sm transition-all"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Get Quote</span>
        </Link>
      </div>
    </>
  );
};
