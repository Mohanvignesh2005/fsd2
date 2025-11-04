import React from 'react';
import { Eye, MapPin, Users, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const Internships = ({ darkMode = false }) => {
  const internships = [
    {
      id: 1,
      title: "Business Development Internship - Marketing",
      company: "Edxcellence",
      type: "In Office",
      status: "Actively Hiring",
      views: 87,
      location: "Bangalore Urban",
      applied: null,
      color: "from-blue-400 to-blue-600",
      logo: "📚"
    },
    {
      id: 2,
      title: "Human Resources Internship",
      company: "MisaNova Careers",
      type: "WFH",
      status: "Actively Hiring",
      applied: 28,
      location: "Not Disclosed",
      color: "from-pink-400 to-rose-500",
      logo: "👥"
    },
    {
      id: 3,
      title: "Social Media Managing Internship",
      company: "Emergexians Infotech Pvt. Ltd.",
      type: "WFH",
      status: null,
      applied: 4,
      location: "Not Disclosed",
      color: "from-purple-400 to-purple-600",
      logo: "📱"
    },
    {
      id: 4,
      title: "Human Resources Internship",
      company: "Studify Success Private Limited",
      type: "WFH",
      status: "Actively Hiring",
      applied: 6,
      location: "Pan India",
      color: "from-yellow-400 to-orange-500",
      logo: "🎯"
    },
    {
      id: 5,
      title: "Software Development Internship",
      company: "TechCorp Solutions",
      type: "Hybrid",
      status: "Actively Hiring",
      applied: 12,
      location: "Mumbai",
      color: "from-green-400 to-teal-500",
      logo: "💻"
    },
    {
      id: 6,
      title: "Content Writing Internship",
      company: "Creative Media House",
      type: "WFH",
      status: "Actively Hiring",
      applied: 23,
      location: "Remote",
      color: "from-indigo-400 to-purple-500",
      logo: "✍️"
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
              Internships
            </h2>
            <p className={`text-sm md:text-base transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Find the Internships that fit your career aspirations.
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
            {internships.map((internship) => (
              <div key={internship.id} className={`flex-shrink-0 w-80 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
              }`}>
                {/* Header with gradient and company logo */}
                <div className={`h-32 bg-gradient-to-br ${internship.color} relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <circle cx="20" cy="80" r="30" fill="white" opacity="0.1"/>
                      <circle cx="80" cy="20" r="20" fill="white" opacity="0.1"/>
                      <path d="M0,50 Q50,0 100,50 T200,50 L200,100 L0,100 Z" fill="white" opacity="0.05"/>
                    </svg>
                  </div>
                  
                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <span className="px-3 py-1 bg-white bg-opacity-90 text-xs font-medium rounded-full text-gray-800">
                      {internship.type}
                    </span>
                    {internship.status && (
                      <span className="px-3 py-1 bg-yellow-500 bg-opacity-90 text-xs font-bold rounded-full text-white flex items-center space-x-1">
                        <span>⚡</span>
                        <span>{internship.status}</span>
                      </span>
                    )}
                  </div>

                  {/* Company Logo */}
                  <div className="absolute bottom-4 right-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <span className="text-xl">{internship.logo}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className={`font-bold text-lg mb-2 line-clamp-2 transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {internship.title}
                  </h3>
                  
                  <p className={`text-sm mb-4 font-medium transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {internship.company}
                  </p>

                  <div className="space-y-3">
                    {/* Views or Applied */}
                    <div className="flex items-center justify-between">
                      {internship.views ? (
                        <div className="flex items-center space-x-1">
                          <Eye size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                          <span className={`text-sm transition-colors duration-300 ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {internship.views} Views
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <Users size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                          <span className={`text-sm transition-colors duration-300 ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {internship.applied} Applied
                          </span>
                        </div>
                      )}
                      <ExternalLink size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                    </div>

                    {/* Location */}
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`text-sm transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {internship.location}
                      </span>
                    </div>
                  </div>

                  <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
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

export default Internships;