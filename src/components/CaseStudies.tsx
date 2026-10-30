import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Layers, 
  Gauge, 
  Volume2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ElevatorProduct } from '../types';

interface CaseStudiesProps {
  onSelectProduct: (product: ElevatorProduct) => void;
  onRequestQuote: (context?: string) => void;
}

interface CaseStudyItem {
  id: string;
  projectTitle: string;
  location: string;
  architect: string;
  typology: string;
  heroImage: string;
  year: string;
  challenge: string;
  engineeringSolution: string;
  verifiedResults: {
    metric: string;
    label: string;
  }[];
  specSummary: string;
  productId: string;
}

const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'zurich-lake-residence',
    projectTitle: 'Villa Bellaria Waterfront Residence',
    location: 'Zürichsee, Switzerland',
    architect: 'Kaufmann & Partner Architekten',
    typology: 'Luxury Residential Villa',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    year: '2025',
    challenge: 'Historic lakeside estate required an internal vertical lift across 4 levels with strict preservation rules: zero rooftop machine room, minimal 200 mm pit excavation, and absolute silent operation adjacent to the master bedroom wing.',
    engineeringSolution: 'Installed custom VELMO Villa MRL Traction system with 200 mm shallow pit ramp, champagne-brushed PVD stainless finishes, and direct-coupled PMSM gearless drive suspended on double acoustic isolators.',
    verifiedResults: [
      { metric: '32 dB', label: 'In-Cabin Cruising Sound' },
      { metric: '200 mm', label: 'Ultra-Shallow Pit Depth' },
      { metric: '0.00 mm', label: 'Structural Settlement' }
    ],
    specSummary: '4 Stops · 450 kg (6 Persons) · 0.50 m/s · Champagne Brass PVD & Smoked Glass',
    productId: 'home-elevator'
  },
  {
    id: 'geneva-private-bank',
    projectTitle: 'Banque Privée Mirabaud Headquarters',
    location: 'Geneva, Switzerland',
    architect: 'Atelier d\'Architecture de Genève',
    typology: 'Class-A Corporate Headquarters',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    year: '2024',
    challenge: 'A bustling multi-tenant financial headquarters faced extreme morning elevator queues with 45-second wait times and high peak energy consumption.',
    engineeringSolution: 'Engineered a 4-car destination dispatch elevator bank with permanent magnet synchronous motors, regenerative braking, and optical safety curtains. Algorithmically pre-routes passengers before boarding.',
    verifiedResults: [
      { metric: '14.2 s', label: 'Average Peak Hall Wait' },
      { metric: '42.8%', label: 'Power Fed Back to Grid' },
      { metric: '99.99%', label: '12-Month Monitored Uptime' }
    ],
    specSummary: '16 Stops · 1,600 kg (21 Persons) · 2.50 m/s · Regenerative PMSM Destination Dispatch',
    productId: 'passenger-lift'
  },
  {
    id: 'milan-luxury-atrium',
    projectTitle: 'Palazzo Sforza Panoramic Atrium Hotel',
    location: 'Milan, Italy',
    architect: 'Studio Lissoni Associati',
    typology: '5-Star Luxury Hospitality',
    heroImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=85',
    year: '2025',
    challenge: 'A protected historic courtyard required a sculptural glass capsule elevator visible from all guest suites, without bulky exposed cables, motors, or opaque mechanical counterweights.',
    engineeringSolution: 'Designed a 360-degree cylindrical curved crystal capsule lift with concealed underslung traction rigging, mirror-polished brass structural crowns, and silent magnetic guide shoes.',
    verifiedResults: [
      { metric: '360°', label: 'Panoramic Sightline' },
      { metric: '<8 mg', label: 'Vibration Across Glass' },
      { metric: '0 dB', label: 'External Shaft Whine' }
    ],
    specSummary: '7 Stops · 1,000 kg (13 Persons) · 1.60 m/s · Curved Laminated Crystal & Polished Bronze',
    productId: 'capsule-lift'
  },
  {
    id: 'basel-biotech-campus',
    projectTitle: 'Novis BioPharma Sterile Research Tower',
    location: 'Basel, Switzerland',
    architect: 'Herzog & de Meuron Partner Studio',
    typology: 'Healthcare & Cleanroom Facility',
    heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=85',
    year: '2024',
    challenge: 'Continuous transport of sensitive robotic surgical gear, intensive care beds, and hazardous bio-reagents requiring zero jerk upon floor docking and positive air pressure anti-contamination airlocks.',
    engineeringSolution: 'VELMO Cura Hospital Medical elevator equipped with closed-loop laser floor positioning within ±0.5 mm, negative pressure cabin air filtration, and heavy stainless bumper protection.',
    verifiedResults: [
      { metric: '±0.5 mm', label: 'Docking Leveling Precision' },
      { metric: '2,500 kg', label: 'Bed & Stretcher Rating' },
      { metric: 'ISO 5', label: 'Cleanroom Certified Cabin' }
    ],
    specSummary: '11 Stops · 2,500 kg (Medical Bed Rated) · 1.75 m/s · Medical Vector Drive',
    productId: 'hospital-lift'
  }
];

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onSelectProduct, onRequestQuote }) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const activeProject = CASE_STUDIES[activeProjectIndex];

  return (
    <section id="case-studies" className="py-24 sm:py-32 bg-[#F7F5EF] text-[#111111] relative overflow-hidden border-t border-[#1B3B33]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#B8923D] font-bold">
                BUILT ARCHITECTURAL PROOF
              </span>
              <span className="w-8 h-[1px] bg-[#B8923D]/50" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1B3B33] font-light leading-tight">
              Real Buildings. Proven Precision. <br />
              <span className="italic font-normal text-[#B8923D]">Zero Engineering Compromises.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 font-sans max-w-md leading-relaxed">
            See how world-class architects solved difficult structural envelopes, acoustic thresholds, and high-throughput challenges using VELMO systems.
          </p>
        </div>

        {/* Project Selector Navigation (Segmented Bar) */}
        <div 
          role="tablist" 
          aria-label="Built Architectural Case Studies"
          className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8 bg-[#EBE7DC] p-1.5 rounded-xl border border-[#1B3B33]/15"
        >
          {CASE_STUDIES.map((project, idx) => {
            const isSelected = activeProjectIndex === idx;
            return (
              <button
                key={project.id}
                role="tab"
                id={`case-study-tab-${idx}`}
                aria-selected={isSelected}
                aria-controls={`case-study-panel-${idx}`}
                onClick={() => setActiveProjectIndex(idx)}
                className={`p-3 sm:p-4 text-left rounded-lg transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white shadow-md text-[#1B3B33]'
                    : 'text-neutral-700 hover:text-[#1B3B33] hover:bg-white/50'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono uppercase mb-1">
                  <span className={isSelected ? 'text-[#B8923D] font-bold' : 'text-neutral-500 font-semibold'}>
                    PROJ 0{idx + 1}
                  </span>
                  <span className="text-neutral-500 font-medium">{project.year}</span>
                </div>
                <div className="font-serif text-sm font-semibold truncate leading-tight text-[#1B3B33]">
                  {project.projectTitle}
                </div>
                <div className="text-xs text-neutral-600 truncate mt-0.5 font-sans font-medium">
                  {project.typology}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Case Study Display Card */}
        <div 
          role="tabpanel"
          id={`case-study-panel-${activeProjectIndex}`}
          aria-labelledby={`case-study-tab-${activeProjectIndex}`}
          className="bg-white border border-[#1B3B33]/15 rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Left Column: Photograph & Verified Results Badge */}
          <div className="lg:col-span-5 relative min-h-[360px] sm:min-h-[460px] overflow-hidden bg-[#1B3B33]">
            <img 
              src={activeProject.heroImage} 
              alt={`${activeProject.projectTitle} - Architectural Elevator Installation`}
              className="w-full h-full object-cover object-center"
            />
            {/* Duotone brand overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B3B33]/95 via-[#1B3B33]/50 to-transparent" />

            {/* Bottom Floating Stats Strip */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#122621]/95 backdrop-blur-md border border-[#B8923D]/40 text-white shadow-lg">
              <span className="text-xs font-mono uppercase tracking-wider text-[#B8923D] block font-bold mb-2">
                VERIFIED COMMISSION TELEMETRY:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {activeProject.verifiedResults.map((result, i) => (
                  <div key={i} className="text-center sm:text-left">
                    <span className="text-base sm:text-xl font-mono font-bold text-[#E6D2A8] block">
                      {result.metric}
                    </span>
                    <span className="text-xs text-[#F7F5EF]/85 leading-tight block mt-0.5 font-sans">
                      {result.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: In-Depth Engineering Dossier */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Eyebrow and Location */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-200 text-xs font-mono">
                <span className="text-[#B8923D] font-bold uppercase tracking-wider">
                  {activeProject.typology}
                </span>
                <span className="flex items-center gap-1 text-neutral-500">
                  <MapPin className="w-3.5 h-3.5 text-[#B8923D]" />
                  <span>{activeProject.location}</span>
                </span>
              </div>

              {/* Title & Architecture Firm */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#1B3B33] font-light leading-tight">
                  {activeProject.projectTitle}
                </h3>
                <p className="text-xs text-neutral-500 font-sans mt-1">
                  Commissioned by <strong className="text-neutral-800 font-medium">{activeProject.architect}</strong>
                </p>
              </div>

              {/* Architectural Challenge */}
              <div className="bg-[#FAF9F5] p-4 rounded-lg border border-[#1B3B33]/10 space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-600 font-bold block">
                  ARCHITECTURAL CHALLENGE:
                </span>
                <p className="text-xs sm:text-sm text-neutral-700 font-sans leading-relaxed">
                  {activeProject.challenge}
                </p>
              </div>

              {/* VELMO Engineering Solution */}
              <div className="bg-[#F1EDE2] p-4 rounded-lg border border-[#B8923D]/30 space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[#B8923D] font-bold block">
                  VELMO ENGINEERING EXECUTION:
                </span>
                <p className="text-xs sm:text-sm text-[#1B3B33] font-sans leading-relaxed font-medium">
                  {activeProject.engineeringSolution}
                </p>
              </div>

              {/* Technical Spec Strip */}
              <div className="pt-2 text-xs font-mono text-neutral-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8923D]" />
                <span className="font-semibold text-neutral-800">SYSTEM SPECS:</span>
                <span>{activeProject.specSummary}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => onRequestQuote(`Case Study Ingestion: ${activeProject.projectTitle}`)}
                className="px-6 py-3 bg-[#1B3B33] text-[#F7F5EF] font-semibold text-xs uppercase tracking-widest hover:bg-[#254f44] transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Request Similar Project Dossier</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#B8923D]" />
              </button>

              <div className="text-xs text-neutral-500 font-sans">
                Full engineering drawings & CAD layouts available on request.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
