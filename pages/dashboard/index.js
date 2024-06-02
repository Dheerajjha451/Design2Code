import DashboardContent from '@/components/dashboard/DashboardContent'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import React from 'react'

const Dashboard = () => {
  return <>
  <DashboardLayout>
    <DashboardContent />
  </DashboardLayout>
  </>
}

export default Dashboard