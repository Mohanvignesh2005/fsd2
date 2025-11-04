import React from 'react';
import { Heart, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <div className="w-full" style={{margin: 0, padding: 0}}>
      <footer className="w-full text-white py-12 px-8" style={{background: 'linear-gradient(135deg, #620080 0%, #7c3aed 50%, #a855f7 100%)', margin: 0, padding: '3rem 2rem'}}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white font-bold text-sm border border-white/20">
                  MMI
                </div>
                <span className="text-xl font-bold">Make-Me-Intern</span>
              </div>
             
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-purple-200">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:support@makemeintern.com" className="hover:text-white transition-colors">
                    support@makemeintern.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-purple-200">
                <li><a href="#" className="hover:text-white transition-colors">Internships</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Competitions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resume Building</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Interview Prep</a></li>
              </ul>
            </div>

            {/* Stay Connected */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
              
              {/* Social Media Icons */}
              <div className="flex gap-3 mb-4">
                <a href="#" className="text-purple-300 hover:text-white transform hover:scale-110 transition-all duration-200">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-purple-300 hover:text-white transform hover:scale-110 transition-all duration-200">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-purple-300 hover:text-white transform hover:scale-110 transition-all duration-200">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-purple-300 hover:text-white transform hover:scale-110 transition-all duration-200">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>

              {/* Newsletter Signup */}
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-purple-200 border border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm"
                />
                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="border-t border-white/20 mt-8 pt-6 text-center text-purple-200">
            <p>&copy; 2025 Make-Me-Intern. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;