import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTrips } from '../contexts/TripsContext';
import { format } from 'date-fns';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Calendar, Clock, DollarSign, Share2, Download, Edit2, Trash2 } from 'lucide-react';
import { googleMapsApiKey } from '../lib/supabaseClient';

const ItineraryPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentTrip, getTrip, deleteTrip } = useTrips();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const fetchTrip = async () => {
      if (!id) return;
      try {
        setLoading(true);
        if (!currentTrip || currentTrip.id !== id) {
          await getTrip(id);
        }
      } catch (err) {
        console.error('Error fetching trip:', err);
        setError('Failed to load itinerary');
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id, currentTrip, getTrip]);

  useEffect(() => {
    if (!currentTrip || !mapRef.current || !googleMapsApiKey) return;

    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: googleMapsApiKey,
          version: 'weekly',
        });

        const google = await loader.load();
        const bounds = new google.maps.LatLngBounds();
        
        const mapInstance = new google.maps.Map(mapRef.current, {
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
        });

        mapInstanceRef.current = mapInstance;

        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // Add markers for each activity
        currentTrip.days.forEach((day, dayIndex) => {
          day.activities.forEach((activity, activityIndex) => {
            const position = {
              lat: activity.coordinates.lat,
              lng: activity.coordinates.lng,
            };

            const marker = new google.maps.Marker({
              position,
              map: mapInstance,
              title: activity.name,
              label: {
                text: `${dayIndex + 1}.${activityIndex + 1}`,
                color: '#FFFFFF',
              },
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#3B82F6',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2,
                scale: 10,
              },
            });

            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div class="p-2">
                  <h3 class="font-semibold">${activity.name}</h3>
                  <p class="text-sm text-gray-600">${activity.description}</p>
                  <p class="text-sm mt-1">
                    <span class="font-medium">Time:</span> ${activity.startTime} - ${activity.endTime}
                  </p>
                </div>
              `,
            });

            marker.addListener('click', () => {
              infoWindow.open(mapInstance, marker);
            });

            markersRef.current.push(marker);
            bounds.extend(position);
          });
        });

        mapInstance.fitBounds(bounds);
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to load map');
      }
    };

    initMap();
  }, [currentTrip]);

  const handleDelete = async () => {
    if (!currentTrip) return;
    
    if (window.confirm('Are you sure you want to delete this itinerary?')) {
      try {
        await deleteTrip(currentTrip.id);
        navigate('/planner');
      } catch (err) {
        console.error('Error deleting trip:', err);
        setError('Failed to delete itinerary');
      }
    }
  };

  const handleDownload = () => {
    if (!currentTrip) return;

    const itineraryText = `
${currentTrip.name}
${currentTrip.destination}
${format(new Date(currentTrip.startDate), 'MMM d, yyyy')} - ${format(new Date(currentTrip.endDate), 'MMM d, yyyy')}

Itinerary Details:
${currentTrip.days.map((day, index) => `
Day ${index + 1} - ${format(new Date(day.date), 'MMM d, yyyy')}
${day.activities.map((activity, actIndex) => `
  ${actIndex + 1}. ${activity.name}
     Time: ${activity.startTime} - ${activity.endTime}
     Location: ${activity.location}
     Description: ${activity.description}
     Cost: $${activity.cost}
`).join('')}
`).join('\n')}
    `.trim();

    const blob = new Blob([itineraryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentTrip.name.toLowerCase().replace(/\s+/g, '-')}-itinerary.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !currentTrip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Error Loading Itinerary</h2>
          <p className="mt-2 text-gray-600">{error || 'Itinerary not found'}</p>
          <button
            onClick={() => navigate('/planner')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Return to Planner
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{currentTrip.name}</h1>
              <div className="mt-2 flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{currentTrip.destination}</span>
              </div>
              <div className="mt-2 flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>
                  {format(new Date(currentTrip.startDate), 'MMM d')} - {format(new Date(currentTrip.endDate), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
              <button
                onClick={() => navigate(`/planner/edit/${currentTrip.id}`)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
              <button
                onClick={() => {/* Implement share functionality */}}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div ref={mapRef} className="w-full h-[600px]" />
            </div>
          </div>

          {/* Itinerary Details */}
          <div className="space-y-6">
            {currentTrip.days.map((day, dayIndex) => (
              <div key={day.id} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Day {dayIndex + 1} - {format(new Date(day.date), 'MMM d, yyyy')}
                </h3>
                <div className="space-y-4">
                  {day.activities.map((activity, actIndex) => (
                    <div
                      key={activity.id}
                      className="border-l-4 border-blue-500 pl-4 py-2"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {actIndex + 1}. {activity.name}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {activity.description}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-y-1 gap-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {activity.startTime} - {activity.endTime}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {activity.location}
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              ${activity.cost}
                            </div>
                          </div>
                        </div>
                        {activity.imageUrl && (
                          <img
                            src={activity.imageUrl}
                            alt={activity.name}
                            className="w-20 h-20 object-cover rounded-lg ml-4"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;