import React, { useState, useEffect } from 'react';
import axiosinstance from '../../lib/axios';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/authStore';

const AttendanceHistory = () => {
  const { user } = useAuthStore();
  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAttendance = async () => {
      setIsLoading(true);
      try {
        const endpoint = '/attendance'; // same for now
        const res = await axiosinstance.get(endpoint);
        setAttendance(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Error fetching attendance');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAttendance();
  }, [user.role]);

  if (isLoading)
    return <p className="text-center text-gray-600 py-10">Loading...</p>;

  if (!attendance.length)
    return <p className="text-center text-gray-600 py-10">No attendance records found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">📅 Attendance History</h1>

        {/* Mobile View - Card Layout */}
        <div className="space-y-4 md:hidden">
          {attendance.map((record) => (
            <div
              key={record._id}
              className="bg-white shadow-md rounded-xl p-4 space-y-2 border border-gray-200"
            >
              <p><span className="font-semibold">Date:</span> {new Date(record.date).toLocaleDateString()}</p>
              <p><span className="font-semibold">Status:</span> <span className="capitalize">{record.status}</span></p>
              <p><span className="font-semibold">Check In:</span> {record.checkIn ? new Date(record.checkIn).toLocaleTimeString() : '-'}</p>
              <p><span className="font-semibold">Check Out:</span> {record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : '-'}</p>
              {(user.role === 'hr' || user.role === 'admin') && (
                <p><span className="font-semibold">Employee:</span> {record.userId?.name || '-'}</p>
              )}
            </div>
          ))}
        </div>

        {/* Desktop View - Table Layout */}
        <div className="hidden md:block">
          <div className="overflow-x-auto bg-white shadow-md rounded-xl">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-gray-700">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">Date</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">Status</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">Check In</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">Check Out</th>
                  {(user.role === 'hr' || user.role === 'admin') && (
                    <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">Employee</th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendance.map((record, index) => (
                  <tr key={record._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(record.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{record.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.checkIn ? new Date(record.checkIn).toLocaleTimeString() : '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : '-'}</td>
                    {(user.role === 'hr' || user.role === 'admin') && (
                      <td className="px-6 py-4 whitespace-nowrap">{record.userId?.name || '-'}</td>
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

export default AttendanceHistory;
