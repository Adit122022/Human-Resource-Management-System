import React from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">HRMS</span>
          </div>
          <div className="space-x-4">
            <Link to="/auth" className="text-blue-600 hover:text-blue-700 font-medium">Login</Link>
            <Link to="/auth" className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">Sign Up</Link>
          </div>
        </div>
      </nav>
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Streamline Your Workforce Management
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A modern HRMS solution to manage employees, attendance, and leaves efficiently.
          </p>
          <Link
            to="/auth"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;