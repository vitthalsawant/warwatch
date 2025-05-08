import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
}

const Header: React.FC<HeaderProps> = ({ onRefresh }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Check user preference
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-900 dark:text-white mr-2">
              <span className="text-red-700">War</span>Watch
            </div>
            <p className="hidden md:block text-sm text-gray-600 dark:text-gray-400">
              India-Pakistan Conflict Updates
            </p>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={handleRefresh}
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <RefreshCw size={18} className={`mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button 
              onClick={toggleDarkMode}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={handleRefresh}
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <RefreshCw size={18} className={`mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Refresh News</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={toggleDarkMode}
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  {darkMode ? <Sun size={18} className="mr-1" /> : <Moon size={18} className="mr-1" />}
                  <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;