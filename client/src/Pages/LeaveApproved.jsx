import React from 'react'
import Navbar from '../components/Layout/Navbar'
import AdminLeaveApproval from '../components/Admin/AdminLeaveApproval'

const LeaveApproved = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="w-fulll mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminLeaveApproval/>
      </main>
    </div>
  )
}

export default LeaveApproved