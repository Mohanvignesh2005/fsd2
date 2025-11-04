import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

// Create Context
const JobDataContext = createContext();

// Context Provider
export const JobDataProvider = ({ children }) => {
  const [apiJobData, setApiJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filters, setFilters] = useState({
    stipendValue: 25000,
    workTypes: [],
    durations: [],
    categories: [],
    locations: [],
    skills: [],
    // Keep old filter structure for backward compatibility
    company: [],
    stipend: '',
    duration: '',
    workType: '',
    experience: ''
  });

  // API Configuration - Replace with your actual API endpoint
  const API_URL = 'http://localhost:9000/api/internships/get-all-internships'// Update this with your actual API URL

  // Function to fetch data from API
  const fetchJobData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any authentication headers if needed
          // 'Authorization': 'Bearer YOUR_TOKEN_HERE'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setApiJobData(Array.isArray(data) ? data : []);
      console.log('Fetched job data:', data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching jobs:', err);
      setApiJobData([]); // Fallback to empty array
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchJobData();
  }, []);

  // Transform API data to match your UI format
  const transformApiJob = (apiJob) => {
    // Helper function to calculate time ago
    const getTimeAgo = (dateString) => {
      const now = new Date();
      const createdDate = new Date(dateString);
      const diffTime = Math.abs(now - createdDate);
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffHours < 1) return 'Less than an hour ago';
      if (diffHours < 24) return `${diffHours} hours ago`;
      if (diffDays === 1) return '1 day ago';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      return `${Math.floor(diffDays / 30)} months ago`;
    };

    // Helper function to generate consistent logo colors
    const getLogoColor = (companyName) => {
      const colors = [
        'bg-blue-500', 'bg-purple-500', 'bg-indigo-500', 'bg-red-500',
        'bg-green-500', 'bg-yellow-500', 'bg-pink-500', 'bg-gray-900',
        'bg-orange-500', 'bg-teal-500'
      ];
      const hash = companyName.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      return colors[Math.abs(hash) % colors.length];
    };

    // Helper function to determine company type based on company name or other factors
    const getCompanyType = (company) => {
      // You can customize this logic based on your needs
      const unicorns = ['Linear', 'Stripe', 'Notion', 'Figma'];
      const enterprises = ['Google', 'Microsoft', 'Amazon', 'Apple'];
      
      if (unicorns.some(u => company.toLowerCase().includes(u.toLowerCase()))) return 'Unicorn';
      if (enterprises.some(e => company.toLowerCase().includes(e.toLowerCase()))) return 'Enterprise';
      return 'Startup';
    };

    return {
      id: apiJob._id,
      company: apiJob.company,
      position: apiJob.title,
      duration: apiJob.duration,
      stipend: `₹${parseInt(apiJob.stipend).toLocaleString()}/month`,
      location: apiJob.location,
      timeAgo: getTimeAgo(apiJob.createdAt),
      type: 'Full time', // You can modify this based on your API data
      tags: [
        ...(apiJob.skillsRequired || []),
        apiJob.category
      ].filter(Boolean),
      logo: apiJob.company.charAt(0).toUpperCase(),
      logoColor: getLogoColor(apiJob.company),
      workType: apiJob.workType,
      companyType: getCompanyType(apiJob.company),
      experienceLevel: 'No experience required', // Customize based on your API
      
      // Additional API fields
      description: apiJob.description,
      responsibilities: apiJob.responsibilities || [],
      openings: apiJob.openings || 1,
      perks: apiJob.perks || [],
      skillsRequired: apiJob.skillsRequired || [],
      startDate: apiJob.startDate,
      applyBy: apiJob.applyBy,
      savedByUser: apiJob.savedByUser || false,
      category: apiJob.category,
      uid: apiJob.uid,
      recruiterId: apiJob.recruiterId,
      companyId: apiJob.companyId,
      isActive: apiJob.isActive,
      
      // For filtering purposes
      stipendAmount: parseInt(apiJob.stipend) || 0
    };
  };

  // Transform API data to UI format
  const transformedJobs = useMemo(() => {
    if (!apiJobData.length) return [];
    return apiJobData.map(transformApiJob);
  }, [apiJobData]);

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    if (loading || !transformedJobs.length) return [];

    let filtered = transformedJobs.filter(job => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          job.position.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          job.description.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Location filter from search bar
      if (location && !job.location.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }

      // Stipend filter (new format from FilterSidebar)
      if (filters.stipendValue && job.stipendAmount > filters.stipendValue) {
        return false;
      }

      // Work type filter (new format)
      if (filters.workTypes && filters.workTypes.length > 0 && !filters.workTypes.includes(job.workType)) {
        return false;
      }

      // Duration filter (new format)
      if (filters.durations && filters.durations.length > 0 && !filters.durations.includes(job.duration)) {
        return false;
      }

      // Category filter (new format)
      if (filters.categories && filters.categories.length > 0 && !filters.categories.includes(job.category)) {
        return false;
      }

      // Location filter from sidebar
      if (filters.locations && filters.locations.length > 0) {
        const matchesLocation = filters.locations.some(loc => 
          job.location.toLowerCase().includes(loc.toLowerCase())
        );
        if (!matchesLocation) return false;
      }

      // Skills filter (new format)
      if (filters.skills && filters.skills.length > 0) {
        const matchesSkill = filters.skills.some(skill => 
          job.skillsRequired.some(jobSkill => 
            jobSkill.toLowerCase().includes(skill.toLowerCase())
          )
        );
        if (!matchesSkill) return false;
      }

      // Backward compatibility filters
      if (filters.company.length > 0 && !filters.company.includes(job.companyType)) {
        return false;
      }

      if (filters.workType && job.workType !== filters.workType) {
        return false;
      }

      if (filters.experience && job.experienceLevel !== filters.experience) {
        return false;
      }

      // Old stipend filter format
      if (filters.stipend) {
        const stipendAmount = job.stipendAmount;
        const [min, max] = filters.stipend.split('-').map(s => parseInt(s.replace(/[^0-9]/g, '')));
        if (max && (stipendAmount < min || stipendAmount > max)) {
          return false;
        }
        if (!max && stipendAmount < min) {
          return false;
        }
      }

      return true;
    });

    // Sort jobs
    switch (sortBy) {
      case 'company':
        return filtered.sort((a, b) => a.company.localeCompare(b.company));
      case 'stipend':
        return filtered.sort((a, b) => b.stipendAmount - a.stipendAmount);
      case 'match':
        if (!searchTerm) return filtered;
        return filtered.sort((a, b) => {
          const searchLower = searchTerm.toLowerCase();
          const aScore = (a.position.toLowerCase().includes(searchLower) ? 2 : 0) +
                        (a.tags.some(tag => tag.toLowerCase().includes(searchLower)) ? 1 : 0);
          const bScore = (b.position.toLowerCase().includes(searchLower) ? 2 : 0) +
                        (b.tags.some(tag => tag.toLowerCase().includes(searchLower)) ? 1 : 0);
          return bScore - aScore;
        });
      default: // 'recent'
        return filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }
  }, [transformedJobs, searchTerm, location, filters, sortBy, loading]);

  const handleSearch = () => {
    // Search is handled automatically by the filteredJobs useMemo
    console.log('Searching with:', { searchTerm, location, filters });
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setLocation('');
    setFilters({
      stipendValue: 25000,
      workTypes: [],
      durations: [],
      categories: [],
      locations: [],
      skills: [],
      // Keep old format for backward compatibility
      company: [],
      stipend: '',
      duration: '',
      workType: '',
      experience: ''
    });
  };

  // Function to handle filter updates from FilterSidebar
  const handleFiltersChange = (newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };

  // Function to refresh/reload data from API
  const refreshJobs = () => {
    fetchJobData();
  };

  const contextValue = {
    // Data states
    filteredJobs,
    loading,
    error,
    
    // Search and location
    searchTerm,
    setSearchTerm,
    location,
    setLocation,
    
    // Filters
    filters,
    setFilters,
    handleFiltersChange,
    
    // Sorting
    sortBy,
    setSortBy,
    
    // Actions
    handleSearch,
    clearAllFilters,
    refreshJobs,
    
    // Stats
    totalJobs: transformedJobs.length,
    filteredJobsCount: filteredJobs.length,
    
    // Raw data (for debugging or advanced usage)
    apiJobData,
    transformedJobs
  };

  return (
    <JobDataContext.Provider value={contextValue}>
      {children}
    </JobDataContext.Provider>
  );
};

// Custom hook to use the context
export const useJobDataContext = () => {
  const context = useContext(JobDataContext);
  if (!context) {
    throw new Error('useJobDataContext must be used within a JobDataProvider');
  }
  return context;
};

// Export default job data (empty array since we're using API)
export const defaultJobData = [];