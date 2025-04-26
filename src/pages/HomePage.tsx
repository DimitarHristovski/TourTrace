import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Map, Calendar, Compass, Globe, Heart, Zap, Star, MapPin, Clock, DollarSign, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const popularDestinations = [
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
        'Arashiyama Bamboo Grove'
      ]
    },
    {
      id: 2,
      name: 'Tuscany, Italy',
      description: 'Journey through rolling hills, historic cities, and world-class wineries in Italy\'s most beloved region.',
      image: 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg',
      rating: 4.8,
      duration: '7 days',
      price: 2899,
      highlights: [
        'Florence Art Galleries',
        'Chianti Wine Tours',
        'Siena\'s Medieval Streets'
      ]
    },
    {
      id: 3,
      name: 'Maui, Hawaii',
      description: 'Paradise found with perfect beaches, volcanic landscapes, and rich Polynesian culture.',
      image: 'https://images.pexels.com/photos/1268869/pexels-photo-1268869.jpeg',
      rating: 4.9,
      duration: '7 days',
      price: 3299,
      highlights: [
        'Road to Hana',
        'Haleakala Sunrise',
        'Molokini Snorkeling'
      ]
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2245436/pexels-photo-2245436.png"
            alt="Travel destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="text-center sm:text-left max-w-2xl">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Travel Smarter with</span>
              <span className="block text-blue-400">AI-Powered Itineraries</span>
            </h1>
            <p className="mt-6 text-xl text-white max-w-lg">
              Create personalized travel plans tailored to your preferences, budget, and interests in seconds.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center sm:justify-start">
              <Link
                to="/planner"
                className="w-full sm:w-auto px-8 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
              >
                <Zap className="w-5 h-5 mr-2" />
                Plan Your Trip
              </Link>
              <Link
                to="/explore"
                className="w-full sm:w-auto px-8 py-3 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
              >
                <Compass className="w-5 h-5 mr-2" />
                Explore Destinations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Plan your perfect trip in minutes, not hours. Our AI understands your preferences and creates personalized itineraries.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="relative p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="absolute -top-4 left-6 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-8 text-xl font-bold text-gray-900">Tell Us Your Preferences</h3>
              <p className="mt-2 text-gray-600">
                Share your destination, dates, budget, and travel interests. The more details you provide, the better your itinerary.
              </p>
            </div>

            <div className="relative p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="absolute -top-4 left-6 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-8 text-xl font-bold text-gray-900">AI Creates Your Itinerary</h3>
              <p className="mt-2 text-gray-600">
                Our AI analyzes thousands of possibilities to create a personalized day-by-day plan optimized for your preferences.
              </p>
            </div>

            <div className="relative p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="absolute -top-4 left-6 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                <Map className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-8 text-xl font-bold text-gray-900">Customize & Explore</h3>
              <p className="mt-2 text-gray-600">
                Fine-tune your itinerary, discover local insights, and save it for offline access during your travels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Popular Destinations
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most sought-after travel experiences and start planning your next adventure
            </p>
          </div>

          <div className="space-y-8">
            {popularDestinations.map((destination) => (
              <div
                key={destination.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.02]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-full">
                    <img
                      className="w-full h-full object-cover"
                      src={destination.image}
                      alt={destination.name}
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-6 lg:p-8">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-900">{destination.name}</h2>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <span className="text-blue-600 font-medium">{destination.duration}</span>
                      </div>
                    </div>
                    
                    <p className="mt-3 text-gray-600">{destination.description}</p>
                    
                    <div className="mt-6">
                      <h3 className="font-medium text-gray-900">Highlights:</h3>
                      <ul className="mt-2 space-y-2">
                        {destination.highlights.map((highlight, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-2"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center text-gray-500">
                        <DollarSign className="h-5 w-5 mr-1" />
                        <span>From ${destination.price}</span>
                      </div>
                      <Link
                        to={`/tour/${destination.id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/explore"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Explore All Destinations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to Experience Smarter Travel?
            </h2>
            <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
              Join thousands of travelers who plan better trips in less time with our AI-powered platform.
            </p>
            <div className="mt-8">
              <Link
                to="/planner"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
              >
                Create Your First Itinerary
                <Zap className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;