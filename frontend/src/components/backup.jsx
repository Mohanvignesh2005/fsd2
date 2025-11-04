import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Competitions from "./Competitions";
import Internships from "./Internships";
import FeaturedOpportunities from "./FeaturedOpportunities";
import HeroSection from "./HeroSection";
import OpportunitiesSection from "./OpportunitiesSection";
import AppDownloadSection from "./AppDownloadSection";
import StatsSection from "./StatsSection";
import Footer from "./Footer";

// Animated Stats Card
const AnimatedStatsCard = ({ number, label, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (isVisible) {
      const targetNumber = parseInt(number.replace(/\D/g, ''));
      const increment = targetNumber / 30;
      const timer = setInterval(() => {
        setCount(prev => {
          if (prev >= targetNumber) {
            clearInterval(timer);
            return targetNumber;
          }
          return Math.min(prev + increment, targetNumber);
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isVisible, number]);

  return (
    <div 
      className={`text-center transform transition-all duration-700 hover:scale-105 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative">
        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent mb-2">
          {Math.floor(count)}{number.includes('k') ? 'k' : ''}{number.includes('+') ? '+' : ''}
        </div>
        {/* Subtle glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-green-300/10 to-teal-300/10 blur-lg rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="text-base text-white/90 font-medium">{label}</div>
    </div>
  );
};

const Homepage = () => {
  const [mounted, setMounted] = useState(false);
  const [navbarWhite, setNavbarWhite] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);

    // Handle navbar color change on scroll
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-section');
      const whiteSection = document.querySelector('.white-content-section');
      
      if (heroSection && whiteSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + 80; // Account for navbar height
        
        setNavbarWhite(scrollPosition >= heroBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navbar Component with dynamic styling */}
      <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${navbarWhite ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <Navbar isWhite={navbarWhite} />
      </div>
      
      {/* Compact Hero Section - Reduced Height */}
      <div 
        className="hero-section relative px-6 text-center text-white py-16 overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #620080 50%, #7c3aed 75%, #a855f7 100%)',
          paddingTop: '5rem' // Account for smaller navbar
        }}
      >
        {/* Animated Background Elements - Fewer and smaller */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating elements */}
          <div className="absolute top-16 left-8 w-3 h-3 bg-purple-400/20 rounded-full animate-pulse" />
          <div className="absolute top-32 right-16 w-4 h-4 bg-pink-400/15 rounded-lg rotate-45 animate-bounce" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-24 left-16 w-2 h-2 bg-blue-400/30 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
          <div className="absolute top-48 right-8 w-5 h-5 bg-green-400/15 rounded-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
          
          {/* Subtle gradient orbs */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-purple-500/8 to-pink-500/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-gradient-to-tr from-blue-500/8 to-teal-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Main Heading - Slightly smaller */}
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight transform transition-all duration-1000 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
              Launch Your Career
            </span>
          </h1>

          {/* Subtitle - Reduced margin */}
          <p className={`text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed transform transition-all duration-1000 delay-300 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Discover amazing internships and jobs from top companies worldwide
          </p>
          
          {/* Compact Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <AnimatedStatsCard number="10k+" label="Active Jobs" delay={600} />
            <AnimatedStatsCard number="5k+" label="Internships" delay={800} />
            <AnimatedStatsCard number="500+" label="Companies" delay={1000} />
          </div>
        </div>

        {/* Bottom subtle fade */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/5 to-transparent" />
      </div>

      {/* Content Sections - Full Width with padding */}
      <div className="white-content-section bg-white px-6 py-8">
        <Competitions />
        <Internships />
        <FeaturedOpportunities />
        <HeroSection />
        <OpportunitiesSection />
        <AppDownloadSection />
        <StatsSection />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;