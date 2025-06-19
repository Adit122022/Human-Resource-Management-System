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
        const res = await axiosinstance.get('/employees');
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
    const loadingToast = toast.loading('Deleting employee...');
    try {
      await axiosinstance.delete(`/employees/${id}`);
      setEmployees(employees.filter((emp) => emp.user._id !== id));
      toast.success('Employee deleted successfully', { id: loadingToast });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error deleting employee', { id: loadingToast });
    }
  };

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
  if (!employees.length) return <p className="text-center text-gray-600">No employees found.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee.user._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.designation}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link to={`/employees/edit/${employee.user._id}`} className="text-blue-600 hover:text-blue-800 mr-4">
                  <Edit className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => handleDelete(employee.user._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;