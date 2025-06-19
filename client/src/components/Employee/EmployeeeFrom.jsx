import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosinstance from '../../lib/axios';
import toast from 'react-hot-toast';
import Navbar from '../Layout/Navbar';

const EmployeeForm = () => {
  const { id } = useParams(); // If ID exists, it's edit mode
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    // email: '',
    designation: '',
    department: '',
    joinDate: '',
    profileImage: null,
  });

  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch employee info if editing
  useEffect(() => {
    if (!id) return;

    const fetchEmployee = async () => {
      try {
        const res = await axiosinstance.get(`/employees/${id}`);
        const { user, designation, department, joinDate, profileImage } = res.data;

        setForm({
          name: user?.name || '',
          // email: user?.email || '',
          designation: designation || '',
          department: department || '',
          joinDate: joinDate ? joinDate.split('T')[0] : '',
          profileImage: null, // will update on change
        });

        setPreview(profileImage || null);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load employee data');
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading(id ? 'Updating employee...' : 'Creating employee...');
    setIsLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      if (id) {
        await axiosinstance.put(`/adminpannel/${id}`, formData);
        toast.success('Employee updated!', { id: toastId });
      } else {
        await axiosinstance.post('/adminpannel', formData);
        toast.success('Employee added!', { id: toastId });
      }

      navigate('/employees');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving employee', { id: toastId });
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
          {preview && (
            <img
              src={preview}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto object-cover border mb-4"
            />
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl"
              placeholder="Employee Name"
            />
          </div>
{/* 
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl"
              placeholder="email@example.com"
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <input
              name="designation"
              value={form.designation}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl"
              placeholder="Software Developer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
              placeholder="Engineering"
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
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
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
