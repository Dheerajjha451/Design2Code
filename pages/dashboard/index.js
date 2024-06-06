import DashboardContent from '@/components/dashboard/DashboardContent'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import React from 'react'

const Dashboard = () => {
  return <>
  <div className=' max-w-[1440px] mx-auto'>
  <DashboardLayout>
    <DashboardContent />
  </DashboardLayout>
  </div>
  </>
}

export default Dashboard