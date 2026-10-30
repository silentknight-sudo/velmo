import { ElevatorProduct, ProcessStep, ProjectShowcase, Testimonial } from '../types';

export const ELEVATOR_PRODUCTS: ElevatorProduct[] = [
  {
    id: 'passenger-lift',
    type: 'passenger',
    title: 'Passenger Lift',
    subtitle: 'High-Volume Commercial & Urban Residences',
    tagline: 'Quiet power and fluid acceleration for modern architectural towers.',
    description: 'Engineered for high-traffic office towers, premium multi-family residences, and institutional developments. Features gearless synchronous PMSM drive units yielding whisper acoustics and 40% regenerative energy efficiency.',
    category: 'Commercial',
    capacity: '450 kg – 2,500 kg (6 to 33 Persons)',
    maxStops: 'Up to 64 Floors',
    driveSystem: 'Gearless Permanent Magnet Synchronous (PMSM) Machine-Room-Less (MRL)',
    pitDepth: '1,200 mm – 1,500 mm',
    overhead: '3,800 mm – 4,400 mm',
    recommendedFor: ['Corporate Headquarters', 'High-Rise Residential Towers', 'Boutique Mixed-Use Complexes'],
    keyFeatures: [
      'Twin optical safety curtains with 154 criss-cross infrared beams',
      'Regenerative braking returning power to building grid',
      'Vibration suppression below 10 mg at maximum rated velocity',
      'Destination dispatch control with smart building integration'
    ],
    finishes: ['Titanium Hairline Stainless Steel', 'Brushed Brass PVD Accents', 'Backlit Starlight Ceiling', 'Italian Marble Floor Recess'],
    badge: 'Flagship Series',
    illustrationType: 'passenger'
  },
  {
    id: 'home-elevator',
    type: 'home',
    title: 'Home Elevator',
    subtitle: 'Bespoke Private Villa & Bungalow Lifts',
    tagline: 'Architectural minimalism crafted for private luxury residences.',
    description: 'Tailored for discerning villas, townhouses, and luxury bungalows. Operates on standard single-phase residential power with zero civil machine room footprint and shallow pit requirement of only 200 mm.',
    category: 'Residential',
    capacity: '250 kg – 500 kg (3 to 6 Persons)',
    maxStops: 'Up to 6 Floors (G + 5)',
    driveSystem: 'Precision Hydraulic or Gearless Compact PMSM Traction',
    pitDepth: '200 mm (Pitless ramp option available)',
    overhead: '2,600 mm headroom',
    recommendedFor: ['Private Luxury Bungalows', 'Multi-Level Penthouses', 'Heritage Estates & Rowhouses'],
    keyFeatures: [
      'Silent belt-drive or whisper hydraulic pump with <35 dB in-cabin sound',
      'Automatic rescue device (ARD) safely lands at nearest floor during power cuts',
      'Custom architectural glass shafts with ultra-slim anodized framing',
      'Single-phase 230V residential domestic power plug-and-play'
    ],
    finishes: ['Warm Brushed Champagne Brass', 'Hand-Selected Walnut Veneer', 'Frosted Ambient Glass Panels', 'Leather Accented Handrail'],
    badge: 'Private Collection',
    illustrationType: 'home'
  },
  {
    id: 'capsule-lift',
    type: 'capsule',
    title: 'Capsule Lift',
    subtitle: 'Panoramic Curved Glass Architectural Icon',
    tagline: 'An exhilarating vertical showcase turning mobility into living art.',
    description: 'Designed as a signature sculptural element for luxury hotel atriums, premium malls, and iconic corporate headquarters. Features curved laminated structural glass with 360-degree or 180-degree panoramic sightlines.',
    category: 'Specialized',
    capacity: '630 kg – 1,600 kg (8 to 21 Persons)',
    maxStops: 'Up to 32 Floors',
    driveSystem: 'Gearless MRL with Polished Counterweight Exposed Assembly',
    pitDepth: '1,400 mm',
    overhead: '4,200 mm',
    recommendedFor: ['5-Star Luxury Hotels', 'Flagship Commercial Atriums', 'Landmark Cultural Centers'],
    keyFeatures: [
      'Double-laminated 12+12 mm ultra-clear low-iron acoustic safety glass',
      'Aerodynamic conical or cylindrical capsule crown and base cones',
      'Integrated brass-toned perimeter LED uplighting and exposed bronze pulleys',
      'Precision roller guide shoes ensuring glass vibration-free travel'
    ],
    finishes: ['Curved Structural Crystal Glass', 'Polished Brass & Bronze Trim', 'Mirror Finished Stainless Floor Base', 'Recessed Halo Illumination'],
    badge: 'Architectural Showpiece',
    illustrationType: 'capsule'
  },
  {
    id: 'goods-lift',
    type: 'goods',
    title: 'Goods / Freight Lift',
    subtitle: 'Heavy-Duty Industrial Precision Cargo Lifts',
    tagline: 'Rugged engineering built for relentless load cycles and factory logistics.',
    description: 'Engineered for logistics hubs, manufacturing facilities, automotive showrooms, and warehouses. Built with reinforced steel cage flooring, impact-resistant bumpers, and multi-point weight distribution.',
    category: 'Industrial' as any,
    capacity: '1,000 kg – 7,500 kg (Heavy Cargo & Forklift rated)',
    maxStops: 'Up to 16 Floors',
    driveSystem: 'Heavy-Duty Geared Traction or Dual Direct-Acting Hydraulic Pistons',
    pitDepth: '1,500 mm – 1,800 mm',
    overhead: '4,500 mm',
    recommendedFor: ['Automotive Service Showrooms', 'Pharmaceutical Warehouses', 'Factory Cleanrooms', 'Logistics Depots'],
    keyFeatures: [
      'Diamond checkered non-slip steel floor plate with forklift point-load rating',
      'Heavy-duty vertical bi-parting or motorized multi-leaf folding doors',
      'Perimeter rubber and stainless steel shock-absorption crash rails',
      'Overload acoustic sensing with 120% structural safety factor'
    ],
    finishes: ['Industrial Epoxy Coated Steel', 'Heavy Gauge 304 Stainless Steel', 'Diamond Floor Plate', 'High-Lumen Protected Strips'],
    illustrationType: 'goods'
  },
  {
    id: 'hospital-lift',
    type: 'hospital',
    title: 'Hospital & Stretcher Lift',
    subtitle: 'Jerk-Free Bed & Critical Care Medical Elevators',
    tagline: 'Absolute smoothness, antibacterial finishes, and priority medical dispatch.',
    description: 'Meticulously crafted to transport stretchers, critical care beds, medical apparatus, and staff with zero acceleration jolt. Includes priority emergency code-blue override and medical gas air filtration.',
    category: 'Specialized',
    capacity: '1,275 kg – 2,000 kg (16 to 26 Persons / Hospital Bed)',
    maxStops: 'Up to 28 Floors',
    driveSystem: 'Gearless PMSM with High-Resolution S-Curve Acceleration Controller',
    pitDepth: '1,400 mm',
    overhead: '4,000 mm',
    recommendedFor: ['Multi-Specialty Hospitals', 'Surgical Centers', 'Convalescent Care Clinics', 'Trauma Institutes'],
    keyFeatures: [
      'Micro-leveling precision within ±2 mm for effortless wheeled bed ingress',
      'Antimicrobial copper-infused touch buttons and non-porous hygiene wall panels',
      'Emergency Code-Blue non-stop express priority recall switch',
      'Extended door dwell timing with multi-ray photo-electric edge sensors'
    ],
    finishes: ['Antibacterial Medical Grade Stainless 316', 'Smooth Seamless Vinyl Flooring', 'Shadowless Indirect Surgical White Lighting', 'Continuous Stainless Bumpers'],
    illustrationType: 'hospital'
  },
  {
    id: 'escalator',
    type: 'escalator',
    title: 'Escalator Systems',
    subtitle: 'Continuous Mass Transit & Commercial Mobility',
    tagline: 'Graceful architectural flow moving thousands seamlessly per hour.',
    description: 'Engineered for airports, rapid transit hubs, and commercial shopping centers. Combines structural truss rigidity with quiet step chains, automated eco-lubrication, and dynamic passenger detection radars.',
    category: 'Transit',
    capacity: '6,000 – 9,000 Passengers / Hour',
    maxStops: 'Vertical rises from 3.0 m to 25.0 m',
    driveSystem: 'VVVF Inverter Drive with Smart Energy Standby Eco-Mode',
    pitDepth: 'Integrated Truss Pit (Standard 1,100 mm)',
    overhead: 'Continuous Open Atrium',
    recommendedFor: ['International Airport Terminals', 'Metro & Railway Stations', 'High-End Retail Plazas'],
    keyFeatures: [
      'High-rigidity rectangular tube steel truss with anti-corrosion zinc immersion',
      'Intelligent radar sensor that slows escalator when no passengers approach (saves 60% energy)',
      'Balustrade glass with integrated green/brass warm LED guiding underhandrail',
      'Comb-plate safety switches with automatic step gap intrusion detection'
    ],
    finishes: ['High-Strength Die-Cast Aluminum Steps', 'Crystal Balustrade Glass', 'Stainless Hairline Cladding', 'Illuminated Skirt Panels'],
    illustrationType: 'escalator'
  },
  {
    id: 'moving-walk',
    type: 'moving-walk',
    title: 'Moving Walk / Travelator',
    subtitle: 'Horizontal & Inclined High-Capacity Flow',
    tagline: 'Effortless horizontal transit for luggage, trolleys, and high footfall.',
    description: 'Designed for effortless transit across extended airport concourses, train terminals, and hypermarket transitions. Available in flat 0° to 6° horizontal walkways and 10° to 12° inclined configurations for shopping cart mobility.',
    category: 'Transit',
    capacity: '6,000 – 11,000 Persons / Hour',
    maxStops: 'Spans up to 120 meters continuous run',
    driveSystem: 'Dual-Drive Synchronous Drive Units with VVVF Smooth Start',
    pitDepth: 'Compact Shallow Pit (900 mm)',
    overhead: 'Clear Open Ceiling Clearance',
    recommendedFor: ['Airport Departure Concourses', 'Intermodal Transit Hubs', 'Exhibition Centers & Arenas'],
    keyFeatures: [
      'Grooved slip-resistant pallet surfaces designed for shopping cart wheel locking',
      'Low-noise synthetic step rollers engineered for 100,000 operating hours',
      'Dual skirt brushes preventing loose clothing or luggage snagging',
      'Precision step chain with automated microprocessor oil-mist lubrication'
    ],
    finishes: ['Stainless Steel Decking & Skirting', 'Toughened Tempered Glass Panels', 'Custom Handrail Colors (Velmo Green / Classic Charcoal)'],
    illustrationType: 'movingwalk'
  },
  {
    id: 'dumbwaiter',
    type: 'dumbwaiter',
    title: 'Dumbwaiter / Service Lift',
    subtitle: 'Bespoke Food, Linen & Document Vertical Courier',
    tagline: 'Compact, stainless-steel vertical courier for hospitality and luxury villas.',
    description: 'Compact vertical cargo elevators engineered for multi-story luxury villas, Michelin-star restaurant pantries, hotels, and medical labs. Safely transports banquet dishes, documents, and linen quietly between floors.',
    category: 'Specialized',
    capacity: '50 kg – 250 kg',
    maxStops: 'Up to 8 Floors',
    driveSystem: 'Compact Machine-Above or Base-Mounted Traction Motor',
    pitDepth: 'Floor level or Counter level loading (0 mm to 300 mm)',
    overhead: '2,200 mm',
    recommendedFor: ['Luxury Multi-Floor Residences', 'Fine Dining Restaurants', 'Hotels & Clubhouses', 'Laboratories & Libraries'],
    keyFeatures: [
      'Food-grade 304/316 stainless steel cabin with removable adjustable shelves',
      'Counter-height loading option eliminates back strain during tray transfers',
      'Vertical bi-parting doors with mechanical and electric interlocks',
      'Heated cabin plate option for keeping gourmet meals at serving temperature'
    ],
    finishes: ['Food-Grade Brush Finished Stainless Steel', 'Counter-Level Brass Trim', 'Digital Floor & Arrival Chime'],
    illustrationType: 'dumbwaiter'
  }
];

