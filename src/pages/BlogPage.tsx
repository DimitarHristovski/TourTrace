import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPage: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: '10 Hidden Gems in Paris You Need to Visit',
      excerpt: 'Discover the secret spots in the City of Light that most tourists never see...',
      image: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
      author: 'Emma Thompson',
      date: '2024-03-01',
      category: 'Travel Tips',
    },
    {
      id: 2,
      title: "A Food Lover's Guide to Tokyo",
      excerpt: "From street food to Michelin stars, explore Tokyo's incredible culinary scene...",
      image: 'https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg',
      author: 'Michael Chen',
      date: '2024-02-28',
      category: 'Food & Culture',
    },
    {
      id: 3,
      title: 'Sustainable Travel: Tips for Eco-Friendly Adventures',
      excerpt: 'Learn how to minimize your environmental impact while exploring the world...',
      image: 'https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg',
      author: 'Sarah Wilson',
      date: '2024-02-25',
      category: 'Sustainable Travel',
    },
    {
      id: 4,
      title: 'Budget Travel: Europe on $50 a Day',
      excerpt: 'Your complete guide to experiencing Europe without breaking the bank...',
      image: 'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg',
      author: 'David Miller',
      date: '2024-02-22',
      category: 'Budget Travel',
    },
    {
      id: 5,
      title: 'The Ultimate Guide to Solo Female Travel',
      excerpt: 'Essential tips and destinations for women traveling alone...',
      image: 'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg',
      author: 'Lisa Anderson',
      date: '2024-02-20',
      category: 'Solo Travel',
    },
    {
      id: 6,
      title: 'Photography Tips for Travel Enthusiasts',
      excerpt: 'Capture stunning travel memories with these professional photography tips...',
      image: 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg',
      author: 'James Wilson',
      date: '2024-02-18',
      category: 'Photography',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Travel Blog
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
            Stories, tips, and inspiration for your next adventure
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
                <Link
                  to={`/blog/${post.id}`}
                  className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700"
                >
                  Read more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;