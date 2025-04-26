import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, DollarSign, Star, ArrowRight } from 'lucide-react';

const ExplorePage: React.FC = () => {
  const navigate = useNavigate();

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
        'Siena\'s Medieval Streets',
        'San Gimignano Towers',
        'Tuscan Cooking Class'
      ],
      bestTimeToVisit: 'April-May (Spring) & September-October (Fall)',
      included: [
        'Boutique villa accommodation',
        'Wine tasting sessions',
        'Cooking classes with local chefs',
        'Private transfers',
        'Daily breakfast and select dinners'
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
        'Molokini Snorkeling',
        'Lahaina Historic Town',
        'Traditional Luau'
      ],
      bestTimeToVisit: 'April-May (Spring) & September-November (Fall)',
      included: [
        'Oceanfront resort accommodation',
        'Snorkeling equipment',
        'Luau experience',
        'Car rental',
        'Daily breakfast'
      ]
    },
    {
      id: 4,
      name: 'Swiss Alps',
      description: 'Experience the majesty of the Alps with stunning mountain views, charming villages, and outdoor adventures.',
      image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
      rating: 4.8,
      duration: '7 days',
      price: 3499,
      highlights: [
        'Jungfraujoch Railway',
        'Zermatt & Matterhorn',
        'Lake Lucerne',
        'Interlaken Adventures',
        'Swiss Chocolate Making'
      ],
      bestTimeToVisit: 'June-August (Summer) & December-February (Winter)',
      included: [
        'Mountain view hotel accommodation',
        'Swiss Travel Pass',
        'Mountain excursions',
        'Chocolate workshop',
        'Daily breakfast and select dinners'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-700 py-16">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2245436/pexels-photo-2245436.png"
            alt="Travel destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900 bg-opacity-75" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Discover Perfect Week-Long Adventures
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
            Expertly curated 7-day itineraries for unforgettable experiences
          </p>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8">
          {destinations.map((destination) => (
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
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Best time to visit: {destination.bestTimeToVisit}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span>From ${destination.price} per person</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-medium text-gray-900">Highlights:</h3>
                    <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                      {destination.highlights.map((highlight, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-2"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <Link
                      to={`/tour/${destination.id}`}
                      className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      View Tour Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;