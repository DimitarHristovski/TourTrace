import React from 'react';
import { Book, Search, MessageCircle, Phone } from 'lucide-react';

const HelpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Help Center
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
            Find answers to your questions and get the support you need
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'Getting Started',
              description: 'Learn the basics of using TourTrace',
              icon: Book,
              topics: [
                'Creating an account',
                'Planning your first trip',
                'Using the AI planner',
                'Managing your itinerary'
              ]
            },
            {
              title: 'Common Questions',
              description: 'Find answers to frequently asked questions',
              icon: Search,
              topics: [
                'Account settings',
                'Payment methods',
                'Booking process',
                'Cancellation policy'
              ]
            },
            {
              title: 'Live Chat',
              description: 'Chat with our support team',
              icon: MessageCircle,
              topics: [
                'Available 24/7',
                'Quick responses',
                'Expert assistance',
                'Technical support'
              ]
            },
            {
              title: 'Contact Support',
              description: 'Get in touch with our team',
              icon: Phone,
              topics: [
                'Email support',
                'Phone support',
                'Support tickets',
                'Feedback'
              ]
            }
          ].map((section) => (
            <div key={section.title} className="bg-white rounded-lg shadow-md p-6">
              <section.icon className="h-8 w-8 text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h2>
              <p className="text-gray-600 mb-4">{section.description}</p>
              <ul className="space-y-2">
                {section.topics.map((topic) => (
                  <li key={topic} className="text-gray-600 hover:text-blue-600 cursor-pointer">
                    • {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;