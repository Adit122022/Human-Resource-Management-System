import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Search,
  User,
  Clock,
  UserCheck,
  Shield,
  Building2,
  ChevronDown
} from 'lucide-react';
import Logo from '../Ui/Logo'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const mockUser = {
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'admin', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    };
    setUser(mockUser);
  }, []);

  const getNavigationItems = (userRole) => {
    const baseItems = [
      { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['employee', 'hr', 'admin'] },
      { name: 'My Profile', href: '/profile', icon: User, roles: ['employee', 'hr', 'admin'] },
      { name: 'Attendance', href: '/attendance', icon: Clock, roles: ['employee', 'hr', 'admin'] },
      { name: 'Leave Requests', href: '/leave', icon: Calendar, roles: ['employee', 'hr', 'admin'] },
    ];

    const hrItems = [
      { name: 'Employees', href: '/employees', icon: Users, roles: ['hr', 'admin'] },
      { name: 'Attendance Management', href: '/attendance-mgmt', icon: UserCheck, roles: ['hr', 'admin'] },
      { name: 'Leave Management', href: '/leave-mgmt', icon: FileText, roles: ['hr', 'admin'] },
      { name: 'Reports', href: '/reports', icon: BarChart3, roles: ['hr', 'admin'] },
    ];

    const adminItems = [
      { name: 'User Management', href: '/users', icon: Shield, roles: ['admin'] },
      { name: 'System Settings', href: '/settings', icon: Settings, roles: ['admin'] },
      { name: 'Company Settings', href: '/company', icon: Building2, roles: ['admin'] },
    ];

    const allItems = [...baseItems, ...hrItems, ...adminItems];
    return allItems.filter(item => item.roles.includes(userRole));
  };

  const navigationItems = user ? getNavigationItems(user.role) : [];

  const handleLogout = () => {
    // Add your logout logic here
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'hr': return 'bg-blue-100 text-blue-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const notifications = [
    { id: 1, message: 'New leave request submitted', time: '2 min ago', unread: true },
    { id: 2, message: 'Attendance report generated', time: '1 hour ago', unread: true },
    { id: 3, message: 'Employee onboarding completed', time: '3 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  if (!user) {
    return null; 
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo size="md" showText={true} variant="default" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                          notification.unread ? 'bg-blue-50' : ''
                        }`}
                      >
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-3 p-2 text-sm rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={user.avatar}
                  alt={user.name}
                />
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={user.avatar}
                        alt={user.name}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 capitalize ${getRoleBadgeColor(user.role)}`}>
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <a href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <User className="w-4 h-4" />
                      My Profile
                    </a>
                    <a href="/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Settings className="w-4 h-4" />
                      Settings
                    </a>
                  </div>
                  
                  <div className="border-t border-gray-100 py-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* User Info */}
            <div className="flex items-center gap-3 px-3 py-3 border-b border-gray-200 mb-2">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={user.avatar}
                alt={user.name}
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${getRoleBadgeColor(user.role)}`}>
                  {user.role}
                </span>
              </div>
            </div>

            {/* Navigation Items */}
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </a>
            ))}

            {/* Mobile Actions */}
            <div className="border-t border-gray-200 pt-4 mt-4 space-y-1">
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 w-full text-left">
                <Bell className="w-5 h-5" />
                Notifications
                {unreadCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 w-full text-left"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for dropdowns */}
      {(showNotifications || showProfile) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false);
            setShowProfile(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;