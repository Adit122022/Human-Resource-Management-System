import React from 'react';
import Navbar from '../components/Layout/Navbar';
import EmployeeList from '../components/Employee/EmployeeList';

const EmployeePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">All Employees</h1>
        <EmployeeList />
      </main>
    </div>
  );
};

export default EmployeePage;
