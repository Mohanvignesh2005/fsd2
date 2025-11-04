import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import BackgroundSkeleton from '../components/intern-componenets/BackgroundSkeleton';
import FilterSidebar from '../components/intern-componenets/FilterSidebar';
import PromotionCard from '../components/intern-componenets/PromotionCard';
import SearchBar from '../components/intern-componenets/SearchBar';
import JobResults from '../components/intern-componenets/JobResults';
import { JobDataProvider } from "../components/intern-componenets/useJobData";
import Footer from "../components/Footer";

const InternshipPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0); // change immediately on scroll
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initialize on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <JobDataProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar that changes color on scroll */}
        <Navbar isScrolled={isScrolled} />

        {/* Hero/Background section */}
        <BackgroundSkeleton />

        <main className="max-w-6xl mx-auto px-6 py-8 flex gap-8">
          {/* Sidebar Section */}
          <aside className="w-80 space-y-6">
            <FilterSidebar />
            </aside>

          {/* Main Content Section */}
          <section className="flex-1 space-y-6">
            <SearchBar />
            <JobResults />
          </section>
        </main>

        <Footer />
      </div>
    </JobDataProvider>
  );
};

export default InternshipPage;
