import React from 'react';
import { Heart, Users, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturedOpportunities = ({ darkMode = false }) => {
  const opportunities = [
    {
      id: 1,
      title: "Aditya Birla Group Stratos 2025",
      type: "Online",
      price: "Free",
      registered: 2334,
      daysLeft: 4,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      tags: ["Business Strategy", "Leadership"],
      color: "from-teal-400 to-cyan-500"
    },
    {
      id: 2,
      title: "L'Oréal Paris x Tira Runway to Paris",
      type: "Online",
      price: "Free",
      registered: 7,
      daysLeft: 11,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop",
      tags: ["Fashion", "Marketing"],
      color: "from-pink-400 to-red-500"
    },
    {
      id: 3,
      title: "Grab PPIs/PPOs and prizes worth INR 7,25,000/- via HUL Techtonic Season 7",
      type: "Online",
      price: "Free",
      registered: 559,
      daysLeft: 7,
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=250&fit=crop",
      tags: ["Technology", "Product Management"],
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: 4,
      title: "Grab PPIs via HUL FinAce Season 9",
      type: "Online",
      price: "Free",
      registered: 37,
      daysLeft: 9,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
      tags: ["Finance", "Analytics"],
      color: "from-gray-700 to-gray-900"
    }
  ];

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="text-4xl">🏆</div>
              <div className="text-4xl">👑</div>
            </div>
            <div>
              <h2 className={`text-2xl md:text-3xl font-bold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Featured Opportunities
              </h2>
              <p className={`text-sm md:text-base transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Check out the curated opportunities handpicked for you from top organizations.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className={`p-2 rounded-lg transition-colors duration-300 ${
              darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}>
              <ChevronLeft size={20} />
            </button>
            <button className={`p-2 rounded-lg transition-colors duration-300 ${
              darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div className="relative">
          <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4">
            {opportunities.map((opportunity) => (
              <div key={opportunity.id} className={`flex-shrink-0 w-80 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
              }`}>
                {/* Image */}
                <div className="relative h-48">
                  <div className={`absolute inset-0 bg-gradient-to-br ${opportunity.color} opacity-90`}></div>
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <span className="px-3 py-1 bg-white bg-opacity-90 text-xs font-medium rounded-full text-gray-800">
                      {opportunity.type}
                    </span>
                    <span className="px-3 py-1 bg-green-500 bg-opacity-90 text-xs font-medium rounded-full text-white">
                      {opportunity.price}
                    </span>
                  </div>
                  <button className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300">
                    <Heart size={16} className="text-white" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className={`font-bold text-lg mb-3 line-clamp-2 transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {opportunity.title}
                  </h3>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Users size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`text-sm transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {opportunity.registered} Registered
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`text-sm transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {opportunity.daysLeft} days left
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {opportunity.tags.map((tag, index) => (
                      <span key={index} className={`px-2 py-1 text-xs font-medium rounded-full transition-colors duration-300 ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default FeaturedOpportunities;