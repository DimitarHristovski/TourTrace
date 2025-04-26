import React from 'react';
import { Globe, Users, Award, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
TourTrace          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
            Revolutionizing travel planning with artificial intelligence
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            At TravelAI, we're on a mission to make travel planning effortless and personalized. 
            By combining artificial intelligence with human expertise, we create unique travel 
            experiences tailored to each individual's preferences and interests.
          </p>
        </div>

        {/* Values */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-blue-600">
              <Globe className="h-12 w-12" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900">Global Perspective</h3>
            <p className="mt-2 text-gray-600">
              We bring the world closer by connecting travelers with authentic local experiences.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-blue-600">
              <Users className="h-12 w-12" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900">Community-Driven</h3>
            <p className="mt-2 text-gray-600">
              Our recommendations are enriched by insights from millions of travelers worldwide.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-blue-600">
              <Award className="h-12 w-12" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900">Excellence</h3>
            <p className="mt-2 text-gray-600">
              We strive for excellence in every itinerary we create and every service we provide.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Our Team</h2>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              {
                name: 'Sarah Chen',
                role: 'CEO & Founder',
                image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
                bio: 'Former tech executive with a passion for travel and AI.',
              },
              {
                name: 'Michael Rodriguez',
                role: 'Head of Technology',
                image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
                bio: 'AI expert with 15 years of experience in travel tech.',
              },
              {
                name: 'Emma Thompson',
                role: 'Head of Travel Operations',
                image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
                bio: 'Travel industry veteran with global expertise.',
              },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto h-40 w-40 overflow-hidden rounded-full">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600">{member.role}</p>
                  <p className="mt-2 text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {[
              { label: 'Happy Travelers', value: '50K+' },
              { label: 'Destinations', value: '1000+' },
              { label: 'Countries', value: '120+' },
              { label: 'Trip Plans Created', value: '100K+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-blue-600">{stat.value}</p>
                <p className="mt-2 text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;