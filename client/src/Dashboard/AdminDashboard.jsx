import React from 'react';
import Navbar from '../components/Layout/Navbar';
import EmployeeList from '../components/Employee/EmployeeList';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="min-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
        <div className="">
          <div className="bg-white  rounded-xl shadow-md p-6">
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
         
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;