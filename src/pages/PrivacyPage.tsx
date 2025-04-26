import React from 'react';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Privacy & Terms
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
            We're committed to protecting your privacy and data
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Privacy Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            {
              icon: Shield,
              title: 'Data Protection',
              description: 'Your personal information is encrypted and stored securely.',
            },
            {
              icon: Lock,
              title: 'Secure Transactions',
              description: 'All payments are processed through secure, encrypted channels.',
            },
            {
              icon: Eye,
              title: 'Transparency',
              description: "We're clear about how we collect and use your data.",
            },
            {
              icon: UserCheck,
              title: 'Your Control',
              description: 'Access, update, or delete your data at any time.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-white p-6 rounded-lg shadow-md">
              <item.icon className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Privacy Policy */}
        <div className="prose max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h2>
          
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h3>
            <p className="text-gray-600 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Travel preferences and history</li>
              <li>Payment information</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h3>
            <p className="text-gray-600 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Provide and improve our services</li>
              <li>Personalize your experience</li>
              <li>Process your transactions</li>
              <li>Communicate with you</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Information Sharing</h3>
            <p className="text-gray-600">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Service providers who assist in our operations</li>
              <li>Partners who help provide travel services</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Rights</h3>
            <p className="text-gray-600">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h3>
            <p className="text-gray-600">
              If you have any questions about our privacy practices or would like to exercise your rights,
              please contact us at:
            </p>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">Email: privacy@travelai.com</p>
              <p className="text-gray-600">Phone: 1-800-TRAVEL-AI</p>
              <p className="text-gray-600">Address: 123 Travel Street, San Francisco, CA 94105</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;