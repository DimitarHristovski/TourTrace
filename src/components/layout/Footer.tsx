import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">TourTrace</span>
            </div>
            <p className="mt-4 text-sm text-gray-300">
              Your AI-powered travel companion. Create personalized itineraries and discover unique experiences based on your preferences.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Planning</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/planner" className="text-gray-300 hover:text-white">
                  Create Trip
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-gray-300 hover:text-white">
                  Explore Destinations
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white">
                  Travel Guides
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-gray-300 hover:text-white">
                  Seasonal Recommendations
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white">
                  Privacy & Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <a href="mailto:support@travelai.com" className="text-gray-300 hover:text-white">
                    support@travelai.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} TourTrace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;