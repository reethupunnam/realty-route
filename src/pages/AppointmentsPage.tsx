
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Calendar, Clock, Home, MapPin, Check, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Appointment, getAppointments, updateAppointmentStatus } from "@/services/appointmentService";
import { useToast } from "@/hooks/use-toast";

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      setIsLoading(true);
      try {
        const allAppointments = await getAppointments();
        setAppointments(allAppointments);
      } catch (error) {
        console.error("Failed to load appointments:", error);
        toast({
          title: "Error",
          description: "Failed to load appointments. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadAppointments();
  }, [toast]);

  const handleStatusChange = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      const updatedAppointment = await updateAppointmentStatus(id, status);
      if (updatedAppointment) {
        setAppointments(prevAppointments => 
          prevAppointments.map(app => 
            app.id === id ? updatedAppointment : app
          )
        );
        
        toast({
          title: "Status Updated",
          description: `Appointment ${status === 'confirmed' ? 'confirmed' : 'cancelled'} successfully.`,
        });
      }
    } catch (error) {
      console.error("Failed to update appointment status:", error);
      toast({
        title: "Error",
        description: "Failed to update appointment status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="border-yellow-400 text-yellow-600">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="border-green-400 text-green-600">Confirmed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="border-red-400 text-red-600">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const pendingAppointments = appointments.filter(app => app.status === 'pending');
  const confirmedAppointments = appointments.filter(app => app.status === 'confirmed');
  const cancelledAppointments = appointments.filter(app => app.status === 'cancelled');

  const formatAppointmentDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Appointments</h1>
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Appointments</h1>
        
        {appointments.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Appointments</CardTitle>
              <CardDescription>
                You don't have any appointments scheduled yet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="bg-realty-600 hover:bg-realty-700"
                onClick={() => navigate('/properties')}
              >
                <Home className="h-4 w-4 mr-2" />
                Browse Properties
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="pending">
                Pending ({pendingAppointments.length})
              </TabsTrigger>
              <TabsTrigger value="confirmed">
                Confirmed ({confirmedAppointments.length})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Cancelled ({cancelledAppointments.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending">
              {renderAppointmentsList(pendingAppointments)}
            </TabsContent>
            
            <TabsContent value="confirmed">
              {renderAppointmentsList(confirmedAppointments)}
            </TabsContent>
            
            <TabsContent value="cancelled">
              {renderAppointmentsList(cancelledAppointments)}
            </TabsContent>
          </Tabs>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} RealtyRoute. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );

  function renderAppointmentsList(appointmentsList: Appointment[]) {
    if (appointmentsList.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No appointments in this category.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {appointmentsList.map(appointment => (
          <Card key={appointment.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 lg:w-1/5">
                <img 
                  src={appointment.propertyImage} 
                  alt={appointment.propertyTitle}
                  className="w-full h-full object-cover aspect-video md:aspect-square"
                />
              </div>
              <div className="p-6 flex-grow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <Link to={`/property/${appointment.propertyId}`} className="hover:underline">
                      <h3 className="font-semibold text-lg mb-1">{appointment.propertyTitle}</h3>
                    </Link>
                    <div className="mb-4 flex items-center">
                      {getStatusBadge(appointment.status)}
                    </div>
                  </div>
                  
                  {appointment.status === 'pending' && (
                    <div className="flex space-x-2 mt-4 md:mt-0">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-green-500 text-green-600 hover:bg-green-50"
                        onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Confirm
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-500 text-red-600 hover:bg-red-50"
                        onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p>{formatAppointmentDate(appointment.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p>{appointment.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <User className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p>{appointment.name}</p>
                      <p className="text-sm text-gray-500">{appointment.email}</p>
                      <p className="text-sm text-gray-500">{appointment.phone}</p>
                    </div>
                  </div>
                  
                  {appointment.message && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500 mb-1">Message:</p>
                      <p className="text-sm">{appointment.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
};

export default AppointmentsPage;