export const WHY_VELMO_PILLARS = [
  {
    id: 'precision-engineering',
    number: '01',
    title: 'Precision Rail Alignment (0.01 mm)',
    subtitle: 'Swiss-Calibrated Laser Guidance',
    description: 'Every guide rail is installed using calibrated dual-laser optical trackers, achieving an unmatched shaft tolerance within 0.01 mm. This eliminates micro-vibrations, yielding a ride so smooth a coin placed on edge stays upright at 2.5 m/s.',
    metrics: '< 10 mg horizontal vibration',
    tag: 'Mechanical Excellence'
  },
  {
    id: 'ultra-silent-pmsm',
    number: '02',
    title: 'Whisper Gearless PMSM Propulsion',
    subtitle: 'Acoustics Under 38 dB',
    description: 'Our proprietary Permanent Magnet Synchronous Motors operate without mechanical gears, direct-coupling the drive pulley to the rotor. The result is whisper-quiet acoustic performance quieter than a quiet library, paired with 40% energy regeneration.',
    metrics: '38 dB in-cabin acoustic profile',
    tag: 'Acoustic Mastery'
  },
  {
    id: 'european-safety',
    number: '03',
    title: 'European EN 81-20/50 Certification',
    subtitle: 'Quadruple Redundant Safety Matrix',
    description: 'Every VELMO installation is rigorously engineered and third-party certified to stringent European safety standards EN 81-20 and EN 81-50. Featuring dual progressive safety gears, optical door curtains, and automatic seismic descent.',
    metrics: '100% Third-Party Audited',
    tag: 'Uncompromising Safety'
  },
  {
    id: 'telemetry-support',
    number: '04',
    title: '24×7 Predictive IoT Telemetry',
    subtitle: 'Sub-30 Minute Urban Response',
    description: 'Connected telemetry sensors monitor motor thermal profiles, door cycle friction, and cable tension in real time. We detect and resolve mechanical anomalies before they cause downtime, backed by a dedicated 24×7 dispatch team.',
    metrics: '99.98% Mean Uptime Guarantee',
    tag: 'Predictive Service'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Consultation',
    subtitle: 'Traffic & Architectural Vision',
    duration: 'Stage 01',
    description: 'We study your building volume, traffic patterns, and aesthetic vision before proposing a bespoke engineering solution.',
    deliverables: ['Traffic pattern simulation', 'Shaft spatial feasibility report', 'Aesthetic & finish alignment']
  },
  {
    step: '02',
    title: 'Design & Quote',
    subtitle: 'Bespoke 3D CAD & Itemized Quote',
    duration: 'Stage 02',
    description: 'Custom shaft, cabin, and drive specifications drafted by our Zurich studio alongside a transparent fixed-price quote.',
    deliverables: ['Full architectural 3D BIM/CAD layouts', 'Tailored material & finish curation', 'Transparent fixed-price quotation']
  },
  {
    step: '03',
    title: 'Manufacturing',
    subtitle: 'Precision Swiss CNC Fabrication',
    duration: 'Stage 03',
    description: 'Aerospace-grade CNC machining, synchronous PMSM drives, and titanium PVD finishes manufactured under strict Swiss quality control.',
    deliverables: ['ISO 9001 laser CNC machining', 'European EN 81-20/50 compliance', '500-cycle factory burn-in testing']
  },
  {
    step: '04',
    title: 'Installation',
    subtitle: 'Laser-Guided Rigging & Assembly',
    duration: 'Stage 04',
    description: 'Certified master technicians execute laser-tracked guide rail alignment and clean-site assembly with minimal disruption.',
    deliverables: ['Clean-site low-disruption rigging', 'Laser plumb-line rail alignment', 'Integrated PMSM motor & controller mount']
  },
  {
    step: '05',
    title: 'Maintenance',
    subtitle: '24/7 IoT Telemetry & Lifetime Care',
    duration: 'Stage 05',
    description: 'Continuous predictive IoT monitoring and preventative servicing ensure lifetime zero-downtime performance and whisper-quiet rides.',
    deliverables: ['Live IoT shaft telemetry monitoring', 'Quarterly scheduled preventative service', 'Rapid-dispatch emergency response SLA']
  }
];

