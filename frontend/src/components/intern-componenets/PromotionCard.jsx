import React, { useState } from 'react';
import { Mail, TrendingUp } from 'lucide-react';

const PromotionCard = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const popularSearches = [
    { title: 'Software Engineering', count: '156 internships', color: 'text-blue-600' },
    { title: 'Product Design', count: '89 internships', color: 'text-purple-600' },
    { title: 'Data Science', count: '124 internships', color: 'text-green-600' },
    { title: 'Marketing', count: '67 internships', color: 'text-orange-600' }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribing email:', email);
      setIsSubscribed(true);
      setEmail('');
      
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }
  };

  const handleSearchClick = (searchTerm) => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="space-y-6">
      {/* Newsletter Signup */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-3">
          <Mail className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Weekly Newsletter</h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">
          We'll keep you updated when the best new internship opportunities show up on InternshipHub.
        </p>
        
        {isSubscribed ? (
          <div className="text-center py-4">
            <div className="text-green-600 font-medium mb-2">✓ Subscribed!</div>
            <p className="text-sm text-gray-600">Thank you for subscribing to our newsletter.</p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-3"
              required
            />
            <button 
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
        
        <p className="text-xs text-gray-500 mt-3">
          We care about your data in our{' '}
          <a href="#" className="text-purple-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>

      {/* Popular Searches */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Popular Searches</h3>
        </div>
        
        <div className="space-y-3">
          {popularSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => handleSearchClick(search.title)}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${search.color} group-hover:underline`}>
                    {search.title}
                  </p>
                  <p className="text-sm text-gray-500">{search.count}</p>
                </div>
                <div className="text-gray-400 group-hover:text-gray-600">
                  →
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors">
            View all categories →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;