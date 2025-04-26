import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrips } from '../contexts/TripsContext';
import { MapPin, Calendar, DollarSign, Users, Wand2, Loader2 } from 'lucide-react';

interface FormData {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelers: number;
}

const destinations = {
  'Paris, France': {
    attractions: [
      {
        name: 'Eiffel Tower',
        description: 'Iconic iron lattice tower on the Champ de Mars',
        location: 'Champ de Mars, 5 Avenue Anatole France',
        cost: 25,
        duration: 3,
        category: 'landmarks',
        coordinates: { lat: 48.8584, lng: 2.2945 },
        imageUrl: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg'
      },
      {
        name: 'Louvre Museum',
        description: 'World\'s largest art museum and historic monument',
        location: 'Rue de Rivoli',
        cost: 20,
        duration: 4,
        category: 'museums',
        coordinates: { lat: 48.8606, lng: 2.3376 },
        imageUrl: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg'
      },
      {
        name: 'Notre-Dame Cathedral',
        description: 'Medieval Catholic cathedral',
        location: 'Parvis Notre-Dame',
        cost: 0,
        duration: 2,
        category: 'landmarks',
        coordinates: { lat: 48.8530, lng: 2.3499 },
        imageUrl: 'https://images.pexels.com/photos/705764/pexels-photo-705764.jpeg'
      }
    ],
    restaurants: [
      {
        name: 'Le Cheval d\'Or',
        description: 'Traditional French cuisine in elegant setting',
        location: 'Marais district',
        cost: 50,
        duration: 2,
        category: 'dining',
        coordinates: { lat: 48.8625, lng: 2.3585 }
      },
      {
        name: 'Bistrot Paul Bert',
        description: 'Classic French bistro fare',
        location: '18 Rue Paul Bert',
        cost: 40,
        duration: 1.5,
        category: 'dining',
        coordinates: { lat: 48.8583, lng: 2.3756 }
      }
    ]
  },
  'Rome, Italy': {
    attractions: [
      {
        name: 'Colosseum',
        description: 'Ancient amphitheater in the heart of Rome',
        location: 'Piazza del Colosseo',
        cost: 16,
        duration: 3,
        category: 'landmarks',
        coordinates: { lat: 41.8902, lng: 12.4922 },
        imageUrl: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg'
      },
      {
        name: 'Vatican Museums',
        description: 'Art and historical collections of the Catholic Church',
        location: 'Vatican City',
        cost: 17,
        duration: 4,
        category: 'museums',
        coordinates: { lat: 41.9067, lng: 12.4526 },
        imageUrl: 'https://images.pexels.com/photos/3722811/pexels-photo-3722811.jpeg'
      },
      {
        name: 'Trevi Fountain',
        description: 'Baroque fountain in the Trevi district',
        location: 'Piazza di Trevi',
        cost: 0,
        duration: 1,
        category: 'landmarks',
        coordinates: { lat: 41.9009, lng: 12.4833 },
        imageUrl: 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg'
      }
    ],
    restaurants: [
      {
        name: 'La Pergola',
        description: 'Three-Michelin-starred restaurant with panoramic views',
        location: 'Via Alberto Cadlolo, 101',
        cost: 150,
        duration: 3,
        category: 'dining',
        coordinates: { lat: 41.9187, lng: 12.4474 }
      },
      {
        name: 'Roscioli',
        description: 'Historic restaurant and deli',
        location: 'Via dei Giubbonari, 21/22',
        cost: 50,
        duration: 2,
        category: 'dining',
        coordinates: { lat: 41.8937, lng: 12.4742 }
      }
    ]
  }
};

