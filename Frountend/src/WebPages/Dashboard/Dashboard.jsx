import React from 'react'
import AdminDashboard from '../Admin/AdminDashboard'
import SalesREFDashboard from '../Employee/SalesREFDashboard'
const role = localStorage.getItem("role");
const Dashboard = () => {
  return (
    <>
    {role=="sales-ref" ? <SalesREFDashboard />: <AdminDashboard />}
    </>
  )
}

export default Dashboard