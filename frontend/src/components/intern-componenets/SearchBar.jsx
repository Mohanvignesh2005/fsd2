import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { useJobDataContext } from './useJobData';

const SearchBar = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    location, 
    setLocation, 
    handleSearch,
    clearAllFilters,
    selectedFilters = [],   // ✅ default empty array
    setSelectedFilters
  } = useJobDataContext();

  // Toggle filters on/off safely
  const toggleFilter = (filter) => {
    if (selectedFilters?.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...(selectedFilters || []), filter]);
    }
  };

  // Press Enter to search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const quickFilters = ['Remote', 'Full-time', 'Part-time', 'Paid', 'Tech', 'Design', 'Marketing'];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
      {/* Search Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Job Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Job title or keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Location Input */}
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Country or timezone"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={clearAllFilters}
            className="text-purple-600 hover:text-purple-700 px-4 py-3 font-medium transition-colors"
          >
            Clear
          </button>
          <button 
            onClick={handleSearch}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        {quickFilters.map((filter) => (
          <button 
            key={filter}
            onClick={() => toggleFilter(filter)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedFilters?.includes(filter)
                ? "bg-purple-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
