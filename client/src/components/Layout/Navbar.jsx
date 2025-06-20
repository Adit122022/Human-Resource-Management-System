import React, { useState } from "react";
import { Menu, X, Home, Users, Calendar, User, LogOut } from "lucide-react";
import { Link, redirect } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import AuthForm from "../../Auth/AuthForm";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  

  const navigationItems = [
    {
      name: "Dashboard",
      to:   user?.role === "admin"
        ? "/admin"
        : user?.role === "hr"
        ? "/hr-dashboard"
        : "/dashboard",
      icon: Home,
      roles: ["employee", "hr", "admin"],
    },
    {
      name: "Employees",
      to: "/employees",
      icon: Users,
      roles: ["hr", "admin"],
    },
    {
      name: "Attendance",
      to: "/attendance",
      icon: User,
      roles: ["employee", "hr", "admin"],
    },
    {
      name: "Leave",
      to: "/leave",
      icon: Calendar,
      roles: ["employee", "hr", "admin"],
    },
    {
  name: "Leave Approvals",
  to: "/admin/leave-approval", 
  icon: Calendar,
  roles: ["admin", "hr"],
},
  ];

 const filteredNavItems = navigationItems.filter((item) =>
  item.roles.includes(user?.role?.toLowerCase())
);

  const handleLogout = () => {
    logout();
    window.location.href = "/auth";
  };

  if (!user) return <AuthForm/>;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/dashboard" className="text-xl font-bold text-blue-600">
              HRMS
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {filteredNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/profile"
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600"
            >
              <User className="w-4 h-4" />
              {user.name || "Profile"}
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-2">
            {filteredNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
            >
              <User className="w-5 h-5" />
              Profile
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 w-full text-left rounded-md"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;