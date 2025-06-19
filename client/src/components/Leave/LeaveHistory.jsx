import React, { useState, useEffect } from 'react';
import axiosinstance from '../../lib/axios';
import toast from 'react-hot-toast';
import Navbar from '../Layout/Navbar';
import useAuthStore from '../../store/authStore';

const LeaveHistory = () => {
  const { user } = useAuthStore();
  const [leaves, setLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLeaves = async () => {
      setIsLoading(true);
      try {
        const endpoint = user.role === 'employee' ? '/leave' : '/leave';
        const res = await axiosinstance.get(endpoint);
        setLeaves(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Error fetching leaves');
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaves();
  }, [user.role]);

  const handleStatusUpdate = async (id, status) => {
    const loadingToast = toast.loading(`Updating leave status to ${status}...`);
    try {
      await axiosinstance.put(`/leave/${id}`, { status });
      setLeaves(leaves.map((leave) => (leave._id === id ? { ...leave, status } : leave)));
      toast.success(`Leave ${status} successfully`, { id: loadingToast });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error updating leave status', { id: loadingToast });
    }
  };

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
  if (!leaves.length) return <p className="text-center text-gray-600">No leave records found.</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Leave History</h1>
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                {(user.role === 'hr' || user.role === 'admin') && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaves.map((leave) => (
                <tr key={leave._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{leave.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{leave.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.reason || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.leaveBalance}</td>
                  {(user.role === 'hr' || user.role === 'admin') && (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.userId?.name || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {leave.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleStatusUpdate(leave._id, 'approved')}
                              className="text-green-600 hover:text-green-800"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(leave._id, 'rejected')}
                              className="text-red-600 hover:text-red-800"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveHistory;