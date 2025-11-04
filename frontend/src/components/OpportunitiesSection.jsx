import React from 'react';
import { ArrowRight, Code, Trophy, GraduationCap, Users, Star } from 'lucide-react';

const OpportunitiesSection = () => {
  const opportunities = [
    {
      title: "Quizzes",
      icon: "quiz",
      bgColor: "bg-gradient-to-br from-blue-400 to-blue-600",
      description: "Test your knowledge with interactive quizzes",
      features: ["Multiple choice questions", "Instant feedback", "Progress tracking"]
    },
    {
      title: "Hackathons", 
      icon: Code,
      bgColor: "bg-gradient-to-br from-green-400 to-green-600",
      description: "Compete in coding challenges",
      features: ["Coding Hackathon - Online", "Data Science Hackathon - Online"],
      actionButtons: true
    },
    {
      title: "Scholarships",
      icon: GraduationCap,
      bgColor: "bg-gradient-to-br from-purple-400 to-purple-600", 
      description: "Apply for educational scholarships",
      features: ["Merit-based awards", "Need-based assistance", "Career development"]
    },
    {
      title: "Conferences",
      icon: Users,
      bgColor: "bg-gradient-to-br from-orange-300 to-orange-500",
      description: "Attend industry conferences",
      features: ["Expert speakers", "Networking opportunities", "Latest industry trends"]
    },
    {
      title: "College Festivals",
      icon: Star,
      bgColor: "bg-gradient-to-br from-yellow-400 to-yellow-600",
      description: "Participate in college events",
      features: ["Cultural events", "Technical competitions", "Awards and recognition"]
    }
  ];

  const QuizIcon = () => (
    <div className="bg-gray-800 rounded-lg p-2 text-white">
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <span className="text-xs">1</span>
          <div className="w-8 h-1 bg-white rounded"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs">2</span>
          <div className="w-8 h-1 bg-white rounded"></div>
          <div className="w-3 h-3 bg-red-400 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs">3</span>
          <div className="w-8 h-1 bg-white rounded"></div>
          <div className="w-3 h-3 bg-red-400 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            Pick The Right Opportunity!
          </h2>
          <p className="text-gray-600">
            Explore opportunities that best suits your skills and interests!
          </p>
        </div>
        <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
          Explore all <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {opportunities.map((opportunity, index) => (
          <div 
            key={index}
            className={`${opportunity.bgColor} rounded-2xl p-6 text-white hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg`}
          >
            <div className="flex flex-col h-full">
              <div className="mb-4">
                {opportunity.icon === "quiz" ? (
                  <QuizIcon />
                ) : (
                  <opportunity.icon className="w-8 h-8 text-white" />
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-2">{opportunity.title}</h3>
              
              {opportunity.actionButtons && (
                <div className="space-y-2 mt-auto">
                  {opportunity.features.map((feature, idx) => (
                    <button 
                      key={idx}
                      className="bg-black bg-opacity-30 hover:bg-opacity-40 rounded-full px-4 py-2 text-sm font-medium transition-all w-full text-left flex items-center justify-between"
                    >
                      <span>{feature}</span>
                      <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                        Apply Now
                      </span>
                    </button>
                  ))}
                </div>
              )}
              
              {opportunity.title === "Scholarships" && (
                <div className="mt-auto">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3 flex items-center space-x-3">
                    <GraduationCap className="w-6 h-6" />
                    <div className="flex-1">
                      <div className="w-full h-2 bg-white bg-opacity-30 rounded-full">
                        <div className="w-3/4 h-full bg-white rounded-full"></div>
                      </div>
                    </div>
                    <Trophy className="w-5 h-5" />
                  </div>
                </div>
              )}
              
              {opportunity.title === "Conferences" && (
                <div className="mt-auto">
                  <div className="bg-black bg-opacity-20 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-white bg-opacity-30 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="w-3/4 h-2 bg-white bg-opacity-30 rounded mb-1"></div>
                        <div className="w-1/2 h-2 bg-white bg-opacity-20 rounded"></div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map((i) => (
                        <div key={i} className="w-6 h-6 bg-gray-800 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {opportunity.title === "College Festivals" && (
                <div className="mt-auto">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-yellow-500 font-bold">a</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded"></div>
                    <Trophy className="w-8 h-8 text-yellow-300" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpportunitiesSection;