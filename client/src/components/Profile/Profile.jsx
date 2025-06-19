import React, { useState, useEffect } from "react";
import axiosinstance from "../../lib/axios";
import toast from "react-hot-toast";
import Navbar from "../Layout/Navbar";

const Profile = () => {
  const [data, setData] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    designation: "",
    department: "",
    joinDate: "",
    profileImage: null,
  });
  const [preview, setPreview] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosinstance.get("/employees/profile");

         console.log("Profile-->",res.data)
        const { _id, name, email } = res.data.user; // ✅ include _id

        setData({
          user: { _id, name, email }, // ✅ ensure _id is preserved
          profile: res.data.profile,
        });

        const { designation, department, joinDate, profileImage } =
          res.data.profile || {};

        setProfile({
          name,
          email,
          designation: designation || "",
          department: department || "",
          joinDate: joinDate ? joinDate.split("T")[0] : "",
          profileImage: null,
        });
        setPreview(profileImage || null);
      } catch (err) {
        toast.error(err.response?.data?.message || "Error fetching profile");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setProfile({ ...profile, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToast = toast.loading("Updating profile...");

    try {
      const formData = new FormData();
      Object.entries(profile).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      await axiosinstance.put(`/adminpannel/${data.user._id}`, formData);
      toast.success("Profile updated successfully", { id: loadingToast });
      setEditMode(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating profile", {
        id: loadingToast,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!data)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  const { user, profile: profileData } = data;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl shadow-md p-6">
          {preview && (
            <img
              src={preview}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border"
            />
          )}

          {!editMode ? (
            <>
              <h2 className="text-2xl font-bold text-center mb-1">
                {user?.name}
              </h2>
              <p className="text-center text-gray-500">{user?.email}</p>
              <span className="block text-center text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full mt-2 capitalize">
                {user?.role}
              </span>

              <div className="mt-6 space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium">Designation:</span>
                  <span>{profileData?.designation || "Not Assigned"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Department:</span>
                  <span>{profileData?.department || "Not Assigned"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Join Date:</span>
                  <span>
                    {profileData?.joinDate
                      ? new Date(profileData.joinDate).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setEditMode(true)}
                className="w-full mt-6 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
              >
                Update Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                Edit Profile
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-xl"
                  required
                />
              </div>

              {user.role === "employee" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Designation
                    </label>
                    <input
                      name="designation"
                      value={profile.designation}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Department
                    </label>
                    <input
                      name="department"
                      value={profile.department}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Join Date
                    </label>
                    <input
                      name="joinDate"
                      type="date"
                      value={profile.joinDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-xl"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile Image
                </label>
                <input
                  name="profileImage"
                  type="file"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-xl"
                  accept="image/*"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? "Updating..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-xl hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
