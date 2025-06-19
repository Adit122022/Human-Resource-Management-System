import React from "react";
import Navbar from "../components/Layout/Navbar";
import AttendanceHistory from "../components/Attendance/AttendanceHistory";


const AttendancePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       
        <AttendanceHistory />
      </main>
    </div>
  );
};

export default AttendancePage;
