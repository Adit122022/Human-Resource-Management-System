import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to HRMS</h1>
      <p className="text-lg mb-6">Manage employees, attendance, and leaves efficiently.</p>
      <Link to="/auth">
        <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default HeroSection;