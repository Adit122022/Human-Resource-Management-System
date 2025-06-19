import React, { useState, useEffect } from 'react';
import axiosinstance from '../../lib/axios';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/authStore';
import { ArrowPathIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const LeaveHistory = () => {
  const { user } = useAuthStore();
  const [leaves, setLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLeaves = async () => {
      setIsLoading(true);
      try {
        const res = await axiosinstance.get('/leave');
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

  const getStatusBadge = (status) => {
    const base = 'px-3 py-1 rounded-full text-xs font-semibold';
    switch (status) {
      case 'approved':
        return <span className={`${base} bg-green-100 text-green-700`}>Approved</span>;
      case 'rejected':
        return <span className={`${base} bg-red-100 text-red-700`}>Rejected</span>;
      case 'pending':
        return <span className={`${base} bg-yellow-100 text-yellow-800`}>Pending</span>;
      default:
        return <span className={`${base} bg-gray-100 text-gray-700`}>Unknown</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        <ArrowPathIcon className="w-6 h-6 mr-2 animate-spin" />
        Loading leave history...
      </div>
    );
  }

  if (!leaves.length) {
    return <p className="text-center text-gray-600 mt-10">No leave records found.</p>;
  }

  return (
 <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white px-4 sm:px-6 lg:px-8 py-10">
  <div className="max-w-7xl mx-auto">
    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">📋 Leave History</h1>

    {/* Card Layout for Small Screens */}
    <div className="space-y-4 md:hidden">
      {leaves.map((leave) => (
        <div
          key={leave._id}
          className="bg-white shadow-md rounded-xl p-4 space-y-2 border border-gray-200"
        >
          <p><span className="font-semibold">Start:</span> {new Date(leave.startDate).toLocaleDateString()}</p>
          <p><span className="font-semibold">End:</span> {new Date(leave.endDate).toLocaleDateString()}</p>
          <p><span className="font-semibold">Type:</span> {leave.type}</p>
          <p><span className="font-semibold">Status:</span> {getStatusBadge(leave.status)}</p>
          <p><span className="font-semibold">Reason:</span> {leave.reason || '-'}</p>
          <p><span className="font-semibold">Balance:</span> {leave.leaveBalance}</p>

          {(user.role === 'hr' || user.role === 'admin') && (
            <>
              <p><span className="font-semibold">Employee:</span> {leave.userId?.name || '-'}</p>
              {leave.status === 'pending' && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleStatusUpdate(leave._id, 'approved')}
                    className="flex-1 bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-lg text-sm font-medium"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(leave._id, 'rejected')}
                    className="flex-1 bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-lg text-sm font-medium"
                  >
                    Reject
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>

    {/* Table Layout for Medium+ Screens */}
    <div className="hidden md:block">
      <div className="bg-white shadow-md rounded-2xl overflow-hidden">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
            <tr>
              <th className="px-6 py-4">Start</th>
              <th className="px-6 py-4">End</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Reason</th>
              <th className="px-6 py-4">Balance</th>
              {(user.role === 'hr' || user.role === 'admin') && (
                <>
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave, idx) => (
              <tr
                key={leave._id}
                className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-6 py-4">{new Date(leave.startDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">{new Date(leave.endDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 capitalize">{leave.type}</td>
                <td className="px-6 py-4">{getStatusBadge(leave.status)}</td>
                <td className="px-6 py-4">{leave.reason || '-'}</td>
                <td className="px-6 py-4">{leave.leaveBalance}</td>
                {(user.role === 'hr' || user.role === 'admin') && (
                  <>
                    <td className="px-6 py-4">{leave.userId?.name || '-'}</td>
                    <td className="px-6 py-4 text-center">
                      {leave.status === 'pending' && (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleStatusUpdate(leave._id, 'approved')}
                            className="inline-flex items-center bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-lg text-xs font-medium"
                          >
                            ✅ Approve
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(leave._id, 'rejected')}
                            className="inline-flex items-center bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-lg text-xs font-medium"
                          >
                            ❌ Reject
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
</div>

  );
};

export default LeaveHistory;
