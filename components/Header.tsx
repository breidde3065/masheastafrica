
import React from 'react';
import ElephantIcon from './icons/ElephantIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ElephantIcon className="h-10 w-10 text-red-600" />
          <span className="text-2xl font-bold text-gray-800 tracking-wider">
            Mash <span className="text-orange-500">East Africa</span>
          </span>
        </div>
        <nav>
          <button className="hidden md:inline-block bg-transparent text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
            Manage Booking
          </button>
          <button className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition-colors ml-4">
            Login / Sign Up
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