export const STATS_COUNTERS = [
  { value: 18, suffix: '+', label: 'Years of Craftsmanship', detail: 'Serving luxury residences & high-rise architecture' },
  { value: 680, suffix: '+', label: 'Bespoke Installations', detail: 'Across luxury villas, hotels & commercial towers' },
  { value: 100, suffix: '%', label: 'EN 81 European Compliance', detail: 'Stringent multi-tier third-party certifications' },
  { value: 38, suffix: ' dB', label: 'Whisper Quiet In-Cabin', detail: 'Acoustically superior to library ambient sound' }
];

export const PROJECT_SHOWCASES: ProjectShowcase[] = [
  {
    id: 'proj-1',
    name: 'The Lumina Glass Atrium',
    client: 'Lumina Hospitality Group',
    location: 'Metropolitan Financial District',
    type: 'Twin Curved Panoramic Capsule Lifts',
    year: '2025',
    units: '2 Units',
    speed: '2.5 m/s',
    architect: 'Foster & Kroll Architecture',
    description: 'Custom cylindrical panoramic glass capsules soaring 18 stories through a central illuminated atrium. Featuring exposed brushed brass suspension pulleys and low-iron crystal glass.',
    category: 'Hospitality',
    imagePlaceholderId: 'capsule'
  },
  {
    id: 'proj-2',
    name: 'Villa Bellini Private Residence',
    client: 'Private Estate Commission',
    location: 'Palm Crest Hills',
    type: 'Bespoke Champagne Brass Home Elevator',
    year: '2024',
    units: '1 Unit',
    speed: '0.4 m/s',
    architect: 'Studio Vetrano Interiors',
    description: 'A whisper-quiet private villa elevator with hand-rubbed champagne titanium brass panels, chevron smoked oak floor, and a completely frameless glass shaft spanning 4 levels.',
    category: 'Luxury Residential',
    imagePlaceholderId: 'home'
  },
  {
    id: 'proj-3',
    name: 'Aura Heights Commercial Tower',
    client: 'Aura Commercial RE',
    location: 'Central Plaza',
    type: 'High-Velocity Passenger Elevator Bank',
    year: '2024',
    units: '6 Units',
    speed: '3.5 m/s',
    architect: 'Mies & Partners International',
    description: 'High-velocity 6-elevator bank equipped with destination dispatch algorithms, mirror-black stainless interiors, and 40% regenerative energy recapture feeding the building grid.',
    category: 'Commercial Towers',
    imagePlaceholderId: 'passenger'
  },
  {
    id: 'proj-4',
    name: 'The Sovereign Penthouse Triplex',
    client: 'Private Residence',
    location: 'Skyline Boulevard',
    type: 'Frameless Glass MRL Lift',
    year: '2025',
    units: '1 Unit',
    speed: '0.5 m/s',
    architect: 'Atelier Monochrome',
    description: 'A floating architectural centerpiece linking three penthouse stories. Engineered with a pitless 150 mm recess and seamless glass landings opening directly into private living salons.',
    category: 'Luxury Residential',
    imagePlaceholderId: 'home'
  },
  {
    id: 'proj-5',
    name: 'Apex Super-Specialty Medical Institute',
    client: 'Apex Health Trust',
    location: 'Health City Campus',
    type: 'Jerk-Free Bed & Stretcher Lifts',
    year: '2023',
    units: '4 Units',
    speed: '1.5 m/s',
    architect: 'Design Collaborative UK',
    description: 'Medical elevators with micro-leveling ±1 mm precision, antimicrobial copper interfaces, and priority code-blue ICU recall circuits for rapid trauma transfers.',
    category: 'Public & Healthcare',
    imagePlaceholderId: 'hospital'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "We wanted a panoramic glass lift for our triplex in Golf Links that wouldn't require a deep excavation pit. VELMO's shallow-pit engineering was flawless. It operates dead silent, and the custom champagne brass accents match our Italian marble flooring perfectly. Our elderly parents now move across floors effortlessly.",
    author: "Vikramaditya Singhania",
    role: "Villa Owner & Industrialist",
    organization: "Singhania Family Estate",
    location: "Golf Links, New Delhi",
    project: "4-Stop Panoramic Glass Villa Lift",
    rating: 5,
    verifiedBadge: "Verified Villa Installation",
    installationYear: "2024",
  },
  {
    quote: "Living right on Worli Sea Face in Mumbai, coastal humidity and whisper-quiet operation were non-negotiable. VELMO's marine-grade stainless steel cabin and German gearless PMSM motor exceeded every expectation. Even during monsoon sea breezes, the ride is as smooth as glass. Their local Mumbai support team is remarkably responsive.",
    author: "Radhika Kothari",
    role: "Penthouse Owner",
    organization: "Sea Face Residences",
    location: "Worli Sea Face, Mumbai",
    project: "Bespoke Seafront Residence Lift",
    rating: 5,
    verifiedBadge: "Verified Penthouse Installation",
    installationYear: "2023",
  },
  {
    quote: "For our boutique gated enclave in Jubilee Hills, we evaluated legacy international conglomerates before choosing VELMO. Their transparent turn-key pricing, strict IS 17900 & EN 81-20 safety certifications, and 3D shaft BIM coordination made the handover completely stress-free. Two years of zero downtime.",
    author: "Rajeshwar Rao",
    role: "Managing Director",
    organization: "Rao Luxury Living Projects",
    location: "Jubilee Hills, Hyderabad",
    project: "Premium Enclave Vertical Transit",
    rating: 5,
    verifiedBadge: "Verified Developer Commission",
    installationYear: "2023",
  },
  {
    quote: "Installing a lift inside an existing independent bungalow in Bengaluru seemed like a civil construction nightmare until VELMO's engineers visited. They customized a self-supporting glass shaft that fit into our staircase courtyard with zero damage to structural beams. The team was punctual, courteous, and exceptionally professional.",
    author: "Col. Arvind & Meenakshi Nambiar (Retd.)",
    role: "Independent Bungalow Owners",
    organization: "Nambiar Heritage Residence",
    location: "Indiranagar, Bengaluru",
    project: "Staircase Courtyard Retrofit Lift",
    rating: 5,
    verifiedBadge: "Verified Home Installation",
    installationYear: "2024",
  },
  {
    quote: "The touchless call dispatch and smartphone remote diagnostic feature are brilliant. During a sudden power trip in our DLF villa, the automatic rescue device kicked in instantly and leveled the lift at the ground floor smoothly. True five-star engineering backed by an attentive, 24/7 dedicated technician in Gurgaon.",
    author: "Siddharth Goenka",
    role: "Private Villa Resident",
    organization: "The Aralias Enclave",
    location: "DLF Phase 5, Gurugram",
    project: "Smart Touchscreen Villa Elevator",
    rating: 5,
    verifiedBadge: "Verified Resident Installation",
    installationYear: "2024",
  },
];

export const TYPOLOGY_MARQUEE = [
  'Residential Villas',
  'Commercial Towers',
  'Healthcare & Hospital Facilities',
  'Luxury Hospitality & Hotels',
  'Industrial & Cargo Hoistways',
  'Retail Centers & Atriums',
  'Corporate Headquarters',
  'Educational Campuses',
];

export const CLIENT_LOGOS = TYPOLOGY_MARQUEE;