const AutoTourPage: React.FC = () => {
  const navigate = useNavigate();
  const { createTrip } = useTrips();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    destination: '',
    startDate: '',
    endDate: '',
    budget: 1000,
    travelers: 2,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'budget' || name === 'travelers' ? Number(value) : value,
    }));
  };

  const generateItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const destinationData = destinations[formData.destination as keyof typeof destinations];
      
      if (!destinationData) {
        throw new Error('Destination not supported yet');
      }

      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const dayCount = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      // Create days array with activities
      const days = [];
      let currentAttractionIndex = 0;
      let currentRestaurantIndex = 0;

      for (let i = 0; i < dayCount; i++) {
        const date = new Date(start);
        date.setDate(date.getDate() + i);
        
        const dayActivities = [];
        let currentTime = 9; // Start at 9 AM

        // Morning attraction
        if (currentAttractionIndex < destinationData.attractions.length) {
          const attraction = destinationData.attractions[currentAttractionIndex];
          dayActivities.push({
            id: `activity-${i}-1`,
            name: attraction.name,
            description: attraction.description,
            location: attraction.location,
            startTime: `${currentTime}:00`,
            endTime: `${currentTime + attraction.duration}:00`,
            cost: attraction.cost,
            category: attraction.category,
            coordinates: attraction.coordinates,
            imageUrl: attraction.imageUrl
          });
          currentTime += attraction.duration + 1; // Add 1 hour for travel time
          currentAttractionIndex++;
        }

        // Lunch
        if (currentRestaurantIndex < destinationData.restaurants.length) {
          const restaurant = destinationData.restaurants[currentRestaurantIndex];
          dayActivities.push({
            id: `activity-${i}-2`,
            name: restaurant.name,
            description: restaurant.description,
            location: restaurant.location,
            startTime: `${currentTime}:00`,
            endTime: `${currentTime + restaurant.duration}:00`,
            cost: restaurant.cost,
            category: 'dining',
            coordinates: restaurant.coordinates
          });
          currentTime += restaurant.duration + 1;
          currentRestaurantIndex = (currentRestaurantIndex + 1) % destinationData.restaurants.length;
        }

        // Afternoon attraction
        if (currentAttractionIndex < destinationData.attractions.length) {
          const attraction = destinationData.attractions[currentAttractionIndex];
          dayActivities.push({
            id: `activity-${i}-3`,
            name: attraction.name,
            description: attraction.description,
            location: attraction.location,
            startTime: `${currentTime}:00`,
            endTime: `${currentTime + attraction.duration}:00`,
            cost: attraction.cost,
            category: attraction.category,
            coordinates: attraction.coordinates,
            imageUrl: attraction.imageUrl
          });
          currentAttractionIndex++;
        }

        days.push({
          id: `day-${i}`,
          date: date.toISOString().split('T')[0],
          activities: dayActivities
        });
      }

      const trip = await createTrip({
        name: `${formData.destination} Adventure`,
        destination: formData.destination,
        start_date: formData.startDate,
        end_date: formData.endDate,
        budget: formData.budget,
        interests: ['sightseeing', 'culture', 'food'],
        days
      });

      navigate(`/itinerary/${trip.id}`);
    } catch (err) {
      console.error('Error generating itinerary:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate itinerary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative py-16 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Auto Tour Generator
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
            Let us create the perfect itinerary for your destination
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8 -mt-20">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <form onSubmit={generateItinerary} className="space-y-6">
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                Destination
              </label>
              <select
                id="destination"
                name="destination"
                required
                value={formData.destination}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              >
                <option value="">Select a destination</option>
                {Object.keys(destinations).map(destination => (
                  <option key={destination} value={destination}>
                    {destination}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    required
                    value={formData.startDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="block w-full pl-10 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    required
                    value={formData.endDate}
                    onChange={handleChange}
                    min={formData.startDate}
                    className="block w-full pl-10 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                  Budget per Person (USD)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="budget"
                    id="budget"
                    required
                    value={formData.budget}
                    onChange={handleChange}
                    min="0"
                    className="block w-full pl-10 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="travelers" className="block text-sm font-medium text-gray-700">
                  Number of Travelers
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="travelers"
                    id="travelers"
                    required
                    value={formData.travelers}
                    onChange={handleChange}
                    min="1"
                    className="block w-full pl-10 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Generating Itinerary...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-5 w-5 mr-2" />
                    Generate Itinerary
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AutoTourPage;