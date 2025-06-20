import React, { useState } from "react";
import { User, Mail, Lock, Users, ChevronDown } from "lucide-react";
import axiosinstance from "../../lib/axios";
import toast from "react-hot-toast";

const CreateAdmin = ({ onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin", // default to admin
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Creating user...");

    try {
      await axiosinstance.post("/auth/signup", form);
      toast.success("User created successfully!", { id: toastId });

      setForm({ name: "", email: "", password: "", role: "admin" });
      onClose(); // Close modal after success
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create user", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Create New User</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Role
            </label>
            <div className="relative">
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl appearance-none"
              >
                <option value="admin">Admin</option>
                <option value="hr">HR</option>
                <option value="employee">Employee</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-xl text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
