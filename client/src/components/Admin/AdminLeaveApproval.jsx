import React, { useEffect, useState } from 'react';
import axiosinstance from '../../lib/axios';
import toast from 'react-hot-toast';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import Navbar from '../Layout/Navbar';

const AdminLeaveApproval = () => {
  const [leaves, setLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLeaves = async () => {
      setIsLoading(true);
      try {
        const res = await axiosinstance.get('/leave');
        setLeaves(res.data);
      } catch (err) {
        toast.error('Error fetching leave requests');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  const updateStatus = async (id, status) => {
    const toastId = toast.loading(`Updating status...`);
    try {
      await axiosinstance.put(`/leave/${id}`, { status });
      setLeaves(prev =>
        prev.map(leave => (leave._id === id ? { ...leave, status } : leave))
      );
      toast.success(`Leave ${status}`, { id: toastId });
    } catch (err) {
      toast.error('Failed to update status', { id: toastId });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        <ArrowPathIcon className="w-6 h-6 mr-2 animate-spin" />
        Loading leave requests...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">🛠 Admin Leave Approval Panel</h2>
      {leaves.length === 0 ? (
        <p className="text-center text-gray-600">No leave requests found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-6 py-3">Employee</th>
                <th className="px-6 py-3">Start</th>
                <th className="px-6 py-3">End</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Reason</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map(leave => (
                <tr key={leave._id} className="border-b">
                  <td className="px-6 py-4">{leave.userId?.name || '-'}</td>
                  <td className="px-6 py-4">{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{leave.type}</td>
                  <td className="px-6 py-4">{leave.reason || '-'}</td>
                  <td className="px-6 py-4 capitalize">{leave.status}</td>
                  <td className="px-6 py-4 text-center">
                    {leave.status === 'pending' && (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => updateStatus(leave._id, 'approved')}
                          className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-lg text-xs"
                        >
                          ✅ Approve
                        </button>
                        <button
                          onClick={() => updateStatus(leave._id, 'rejected')}
                          className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-lg text-xs"
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminLeaveApproval;
