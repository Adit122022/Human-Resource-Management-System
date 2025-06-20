import React from 'react';
import Navbar from '../components/Layout/Navbar';
import LeaveHistory from '../components/Leave/LeaveHistory';

const LeavePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LeaveHistory/>
      </main>
    </div>
  );
};

export default LeavePage;
