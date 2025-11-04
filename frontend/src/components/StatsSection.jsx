import React, { useState, useEffect } from 'react';
import { Users, FileText, Star, Building, Globe, MapPin } from 'lucide-react';

const StatsSection = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: "25",
      suffix: "M+",
      label: "Active Users",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      value: "22.3",
      suffix: "M+", 
      label: "Assessments",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      value: "130",
      suffix: "K+",
      label: "Opportunities",
      icon: Star,
      color: "text-blue-600",
      bgColor: "bg-gray-50"
    },
    {
      value: "800",
      suffix: "+",
      label: "Brands trust us",
      icon: Building,
      color: "text-gray-600",
      bgColor: "bg-gray-50"
    },
    {
      value: "42",
      suffix: "K+",
      label: "Organisations",
      icon: Globe,
      color: "text-blue-600",
      bgColor: "bg-gray-50"
    },
    {
      value: "78",
      suffix: "+",
      label: "Countries",
      icon: MapPin,
      color: "text-gray-600",
      bgColor: "bg-gray-50"
    }
  ];

  const AnimatedNumber = ({ value, suffix, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const numValue = parseFloat(value);

    useEffect(() => {
      if (!animated) return;

      let start = 0;
      const increment = numValue / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= numValue) {
          setCount(numValue);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }, [animated, numValue, duration]);

    return (
      <span>
        {count.toFixed(value.includes('.') ? 1 : 0)}{suffix}
      </span>
    );
  };

  return (
    <div id="stats-section" className="py-16 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Numbers</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className={`${stat.bgColor} rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-lg`}
            style={{ 
              animationDelay: `${index * 100}ms`,
              animation: animated ? 'slideUp 0.6s ease-out forwards' : 'none'
            }}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-8 h-8" />
              </div>
              
              <div className="space-y-1">
                <div className={`text-2xl lg:text-3xl font-bold ${stat.color}`}>
                  <AnimatedNumber 
                    value={stat.value} 
                    suffix={stat.suffix}
                    duration={1500 + index * 200}
                  />
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 to-blue-600/0 group-hover:from-blue-400/5 group-hover:to-blue-600/5 transition-all duration-300"></div>
          </div>
        ))}
      </div>

      {/* Achievement Badges */}
      <div className="flex justify-center mt-12 space-x-4">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          🏆 #1 Student Platform
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          ⭐ 4.8+ Rating
        </div>
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          🌍 Global Reach
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default StatsSection;