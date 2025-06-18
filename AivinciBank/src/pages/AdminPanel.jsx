"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AdminSidebar from "../components/AdminSidebar"
import AdminDashboard from "../components/AdminDashboard"


const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("dashboard")
  const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem("adminToken")
    navigate("/")
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar onSelectSection={setActiveSection} onSignOutClick={handleSignOut} activeSection={activeSection} />

      <div className="flex-1 lg:ml-64 overflow-auto bg-gray-50 dark:bg-gray-900">{renderActiveSection()}</div>
    </div>
  )
}

export default AdminPanel
