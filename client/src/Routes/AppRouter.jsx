import { Routes, Route } from 'react-router-dom';

import useAuthStore from '../store/authStore';
import { Navigate } from 'react-router-dom';
import AuthForm from '../Auth/AuthForm';
import AdminDashboard from '../Dashboard/AdminDashboard';
 import HeroSection from "../Pages/HeroSection"
import HRDashboard from '../Dashboard/HRDashboard';
import EmployeeDashboard from '../Dashboard/EmployeeDashboard';
import EmployeeList from '../components/Employee/EmployeeList';
import EmployeeForm from '../components/Employee/EmployeeeFrom';
import AttendanceHistory from '../components/Attendence/AttendanceHistory';
import AttendanceForm from '../components/Attendence/AttendanceForm';
import LeaveHistory from '../components/Leave/LeaveHistory';
import LeaveForm from '../components/Leave/LeaveForm';
import Profile from '../components/Profile/Profile';

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
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hr"
        element={
          <ProtectedRoute allowedRoles={['hr']}>
            <HRDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['employee', 'hr', 'admin']}>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employees"
        element={
          <ProtectedRoute allowedRoles={['hr', 'admin']}>
            <EmployeeList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employees/add"
        element={
          <ProtectedRoute allowedRoles={['hr', 'admin']}>
            <EmployeeForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employees/edit/:id"
        element={
          <ProtectedRoute allowedRoles={['hr', 'admin']}>
            <EmployeeForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/attendance"
        element={
          <ProtectedRoute allowedRoles={['employee', 'hr', 'admin']}>
            <AttendanceHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/attendance/log"
        element={
          <ProtectedRoute allowedRoles={['employee']}>
            <AttendanceForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leave"
        element={
          <ProtectedRoute allowedRoles={['employee', 'hr', 'admin']}>
            <LeaveHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leave/apply"
        element={
          <ProtectedRoute allowedRoles={['employee']}>
            <LeaveForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={['employee', 'hr', 'admin']}>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;