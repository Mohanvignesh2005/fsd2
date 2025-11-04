import React from 'react';
import { useJobDataContext } from './useJobData';
import InternCard from './InterCard';

const JobResults = () => {
  const { filteredJobs, sortBy, setSortBy, loading, error, clearAllFilters } = useJobDataContext();

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <span className="ml-3 text-gray-600">Loading internships...</span>
      </div>
    );
  }

// Error state
if (error) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      {/* Fancy Icon */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 rounded-full shadow-lg mb-6">
        <svg xmlns="http://www.w3.org/2000/svg"
             className="w-14 h-14 text-white"
             fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0
               9 9 0 0118 0z" />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        No Internships Available
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 max-w-md text-center mb-6">
        Oops! We couldn’t fetch internships. This usually means your backend
        isn’t connected yet. Please connect to the backend API to load data.
      </p>

      {/* Action Button */}
      <button
        onClick={() => window.location.reload()}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 
                   hover:from-purple-700 hover:to-indigo-700 
                   text-white px-6 py-3 rounded-xl font-semibold 
                   shadow-md transform hover:scale-105 transition-all duration-300"
      >
        Retry Connection
      </button>
    </div>
  );
}


  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          {filteredJobs.length} internship{filteredJobs.length !== 1 ? 's' : ''}
        </p>
        <div className="flex items-center gap-2">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
          >
            <option value="recent">Most recent</option>
            <option value="match">Best match</option>
            <option value="stipend">Highest stipend</option>
            <option value="company">Company name</option>
          </select>
        </div>
      </div>

      {/* Job Cards Grid - Using InternCard component */}
      {filteredJobs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <InternCard key={job.id} job={job} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8">
            <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors shadow-sm">
              Load more internships
            </button>
          </div>
        </>
      ) : (
        /* No Results */
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No internships found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or filters to find more opportunities.
          </p>
          <button 
            onClick={clearAllFilters}
            className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default JobResults;