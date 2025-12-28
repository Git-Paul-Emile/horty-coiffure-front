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