export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: number; // in minutes
  price: number;
  included: string;
  excluded: string;
  status: 'active' | 'inactive';
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Realization {
  id: string;
  image: string;
  serviceId: string; // Link to service
  caption: string;
  title?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  brand?: string;
  category?: string;
  status: 'active' | 'inactive';
}

export interface Partner {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  website?: string;
}

export interface AppointmentSettings {
  calendlyUrl: string;
  urgencyMode: boolean;
  urgencyMessage: string;
}