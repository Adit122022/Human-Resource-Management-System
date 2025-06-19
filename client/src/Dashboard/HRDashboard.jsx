import React from 'react';
import Navbar from '../components/Layout/Navbar';
import EmployeeList from '../components/Employee/EmployeeList';
import { Link } from 'react-router-dom';

const HRDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">HR Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Manage Employees */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Manage Employees</h2>
              <Link
                to="/employees/add"
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
              >
                Add Employee
              </Link>
            </div>
            <EmployeeList />
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Link
                to="/attendance"
                className="block bg-blue-50 text-blue-600 px-4 py-3 rounded-xl hover:bg-blue-100"
              >
                View Attendance
              </Link>
              <Link
                to="/leave"
                className="block bg-blue-50 text-blue-600 px-4 py-3 rounded-xl hover:bg-blue-100"
              >
                Manage Leaves
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
