import React from 'react';
import { Smartphone, Gift, Download, Share2, Star } from 'lucide-react';

const AppDownloadSection = () => {
  const rewards = [
    { icon: '💻', label: 'MacBook' },
    { icon: '📱', label: 'iPhone' },
    { icon: '⌚', label: 'Apple Watch' },
    { icon: '🎧', label: 'AirPods' },
    { icon: '💰', label: 'Cash Rewards' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-12">
      {/* App Download Section */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Download</h2>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Unstop App</h2>
          
          <div className="flex space-x-4 mb-8">
            <div className="bg-white rounded-xl p-3 shadow-lg hover:scale-105 transition-transform">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">▶</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-lg hover:scale-105 transition-transform">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Download className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">un</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Connecting 👥</div>
                  <div className="text-blue-600 text-sm">Talent, Colleges, Recruiters</div>
                </div>
              </div>
              <div className="mt-3 flex space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="w-3/4 h-2 bg-gray-200 rounded mb-2"></div>
                  <div className="w-1/2 h-2 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Refer & Win Section */}
      <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-8 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Refer & Win</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            MacBook, iPhone, Apple Watch, AirPods, Cash Rewards and more!
          </p>

          <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-semibold flex items-center space-x-2 mb-8 transition-all hover:scale-105">
            <Share2 className="w-5 h-5" />
            <span>Get Started</span>
          </button>

          {/* Floating Reward Icons */}
          <div className="relative">
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-bounce">
              <div className="w-6 h-6 bg-gray-800 rounded"></div>
            </div>
            <div className="absolute top-8 -left-2 bg-white rounded-full p-3 shadow-lg">
              <Smartphone className="w-6 h-6 text-blue-600" />
            </div>
            <div className="absolute -bottom-2 right-8 bg-white rounded-full p-3 shadow-lg">
              <Gift className="w-6 h-6 text-red-500" />
            </div>
            <div className="absolute bottom-4 left-12 bg-white rounded-full p-2 shadow-lg">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
            </div>
          </div>
        </div>

        {/* Happy People Image Placeholder */}
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-yellow-400 to-orange-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32">
          <div className="w-full h-full bg-white bg-opacity-30 rounded-full flex items-center justify-center">
            <div className="text-4xl">🎉</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownloadSection;