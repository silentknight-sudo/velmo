export type ProductType = 
  | 'passenger'
  | 'home'
  | 'capsule'
  | 'goods'
  | 'hospital'
  | 'escalator'
  | 'moving-walk'
  | 'dumbwaiter';

export interface ElevatorProduct {
  id: string;
  type: ProductType;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  category: 'Residential' | 'Commercial' | 'Specialized' | 'Transit';
  capacity: string;
  maxStops: string;
  driveSystem: string;
  pitDepth: string;
  overhead: string;
  recommendedFor: string[];
  keyFeatures: string[];
  finishes: string[];
  badge?: string;
  accentColor?: string;
  illustrationType: 'capsule' | 'home' | 'passenger' | 'goods' | 'hospital' | 'escalator' | 'movingwalk' | 'dumbwaiter';
}

export interface ProjectShowcase {
  id: string;
  name: string;
  client: string;
  location: string;
  type: string;
  year: string;
  units: string;
  speed: string;
  architect: string;
  description: string;
  category: 'Luxury Residential' | 'Commercial Towers' | 'Hospitality' | 'Public & Healthcare';
  imagePlaceholderId: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  duration: string;
  deliverables: string[];
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization: string;
  location: string;
  project: string;
  rating?: number;
  verifiedBadge?: string;
  installationYear?: string;
}

export interface ConfiguratorState {
  buildingType: 'residential' | 'commercial' | 'hospitality' | 'healthcare' | 'industrial';
  floors: number;
  capacityPersons: number;
  aesthetic: 'brass' | 'champagne' | 'glass' | 'wood-mirror';
  doorType: 'center-opening' | 'telescopic' | 'panoramic-frameless';
}
