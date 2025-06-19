import React, { useState } from 'react';
import axiosinstance from '../../lib/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar';

const LeaveForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
    type: 'sick',
    reason: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToast = toast.loading('Submitting leave request...');

    try {
      await axiosinstance.post('/leave', form);
      toast.success('Leave request submitted successfully', { id: loadingToast });
      navigate('/leave');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error submitting leave request', { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Apply for Leave</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              name="startDate"
              type="date"
              value={form.startDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              name="endDate"
              type="date"
              value={form.endDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Leave Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
            >
              <option value="sick">Sick</option>
              <option value="casual">Casual</option>
              <option value="vacation">Vacation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Reason</label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Submitting...' : 'Submit Leave Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveForm;