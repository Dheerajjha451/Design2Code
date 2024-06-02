import React from 'react'
import DashboardHeader from './DashboardHeader'

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-grow p-4 sm:ml-80">
        <div className="p-4 border border-gray-200 rounded-lg bg-white">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
