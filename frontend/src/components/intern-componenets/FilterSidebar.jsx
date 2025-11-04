import React, { useState, useRef, useEffect } from 'react';
import { Filter } from 'lucide-react';

const FilterSidebar = ({ onFiltersChange }) => {
  const [stipendValue, setStipendValue] = useState(25000);
  const [isDragging, setIsDragging] = useState(false);
  const [workTypes, setWorkTypes] = useState({
    'Remote': false,
    'Hybrid': false,
    'On-Site': false
  });
  const [durations, setDurations] = useState({
    '1-2 months': false,
    '3-4 months': false,
    '5-6 months': false,
    '6+ months': false
  });
  const [categories, setCategories] = useState({
    'Web Development': false,
    'Frontend Development': false,
    'Backend Development': false,
    'Data Science': false,
    'Mobile Development': false,
    'UI/UX Design': false,
    'Digital Marketing': false
  });
  const [locations, setLocations] = useState({
    'Bangalore, India': false,
    'Hyderabad, India': false,
    'Mumbai, India': false,
    'Delhi, India': false,
    'Chennai, India': false,
    'Pune, India': false
  });
  const [skills, setSkills] = useState({
    'JavaScript': false,
    'React': false,
    'Node.js': false,
    'Python': false,
    'HTML': false,
    'CSS': false,
    'MongoDB': false,
    'SQL': false
  });

  const sliderRef = useRef(null);
  const minVal = 0;
  const maxVal = 50000;

  // 🔥 Helper to trigger filter updates
  const triggerFilters = (overrides = {}) => {
    const filters = {
      stipendValue,
      workTypes: Object.entries(workTypes).filter(([_, c]) => c).map(([t]) => t),
      durations: Object.entries(durations).filter(([_, c]) => c).map(([d]) => d),
      categories: Object.entries(categories).filter(([_, c]) => c).map(([c]) => c),
      locations: Object.entries(locations).filter(([_, c]) => c).map(([l]) => l),
      skills: Object.entries(skills).filter(([_, c]) => c).map(([s]) => s),
      ...overrides
    };
    if (onFiltersChange) onFiltersChange(filters);
  };

  // Handlers (now auto-apply filters)
  const handleWorkTypeChange = (type) => {
    setWorkTypes(prev => {
      const updated = { ...prev, [type]: !prev[type] };
      triggerFilters({
        workTypes: Object.entries(updated).filter(([_, c]) => c).map(([t]) => t)
      });
      return updated;
    });
  };

  const handleDurationChange = (duration) => {
    setDurations(prev => {
      const updated = { ...prev, [duration]: !prev[duration] };
      triggerFilters({
        durations: Object.entries(updated).filter(([_, c]) => c).map(([d]) => d)
      });
      return updated;
    });
  };

  const handleCategoryChange = (category) => {
    setCategories(prev => {
      const updated = { ...prev, [category]: !prev[category] };
      triggerFilters({
        categories: Object.entries(updated).filter(([_, c]) => c).map(([c]) => c)
      });
      return updated;
    });
  };

  const handleLocationChange = (location) => {
    setLocations(prev => {
      const updated = { ...prev, [location]: !prev[location] };
      triggerFilters({
        locations: Object.entries(updated).filter(([_, c]) => c).map(([l]) => l)
      });
      return updated;
    });
  };

  const handleSkillChange = (skill) => {
    setSkills(prev => {
      const updated = { ...prev, [skill]: !prev[skill] };
      triggerFilters({
        skills: Object.entries(updated).filter(([_, c]) => c).map(([s]) => s)
      });
      return updated;
    });
  };

  const clearAllFilters = () => {
    const cleared = {
      stipendValue: 25000,
      workTypes: {},
      durations: {},
      categories: {},
      locations: {},
      skills: {}
    };
    setStipendValue(25000);
    setWorkTypes(Object.keys(workTypes).reduce((acc, k) => ({ ...acc, [k]: false }), {}));
    setDurations(Object.keys(durations).reduce((acc, k) => ({ ...acc, [k]: false }), {}));
    setCategories(Object.keys(categories).reduce((acc, k) => ({ ...acc, [k]: false }), {}));
    setLocations(Object.keys(locations).reduce((acc, k) => ({ ...acc, [k]: false }), {}));
    setSkills(Object.keys(skills).reduce((acc, k) => ({ ...acc, [k]: false }), {}));
    if (onFiltersChange) onFiltersChange(cleared);
  };

  // Slider logic
  const handleSliderMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    updateSliderValue(e);
  };

  const handleSliderMouseMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      updateSliderValue(e);
    }
  };

  const handleSliderMouseUp = () => {
    setIsDragging(false);
  };

  const updateSliderValue = (e) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const newValue = Math.round(minVal + percent * (maxVal - minVal));
      setStipendValue(newValue);
      triggerFilters({ stipendValue: newValue });
    }
  };

  const getPercent = (value) => Math.round(((value - minVal) / (maxVal - minVal)) * 100);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDragging) updateSliderValue(e);
    };
    const handleGlobalMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
    } else {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging]);

  // Reusable UI bits
  const FilterSection = ({ title, children }) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );

  const Checkbox = ({ checked, onChange, label }) => (
    <label className="flex items-center gap-3 cursor-pointer group py-2">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
        ${checked ? 'bg-purple-600 border-purple-600' : 'border-gray-300 group-hover:border-purple-400'}`}>
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        )}
      </div>
      <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200 text-sm">
        {label}
      </span>
    </label>
  );

  return (
    <div className="w-80 bg-white rounded-2xl p-6 shadow-lg border border-gray-200 sticky top-8 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Filter className="w-5 h-5 text-purple-600" />
          Filters
        </h2>
        <button 
          onClick={clearAllFilters}
          className="text-gray-500 hover:text-gray-700 p-1 text-sm font-medium transition-colors duration-200"
        >
          Clear All
        </button>
      </div>

      {/* Stipend Slider */}
      <FilterSection title="Monthly Stipend (₹)">
        <div className="space-y-6">
          <div className="flex justify-center">
            <span className="bg-purple-50 px-4 py-2 rounded-lg text-purple-700 font-semibold text-lg">
              ₹{stipendValue.toLocaleString()}
            </span>
          </div>
          <div 
            className="relative h-6 cursor-pointer select-none"
            ref={sliderRef}
            onMouseDown={handleSliderMouseDown}
            onMouseMove={handleSliderMouseMove}
            onMouseUp={handleSliderMouseUp}
            onMouseLeave={handleSliderMouseUp}
          >
            <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-3 bg-gray-200 rounded-lg"></div>
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg transition-all duration-150"
              style={{ width: `${getPercent(stipendValue)}%` }}
            ></div>
            <div 
              className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-3 border-purple-500 transition-all duration-150 ${isDragging ? 'scale-110 shadow-xl' : 'hover:scale-105 hover:shadow-xl'}`}
              style={{ left: `${getPercent(stipendValue)}%`, cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <div className="absolute inset-1 bg-purple-500 rounded-full"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>₹0</span>
            <span>₹50k+</span>
          </div>
        </div>
      </FilterSection>

      {/* Work Type */}
      <FilterSection title="Work Type">
        <div className="space-y-1">
          {Object.entries(workTypes).map(([type, checked]) => (
            <Checkbox key={type} checked={checked} onChange={() => handleWorkTypeChange(type)} label={type} />
          ))}
        </div>
      </FilterSection>

      {/* Duration */}
      <FilterSection title="Duration">
        <div className="space-y-1">
          {Object.entries(durations).map(([d, checked]) => (
            <Checkbox key={d} checked={checked} onChange={() => handleDurationChange(d)} label={d} />
          ))}
        </div>
      </FilterSection>

      {/* Category */}
      <FilterSection title="Category">
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {Object.entries(categories).map(([c, checked]) => (
            <Checkbox key={c} checked={checked} onChange={() => handleCategoryChange(c)} label={c} />
          ))}
        </div>
      </FilterSection>

      {/* Location */}
      <FilterSection title="Location">
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {Object.entries(locations).map(([l, checked]) => (
            <Checkbox key={l} checked={checked} onChange={() => handleLocationChange(l)} label={l} />
          ))}
        </div>
      </FilterSection>

      {/* Skills */}
      <FilterSection title="Skills Required">
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {Object.entries(skills).map(([s, checked]) => (
            <Checkbox key={s} checked={checked} onChange={() => handleSkillChange(s)} label={s} />
          ))}
        </div>
      </FilterSection>

      {/* Apply Filters Button (optional now) */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <button 
          onClick={() => triggerFilters()}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Apply Filters
        </button>
        <p className="text-xs text-gray-500 text-center">
          Filters are applied instantly to internship listings
        </p>
      </div>
    </div>
  );
};

export default FilterSidebar;
