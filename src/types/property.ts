export type PropertyType = 'house' | 'apartment' | 'condo' | 'townhouse' | 'land' | 'villa';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };
  bedrooms: number;
  bathrooms: number;
  area: number; // in square feet
  propertyType: PropertyType;
  yearBuilt: number;
  features: string[];
  images: string[];
  listedAt: string; // ISO date string
  agent: {
    id: string;
    name: string;
    email: string;
    phone: string;
    photo?: string;
  };
}

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  propertyType?: PropertyType;
  city?: string;
  state?: string;
}
