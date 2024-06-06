import TemplateForm from '@/components/dashboard/TemplateForm'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import React from 'react'

const NewTemplate = () => {
  return <>
   <div className=' max-w-[1440px] mx-auto'>
  <DashboardLayout>
    <TemplateForm />
  </DashboardLayout>
  </div>
  </>
}

export default NewTemplate