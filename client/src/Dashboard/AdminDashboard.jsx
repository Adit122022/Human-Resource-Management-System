import React from 'react';
import Navbar from '../components/Layout/Navbar';
import EmployeeList from '../components/Employee/EmployeeList';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="md:text-xl font-semibold text-gray-800">Manage Employees & HR</h2>
            <Link
              to="/employees/add"
              className="bg-blue-600 text-white  rounded-xl  hover:bg-blue-700"
            >
           <button className='text-xs px-2 py-1'>Add</button>
            </Link>
          </div>

          <EmployeeList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
