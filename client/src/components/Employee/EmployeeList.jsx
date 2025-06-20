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

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
  if (!employees.length) return <p className="text-center text-gray-600">No employees found.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Designation</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee.user._id}>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                {employee.user.name}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {employee.user.email}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {employee.designation || '-'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {employee.department || '-'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium flex gap-4">
                <Link to={`/employees/edit/${employee.user._id}`} className="text-blue-600 hover:text-blue-800">
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
