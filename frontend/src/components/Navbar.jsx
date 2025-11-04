import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ isWhite = false, isScrolled: externalScrolled = null }) => {
  const [internalScrolled, setInternalScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Use external scroll state if provided, otherwise use internal scroll detection
  const isScrolled = externalScrolled !== null ? externalScrolled : internalScrolled;

  // Add this function to check if current page matches the path
  const isActivePage = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    // Only set up internal scroll detection if no external scroll state is provided
    if (externalScrolled === null) {
      const handleScroll = () => {
        setInternalScrolled(window.scrollY > 20);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [externalScrolled]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Simplified and clearer navbar styling
  const getNavbarStyle = () => {
    if (isWhite) {
      return 'bg-white shadow-md border-b border-gray-200';
    }
    
    // When scrolled, always use white background with shadow
    if (isScrolled) {
      return 'bg-white shadow-md border-b border-gray-200';
    }
    
    // Default transparent state
    return 'bg-transparent';
  };

  // Simplified text color logic - MAIN FIX
  const getTextColor = () => {
    // If navbar has white background (either from isWhite prop or scrolled state), use dark text
    if (isWhite || isScrolled) {
      return 'text-gray-900';
    }
    // Otherwise use light text for transparent background
    return 'text-white';
  };

  const getHoverColor = () => {
    if (isWhite || isScrolled) {
      return 'hover:text-purple-600';
    }
    return 'hover:text-orange-300';
  };

  const getActiveColor = () => {
    if (isWhite || isScrolled) {
      return 'text-purple-600';
    }
    return 'text-orange-300';
  };

  const getBorderColor = () => {
    if (isWhite || isScrolled) {
      return 'border-gray-300 hover:border-purple-600';
    }
    return 'border-white/30 hover:border-white';
  };

  const textColor = getTextColor();
  const hoverColor = getHoverColor();
  const activeColor = getActiveColor();
  const borderColor = getBorderColor();

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${getNavbarStyle()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex items-center">
            <span 
              onClick={() => handleNavigation('/')}
              className={`text-lg font-bold transition-colors cursor-pointer hover:opacity-80 ${textColor}`}
            >
              Make-Me-Intern
            </span>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="flex-1 flex items-center justify-center">
            <div className="hidden lg:flex items-center space-x-8">
              <button 
                onClick={() => handleNavigation('/')}
                className={`font-medium transition-colors ${
                  isActivePage('/') 
                    ? activeColor
                    : `${textColor} ${hoverColor}`
                }`}
              >
                {isActivePage('/') && '• '}Home
              </button>
              <button 
                onClick={() => handleNavigation('/internships')}
                className={`transition-colors ${
                  isActivePage('/internships') 
                    ? activeColor
                    : `${textColor} ${hoverColor}`
                }`}
              >
                {isActivePage('/internships') && '• '}Internships
              </button>
             
              <button 
                onClick={() => handleNavigation('/companies')}
                className={`transition-colors ${
                  isActivePage('/companies') 
                    ? activeColor
                    : `${textColor} ${hoverColor}`
                }`}
              >
                {isActivePage('/About') && '• '}About
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Profile Icon */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('profile')}
                className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-colors ${borderColor}`}
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>
              {activeDropdown === 'profile' && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">My Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">Applications</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">Settings</a>
                  <hr className="my-2" />
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">Sign out</a>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden transition-colors ${textColor} ${hoverColor}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden border-t py-3 ${
            isWhite || isScrolled
              ? 'border-gray-200 bg-white' 
              : 'border-white/20 bg-black/20 backdrop-blur-md'
          }`}>
            <div className="space-y-2">
              <button 
                onClick={() => handleNavigation('/')}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  isActivePage('/') 
                    ? (isWhite || isScrolled 
                        ? 'text-purple-600 bg-purple-50' 
                        : 'text-orange-300 bg-white/10') 
                    : (isWhite || isScrolled 
                        ? 'text-gray-900 hover:bg-purple-50 hover:text-purple-600' 
                        : 'text-white hover:bg-white/10 hover:text-orange-300')
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('/internships')}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  isActivePage('/internships') 
                    ? (isWhite || isScrolled 
                        ? 'text-purple-600 bg-purple-50' 
                        : 'text-orange-300 bg-white/10') 
                    : (isWhite || isScrolled 
                        ? 'text-gray-900 hover:bg-purple-50 hover:text-purple-600' 
                        : 'text-white/80 hover:bg-white/10 hover:text-white')
                }`}
              >
                Internships
              </button>
              <button 
                onClick={() => handleNavigation('/jobs')}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  isActivePage('/jobs') 
                    ? (isWhite || isScrolled 
                        ? 'text-purple-600 bg-purple-50' 
                        : 'text-orange-300 bg-white/10') 
                    : (isWhite || isScrolled 
                        ? 'text-gray-900 hover:bg-purple-50 hover:text-purple-600' 
                        : 'text-white/80 hover:bg-white/10 hover:text-white')
                }`}
              >
                Jobs
              </button>
              <button 
                onClick={() => handleNavigation('/companies')}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  isActivePage('/companies') 
                    ? (isWhite || isScrolled 
                        ? 'text-purple-600 bg-purple-50' 
                        : 'text-orange-300 bg-white/10') 
                    : (isWhite || isScrolled 
                        ? 'text-gray-900 hover:bg-purple-50 hover:text-purple-600' 
                        : 'text-white/80 hover:bg-white/10 hover:text-white')
                }`}
              >
                About
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </nav>
  );
};

export default Navbar;  