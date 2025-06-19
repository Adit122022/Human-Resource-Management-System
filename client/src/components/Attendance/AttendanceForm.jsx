import React, { useState } from 'react';
import axiosinstance from '../../lib/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar';

const AttendanceForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    status: 'present',
    checkIn: '',
    checkOut: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const fullISO = (date, time) => new Date(`${date}T${time}:00`).toISOString();
 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  const loadingToast = toast.loading('Logging attendance...');

  const { date, status, checkIn, checkOut } = form;

  const requestBody = {
    date: new Date(date).toISOString(), // convert to full ISO
    status,
    checkIn: checkIn ? fullISO(date, checkIn) : null,
    checkOut: checkOut ? fullISO(date, checkOut) : null,
  };

  try {
    await axiosinstance.post('/attendance', requestBody);
    toast.success('Attendance logged successfully', { id: loadingToast });
    navigate('/attendance');
  } catch (err) {
    toast.error(err.response?.data?.message || 'Error logging attendance', { id: loadingToast });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-100">
   
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Log Attendance</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Check In</label>
            <input
              name="checkIn"
              type="time"
              value={form.checkIn}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Check Out</label>
            <input
              name="checkOut"
              type="time"
              value={form.checkOut}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Logging...' : 'Log Attendance'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AttendanceForm;