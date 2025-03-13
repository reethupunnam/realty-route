
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchFilters from "@/components/PropertySearchFilters";
import { Property, getProperties } from "@/services/propertyService";
import { PropertyFilters, PropertyType } from "@/types/property";

const PropertiesPage = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<PropertyFilters>({});

  useEffect(() => {
    const loadProperties = async () => {
      setIsLoading(true);
      try {
        const initialType = searchParams.get('type') as PropertyType | null;
        const initialMinPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined;
        const search = searchParams.get('search');
        
        const initialFilters: PropertyFilters = {};
        if (initialType) initialFilters.propertyType = initialType;
        if (initialMinPrice) initialFilters.minPrice = initialMinPrice;
        if (search) initialFilters.city = search;
        
        setCurrentFilters(initialFilters);
        
        const allProperties = await getProperties();
        setProperties(allProperties);
        
        // Apply initial filters if any
        if (Object.keys(initialFilters).length > 0) {
          const filtered = await getProperties(initialFilters);
          setFilteredProperties(filtered);
        } else {
          setFilteredProperties(allProperties);
        }
      } catch (error) {
        console.error("Failed to load properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProperties();
  }, [searchParams]);

  const handleFilterChange = async (filters: PropertyFilters) => {
    setIsLoading(true);
    setCurrentFilters(filters);
    
    try {
      const filtered = await getProperties(filters);
      setFilteredProperties(filtered);
    } catch (error) {
      console.error("Failed to filter properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Properties</h1>
        
        <PropertySearchFilters onFilterChange={handleFilterChange} />
        
        <div className="mb-4">
          <p className="text-gray-600">
            {isLoading ? (
              "Loading properties..."
            ) : (
              `${filteredProperties.length} ${
                filteredProperties.length === 1 ? "property" : "properties"
              } found`
            )}
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-lg bg-gray-100 animate-pulse h-80"></div>
            ))}
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium">No properties found</h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your filters to see more results.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} RealtyRoute. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PropertiesPage;
