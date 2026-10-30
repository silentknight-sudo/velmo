import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { submitLead } from '../utils/submitLead';
import type { LeadSubmissionResult } from '../utils/submitLead';

interface TrackingParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  fbclid: string;
  page_url: string;
  timestamp: string;
}

interface LeadData extends TrackingParams {
  fullName: string;
  phone: string;
  email: string;
  buildingType: string;
  floors: string;
}

/**
 * Analytics conversion dispatch hook
 * Fires after successful lead validation and submission
 */
const trackLead = (leadData: LeadData) => {
  if (typeof window === 'undefined') return;

  // 1. Google Ads Conversion Event
  // window.gtag?.('event', 'conversion', {
  //   send_to: 'AW-XXXXXXXXX/YYYYYYYYYYYYYY',
  //   value: 1.0,
  //   currency: 'USD',
  // });

  // 2. Meta Pixel "Lead" Event
  // window.fbq?.('track', 'Lead', {
  //   content_name: leadData.buildingType,
  //   status: 'submitted',
  // });

  // 3. Google Analytics 4 "generate_lead" Event
  // window.gtag?.('event', 'generate_lead', {
  //   currency: 'USD',
  //   value: 100,
  //   lead_type: leadData.buildingType,
  // });

  console.log('[Analytics] Lead converted successfully:', {
    buildingType: leadData.buildingType,
    floors: leadData.floors,
    timestamp: leadData.timestamp,
  });
};

