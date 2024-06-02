import DashboardLayout from '@/components/dashboard/DashboardLayout'
import TemplateForm from '@/components/dashboard/TemplateForm'
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const EditTemplate = () => {
  const [templateInfo, setTemplateInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return
    }
    axios.get('/api/template?id=' + id).then(response => {
      setTemplateInfo(response.data)
    })
  }, [id]);

  return <>
    <DashboardLayout>
      {templateInfo && (
        <TemplateForm {...templateInfo} />
      )}
    </DashboardLayout>
  </>
}

export default EditTemplate