import React from 'react';
import { Briefcase, MapPin, Clock, Users, Heart } from 'lucide-react';

const CareersPage: React.FC = () => {
  const openPositions = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: "We're looking for an experienced full-stack developer to help build the next generation of our travel planning platform.",
    },
    {
      id: 2,
      title: 'AI/ML Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Join our AI team to develop and improve our travel recommendation algorithms.',
    },
    {
      id: 3,
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Lead the development of new features and improvements to our travel planning platform.',
    },
    {
      id: 4,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Create beautiful and intuitive user experiences for our travel planning tools.',
    },
  ];

  const benefits = [
    {
      title: 'Flexible Work',
      description: 'Work from anywhere with flexible hours',
      icon: Clock,
    },
    {
      title: 'Travel Benefits',
      description: 'Annual travel stipend and discounted trips',
      icon: MapPin,
    },
    {
      title: 'Health & Wellness',
      description: 'Comprehensive health coverage and wellness programs',
      icon: Heart,
    },
    {
      title: 'Growth Opportunities',
      description: 'Professional development and career advancement',
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Join Our Team
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
            Help us revolutionize the future of travel planning
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Why Join Us */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Why Join TravelAI?</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We're building the future of travel planning with AI technology. Join our diverse team of passionate individuals who are making travel more accessible and enjoyable for everyone.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="bg-white p-6 rounded-lg shadow-md">
              <benefit.icon className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
              <p className="mt-2 text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Open Positions */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Open Positions</h2>
          <div className="space-y-6">
            {openPositions.map((position) => (
              <div
                key={position.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{position.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-4">
                      <span className="inline-flex items-center text-sm text-gray-600">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {position.department}
                      </span>
                      <span className="inline-flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {position.location}
                      </span>
                      <span className="inline-flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {position.type}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">{position.description}</p>
                  </div>
                  <button className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;