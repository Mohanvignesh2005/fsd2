import React from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown"; // ✅ fixed path

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#620080]">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 z-50 relative">
        <div className="text-white text-2xl font-bold">Make-Me-Intern</div>
        <ProfileDropdown />
      </header>

      {/* Navigation */}
      <nav className="px-6 pb-8 z-50 relative">
        <div className="flex gap-8">
          <Link
            to="/"
            className="text-white font-medium border-b-2 border-white pb-2"
          >
            Home
          </Link>
          <Link
            to="/InternshipsPage"
            className="text-white/80 hover:text-white transition-colors pb-2"
          >
            Internships
          </Link>
          <Link
            to="/jobs"
            className="text-white/80 hover:text-white transition-colors pb-2"
          >
            Jobs
          </Link>
          <Link
            to="/companies"
            className="text-white/80 hover:text-white transition-colors pb-2"
          >
            Companies
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className="px-6 pb-10">{children}</main>
    </div>
  );
};

export default Layout;
