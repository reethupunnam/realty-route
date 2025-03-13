
import { Property, PropertyFilters } from '@/types/property';

// Mock property data
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Waterfront Villa',
    description: 'Luxurious 4-bedroom villa with breathtaking ocean views, a private pool, and direct beach access. This property features high-end finishes, a gourmet kitchen, and spacious outdoor living areas perfect for entertaining.',
    price: 1250000,
    address: {
      street: '123 Oceanview Drive',
      city: 'Malibu',
      state: 'CA',
      zipCode: '90265',
      country: 'USA',
      latitude: 34.025922,
      longitude: -118.779757,
    },
    bedrooms: 4,
    bathrooms: 3.5,
    area: 3200,
    propertyType: 'house',
    yearBuilt: 2018,
    features: [
      'Ocean View', 
      'Private Pool', 
      'Gourmet Kitchen', 
      'Home Theater', 
      'Smart Home System',
      'Walk-in Closets',
      'Multiple Terraces'
    ],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'
    ],
    listedAt: '2023-09-15T12:00:00Z',
    agent: {
      id: 'a1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@realtyroute.com',
      phone: '(310) 555-1234',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'
    }
  },
  {
    id: '2',
    title: 'Charming Downtown Loft',
    description: 'Stunning industrial loft in the heart of downtown. This unique property features 14-foot ceilings, exposed brick walls, and large factory windows that flood the space with natural light.',
    price: 750000,
    address: {
      street: '456 Urban Street',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA',
      latitude: 47.608013,
      longitude: -122.335167,
    },
    bedrooms: 2,
    bathrooms: 2,
    area: 1800,
    propertyType: 'apartment',
    yearBuilt: 1920,
    features: [
      'Exposed Brick', 
      'High Ceilings', 
      'Hardwood Floors', 
      'Rooftop Access', 
      'Stainless Steel Appliances',
      'Walk to Restaurants'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db',
      'https://images.unsplash.com/photo-1551361415-69c87624334f'
    ],
    listedAt: '2023-10-02T14:30:00Z',
    agent: {
      id: 'a2',
      name: 'Michael Rodriguez',
      email: 'm.rodriguez@realtyroute.com',
      phone: '(206) 555-6789',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    }
  },
  {
    id: '3',
    title: 'Family-Friendly Suburban Home',
    description: 'Beautiful 5-bedroom family home in a sought-after school district. Featuring a large backyard with a playground, updated kitchen, and spacious living areas perfect for growing families.',
    price: 850000,
    address: {
      street: '789 Maple Lane',
      city: 'Austin',
      state: 'TX',
      zipCode: '78703',
      country: 'USA',
      latitude: 30.267153,
      longitude: -97.743057,
    },
    bedrooms: 5,
    bathrooms: 3,
    area: 2800,
    propertyType: 'house',
    yearBuilt: 2005,
    features: [
      'Large Backyard', 
      'Updated Kitchen', 
      'Two-Car Garage', 
      'Community Pool',
      'Fireplace',
      'Basement Recreation Room'
    ],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83'
    ],
    listedAt: '2023-09-28T09:15:00Z',
    agent: {
      id: 'a3',
      name: 'Jennifer Taylor',
      email: 'jennifer.t@realtyroute.com',
      phone: '(512) 555-4321',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956'
    }
  },
  {
    id: '4',
    title: 'Luxury High-Rise Condo',
    description: 'Elegant 3-bedroom condo with panoramic city views from the 37th floor. This property includes access to premium building amenities including a concierge, fitness center, and rooftop pool.',
    price: 1350000,
    address: {
      street: '101 Skyline Avenue',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA',
      latitude: 41.884150,
      longitude: -87.632409,
    },
    bedrooms: 3,
    bathrooms: 2.5,
    area: 2100,
    propertyType: 'condo',
    yearBuilt: 2016,
    features: [
      'City Views', 
      'Concierge Service', 
      'Fitness Center', 
      'Rooftop Pool', 
      'Pet-Friendly',
      'Wine Cellar'
    ],
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6',
      'https://images.unsplash.com/photo-1613553507747-5f8d62ad5904',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb'
    ],
    listedAt: '2023-10-10T11:45:00Z',
    agent: {
      id: 'a4',
      name: 'David Kim',
      email: 'd.kim@realtyroute.com',
      phone: '(312) 555-9876',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    }
  },
  {
    id: '5',
    title: 'Historic Brownstone Townhouse',
    description: 'Meticulously restored 19th-century brownstone with original architectural details and modern updates. This elegant townhouse features high ceilings, ornate fireplaces, and a private garden.',
    price: 1875000,
    address: {
      street: '55 Heritage Row',
      city: 'Boston',
      state: 'MA',
      zipCode: '02108',
      country: 'USA',
      latitude: 42.357435,
      longitude: -71.054552,
    },
    bedrooms: 4,
    bathrooms: 3.5,
    area: 3400,
    propertyType: 'townhouse',
    yearBuilt: 1885,
    features: [
      'Historical Details', 
      'Original Hardwood', 
      'Multiple Fireplaces', 
      'Garden Patio', 
      'Wine Cellar',
      'Library with Built-in Bookshelves'
    ],
    images: [
      'https://images.unsplash.com/photo-1571055107559-3e67626fa8be',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
      'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f'
    ],
    listedAt: '2023-09-20T10:30:00Z',
    agent: {
      id: 'a5',
      name: 'Elizabeth Chen',
      email: 'e.chen@realtyroute.com',
      phone: '(617) 555-2468',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
    }
  },
  {
    id: '6',
    title: 'Mountain View Retreat',
    description: 'Secluded mountain home with breathtaking views and outdoor living spaces. This property sits on 5 acres and features an open floor plan, stone fireplace, and wrap-around deck.',
    price: 975000,
    address: {
      street: '246 Pine Ridge Road',
      city: 'Denver',
      state: 'CO',
      zipCode: '80212',
      country: 'USA',
      latitude: 39.742043,
      longitude: -104.991531,
    },
    bedrooms: 3,
    bathrooms: 2,
    area: 2200,
    propertyType: 'house',
    yearBuilt: 2010,
    features: [
      'Mountain Views', 
      'Stone Fireplace', 
      'Wrap-Around Deck', 
      'Hot Tub', 
      'Home Office',
      'Hiking Trails'
    ],
    images: [
      'https://images.unsplash.com/photo-1506974210756-8e1b8985d348',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6',
      'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e'
    ],
    listedAt: '2023-10-05T16:20:00Z',
    agent: {
      id: 'a6',
      name: 'Robert Miller',
      email: 'r.miller@realtyroute.com',
      phone: '(303) 555-1357',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a'
    }
  }
];

