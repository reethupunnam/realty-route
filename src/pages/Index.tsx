import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import { Property, getProperties } from "@/services/propertyService";

const Index = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const properties = await getProperties();
        // Just take the first 3 for featured section
        setFeaturedProperties(properties.slice(0, 3));
      } catch (error) {
        console.error("Failed to load properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProperties();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/properties?search=${encodeURIComponent(searchTerm)}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716"
            alt="Real Estate"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative container mx-auto px-4 py-24 sm:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Dream Home
            </h1>
            <p className="text-xl mb-8">
              Discover the perfect property with RealtyRoute. Browse our exclusive listings of homes, apartments, and luxury properties.
            </p>

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-8">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="City, address, or ZIP code"
                  className="bg-white text-gray-900 pl-10 h-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              <Button type="submit" className="h-12 bg-realty-600 hover:bg-realty-700">
                Search Properties
              </Button>
            </form>

            <div className="flex flex-wrap gap-4">
              <Link to="/properties?type=house">
                <Button variant="outline" className="bg-white/10 border-white hover:bg-white/20">
                  Houses
                </Button>
              </Link>
              <Link to="/properties?type=apartment">
                <Button variant="outline" className="bg-white/10 border-white hover:bg-white/20">
                  Apartments
                </Button>
              </Link>
              <Link to="/properties?type=condo">
                <Button variant="outline" className="bg-white/10 border-white hover:bg-white/20">
                  Condos
                </Button>
              </Link>
              <Link to="/properties?minPrice=1000000">
                <Button variant="outline" className="bg-white/10 border-white hover:bg-white/20">
                  Luxury
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Properties</h2>
          <Link to="/properties" className="text-realty-600 hover:text-realty-700 flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg bg-gray-100 animate-pulse h-80"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>

      {/* Feature Highlights */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose RealtyRoute</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-realty-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-realty-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
              <p className="text-gray-600">
                Find exactly what you're looking for with our powerful search filters.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-realty-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-realty-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prime Locations</h3>
              <p className="text-gray-600">
                Discover properties in the most desirable neighborhoods and locations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-realty-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-realty-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Appointments</h3>
              <p className="text-gray-600">
                Schedule property viewings with just a few clicks, at your convenience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-realty-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to find your dream home?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Browse our extensive property listings or schedule a consultation with one of our expert agents.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/properties">
              <Button size="lg" className="bg-white text-realty-600 hover:bg-gray-100">
                Browse Properties
              </Button>
            </Link>
            <Link to="/appointments">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule Appointment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">RealtyRoute</h3>
              <p className="text-gray-400 mb-4">
                Your trusted partner in finding the perfect property. We're dedicated to making your real estate journey seamless and successful.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/properties" className="text-gray-400 hover:text-white">Properties</Link></li>
                <li><Link to="/appointments" className="text-gray-400 hover:text-white">Appointments</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <address className="text-gray-400 not-italic">
                <p>1234 Realty Drive</p>
                <p>San Francisco, CA 94105</p>
                <p className="mt-2">contact@realtyroute.com</p>
                <p>(555) 123-4567</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} RealtyRoute. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
