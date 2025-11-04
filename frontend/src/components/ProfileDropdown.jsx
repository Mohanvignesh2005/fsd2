import { useState } from 'react';
import { User, Bell, Moon, Languages, HelpCircle, Settings, LogOut, ChevronRight } from 'lucide-react';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };  

  return (
    <div className="relative">
      {/* Profile Icon - Mac Style */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center hover:from-orange-500 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-white/20"
      >
        <span className="text-white font-medium text-sm">S</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-gray-800 rounded-xl shadow-2xl py-2 z-50 text-white border border-gray-700 backdrop-blur-sm">
          {/* Account Details */}
          <button className="w-full px-4 py-3 text-left hover:bg-gray-700/50 transition-all duration-150 flex items-center gap-3 text-sm">
            <User className="w-4 h-4 text-gray-400" />
            <span>Account Details</span>
          </button>

         
          {/* Notifications */}
          <button className="w-full px-4 py-3 text-left hover:bg-gray-700/50 transition-all duration-150 flex items-center gap-3 text-sm">
            <Bell className="w-4 h-4 text-gray-400" />
            <span>My Applications</span>
          </button>

          {/* Settings */}
          <button className="w-full px-4 py-3 text-left hover:bg-gray-700/50 transition-all duration-150 flex items-center gap-3 text-sm">
            <Settings className="w-4 h-4 text-gray-400" />
            <span>Settings</span>
          </button>

          {/* Separator */}
          <div className="border-t border-gray-700/50 my-1"></div>

          {/* Sign Out */}
          <button className="w-full px-4 py-3 text-left hover:bg-gray-700/50 transition-all duration-150 flex items-center gap-3 text-sm">
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Sign Out</span>
          </button>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileDropdown;