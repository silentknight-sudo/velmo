import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, FileCheck } from 'lucide-react';
import { ELEVATOR_PRODUCTS } from '../data/elevators';
import { submitLead } from '../utils/submitLead';
import type { LeadSubmissionResult } from '../utils/submitLead';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductType?: string;
  initialNotes?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialProductType = '',
  initialNotes = '',
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('Private Residential Villa');
  const [selectedProduct, setSelectedProduct] = useState(initialProductType || 'Home Elevator');
  const [floors, setFloors] = useState('4');
  const [message, setMessage] = useState(initialNotes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadId, setLeadId] = useState('');
  const [notificationStatus, setNotificationStatus] = useState<LeadSubmissionResult['notificationStatus']>('sent');
  const [submissionError, setSubmissionError] = useState('');

  useEffect(() => {
    if (initialProductType) {
      setSelectedProduct(initialProductType);
    }
    if (initialNotes) {
      setMessage(initialNotes);
    }
  }, [initialProductType, initialNotes]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError('');

    try {
      const result = await submitLead({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        buildingType: `${projectType} (${selectedProduct})`,
        floors: floors || 'Standard',
        notes: message.trim(),
        source: 'Modal Technical Consultation Form',
      });
      setLeadId(result.leadId ?? '');
      setNotificationStatus(result.notificationStatus);
      setIsSuccess(true);
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : 'We could not submit your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0D1C18]/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#F7F5EF] text-[#111111] border border-[#B8923D]/40 shadow-2xl p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          autoFocus
          className="absolute top-5 right-5 p-2 text-neutral-500 hover:text-[#111111] transition-colors cursor-pointer"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-6 sm:py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-[#1B3B33] text-[#B8923D] rounded-full mx-auto flex items-center justify-center border-2 border-[#B8923D]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#B8923D] font-bold">
                Consultation Request Received
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1B3B33] font-normal">
                Thank you, {fullName}.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                Your inquiry has been securely saved. Our team will follow up with you.
              </p>
            </div>

            {/* Docket summary */}
            <div className="p-4 bg-white border border-[#B8923D]/30 max-w-md mx-auto text-xs space-y-1.5 font-mono text-left">
              <div className="flex justify-between border-b border-neutral-200 pb-1 text-[11px] text-neutral-500">
                <span>LEAD ID: {leadId || 'Saved'}</span>
                <span className="text-emerald-700 font-bold">SAVED</span>
              </div>
              <div className="text-[#1B3B33]">Model: {selectedProduct} · {floors} Floors</div>
              <div className="text-neutral-600">Client Contact: {phone} · {email}</div>
            </div>

            {notificationStatus === 'not_configured' && (
              <p className="text-xs text-amber-700">Email alerts are not configured yet. Your request is saved in the database.</p>
            )}
            {notificationStatus === 'failed' && (
              <p className="text-xs text-amber-700">Your request is saved, but the email alert could not be sent. Please contact our team directly.</p>
            )}

            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-[#1B3B33] text-[#F7F5EF] text-xs uppercase tracking-widest font-semibold hover:bg-[#B8923D] hover:text-[#111111] transition-colors cursor-pointer"
              >
                Return to Website
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-[#B8923D]/25 pb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#B8923D] font-bold">
                Direct Engineering Inquiry
              </span>
              <h3 id="quote-modal-title" className="text-2xl sm:text-3xl font-serif text-[#1B3B33] font-medium mt-1">
                Request Shaft Feasibility & Quote
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Complimentary 3D CAD shaft drawings, EN 81 compliance checks, and pricing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-mono uppercase text-xs text-neutral-800 font-semibold block">
                  Full Name / Practice *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Julian Sterling / Sterling Architects"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 focus:border-[#B8923D] focus:outline-none transition-colors text-neutral-900 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono uppercase text-xs text-neutral-800 font-semibold block">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 focus:border-[#B8923D] focus:outline-none transition-colors text-neutral-900 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono uppercase text-xs text-neutral-800 font-semibold block">
                  Direct Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 focus:border-[#B8923D] focus:outline-none transition-colors text-neutral-900 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono uppercase text-xs text-neutral-800 font-semibold block">
                  Building Type
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 focus:border-[#B8923D] focus:outline-none transition-colors text-neutral-900 text-xs"
                >
                  <option>Private Residential Villa</option>
                  <option>Commercial Office Tower</option>
                  <option>5-Star Hotel / Hospitality</option>
                  <option>Hospital / Medical Center</option>
                  <option>Industrial Logistics Facility</option>
                  <option>Public Infrastructure / Transit</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono uppercase text-xs text-neutral-800 font-semibold block">
                  Elevator System of Interest
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 focus:border-[#B8923D] focus:outline-none transition-colors text-neutral-900 text-xs"
                >
                  {ELEVATOR_PRODUCTS.map((prod) => (
                    <option key={prod.id} value={prod.title}>
                      {prod.title} ({prod.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono uppercase text-xs text-neutral-800 font-semibold block">
                  Stops / Floors
                </label>
                <input
                  type="text"
                  placeholder="e.g. 4 Stops (G+3) or 18 Floors"
                  value={floors}
                  onChange={(e) => setFloors(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 focus:border-[#B8923D] focus:outline-none transition-colors text-neutral-900 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-mono uppercase text-xs text-neutral-800 font-semibold block">
                Project Specifics / Shaft Dimensions / Timelines
              </label>
              <textarea
                rows={3}
                placeholder="Include details such as clear hoistway dimensions, preferred finishes (brass, glass), or architectural delivery timeline..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 focus:border-[#B8923D] focus:outline-none transition-colors text-neutral-900 text-xs"
              />
            </div>

            <div className="p-3 bg-neutral-200/50 border border-neutral-300 text-xs text-neutral-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B8923D] shrink-0" />
              <span>We respect architectural NDAs. Your blueprints remain confidential under standard engineering privilege.</span>
            </div>

            {submissionError && (
              <p role="alert" className="text-xs text-rose-700">{submissionError}</p>
            )}

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 text-xs uppercase tracking-wider text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-3 bg-[#B8923D] text-[#111111] font-semibold text-xs uppercase tracking-widest hover:bg-[#c9a34d] transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Processing Submission...' : 'Submit Engineering Request'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
