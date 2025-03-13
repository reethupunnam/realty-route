
import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import { Property, formatPrice } from "@/services/propertyService";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link to={`/property/${property.id}`}>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
        <div className="property-image-container relative overflow-hidden">
          <img 
            src={property.images[0]} 
            alt={property.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <Badge className="absolute top-2 right-2 bg-realty-600">
            {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
          </Badge>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg line-clamp-1">{property.title}</h3>
          </div>
          <p className="text-realty-700 font-semibold text-xl mt-1">
            {formatPrice(property.price)}
          </p>
          <div className="flex items-center text-gray-500 mt-2">
            <MapPin className="h-4 w-4 mr-1" />
            <p className="text-sm line-clamp-1">
              {property.address.street}, {property.address.city}, {property.address.state}
            </p>
          </div>
          <div className="flex justify-between mt-4 text-gray-700">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.area} sq ft</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