export const getProperties = (filters?: PropertyFilters): Promise<Property[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredProperties = [...mockProperties];
      
      if (filters) {
        if (filters.minPrice !== undefined) {
          filteredProperties = filteredProperties.filter(p => p.price >= filters.minPrice!);
        }
        
        if (filters.maxPrice !== undefined) {
          filteredProperties = filteredProperties.filter(p => p.price <= filters.maxPrice!);
        }
        
        if (filters.minBedrooms !== undefined) {
          filteredProperties = filteredProperties.filter(p => p.bedrooms >= filters.minBedrooms!);
        }
        
        if (filters.minBathrooms !== undefined) {
          filteredProperties = filteredProperties.filter(p => p.bathrooms >= filters.minBathrooms!);
        }
        
        if (filters.propertyType !== undefined) {
          filteredProperties = filteredProperties.filter(p => p.propertyType === filters.propertyType);
        }
        
        if (filters.city !== undefined) {
          filteredProperties = filteredProperties.filter(p => 
            p.address.city.toLowerCase().includes(filters.city!.toLowerCase())
          );
        }
        
        if (filters.state !== undefined) {
          filteredProperties = filteredProperties.filter(p => p.address.state === filters.state);
        }
      }
      
      resolve(filteredProperties);
    }, 500); // Simulate API delay
  });
};

export const getPropertyById = (id: string): Promise<Property | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const property = mockProperties.find(p => p.id === id) || null;
      resolve(property);
    }, 300);
  });
};

// Add a function to format currency
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);
};