export const LeadHeroSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    buildingType: 'Residential',
    floors: '',
    website: '', // Honeypot field (must stay empty)
  });

  const [trackingParams, setTrackingParams] = useState<TrackingParams>({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
    gclid: '',
    fbclid: '',
    page_url: '',
    timestamp: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<LeadSubmissionResult['notificationStatus']>('sent');
  const [submissionError, setSubmissionError] = useState('');

  // Capture UTM parameters and URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      setTrackingParams({
        utm_source: searchParams.get('utm_source') || '',
        utm_medium: searchParams.get('utm_medium') || '',
        utm_campaign: searchParams.get('utm_campaign') || '',
        utm_term: searchParams.get('utm_term') || '',
        utm_content: searchParams.get('utm_content') || '',
        gclid: searchParams.get('gclid') || '',
        fbclid: searchParams.get('fbclid') || '',
        page_url: window.location.href,
        timestamp: new Date().toISOString(),
      });
    }
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else {
      // Validate country code and numbers: must contain at least 7 digits, allowed +, -, (), spaces
      const digitCount = (formData.phone.match(/\d/g) || []).length;
      if (digitCount < 7) {
        errs.phone = 'Please enter a valid phone number with country code';
      }
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email';
    }

    if (!formData.buildingType) {
      errs.buildingType = 'Please select a building type';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check: If bot filled out the hidden website field, pretend it succeeded silently
    if (formData.website.trim() !== '') {
      console.warn('Bot submission blocked via honeypot.');
      setIsSubmitted(true);
      return;
    }

    if (!validate()) {
      return;
    }

    const payload = {
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      buildingType: formData.buildingType,
      floors: formData.floors || 'Not Specified',
      website: formData.website,
      source: 'Website Hero Quote Form',
      pageUrl: trackingParams.page_url,
      utmSource: trackingParams.utm_source,
      utmMedium: trackingParams.utm_medium,
      utmCampaign: trackingParams.utm_campaign,
      utmTerm: trackingParams.utm_term,
      utmContent: trackingParams.utm_content,
      gclid: trackingParams.gclid,
      fbclid: trackingParams.fbclid,
    };

    setSubmissionError('');
    setIsSubmitting(true);
    try {
      const result = await submitLead(payload);
      setNotificationStatus(result.notificationStatus);
      if (result.saved) trackLead({ ...payload, ...trackingParams });
      setIsSubmitted(true);
    } catch (err) {
      setSubmissionError(err instanceof Error ? err.message : 'We could not submit your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <section
      id="lead-quote-form"
      className="relative w-full bg-[#F7F5EF] text-[#111111] pt-28 sm:pt-32 lg:pt-36 pb-10 sm:pb-14 px-6 sm:px-10 lg:px-16 border-b border-[#B8923D]/25 overflow-hidden"
    >
      {/* Subtle architectural background grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(#1B3B33 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* ========================================================
              LEFT COLUMN: HERO COPY & TRUST BADGES
              ======================================================== */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">

            {/* Monumental Forest Green Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-serif text-[#1B3B33] font-light tracking-tight leading-[1.04]">
                Engineered to Rise.
              </h1>
              <p className="text-base sm:text-lg text-neutral-700 font-sans font-light leading-relaxed max-w-xl">
                Bespoke elevators for every building type · Precision Swiss engineering.
              </p>
            </div>


            {/* Architectural note */}
            <div className="hidden sm:flex items-center gap-3 pt-1 text-xs text-neutral-500 font-sans">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#B8923D]/15 text-[#B8923D]">
                <Sparkles className="w-3 h-3" />
              </span>
              <span>
                Trusted by leading architects, developers, and private estate owners worldwide.
              </span>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: STATIC LEAD FORM CARD (SHOWN FIRST FOR ADS)
              ======================================================== */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#FFFFFF] rounded-none border border-[#B8923D]/30 border-t-4 border-t-[#B8923D] shadow-xl shadow-[#1B3B33]/5 p-6 sm:p-7 relative">
              
              {isSubmitted ? (
                /* Elegant In-Card Thank You Success State with Structured Notification */
                <div className="py-6 sm:py-8 text-center space-y-4 animate-fadeIn">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl text-[#1B3B33] font-normal">
                      Quote Request Received
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-neutral-600 px-2">
                      Your request has been securely saved. Our team will follow up with you.
                    </p>
                  </div>

                  {notificationStatus === 'not_configured' && (
                    <p className="text-[11px] text-amber-700">Email alerts are not configured yet. Your request is saved in the database.</p>
                  )}
                  {notificationStatus === 'failed' && (
                    <p className="text-[11px] text-amber-700">Your request is saved, but the email alert could not be sent. Please contact our team directly.</p>
                  )}

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: '',
                          phone: '',
                          email: '',
                          buildingType: 'Residential',
                          floors: '',
                          website: '',
                        });
                      }}
                      className="text-xs uppercase font-mono tracking-wider text-[#B8923D] hover:underline cursor-pointer"
                    >
                      Submit Another Specification →
                    </button>
                  </div>
                </div>
              ) : (
                /* Static High-Converting Lead Form */
                <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                  {/* Card Title & Subtitle */}
                  <div className="border-b border-[#1B3B33]/10 pb-3">
                    <h2 className="font-serif text-2xl sm:text-[1.7rem] text-[#1B3B33] font-normal leading-tight">
                      Get Your Free Quote
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-500 font-sans mt-0.5">
                      Reply within 24 hours.
                    </p>
                  </div>

                  {/* Honeypot field (hidden from genuine users, traps spam bots) */}
                  <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                    <label htmlFor="website-honeypot">Website</label>
                    <input
                      id="website-honeypot"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                    />
                  </div>

                  {/* Field 1: Full Name */}
                  <div className="space-y-1">
                    <label
                      htmlFor="lead-form-name"
                      className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#1B3B33]"
                    >
                      Full Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="lead-form-name"
                      name="fullName"
                      type="text"
                      required
                      placeholder="e.g. Alistair Vance"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F7F5EF]/50 border transition-colors outline-hidden focus:bg-white ${
                        errors.fullName
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-[#1B3B33]/20 focus:border-[#B8923D]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-600 font-sans">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Field 2 & 3: Phone (with country code) & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label
                        htmlFor="lead-form-phone"
                        className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#1B3B33]"
                      >
                        Phone <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="lead-form-phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F7F5EF]/50 border transition-colors outline-hidden focus:bg-white ${
                          errors.phone
                            ? 'border-rose-500 focus:border-rose-500'
                            : 'border-[#1B3B33]/20 focus:border-[#B8923D]'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-rose-600 font-sans">{errors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="lead-form-email"
                        className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#1B3B33]"
                      >
                        Email <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="lead-form-email"
                        name="email"
                        type="email"
                        required
                        placeholder="architect@firm.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F7F5EF]/50 border transition-colors outline-hidden focus:bg-white ${
                          errors.email
                            ? 'border-rose-500 focus:border-rose-500'
                            : 'border-[#1B3B33]/20 focus:border-[#B8923D]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-600 font-sans">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Field 4 & 5: Building Type (required) & Number of Floors (optional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label
                        htmlFor="lead-form-building-type"
                        className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#1B3B33]"
                      >
                        Building Type <span className="text-rose-600">*</span>
                      </label>
                      <select
                        id="lead-form-building-type"
                        name="buildingType"
                        required
                        value={formData.buildingType}
                        onChange={(e) => handleInputChange('buildingType', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F7F5EF]/50 border border-[#1B3B33]/20 focus:border-[#B8923D] transition-colors outline-hidden focus:bg-white"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Retail">Retail</option>
                        <option value="Corporate Offices">Corporate Offices</option>
                        <option value="Educational Institutions">Educational Institutions</option>
                        <option value="Other / Custom">Other / Custom</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="lead-form-floors"
                        className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#1B3B33]"
                      >
                        Floors <span className="text-neutral-400 font-normal lowercase">(optional)</span>
                      </label>
                      <select
                        id="lead-form-floors"
                        name="floors"
                        value={formData.floors}
                        onChange={(e) => handleInputChange('floors', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F7F5EF]/50 border border-[#1B3B33]/20 focus:border-[#B8923D] transition-colors outline-hidden focus:bg-white"
                      >
                        <option value="">Select floors</option>
                        <option value="1 – 2 Floors">1 – 2 Floors</option>
                        <option value="3 – 5 Floors">3 – 5 Floors</option>
                        <option value="6 – 10 Floors">6 – 10 Floors</option>
                        <option value="11 – 25 Floors">11 – 25 Floors</option>
                        <option value="26+ High-Rise">26+ High-Rise</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button (full width, gold, dark text) */}
                  {submissionError && (
                    <p role="alert" className="text-xs text-rose-700 font-sans">{submissionError}</p>
                  )}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 bg-[#B8923D] hover:bg-[#cba44e] text-[#111111] font-semibold tracking-wider uppercase text-xs transition-all duration-200 cursor-pointer shadow-md active:scale-[0.99] disabled:opacity-75 flex items-center justify-center gap-2 group"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Your Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Get My Free Quote →</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Micro-copy below button */}
                  <div className="pt-1 text-center">
                    <p className="text-[11px] sm:text-xs text-neutral-500 font-sans flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#B8923D]" />
                      <span>No spam. Your details stay private.</span>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
