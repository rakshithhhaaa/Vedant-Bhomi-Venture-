import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Youtube,
  ExternalLink,
  AlertCircle,
  Compass,
  Map,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { formatServiceAreas, formatBuildAcross } from '../lib/content';
import { validateFormSpam } from '../lib/antiSpam';
import { getWhatsAppUrl } from '../lib/imageUtils';

export const ContactPage: React.FC = () => {
  const { settings } = useSiteSettings();
  const [formRenderTime] = useState<number>(() => Date.now());

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location_city: '',
    state: 'Bangalore',
    project_type: 'Residential House',
    message: '',
    honeypot: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const directWhatsappHref = getWhatsAppUrl(
    settings.whatsapp_number,
    settings.whatsappMessage || `Hello ${settings.companyName || 'Vedant Bhomi Venture'}, I am contacting you from your website to inquire about a construction project. My location is: `
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Anti-spam validation
    const spamCheck = validateFormSpam(formData.honeypot, formRenderTime);
    if (spamCheck.isSpam) {
      setErrorMessage(spamCheck.reason || 'Invalid submission.');
      return;
    }

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      setErrorMessage('Please enter a valid phone number.');
      return;
    }

    const messageLines = [
      `*New Construction Enquiry - ${settings.companyName || 'Vedant Bhomi Venture'}*`,
      `*Client Name:* ${formData.name.trim()}`,
      `*Phone:* ${formData.phone.trim()}`,
      formData.email ? `*Email:* ${formData.email.trim()}` : '',
      `*Location / City:* ${formData.location_city.trim() || 'Not specified'}`,
      `*State / Region:* ${formData.state}`,
      `*Project Type:* ${formData.project_type}`,
      `*Plot / Requirements:* ${formData.message.trim() || 'General consultation request.'}`,
    ].filter(Boolean).join('\n');

    const waUrl = getWhatsAppUrl(settings.whatsapp_number, messageLines);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const mailtoHref = `mailto:${settings.email_primary}?subject=${encodeURIComponent(
    `Website Enquiry: ${formData.project_type} - ${formData.name} (${formData.state})`
  )}&body=${encodeURIComponent(
    `Company: ${settings.companyName || 'Vedant Bhomi Venture'}\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nCity/Location: ${formData.location_city}\nState: ${formData.state}\nProject Type: ${formData.project_type}\n\nMessage/Requirements:\n${formData.message}`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <SEO
        title={`Contact Us & Head Office | ${settings.companyName || 'Vedant Bhomi Venture'} (${settings.brandName || 'VEBCO'})`}
        description={`Contact ${settings.companyName || 'Vedant Bhomi Venture'} (${settings.brandName || 'VEBCO'}). Head office at Bommasandra Jigani Link Rd, Jigani, Karnataka. ${formatServiceAreas(settings.serviceAreas)}.`}
      />

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="section-label">
          <MessageSquare className="w-3.5 h-3.5" />
          Get In Touch
        </span>
        <h1 className="section-title">
          Let’s Build Something Sustainable
        </h1>
        <p className="section-subtitle">
          {settings.companyName || 'Vedant Bhomi Venture'} (also known as {settings.brandName || 'Vedaanth ECO Buildcon / VEBCO'}) executes turnkey CSEB villas, resort cottages, traditional courtyard houses, and interlocking brick supply.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/10 border border-forest/20 text-forest text-xs font-semibold">
          <Compass className="w-4 h-4 text-forest shrink-0" />
          <span>{formatServiceAreas(settings.serviceAreas)}</span>
        </div>
      </div>

      {/* Regional Service Area Strip */}
      <div className="card-earthen p-6 sm:p-8 bg-sand/50 border border-clay/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-base font-bold text-earth flex items-center justify-center md:justify-start gap-2">
              <Map className="w-5 h-5 text-terracotta" />
              <span>We Build Across {formatBuildAcross(settings.serviceAreas)}</span>
            </h3>
            <p className="text-xs text-earth/70">
              Head office at Jigani, Karnataka with active turnkey construction operations and material dispatch across Bangalore, Karnataka, Tamil Nadu, and Andhra Pradesh.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-forest">
            <span className="px-3.5 py-1.5 rounded-full bg-cream border border-clay/20 shadow-sm">Bangalore</span>
            <span className="px-3.5 py-1.5 rounded-full bg-cream border border-clay/20 shadow-sm">Karnataka</span>
            <span className="px-3.5 py-1.5 rounded-full bg-cream border border-clay/20 shadow-sm">Tamil Nadu</span>
            <span className="px-3.5 py-1.5 rounded-full bg-cream border border-clay/20 shadow-sm">Andhra Pradesh</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Contact Info (5 cols), Right Form (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
        {/* Left: Contact Details Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="card-earthen p-6 sm:p-8 space-y-6">
            <h2 className="font-serif text-xl font-bold text-earth border-b border-clay/20 pb-3">
              Head Office & Channels
            </h2>

            <ul className="space-y-5 text-sm text-earth/80">
              <li className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-earth">Head Office Location</span>
                  <span className="text-earth/70 text-xs sm:text-sm">{settings.address}</span>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-earth">Direct Phone / Call</span>
                  <a
                    href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-terracotta font-semibold hover:underline"
                  >
                    {settings.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-forest/15 text-forest flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-earth">WhatsApp Chat</span>
                  <a
                    href={directWhatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>{settings.whatsapp_number}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sand text-earth flex items-center justify-center shrink-0 border border-clay/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-earth">Email Addresses</span>
                  <a
                    href={`mailto:${settings.email_primary}`}
                    className="block text-xs sm:text-sm text-terracotta hover:underline"
                  >
                    {settings.email_primary}
                  </a>
                  {settings.email_secondary && (
                    <a
                      href={`mailto:${settings.email_secondary}`}
                      className="block text-xs text-earth/70 hover:underline"
                    >
                      {settings.email_secondary}
                    </a>
                  )}
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sand text-earth flex items-center justify-center shrink-0 border border-clay/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-earth">Operating Hours</span>
                  <span className="text-forest font-semibold text-xs sm:text-sm">
                    {settings.hours}
                  </span>
                </div>
              </li>
            </ul>

            {/* Direct Channel & Catalogue Links */}
            <div className="pt-4 border-t border-clay/20 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={settings.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition-colors border border-red-200"
              >
                <Youtube className="w-4 h-4" />
                <span>YouTube Channel</span>
              </a>

              <a
                href={settings.whatsapp_catalogue_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-forest/10 text-forest hover:bg-forest/20 text-xs font-bold transition-colors border border-forest/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WA Catalogue</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Interactive Enquiry Form */}
        <div className="lg:col-span-7">
          <div className="card-earthen p-6 sm:p-10 space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl font-bold text-earth">
                Send a Project Enquiry
              </h2>
              <p className="text-xs sm:text-sm text-earth/70">
                Fill in your location and requirements to chat directly with our civil engineers on WhatsApp.
              </p>
            </div>

            {errorMessage && (
              <div className="p-4 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-3 bg-red-50 text-red-900 border border-red-200">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot anti-spam field (hidden) */}
              <input
                type="text"
                name="important_field"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                style={{ display: 'none', position: 'absolute', opacity: 0 }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-earth uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-sand/40 border border-clay/30 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta focus:bg-white text-earth transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-earth uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-sand/40 border border-clay/30 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta focus:bg-white text-earth transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-earth uppercase tracking-wider mb-1.5">
                    Your City / Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hosur, Bangalore, Mysore, Chennai"
                    value={formData.location_city}
                    onChange={(e) => setFormData({ ...formData, location_city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-sand/40 border border-clay/30 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta focus:bg-white text-earth transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-earth uppercase tracking-wider mb-1.5">
                    State / Region *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-sand/40 border border-clay/30 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta focus:bg-white text-earth font-medium transition-all"
                  >
                    <option value="Bangalore">Bangalore</option>
                    <option value="Other Karnataka">Other Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Other">Other Location</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-earth uppercase tracking-wider mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="anand@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-sand/40 border border-clay/30 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta focus:bg-white text-earth transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-earth uppercase tracking-wider mb-1.5">
                    Project Type
                  </label>
                  <select
                    value={formData.project_type}
                    onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-sand/40 border border-clay/30 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta focus:bg-white text-earth transition-all"
                  >
                    <option value="Residential House">Residential House (CSEB)</option>
                    <option value="Budget House">Budget Interlocking House</option>
                    <option value="Villa & Bungalow">Villa & Bungalow</option>
                    <option value="Traditional Courtyard">Traditional Courtyard House</option>
                    <option value="Resorts & Cottages">Resort & Cottages</option>
                    <option value="Farmhouse">Farmhouse Construction</option>
                    <option value="Commercial Building">Commercial Building</option>
                    <option value="Academic Building">Academic Institution</option>
                    <option value="Raw Interlocking Bricks Supply">Raw Mud / Interlocking Bricks Supply</option>
                    <option value="General Enquiry">General Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-earth uppercase tracking-wider mb-1.5">
                  Project Details & Requirements (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Plot size (e.g. 30x40, 40x60), site topography, preferred start timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-sand/40 border border-clay/30 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta focus:bg-white text-earth transition-all"
                />
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  className="btn-primary w-full py-4 px-6 rounded-xl text-sm sm:text-base font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 fill-cream" />
                  <span>Send Enquiry via WhatsApp</span>
                </button>

                <a
                  href={mailtoHref}
                  className="btn-outline w-full py-3 px-6 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 text-center"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Enquiry via Email</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Google Maps Location Embed */}
      <section className="card-earthen p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-2">
          <div>
            <h3 className="font-serif text-lg font-bold text-earth">
              Head Office Location Map
            </h3>
            <p className="text-xs text-earth/70">
              Bommasandra Jigani Link Rd, Jigani, Karnataka 560105
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=Bommasandra+Jigani+Link+Rd,+Jigani,+Karnataka+560105"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta hover:underline"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-clay/20 shadow-inner">
          <iframe
            title="VEBCO Location Map"
            src="https://maps.google.com/maps?q=Bommasandra%20Jigani%20Link%20Rd%2C%20Jigani%2C%20Karnataka%20560105&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
};
