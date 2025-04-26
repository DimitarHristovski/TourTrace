import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthContext';

export interface Activity {
  id: string;
  name: string;
  description: string;
  location: string;
  coordinates: { lat: number; lng: number };
  startTime: string;
  endTime: string;
  cost: number;
  category: string;
  imageUrl?: string;
}

export interface Day {
  id: string;
  date: string;
  activities: Activity[];
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  start_date: string;
  end_date: string;
  budget: number;
  interests: string[];
  days: Day[];
  created_at: string;
  updated_at: string;
}

interface TripsContextType {
  trips: Trip[];
  currentTrip: Trip | null;
  loading: boolean;
  error: string | null;
  createTrip: (tripData: Partial<Trip>) => Promise<Trip>;
  updateTrip: (id: string, tripData: Partial<Trip>) => Promise<void>;
  deleteTrip: (id: string) => Promise<void>;
  getTrip: (id: string) => Promise<Trip | null>;
  setCurrentTrip: (trip: Trip | null) => void;
  generateItinerary: (preferences: any) => Promise<Trip>;
}

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export const useTrips = () => {
  const context = useContext(TripsContext);
  if (context === undefined) {
    throw new Error('useTrips must be used within a TripsProvider');
  }
  return context;
};

export const TripsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTrips();
    } else {
      setTrips([]);
      setLoading(false);
    }
  }, [user]);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTrips(data || []);
    } catch (err) {
      console.error('Error fetching trips:', err);
      setError('Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  };

  const createTrip = async (tripData: Partial<Trip>): Promise<Trip> => {
    try {
      const { data, error } = await supabase
        .from('trips')
        .insert([{
          ...tripData,
          user_id: user?.id,
          start_date: tripData.start_date || tripData.startDate, // Handle both formats
          end_date: tripData.end_date || tripData.endDate // Handle both formats
        }])
        .select()
        .single();

      if (error) throw error;
      setTrips((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error creating trip:', err);
      setError('Failed to create trip');
      throw err;
    }
  };

  const updateTrip = async (id: string, tripData: Partial<Trip>): Promise<void> => {
    try {
      const { error } = await supabase
        .from('trips')
        .update({
          ...tripData,
          start_date: tripData.start_date || tripData.startDate, // Handle both formats
          end_date: tripData.end_date || tripData.endDate, // Handle both formats
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      setTrips((prev) =>
        prev.map((trip) => (trip.id === id ? { ...trip, ...tripData } : trip))
      );
      if (currentTrip?.id === id) {
        setCurrentTrip((prev) => (prev ? { ...prev, ...tripData } : null));
      }
    } catch (err) {
      console.error('Error updating trip:', err);
      setError('Failed to update trip');
      throw err;
    }
  };

  const deleteTrip = async (id: string): Promise<void> => {
    try {
      const { error } = await supabase.from('trips').delete().eq('id', id);

      if (error) throw error;
      setTrips((prev) => prev.filter((trip) => trip.id !== id));
      if (currentTrip?.id === id) {
        setCurrentTrip(null);
      }
    } catch (err) {
      console.error('Error deleting trip:', err);
      setError('Failed to delete trip');
      throw err;
    }
  };

  const getTrip = async (id: string): Promise<Trip | null> => {
    try {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setCurrentTrip(data);
      return data;
    } catch (err) {
      console.error('Error fetching trip:', err);
      setError('Failed to fetch trip');
      throw err;
    }
  };

  const generateItinerary = async (preferences: any): Promise<Trip> => {
    const mockDestinations = {
      'Paris': {
        center: { lat: 48.8566, lng: 2.3522 },
        activities: [
          {
            name: 'Eiffel Tower',
            description: 'Visit the iconic symbol of Paris',
            location: 'Champ de Mars, 5 Avenue Anatole France',
            coordinates: { lat: 48.8584, lng: 2.2945 },
            cost: 25,
            category: 'Landmarks',
            imageUrl: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg'
          },
          {
            name: 'Louvre Museum',
            description: 'World\'s largest art museum',
            location: 'Rue de Rivoli, 75001',
            coordinates: { lat: 48.8606, lng: 2.3376 },
            cost: 20,
            category: 'Museums',
            imageUrl: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg'
          },
          {
            name: 'Notre-Dame Cathedral',
            description: 'Medieval Catholic cathedral',
            location: '6 Parvis Notre-Dame',
            coordinates: { lat: 48.8530, lng: 2.3499 },
            cost: 0,
            category: 'Religious Sites',
            imageUrl: 'https://images.pexels.com/photos/705764/pexels-photo-705764.jpeg'
          }
        ]
      },
      'Tokyo': {
        center: { lat: 35.6762, lng: 139.6503 },
        activities: [
          {
            name: 'Senso-ji Temple',
            description: 'Ancient Buddhist temple',
            location: '2-3-1 Asakusa, Taito',
            coordinates: { lat: 35.7147, lng: 139.7966 },
            cost: 0,
            category: 'Temples',
            imageUrl: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg'
          },
          {
            name: 'Shibuya Crossing',
            description: 'World\'s busiest pedestrian crossing',
            location: 'Shibuya',
            coordinates: { lat: 35.6595, lng: 139.7004 },
            cost: 0,
            category: 'Landmarks',
            imageUrl: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg'
          },
          {
            name: 'Tsukiji Outer Market',
            description: 'Famous fish market',
            location: 'Tsukiji',
            coordinates: { lat: 35.6654, lng: 139.7707 },
            cost: 30,
            category: 'Markets',
            imageUrl: 'https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg'
          }
        ]
      },
      'New York': {
        center: { lat: 40.7128, lng: -74.0060 },
        activities: [
          {
            name: 'Central Park',
            description: 'Urban oasis in Manhattan',
            location: 'Manhattan',
            coordinates: { lat: 40.7829, lng: -73.9654 },
            cost: 0,
            category: 'Parks',
            imageUrl: 'https://images.pexels.com/photos/1563256/pexels-photo-1563256.jpeg'
          },
          {
            name: 'Times Square',
            description: 'Major commercial intersection',
            location: 'Manhattan',
            coordinates: { lat: 40.7580, lng: -73.9855 },
            cost: 0,
            category: 'Landmarks',
            imageUrl: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg'
          },
          {
            name: 'Statue of Liberty',
            description: 'Iconic symbol of freedom',
            location: 'Liberty Island',
            coordinates: { lat: 40.6892, lng: -74.0445 },
            cost: 25,
            category: 'Monuments',
            imageUrl: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg'
          }
        ]
      }
    };

    const destination = preferences.destination.split(',')[0];
    const destinationData = mockDestinations[destination as keyof typeof mockDestinations] || {
      center: { lat: 0, lng: 0 },
      activities: []
    };

    const days = [];
    const startDate = new Date(preferences.startDate);
    const endDate = new Date(preferences.endDate);
    const dayCount = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    for (let i = 0; i < dayCount; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);

      const dayActivities = destinationData.activities.map((activity, index) => ({
        id: `activity-${i}-${index}`,
        name: activity.name,
        description: activity.description,
        location: activity.location,
        coordinates: activity.coordinates,
        startTime: `${9 + index * 3}:00`,
        endTime: `${11 + index * 3}:00`,
        cost: activity.cost,
        category: activity.category,
        imageUrl: activity.imageUrl
      }));

      days.push({
        id: `day-${i}`,
        date: currentDate.toISOString().split('T')[0],
        activities: dayActivities
      });
    }

    const trip: Trip = {
      id: `trip-${Date.now()}`,
      name: `Trip to ${destination}`,
      destination,
      start_date: preferences.startDate,
      end_date: preferences.endDate,
      budget: preferences.budget,
      interests: preferences.interests,
      days,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return trip;
  };

  const value = {
    trips,
    currentTrip,
    loading,
    error,
    createTrip,
    updateTrip,
    deleteTrip,
    getTrip,
    setCurrentTrip,
    generateItinerary,
  };

  return <TripsContext.Provider value={value}>{children}</TripsContext.Provider>;
};