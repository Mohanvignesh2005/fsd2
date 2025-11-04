import React, { useState, useEffect } from 'react';
import { Users, Target, Award, Briefcase, Heart, Globe, ArrowRight, Sparkles } from 'lucide-react';

const AboutUs = () => {
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  const stats = [
    { number: 10000, suffix: "+", label: "Students Placed" },
    { number: 500, suffix: "+", label: "Partner Companies" },
    { number: 95, suffix: "%", label: "Success Rate" },
    { number: 50, suffix: "+", label: "Cities Covered" }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Emily Davis",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    }
  ];

  const values = [
    {
      icon: <Target className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />,
      title: "Mission Driven",
      description: "Connecting talented students with amazing opportunities to kickstart their careers."
    },
    {
      icon: <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />,
      title: "Student First",
      description: "Every decision we make prioritizes the success and growth of our student community."
    },
    {
      icon: <Globe className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />,
      title: "Global Impact",
      description: "Building bridges between local talent and global opportunities across industries."
    }
  ];

  // Animation function for counting up
  const animateValue = (start, end, duration, index) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);
      
      setAnimatedStats(prev => {
        const newStats = [...prev];
        newStats[index] = currentValue;
        return newStats;
      });

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Intersection Observer to trigger animation when stats come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isStatsVisible) {
          setIsStatsVisible(true);
          stats.forEach((stat, index) => {
            setTimeout(() => {
              animateValue(0, stat.number, 2000 + (index * 200), index);
            }, index * 300);
          });
        }
      },
      { threshold: 0.3 }
    );

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, [isStatsVisible]);

  const formatNumber = (num, index) => {
    if (index === 0 && num >= 1000) {
      return Math.floor(num / 1000) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-900 to-purple-600 text-white py-12 sm:py-16 md:py-20 lg:py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 animate-fade-in leading-tight">
            About InternConnect
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed px-2">
            Empowering the next generation of professionals through meaningful internship experiences
          </p>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-white mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Stats Section */}
      <div id="stats-section" className="py-12 sm:py-16 md:py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 transform">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-600 mb-2">
                  {formatNumber(animatedStats[index], index)}{stat.suffix}
                </div>
                <div className="text-sm sm:text-base md:text-lg text-gray-600 font-medium px-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
                Our Story
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Founded in 2025, InternConnect was born from a simple observation: talented students 
                were struggling to find quality internships, while companies were missing out on fresh 
                perspectives and innovative thinking.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                We set out to bridge this gap by creating a platform that not only connects students 
                with opportunities but also provides the tools and support they need to succeed in 
                their professional journey.
              </p>
              <div className="flex items-center space-x-3 md:space-x-4">
                <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-purple-600 flex-shrink-0" />
                <span className="text-sm sm:text-base md:text-lg text-gray-700 font-medium">Building careers, one internship at a time</span>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-4 sm:p-6 md:p-8">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                  alt="Team collaboration" 
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-12 sm:py-16 md:py-20 px-4 bg-purple-600">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 leading-tight">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {values.map((value, index) => (
              <div key={index} className="text-center sm:text-left lg:text-center">
                <div className="bg-purple-800 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto sm:mx-0 lg:mx-auto mb-4 sm:mb-5 md:mb-6 hover:bg-purple-700 transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 md:mb-4">{value.title}</h3>
                <p className="text-sm sm:text-base md:text-lg text-purple-100 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative bg-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-8 left-8 sm:top-10 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-purple-100 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute bottom-16 right-12 sm:bottom-20 sm:right-16 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-indigo-100 rounded-full opacity-40 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-purple-50 rounded-full opacity-50 animate-pulse delay-500"></div>
          <div className="absolute top-16 right-1/4 sm:top-20 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-purple-50 rounded-full opacity-30"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6 md:mb-8 gap-2 sm:gap-3">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-600 animate-pulse" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight px-2">
              Ready to Start Your Journey?
            </h2>
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-600 animate-pulse hidden sm:block" />
          </div>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-5xl mx-auto px-4">
            Join thousands of students who have transformed their careers and launched successful professional journeys through our innovative platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-8 sm:mb-10 md:mb-12 px-4">
            <button className="w-full sm:w-auto group bg-purple-600 text-white px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-purple-200 flex items-center justify-center">
              Find Internships
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="w-full sm:w-auto group border-2 md:border-3 border-purple-600 text-purple-600 px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              Post Opportunities
              <Briefcase className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-10 max-w-4xl mx-auto px-2">
            <div className="text-center">
              <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 sm:p-5 md:p-6 hover:bg-purple-100 hover:border-purple-200 transition-all duration-300 transform hover:scale-105">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">24/7</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600">Support Available</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 sm:p-5 md:p-6 hover:bg-purple-100 hover:border-purple-200 transition-all duration-300 transform hover:scale-105">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">100%</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600">Free for Students</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-10 md:py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-5 md:mb-6">
            <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-400" />
            <span className="text-xl sm:text-2xl md:text-3xl font-bold">InternConnect</span>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-3 sm:mb-4 md:mb-6">
            Connecting talent with opportunity since 2025
          </p>
          <div className="border-t border-gray-700 pt-4 sm:pt-5 md:pt-6">
            <p className="text-xs sm:text-sm text-gray-500">
              © 2025 InternConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;