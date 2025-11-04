import React from 'react';
import { Users, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const Competitions = ({ darkMode = false }) => {
  const competitions = [
    {
      id: 1,
      title: "BIZNOVATOR",
      subtitle: "Symbiosis Center for Information Technology",
      type: "Offline",
      price: "Free",
      applied: 3,
      color: "from-blue-400 to-blue-600",
      logo: "🚀"
    },
    {
      id: 2,
      title: "Tech Takedown: The Big Pitch",
      subtitle: "St. Joseph's College Of Engineering, OMR",
      type: "Offline", 
      price: "Free",
      applied: 4,
      color: "from-pink-400 to-rose-500",
      logo: "💻"
    },
    {
      id: 3,
      title: "Marico Over The Wall Season 13",
      subtitle: "Marico",
      type: "Online",
      price: "Free", 
      applied: 620,
      color: "from-purple-400 to-purple-600",
      logo: "🏢"
    },
    {
      id: 4,
      title: "Bold & Graphix | The Poster Making Challenge",
      subtitle: "Central Institute of Technology (CIT), Kokrajhar",
      type: "Online",
      price: "Paid",
      applied: 16,
      color: "from-yellow-400 to-orange-500",
      logo: "🎨"
    }
  ];

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-2xl md:text-3xl font-bold mb-2 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Competitions
            </h2>
            <p className={`text-sm md:text-base transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Explore the Competitions that are creating a buzz among your peers!
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-300 ${
              darkMode ? 'text-purple-400 hover:bg-gray-800' : 'text-purple-600 hover:bg-purple-50'
            }`}>
              View all →
            </button>
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
        </div>

        {/* Horizontal Scrolling Cards */}
        <div className="relative">
          <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4">
            {competitions.map((competition) => (
              <div key={competition.id} className={`flex-shrink-0 w-80 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
              }`}>
                {/* Header with gradient */}
                <div className={`h-32 bg-gradient-to-br ${competition.color} relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 text-6xl opacity-20">
                      {competition.logo}
                    </div>
                    <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <circle cx="20" cy="80" r="30" fill="white" opacity="0.1"/>
                      <circle cx="80" cy="20" r="20" fill="white" opacity="0.1"/>
                    </svg>
                  </div>
                  
                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <span className="px-3 py-1 bg-white bg-opacity-90 text-xs font-medium rounded-full text-gray-800">
                      {competition.type}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full text-white ${
                      competition.price === 'Free' 
                        ? 'bg-green-500 bg-opacity-90' 
                        : 'bg-orange-500 bg-opacity-90'
                    }`}>
                      {competition.price}
                    </span>
                  </div>

                  {/* Logo/Icon in bottom right */}
                  <div className="absolute bottom-4 right-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <span className="text-xl">{competition.logo}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className={`font-bold text-lg mb-2 transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {competition.title}
                  </h3>
                  
                  <p className={`text-sm mb-4 line-clamp-2 transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {competition.subtitle}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Users size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`text-sm font-medium transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {competition.applied} Applied
                      </span>
                    </div>
                    <ExternalLink size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
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
      <style>{`
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

export default Competitions;