import React, { useState, useEffect } from 'react';
import axiosinstance from '../../lib/axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Trash2, Edit } from 'lucide-react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        const res = await axiosinstance.get('/adminpannel');
        setEmployees(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Error fetching employees');
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    const toastId = toast.loading('Deleting employee...');
    try {
      await axiosinstance.delete(`/adminpannel/${id}`);
      setEmployees((prev) => prev.filter((emp) => emp.user._id !== id));
      toast.success('Employee deleted', { id: toastId });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error deleting', { id: toastId });
    }
  };

  if (isLoading)
    return <p className="text-center text-gray-600 py-10">Loading...</p>;

  if (!employees.length)
    return <p className="text-center text-gray-600 py-10">No employees found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">👥 Employee List</h1>

        {/* Card Layout for Small Screens */}
        <div className="space-y-4 md:hidden">
          {employees.map((employee) => (
            <div
              key={employee.user._id}
              className="bg-white shadow-md rounded-xl p-4 space-y-2 border border-gray-200"
            >
              <p><span className="font-semibold">Name:</span> {employee.user.name}</p>
              <p><span className="font-semibold">Email:</span> {employee.user.email}</p>
              <p><span className="font-semibold">Designation:</span> {employee.designation || '-'}</p>
              <p><span className="font-semibold">Department:</span> {employee.department || '-'}</p>
              <div className="flex gap-4 mt-2">
                <Link
                  to={`/employees/edit/${employee.user._id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => handleDelete(employee.user._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Table Layout for Medium+ Screens */}
        <div className="hidden md:block">
          <div className="overflow-x-auto bg-white shadow-md rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Designation</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee.user._id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {employee.user.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {employee.user.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {employee.designation || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {employee.department || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-4">
                        <Link
                          to={`/employees/edit/${employee.user._id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(employee.user._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
