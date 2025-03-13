
export interface Appointment {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  date: string; // ISO date string
  time: string; // Format: "HH:MM AM/PM"
  name: string;
  email: string;
  phone: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

// Mock appointments data
const mockAppointments: Appointment[] = [];

// Generate a unique ID for new appointments
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

export const getAppointments = (): Promise<Appointment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockAppointments]);
    }, 300);
  });
};

export const getAppointmentById = (id: string): Promise<Appointment | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const appointment = mockAppointments.find(a => a.id === id) || null;
      resolve(appointment);
    }, 200);
  });
};

export const createAppointment = (appointmentData: Omit<Appointment, 'id' | 'status'>): Promise<Appointment> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAppointment: Appointment = {
        ...appointmentData,
        id: generateId(),
        status: 'pending'
      };
      
      mockAppointments.push(newAppointment);
      resolve(newAppointment);
    }, 500);
  });
};

export const updateAppointmentStatus = (id: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<Appointment | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const appointmentIndex = mockAppointments.findIndex(a => a.id === id);
      
      if (appointmentIndex >= 0) {
        mockAppointments[appointmentIndex] = {
          ...mockAppointments[appointmentIndex],
          status
        };
        resolve(mockAppointments[appointmentIndex]);
      } else {
        resolve(null);
      }
    }, 300);
  });
};
