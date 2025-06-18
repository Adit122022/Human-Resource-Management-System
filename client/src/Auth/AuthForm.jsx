import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Building2, Users, Shield, ChevronDown } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import axiosinstance from '../lib/axios';



const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const loadingToast = toast.loading(isSignup ? 'Creating account...' : 'Signing in...');

    try {
      const url = isSignup ? '/api/auth/signup' : '/api/auth/login';
      const res = await axiosinstance.post(url, form);
       console.log(res.data)
    localStorage.setItem('token' , res.data.token)
    
      toast.success(
        isSignup 
          ? `Welcome ${form.name}! Account created successfully` 
          : `Welcome back ! Logged in successfully`,
        { id: loadingToast }
      );


      setForm({ name: '', email: '', password: '', role: 'employee' });
      
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || 'Something went wrong. Please try again.',
        { id: loadingToast }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
    setForm({ name: '', email: '', password: '', role: 'employee' });
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'hr': return <Users className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#374151',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
          success: {
            iconStyle: { background: '#10b981', color: '#fff' }
          },
          error: {
            iconStyle: { background: '#ef4444', color: '#fff' }
          }
        }}
      />
      
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600">
            {isSignup 
              ? 'Join our HRMS platform and manage your workforce efficiently' 
              : 'Sign in to access your HRMS dashboard'
            }
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="space-y-6">
            {/* Name Field (Signup only) */}
            {isSignup && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
              </div>
            )}

            {/* Role Selection (Signup only) */}
            {isSignup && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Role
                </label>
                <div className="relative">
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white cursor-pointer"
                  >
                    <option value="employee">Employee</option>
                    <option value="hr">HR Manager</option>
                    <option value="admin">Administrator</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  {getRoleIcon(form.role)}
                  <span>
                    {form.role === 'employee' && 'Access to personal dashboard and basic features'}
                    {form.role === 'hr' && 'Manage employees, attendance, and leave requests'}
                    {form.role === 'admin' && 'Full system access and user management'}
                  </span>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isSignup ? 'Creating Account...' : 'Signing In...'}
                </>
              ) : (
                <>
                  {isSignup ? 'Create Account' : 'Sign In'}
                </>
              )}
            </button>
          </div>

          {/* Toggle Auth Mode */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-center text-gray-600">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
            </p>
            <button
              onClick={toggleAuthMode}
              className="w-full mt-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              {isSignup ? 'Sign In Instead' : 'Create New Account'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Secure • Reliable • Professional HRMS Solution</p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;