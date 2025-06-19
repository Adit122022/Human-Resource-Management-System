import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosinstance from '../../lib/axios';
import toast from 'react-hot-toast';
import Navbar from '../Layout/Navbar';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    designation: '',
    department: '',
    joinDate: '',
    profileImage: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const res = await axiosinstance.get(`/employees/${id}`);
          const { name, email } = res.data.user;
          const { designation, department, joinDate, profileImage } = res.data;
          setForm({
            name,
            email,
            designation,
            department,
            joinDate: joinDate ? joinDate.split('T')[0] : '',
            profileImage: null,
          });
        } catch (err) {
          toast.error(err.response?.data?.message || 'Error fetching employee');
        }
      };
      fetchEmployee();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToast = toast.loading(id ? 'Updating employee...' : 'Adding employee...');

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      if (id) {
        await axiosinstance.put(`/employees/${id}`, formData);
        toast.success('Employee updated successfully', { id: loadingToast });
      } else {
        await axiosinstance.post('/employees', formData);
        toast.success('Employee added successfully', { id: loadingToast });
      }
      navigate('/employees');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving employee', { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {id ? 'Edit Employee' : 'Add Employee'}
        </h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <input
              name="designation"
              value={form.designation}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Join Date</label>
            <input
              name="joinDate"
              type="date"
              value={form.joinDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
            <input
              name="profileImage"
              type="file"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
              accept="image/*"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : id ? 'Update Employee' : 'Add Employee'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;