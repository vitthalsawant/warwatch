import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold text-blue-900 dark:text-white">
              <span className="text-red-700">War</span>Watch
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Bringing you the latest updates on India-Pakistan conflicts
            </p>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>Powered by <a href="https://gnews.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">GNews API</a></p>
            <p className="mt-1">© {new Date().getFullYear()} WarWatch. All rights reserved.</p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-500 dark:text-gray-500">
          <p>Disclaimer: This platform aggregates news from various sources for informational purposes only.</p>
          <p className="mt-1">We do not endorse any political stance or verify the accuracy of all content.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;