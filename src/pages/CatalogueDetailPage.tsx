import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MessageSquare,
  Leaf,
  CheckCircle2,
  Sparkles,
  Zap,
  Mail,
  Layers,
  MapPin,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { ImagePlaceholder } from '../components/common/ImagePlaceholder';
import { Lightbox } from '../components/common/Lightbox';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { getCatalogueItemBySlug, formatServiceAreas } from '../lib/content';
import { formatPrice, getWhatsAppUrl } from '../lib/imageUtils';
import { validateFormSpam } from '../lib/antiSpam';

export const CatalogueDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { settings } = useSiteSettings();
  const item = slug ? getCatalogueItemBySlug(slug) : undefined;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Form states
  const [formRenderTime] = useState<number>(() => Date.now());
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    location_city: '',
    state: 'Bangalore',
    message: '',
    honeypot: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold text-earth">Project Model Not Found</h1>
        <p className="text-earth/70 text-sm">The requested construction model or material item could not be located.</p>
        <Link
          to="/catalogue"
          className="btn-primary inline-flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </Link>
      </div>
    );
  }

  const images = item.images || [];
  const hasImages = images.length > 0;
  const currentImage = hasImages ? images[activeImageIndex]?.image_url : null;

  const directWhatsappHref = getWhatsAppUrl(
    settings.whatsapp_number,
    `Hello ${settings.companyName || 'Vedant Bhomi Venture'}, I would like a quote for ${item.title}. My location is: `
  );

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const spamCheck = validateFormSpam(formState.honeypot, formRenderTime);
    if (spamCheck.isSpam) {
      setErrorMessage(spamCheck.reason || 'Invalid submission');
      return;
    }

    if (!formState.name.trim() || !formState.phone.trim()) {
      setErrorMessage('Please enter both your name and phone number.');
      return;
    }

    const messageLines = [
      `*New Quote Request - ${item.title}*`,
      `*Company:* ${settings.companyName || 'Vedant Bhomi Venture'}`,
      `*Name:* ${formState.name.trim()}`,
      `*Phone:* ${formState.phone.trim()}`,
      formState.email ? `*Email:* ${formState.email.trim()}` : '',
      `*Location / City:* ${formState.location_city.trim() || 'Not specified'}`,
      `*State / Region:* ${formState.state}`,
      `*Model:* ${item.title}`,
      `*Details:* ${formState.message.trim() || 'Please share floor plans and quotation.'}`,
    ].filter(Boolean).join('\n');

    const waUrl = getWhatsAppUrl(settings.whatsapp_number, messageLines);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const mailtoHref = `mailto:${settings.email_primary}?subject=${encodeURIComponent(
    `Quote Request: ${item.title} - ${formState.name} (${formState.state})`
  )}&body=${encodeURIComponent(
    `Name: ${formState.name}\nPhone: ${formState.phone}\nEmail: ${formState.email}\nCity/Location: ${formState.location_city}\nState: ${formState.state}\nModel: ${item.title}\nDetails: ${formState.message}`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <SEO
        title={`${item.title} | ${settings.companyName || 'Vedant Bhomi Venture'}`}
        description={item.description}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-earth/60 font-medium">
        <Link to="/" className="hover:text-terracotta transition-colors">Home</Link>
        <span>/</span>
        <Link to="/catalogue" className="hover:text-terracotta transition-colors">Catalogue</Link>
        <span>/</span>
        <span className="text-earth font-semibold truncate">{item.title}</span>
      </nav>

      {/* Main Grid: Left Gallery (7 cols), Right Info & Form (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
        {/* Left: Gallery & Visuals */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative card-earthen overflow-hidden bg-sand">
            {hasImages ? (
              <div
                className="cursor-pointer group relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden"
                onClick={() => setIsLightboxOpen(true)}
              >
                <img
                  src={currentImage!}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-earth/20 group-hover:bg-earth/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-earth/90 backdrop-blur-md text-cream px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                    Click to view full screen
                  </span>
                </div>
              </div>
            ) : (
              <ImagePlaceholder
                title={item.title}
                category={item.category}
                className="aspect-[4/3] sm:aspect-[16/10] w-full"
                iconSize="lg"
              />
            )}
          </div>

          {/* Thumbnails if multiple images exist */}
          {hasImages && images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-terracotta ring-2 ring-terracotta/30'
                      : 'border-clay/30 hover:border-clay/60 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Technical Specifications Highlights */}
          <div className="card-earthen p-6 sm:p-8 space-y-5">
            <h3 className="font-serif text-lg font-bold text-earth flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-terracotta" />
              <span>Technical & Ecological Features</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-sand/50 border border-clay/20">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-earth">Dry-Stack Interlocking</span>
                  <span className="text-earth/70 text-xs mt-0.5 block leading-relaxed">No cement mortar bonding needed between bricks</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-sand/50 border border-clay/20">
                <Leaf className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-earth">Saves about 60% of cement and sand</span>
                  <span className="text-earth/70 text-xs mt-0.5 block leading-relaxed">Dramatically lowers carbon footprint and raw material bill</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-sand/50 border border-clay/20">
                <Sparkles className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-earth">Thermal Insulation</span>
                  <span className="text-earth/70 text-xs mt-0.5 block leading-relaxed">Naturally cooler interiors throughout the year</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-sand/50 border border-clay/20">
                <Zap className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-earth">Fast-Track Delivery</span>
                  <span className="text-earth/70 text-xs mt-0.5 block leading-relaxed">Swift masonry alignment accelerates completion timelines</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Info, Pricing & WhatsApp Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="card-earthen p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-forest bg-forest/10 px-3 py-1 rounded-full border border-forest/20 inline-block">
                {item.category}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-earth leading-tight">
                {item.title}
              </h1>
            </div>

            <div className="p-5 rounded-2xl bg-terracotta/10 border border-terracotta/20 flex items-center justify-between">
              <div>
                <span className="block text-[11px] font-bold text-terracotta uppercase tracking-wider">
                  Price
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-terracotta">
                  Contact for price
                </span>
              </div>
              <span className="text-xs text-earth/80 bg-cream px-3 py-1 rounded-full font-semibold border border-clay/20 shadow-sm">
                South India
              </span>
            </div>

            <div className="text-earth/80 text-sm leading-relaxed border-t border-clay/20 pt-4">
              <p>{item.description}</p>
            </div>

            {/* Direct WhatsApp Action */}
            <a
              href={directWhatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-forest w-full py-3.5 text-center flex items-center justify-center gap-2 text-sm font-bold shadow-md"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Instant WhatsApp Inquiry for {item.title}</span>
            </a>

            {/* Quote Request via WhatsApp Form */}
            <div className="pt-6 border-t border-clay/20 space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif text-base font-bold text-earth">
                  Request Floor Plans & Quotation
                </h3>
                <p className="text-xs text-earth/60">
                  Fill in your details below to open a direct WhatsApp chat with our engineers.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl text-xs font-semibold bg-red-50 text-red-800 border border-red-200">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleEnquirySubmit} className="space-y-3">
                {/* Honeypot field (hidden) */}
                <input
                  type="text"
                  name="user_website"
                  value={formState.honeypot}
                  onChange={(e) => setFormState({ ...formState, honeypot: e.target.value })}
                  style={{ display: 'none', position: 'absolute', opacity: 0 }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-sand/40 border border-clay/30 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta focus:bg-white text-earth transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp *"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-sand/40 border border-clay/30 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta focus:bg-white text-earth transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email (optional)"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-sand/40 border border-clay/30 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta focus:bg-white text-earth transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Location / City *"
                    value={formState.location_city}
                    onChange={(e) => setFormState({ ...formState, location_city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-sand/40 border border-clay/30 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta focus:bg-white text-earth transition-all"
                  />
                  <select
                    value={formState.state}
                    onChange={(e) => setFormState({ ...formState, state: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-sand/40 border border-clay/30 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta focus:bg-white text-earth font-medium transition-all"
                  >
                    <option value="Bangalore">Bangalore</option>
                    <option value="Other Karnataka">Other Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Other">Other Location</option>
                  </select>
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Plot size (e.g. 30x40, 40x60) or specific requirement..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-sand/40 border border-clay/30 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta focus:bg-white text-earth transition-all"
                  />
                </div>

                <div className="space-y-2.5 pt-2">
                  <button
                    type="submit"
                    className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold shadow-md cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-cream" />
                    <span>Send via WhatsApp</span>
                  </button>

                  <a
                    href={mailtoHref}
                    className="btn-outline w-full py-2.5 flex items-center justify-center gap-2 text-xs font-bold text-center"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Or Send via Email</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox for Gallery */}
      {hasImages && (
        <Lightbox
          isOpen={isLightboxOpen}
          images={images.map((img) => ({ url: img.image_url, caption: img.caption || item.title }))}
          currentIndex={activeImageIndex}
          onClose={() => setIsLightboxOpen(false)}
          onNavigate={(newIdx) => setActiveImageIndex(newIdx)}
        />
      )}
    </div>
  );
};
