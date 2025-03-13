
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MapPin, Bed, Bath, Square, Calendar, Home, ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Navbar from "@/components/Navbar";
import AppointmentForm from "@/components/AppointmentForm";
import { getPropertyById, formatPrice } from "@/services/propertyService";
import { Property } from "@/types/property";
import { useToast } from "@/hooks/use-toast";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      setIsLoading(true);
      try {
        if (!id) return;
        const propertyData = await getPropertyById(id);
        if (propertyData) {
          setProperty(propertyData);
        } else {
          toast({
            title: "Property Not Found",
            description: "The property you're looking for doesn't exist or has been removed.",
            variant: "destructive",
          });
          navigate("/properties");
        }
      } catch (error) {
        console.error("Failed to load property:", error);
        toast({
          title: "Error",
          description: "There was a problem loading the property. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProperty();
  }, [id, navigate, toast]);

  const handleAppointmentSuccess = () => {
    setShowAppointmentForm(false);
    toast({
      title: "Success",
      description: "Your appointment has been scheduled!",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-2">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-4/5"></div>
              </div>
              <div>
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="flex items-center text-gray-600"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to properties
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            
            <div className="flex items-center text-gray-600 mb-6">
              <MapPin className="h-4 w-4 mr-1" />
              <p>
                {property.address.street}, {property.address.city}, {property.address.state} {property.address.zipCode}
              </p>
            </div>
            
            <Carousel className="w-full mb-8">
              <CarouselContent>
                {property.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="property-image-container">
                      <img
                        src={image}
                        alt={`Property image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Bed className="h-5 w-5 text-realty-600" />
                </div>
                <p className="text-sm text-gray-500">Bedrooms</p>
                <p className="text-lg font-semibold">{property.bedrooms}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Bath className="h-5 w-5 text-realty-600" />
                </div>
                <p className="text-sm text-gray-500">Bathrooms</p>
                <p className="text-lg font-semibold">{property.bathrooms}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Square className="h-5 w-5 text-realty-600" />
                </div>
                <p className="text-sm text-gray-500">Area</p>
                <p className="text-lg font-semibold">{property.area} sq ft</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-realty-500 rounded-full mr-2"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Property Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Property Type</span>
                  <span className="font-medium capitalize">{property.propertyType}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Year Built</span>
                  <span className="font-medium">{property.yearBuilt}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Price per sq ft</span>
                  <span className="font-medium">
                    {formatPrice(Math.round(property.price / property.area))}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Listed</span>
                  <span className="font-medium">
                    {new Date(property.listedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-2xl text-realty-700">
                  {formatPrice(property.price)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Button 
                    className="w-full bg-realty-600 hover:bg-realty-700 mb-3"
                    onClick={() => setShowAppointmentForm(!showAppointmentForm)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule a Viewing
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Home className="h-4 w-4 mr-2" />
                    Virtual Tour
                  </Button>
                </div>
                
                {showAppointmentForm && (
                  <div className="mt-4">
                    <Separator className="mb-4" />
                    <h3 className="text-lg font-semibold mb-4">Schedule a Viewing</h3>
                    <AppointmentForm 
                      property={property} 
                      onSuccess={handleAppointmentSuccess}
                    />
                  </div>
                )}
                
                {!showAppointmentForm && (
                  <>
                    <Separator className="my-4" />
                    
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mb-3">Listing Agent</h3>
                      <div className="flex items-center">
                        {property.agent.photo ? (
                          <img 
                            src={property.agent.photo} 
                            alt={property.agent.name}
                            className="w-12 h-12 rounded-full object-cover mr-3"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-500" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{property.agent.name}</p>
                          <p className="text-sm text-gray-600">{property.agent.phone}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} RealtyRoute. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PropertyDetailPage;
