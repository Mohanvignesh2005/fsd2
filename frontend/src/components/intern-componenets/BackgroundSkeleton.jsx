import React from 'react';

const BackgroundSkeleton = () => {
  return (
    <div
      className="h-[300px] flex items-center"
      style={{
        background: 'linear-gradient(135deg, #620080 0%, #7a1a9a 50%, #620080 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Find Your Dream Internship
          </h1>
          <p className="text-xl text-purple-100">
            Discover the best internship opportunities from top companies around the world
          </p>
        </div>
      </div>
    </div>
  );
};

export default BackgroundSkeleton;
