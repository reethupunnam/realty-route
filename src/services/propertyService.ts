import { Property, PropertyFilters } from '@/types/property';

// Mock property data for Telangana, India
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Villa in Banjara Hills',
    description: 'Luxurious 4-bedroom villa with breathtaking views, a private pool, and lush gardens. This property features high-end finishes, a gourmet kitchen, and spacious outdoor living areas perfect for entertaining.',
    price: 12500000, // 1.25 Crore
    address: {
      street: '123 Road No. 12',
      city: 'Hyderabad',
      state: 'Telangana',
      zipCode: '500034',
      country: 'India',
      latitude: 17.4128,
      longitude: 78.4308,
    },
    bedrooms: 4,
    bathrooms: 3.5,
    area: 3200,
    propertyType: 'house',
    yearBuilt: 2018,
    features: [
      'Swimming Pool', 
      'Garden View', 
      'Modular Kitchen', 
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
      name: 'Priya Sharma',
      email: 'priya.sharma@realtyroute.com',
      phone: '+91 9876543210',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'
    }
  },
  {
    id: '2',
    title: 'Premium Apartment in Jubilee Hills',
    description: 'Stunning modern apartment in the heart of Jubilee Hills. This unique property features high ceilings, premium finishes, and large windows that flood the space with natural light.',
    price: 7500000, // 75 Lakhs
    address: {
      street: '456 Road No. 86',
      city: 'Hyderabad',
      state: 'Telangana',
      zipCode: '500033',
      country: 'India',
      latitude: 17.4323,
      longitude: 78.4070,
    },
    bedrooms: 2,
    bathrooms: 2,
    area: 1800,
    propertyType: 'apartment',
    yearBuilt: 2020,
    features: [
      'Modern Design', 
      'High Ceilings', 
      'Marble Floors', 
      'Clubhouse Access', 
      'Modular Kitchen',
      'Near Metro Station'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db',
      'https://images.unsplash.com/photo-1551361415-69c87624334f'
    ],
    listedAt: '2023-10-02T14:30:00Z',
    agent: {
      id: 'a2',
      name: 'Rahul Verma',
      email: 'rahul.verma@realtyroute.com',
      phone: '+91 8765432109',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    }
  },
  {
    id: '3',
    title: 'Family Home in Manikonda',
    description: 'Beautiful 5-bedroom family home in a sought-after school district. Featuring a large backyard with a playground, updated kitchen, and spacious living areas perfect for growing families.',
    price: 8500000, // 85 Lakhs
    address: {
      street: '789 Golden Heights',
      city: 'Hyderabad',
      state: 'Telangana',
      zipCode: '500089',
      country: 'India',
      latitude: 17.4014,
      longitude: 78.3698,
    },
    bedrooms: 5,
    bathrooms: 3,
    area: 2800,
    propertyType: 'house',
    yearBuilt: 2015,
    features: [
      'Large Backyard', 
      'Modular Kitchen', 
      'Two-Car Garage', 
      'Community Pool',
      'Pooja Room',
      'Recreation Room'
    ],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83'
    ],
    listedAt: '2023-09-28T09:15:00Z',
    agent: {
      id: 'a3',
      name: 'Ananya Reddy',
      email: 'ananya.r@realtyroute.com',
      phone: '+91 7654321098',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956'
    }
  },
  {
    id: '4',
    title: 'Luxury Apartment in Financial District',
    description: 'Elegant 3-bedroom apartment with panoramic city views from the 20th floor. This property includes access to premium building amenities including a concierge, fitness center, and rooftop pool.',
    price: 13500000, // 1.35 Crore
    address: {
      street: '101 Skyline Towers',
      city: 'Hyderabad',
      state: 'Telangana',
      zipCode: '500032',
      country: 'India',
      latitude: 17.4163,
      longitude: 78.3441,
    },
    bedrooms: 3,
    bathrooms: 2.5,
    area: 2100,
    propertyType: 'apartment',
    yearBuilt: 2019,
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
      name: 'Arjun Kumar',
      email: 'arjun.k@realtyroute.com',
      phone: '+91 6543210987',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    }
  },
  {
    id: '5',
    title: 'Heritage Villa in Secunderabad',
    description: 'Meticulously restored heritage villa with original architectural details and modern updates. This elegant home features high ceilings, ornate details, and a private garden.',
    price: 18750000, // 1.87 Crore
    address: {
      street: '55 Heritage Colony',
      city: 'Secunderabad',
      state: 'Telangana',
      zipCode: '500003',
      country: 'India',
      latitude: 17.4399,
      longitude: 78.4983,
    },
    bedrooms: 4,
    bathrooms: 3.5,
    area: 3400,
    propertyType: 'villa',
    yearBuilt: 1935,
    features: [
      'Historical Details', 
      'Original Woodwork', 
      'Multiple Courtyards', 
      'Garden Patio', 
      'Wine Cellar',
      'Library with Built-in Bookshelves'
    ],
    images: [
      'https://images.unsplash.com/photo-1571055107559-3e67626fa8be',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159f',
      'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f'
    ],
    listedAt: '2023-09-20T10:30:00Z',
    agent: {
      id: 'a5',
      name: 'Kiran Patel',
      email: 'kiran.p@realtyroute.com',
      phone: '+91 5432109876',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
    }
  },
  {
    id: '6',
    title: 'Villa with Lake View in Shamirpet',
    description: 'Secluded villa with breathtaking lake views and outdoor living spaces. This property sits on 5 acres and features an open floor plan, beautiful gardens, and a wrap-around veranda.',
    price: 9750000, // 97.5 Lakhs
    address: {
      street: '246 Lake Ridge Road',
      city: 'Shamirpet',
      state: 'Telangana',
      zipCode: '500078',
      country: 'India',
      latitude: 17.6125,
      longitude: 78.5586,
    },
    bedrooms: 3,
    bathrooms: 2,
    area: 2200,
    propertyType: 'villa',
    yearBuilt: 2017,
    features: [
      'Lake Views', 
      'Stone Fireplace', 
      'Wrap-Around Veranda', 
      'Private Well', 
      'Home Office',
      'Fruit Orchard'
    ],
    images: [
      'https://images.unsplash.com/photo-1506974210756-8e1b8985d348',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6',
      'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e'
    ],
    listedAt: '2023-10-05T16:20:00Z',
    agent: {
      id: 'a6',
      name: 'Vikram Singh',
      email: 'vikram.s@realtyroute.com',
      phone: '+91 4321098765',
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

// Update the currency format function to use Indian Rupees
export const formatPrice = (price: number): string => {
  // Format in Indian numbering system (lakhs and crores)
  if (price >= 10000000) {
    // For crores (≥ 1 crore)
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    // For lakhs (≥ 1 lakh)
    return `₹${(price / 100000).toFixed(2)} L`;
  } else {
    // For thousands and below
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  }
};
