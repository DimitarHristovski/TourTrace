import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTrips } from '../contexts/TripsContext';
import { usePreferences } from '../contexts/PreferencesContext';
import { User, Settings, MapPin, Calendar } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { trips } = useTrips();
  const { preferences } = usePreferences();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-full p-4">
              <User className="h-12 w-12 text-blue-600" />
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">{user.email}</h1>
              <p className="text-gray-500">Member since {new Date(user.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Travel Preferences */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-6">
            <Settings className="h-6 w-6 text-blue-600" />
            <h2 className="ml-2 text-xl font-semibold text-gray-900">Travel Preferences</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700">Preferred Destinations</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {Array.isArray(preferences?.preferredDestinations) && preferences.preferredDestinations.map((destination, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    <MapPin className="h-4 w-4 mr-1" />
                    {destination}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Travel Style</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {Array.isArray(preferences?.travelStyle) && preferences.travelStyle.map((style, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Trips */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Calendar className="h-6 w-6 text-blue-600" />
            <h2 className="ml-2 text-xl font-semibold text-gray-900">Your Trips</h2>
          </div>
          {Array.isArray(trips) && trips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <div key={trip.id} className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">{trip.destination}</h3>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>
                      <Calendar className="inline h-4 w-4 mr-1" />
                      {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No trips planned yet. Start exploring destinations to plan your next adventure!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;