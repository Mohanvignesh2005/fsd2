import React from 'react';
import { BookOpen, Award, FileText, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-yellow-400 via-orange-300 to-yellow-500 rounded-3xl p-8 lg:p-12 mb-8">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <div className="flex items-center space-x-4 mb-6">
            <img 
              src="/api/placeholder/80/80" 
              alt="Student" 
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            <div className="flex flex-wrap gap-3">
              <div className="bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5 text-orange-500" />
              </div>
              <div className="bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform">
                <div className="w-5 h-5 bg-green-600 rounded"></div>
              </div>
              <div className="bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform">
                <div className="w-5 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">AWS</div>
              </div>
              <div className="bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform">
                <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">C++</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-lg inline-block mb-4">
            <div className="text-2xl font-bold text-gray-800">50k+</div>
            <div className="text-gray-600 text-sm">Students Preparing with Us</div>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2 lg:pl-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Learn & Level Up Your Skills
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Select from a wide range of courses to upskill and advance your career!
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-gray-800 font-medium">50+ Courses</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2">
              <Award className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-gray-800 font-medium">Certificate</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2">
              <FileText className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-gray-800 font-medium">Projects & Assignments</span>
            </div>
          </div>

          <button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-full font-semibold flex items-center space-x-2 transition-all hover:scale-105 shadow-lg">
            <span>Explore Courses</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;