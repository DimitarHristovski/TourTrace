import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, DollarSign, Star, Check, ArrowLeft } from 'lucide-react';

const TourDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // This would typically come from an API or database
  const destinations = [
    {
      id: 1,
      name: 'Kyoto, Japan',
      description: 'Experience the perfect blend of ancient traditions and modern Japanese culture in this enchanting city.',
      image: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg',
      rating: 4.9,
      duration: '7 days',
      price: 2499,
      highlights: [
        'Traditional Tea Ceremony',
        'Fushimi Inari Shrine',
        'Arashiyama Bamboo Grove',
        'Kinkaku-ji (Golden Pavilion)',
        'Gion District'
      ],
      bestTimeToVisit: 'March-May (Spring) & October-November (Fall)',
      included: [
        'Luxury hotel accommodation',
        'Private guided tours',
        'Traditional tea ceremony experience',
        'Local transportation passes',
        'Daily breakfast and select meals'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Welcome',
          activities: [
            'Airport transfer to luxury hotel',
            'Welcome dinner at traditional restaurant',
            'Evening walking tour of Gion district'
          ]
        },
        {
          day: 2,
          title: 'Historic Temples',
          activities: [
            'Visit to Kinkaku-ji (Golden Pavilion)',
            'Ryoan-ji Temple and rock garden',
            'Traditional tea ceremony experience'
          ]
        },
        {
          day: 3,
          title: 'Cultural Immersion',
          activities: [
            'Morning visit to Fushimi Inari Shrine',
            'Sake tasting experience',
            'Cooking class with local chef'
          ]
        },
        {
          day: 4,
          title: 'Nature & Tradition',
          activities: [
            'Arashiyama Bamboo Grove exploration',
            'Visit to Monkey Park',
            'Traditional craft workshop'
          ]
        },
        {
          day: 5,
          title: 'Art & Gardens',
          activities: [
            'Nijo Castle tour',
            'Japanese garden design class',
            'Evening cultural performance'
          ]
        },
        {
          day: 6,
          title: 'Modern Kyoto',
          activities: [
            'Nishiki Market food tour',
            'Contemporary art museums',
            'Optional cycling tour'
          ]
        },
        {
          day: 7,
          title: 'Departure',
          activities: [
            'Morning meditation session',
            'Final shopping opportunity',
            'Airport transfer'
          ]
        }
      ]
    }
    // Add other destinations here...
  ];

  const tour = destinations.find(d => d.id === Number(id));

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Tour not found</h2>
          <Link
            to="/explore"
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96">
        <img
          src={tour.image}
          alt={tour.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">{tour.name}</h1>
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-2" />
                <span>{tour.rating} rating</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                <span>From ${tour.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Tour Overview</h2>
              <p className="text-gray-600">{tour.description}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Daily Itinerary</h2>
              <div className="space-y-6">
                {tour.itinerary.map((day) => (
                  <div key={day.day} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-semibold">Day {day.day}: {day.title}</h3>
                    <ul className="mt-2 space-y-2">
                      {day.activities.map((activity, index) => (
                        <li key={index} className="text-gray-600">
                          • {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">What's Included</h3>
              <ul className="space-y-3">
                {tour.included.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Best Time to Visit</h3>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                <span>{tour.bestTimeToVisit}</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  From ${tour.price}
                  <span className="text-sm text-gray-500">/person</span>
                </div>
                <Link
                  to="/planner"
                  state={{ destination: tour.name }}
                  className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Plan This Trip
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailsPage;