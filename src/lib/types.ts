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

export interface OpeningHour {
  day: string;
  isClosed: boolean;
  openingTime: string;
  closingTime: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

export interface AdminCredentials {
  email: string;
  password: string;
}

export interface AdminSettings {
  openingHours: OpeningHour[];
  contactInfo: ContactInfo;
  adminCredentials: AdminCredentials;
}