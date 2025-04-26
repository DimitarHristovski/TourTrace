import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQPage: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          id: 'gs1',
          question: 'How do I create an account?',
          answer: 'To create an account, click on the "Sign Up" button in the top right corner. Fill in your email and password, and you\'re ready to start planning your trips.'
        },
        {
          id: 'gs2',
          question: 'Is TourTrace free to use?',
          answer: 'TourTrace offers both free and premium features. Basic trip planning is free, while advanced features and personalized recommendations are available with our premium subscription.'
        },
        {
          id: 'gs3',
          question: 'How does the AI trip planner work?',
          answer: 'Our AI analyzes your preferences, budget, and travel dates to create personalized itineraries. It considers factors like popular attractions, local events, and your interests to suggest the best experiences.'
        }
      ]
    },
    {
      category: 'Trip Planning',
      questions: [
        {
          id: 'tp1',
          question: 'Can I modify my itinerary after it\'s generated?',
          answer: 'Yes, you can customize any aspect of your itinerary. Add or remove activities, adjust timings, and make any changes to suit your preferences.'
        },
        {
          id: 'tp2',
          question: 'How far in advance should I plan my trip?',
          answer: 'We recommend planning at least 2-3 months ahead for international trips and 1-2 months for domestic travel to get the best options and deals.'
        },
        {
          id: 'tp3',
          question: 'Can I share my itinerary with others?',
          answer: 'Yes, you can share your itinerary with travel companions via email or generate a shareable link.'
        }
      ]
    },
    {
      category: 'Account & Settings',
      questions: [
        {
          id: 'as1',
          question: 'How do I update my profile information?',
          answer: 'Go to your Profile page and click on the Edit button to update your personal information, preferences, and settings.'
        },
        {
          id: 'as2',
          question: 'Can I change my email address?',
          answer: 'Yes, you can change your email address in your account settings. You\'ll need to verify the new email address before the change takes effect.'
        },
        {
          id: 'as3',
          question: 'How do I reset my password?',
          answer: 'Click on "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your email to reset your password.'
        }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
            Find answers to common questions about using TourTrace
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {faqs.map((section) => (
            <div key={section.category} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
                onClick={() => toggleSection(section.category)}
              >
                <h2 className="text-xl font-semibold text-gray-900">{section.category}</h2>
                {openSection === section.category ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openSection === section.category && (
                <div className="px-6 py-4 space-y-4">
                  {section.questions.map((faq) => (
                    <div key={faq.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;