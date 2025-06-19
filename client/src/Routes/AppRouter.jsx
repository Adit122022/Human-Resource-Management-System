import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import AuthForm from '../Auth/AuthForm';
import AdminDashboard from '../Dashboard/AdminDashboard';
import HRDashboard from '../Dashboard/HRDashboard';
import EmployeeDashboard from '../Dashboard/EmployeeDashboard';
import EmployeeList from '../components/Employee/EmployeeList';
import EmployeeForm from '../components/Employee/EmployeeeFrom';
import AttendanceHistory from '../components/Attendance/AttendanceHistory';
import AttendanceForm from '../components/Attendance/AttendanceForm';
import LeaveHistory from '../components/Leave/LeaveHistory';
import LeaveForm from '../components/Leave/LeaveForm';
import Profile from '../components/Profile/Profile';
import HeroSection from '../Pages/HeroSection';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isLoggedIn, user } = useAuthStore();
  if (!isLoggedIn) return <Navigate to="/auth" />;
  if (!allowedRoles.includes(user?.role)) return <Navigate to="/dashboard" />;
  return children;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/auth" element={<AuthForm />} />
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/hr" element={<ProtectedRoute allowedRoles={['hr']}><HRDashboard /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee']}><EmployeeDashboard /></ProtectedRoute>} />
      <Route path="/employees" element={<ProtectedRoute allowedRoles={['admin', 'hr']}><EmployeeList /></ProtectedRoute>} />
      <Route path="/employees/add" element={<ProtectedRoute allowedRoles={['admin', 'hr']}><EmployeeForm /></ProtectedRoute>} />
      <Route path="/employees/edit/:id" element={<ProtectedRoute allowedRoles={['admin', 'hr']}><EmployeeForm /></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee']}><AttendanceHistory /></ProtectedRoute>} />
      <Route path="/attendance/log" element={<ProtectedRoute allowedRoles={['employee']}><AttendanceForm /></ProtectedRoute>} />
      <Route path="/leave" element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee']}><LeaveHistory /></ProtectedRoute>} />
      <Route path="/leave/apply" element={<ProtectedRoute allowedRoles={['employee']}><LeaveForm /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee']}><Profile /></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRouter;
