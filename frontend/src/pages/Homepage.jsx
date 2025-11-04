import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Competitions from "../components/Competitions";
import Internships from "../components/Internships";
import FeaturedOpportunities from "../components/FeaturedOpportunities";
import HeroSection from "../components/HeroSection";
import OpportunitiesSection from "../components/OpportunitiesSection";
import AppDownloadSection from "../components/AppDownloadSection";
import StatsSection from "../components/StatsSection";
import Footer from "../components/Footer";

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
        <div className="text-4xl md:text-5xl font-bold text-white mb-2">
          {Math.floor(count)}{number.includes('k') ? 'k' : ''}{number.includes('+') ? '+' : ''}
        </div>
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

    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-section');
      const whiteSection = document.querySelector('.white-content-section');

      if (heroSection && whiteSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + 80;
        setNavbarWhite(scrollPosition >= heroBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <div
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          navbarWhite ? 'bg-white shadow-md' : 'bg-[#620080]'
        }`}
      >
        <Navbar isWhite={navbarWhite} />
      </div>

      {/* Hero Section */}
      <div
        className="hero-section relative px-6 text-center text-white py-16 overflow-hidden"
        style={{
          background: '#620080',
          paddingTop: '5rem'
        }}
      >
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <h1
            className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight transform transition-all duration-1000 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="text-white">
              Launch Your Career
            </span>
          </h1>

          <p
            className={`text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed transform transition-all duration-1000 delay-300 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Discover amazing internships and jobs from top companies worldwide
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <AnimatedStatsCard number="10k+" label="Active Jobs" delay={600} />
            <AnimatedStatsCard number="5k+" label="Internships" delay={800} />
            <AnimatedStatsCard number="500+" label="Companies" delay={1000} />
          </div>
        </div>
      </div>

      {/* Content Sections */}
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
