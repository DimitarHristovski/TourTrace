import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrips } from '../contexts/TripsContext';
import { Calendar, DollarSign, Users, MapPin, Heart, Camera, Utensils, Building, TreePine, Plus, Trash2, Clock, Edit2 } from 'lucide-react';

interface Activity {
  id: string;
  name: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  cost: number;
  category: string;
}

interface Day {
  id: string;
  date: string;
  activities: Activity[];
}

interface TourFormData {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  maxTravelers: number;
  interests: string[];
  description: string;
  days: Day[];
}

const PlannerPage: React.FC = () => {
  const navigate = useNavigate();
  const { createTrip } = useTrips();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<TourFormData>({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: 1000,
    maxTravelers: 10,
    interests: [],
    description: '',
    days: [],
  });

  const interestOptions = [
    { id: 'sightseeing', label: 'Sightseeing', icon: <Camera size={18} /> },
    { id: 'food', label: 'Food & Dining', icon: <Utensils size={18} /> },
    { id: 'culture', label: 'Culture', icon: <Building size={18} /> },
    { id: 'nature', label: 'Nature', icon: <TreePine size={18} /> },
    { id: 'adventure', label: 'Adventure', icon: <Heart size={18} /> },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'budget' || name === 'maxTravelers' ? Number(value) : value,
    }));
  };

  const handleInterestToggle = (interestId: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // If this is a date change, update the days array
      if (name === 'startDate' || name === 'endDate') {
        if (newData.startDate && newData.endDate) {
          const start = new Date(newData.startDate);
          const end = new Date(newData.endDate);
          const dayCount = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
          
          const days: Day[] = [];
          for (let i = 0; i < dayCount; i++) {
            const date = new Date(start);
            date.setDate(date.getDate() + i);
            days.push({
              id: `day-${i}`,
              date: date.toISOString().split('T')[0],
              activities: [],
            });
          }
          newData.days = days;
        }
      }
      
      return newData;
    });
  };

  const addActivity = (dayId: string) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            activities: [
              ...day.activities,
              {
                id: `activity-${Date.now()}`,
                name: '',
                description: '',
                location: '',
                startTime: '09:00',
                endTime: '10:00',
                cost: 0,
                category: 'sightseeing',
              },
            ],
          };
        }
        return day;
      }),
    }));
  };

  const updateActivity = (dayId: string, activityId: string, field: keyof Activity, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            activities: day.activities.map(activity => {
              if (activity.id === activityId) {
                return {
                  ...activity,
                  [field]: value,
                };
              }
              return activity;
            }),
          };
        }
        return day;
      }),
    }));
  };

  const removeActivity = (dayId: string, activityId: string) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            activities: day.activities.filter(activity => activity.id !== activityId),
          };
        }
        return day;
      }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const trip = await createTrip({
        name: formData.name,
        destination: formData.destination,
        startDate: formData.startDate,
        endDate: formData.endDate,
        budget: formData.budget,
        interests: formData.interests,
        days: formData.days,
      });

      navigate(`/itinerary/${trip.id}`);
    } catch (err) {
      console.error('Error creating trip:', err);
      setError('Failed to create trip. Please try again.');
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
            Create Your Tour
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
            Design a custom tour experience for your travelers
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 -mt-20">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Basic Info */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Tour Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., Historic City Walking Tour"
                  />
                </div>

                <div>
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                    Destination
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="destination"
                      id="destination"
                      required
                      value={formData.destination}
                      onChange={handleChange}
                      className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Tour Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Describe your tour experience..."
                  />
                </div>
              </div>

              {/* Tour Details */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      required
                      value={formData.startDate}
                      onChange={handleDateChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      id="endDate"
                      required
                      value={formData.endDate}
                      onChange={handleDateChange}
                      min={formData.startDate}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                      Price per Person (USD)
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
                        className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="maxTravelers" className="block text-sm font-medium text-gray-700">
                      Max Travelers
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Users className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="maxTravelers"
                        id="maxTravelers"
                        required
                        value={formData.maxTravelers}
                        onChange={handleChange}
                        min="1"
                        className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tour Categories
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {interestOptions.map((interest) => (
                      <button
                        key={interest.id}
                        type="button"
                        onClick={() => handleInterestToggle(interest.id)}
                        className={`relative rounded-lg border px-3 py-2 flex items-center justify-center text-sm font-medium focus:outline-none ${
                          formData.interests.includes(interest.id)
                            ? 'bg-blue-100 border-blue-500 text-blue-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="flex items-center">
                          <span className="mr-2">{interest.icon}</span>
                          {interest.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Itinerary Builder */}
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Daily Itinerary</h2>
            
            {formData.days.map((day) => (
              <div key={day.id} className="mb-8 last:mb-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h3>
                  <button
                    type="button"
                    onClick={() => addActivity(day.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Activity
                  </button>
                </div>

                <div className="space-y-4">
                  {day.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors"
                    >
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <input
                            type="text"
                            value={activity.name}
                            onChange={(e) => updateActivity(day.id, activity.id, 'name', e.target.value)}
                            placeholder="Activity Name"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={activity.location}
                            onChange={(e) => updateActivity(day.id, activity.id, 'location', e.target.value)}
                            placeholder="Location"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-5 w-5 text-gray-400" />
                          <input
                            type="time"
                            value={activity.startTime}
                            onChange={(e) => updateActivity(day.id, activity.id, 'startTime', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            value={activity.endTime}
                            onChange={(e) => updateActivity(day.id, activity.id, 'endTime', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                          <input
                            type="number"
                            value={activity.cost}
                            onChange={(e) => updateActivity(day.id, activity.id, 'cost', Number(e.target.value))}
                            placeholder="Cost"
                            min="0"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => removeActivity(day.id, activity.id)}
                            className="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <textarea
                          value={activity.description}
                          onChange={(e) => updateActivity(day.id, activity.id, 'description', e.target.value)}
                          placeholder="Activity Description"
                          rows={2}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  ))}

                  {day.activities.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <button
                        type="button"
                        onClick={() => addActivity(day.id)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <Plus className="h-5 w-5 mr-2 text-gray-400" />
                        Add First Activity
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {formData.days.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Select start and end dates to begin planning your itinerary
              </div>
            )}
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Creating Tour...' : 'Create Tour'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlannerPage;