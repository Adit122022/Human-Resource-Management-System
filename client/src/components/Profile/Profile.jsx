import React, { useState, useEffect } from 'react';
import axiosinstance from '../../lib/axios';
import toast from 'react-hot-toast';
import Navbar from '../Layout/Navbar';
import useAuthStore from '../../store/authStore';

const Profile = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    designation: '',
    department: '',
    joinDate: '',
    profileImage: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosinstance.get('/employees/profile');
        console.log("PROFILE --> " , res)
        if (user.role === 'employee') {
          const { name, email } = res.data.user;
          const { designation, department, joinDate, profileImage } = res.data;
          setProfile({
            name,
            email,
            designation,
            department,
            joinDate: joinDate ? joinDate.split('T')[0] : '',
            profileImage: profileImage || null,
          });
        } else {
          setProfile({
            name: res.data.name,
            email: res.data.email,
            designation: '',
            department: '',
            joinDate: '',
            profileImage: null,
          });
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Error fetching profile');
      }
    };
    fetchProfile();
  }, [user.role]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProfile({ ...profile, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToast = toast.loading('Updating profile...');

    try {
      const formData = new FormData();
      Object.entries(profile).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      await axiosinstance.put(`/employees/${user.id}`, formData);
      toast.success('Profile updated successfully', { id: loadingToast });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error updating profile', { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
        <div className="bg-white rounded-xl shadow-md p-6">
          {profile.profileImage && (
            <img
              src={profile.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                name="name"
                value={profile.name}
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
                value={profile.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
                required
              />
            </div>
            {user.role === 'employee' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Designation</label>
                  <input
                    name="designation"
                    value={profile.designation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <input
                    name="department"
                    value={profile.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Join Date</label>
                  <input
                    name="joinDate"
                    type="date"
                    value={profile.joinDate}
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
              </>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;