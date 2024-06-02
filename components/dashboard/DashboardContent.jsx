import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { CirclePlus, Pencil, Trash } from 'lucide-react'
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Spinner from '../Spinner';
import { Button } from '../ui/button';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const DashboardContent = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/template');
        const userTemplates = response.data.filter(template => template.user.id === session.user.id);
        setTemplates(userTemplates);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    }
    fetchTemplates();
  }, [session]);

  const deleteTemplate = async () => {
    try {
      await axios.delete(`/api/template?id=${selectedTemplate}`)
      const response = await axios.get('/api/template');
      const userTemplates = response.data.filter(template => template.user.id === session.user.id);
      setTemplates(userTemplates);

    } catch (error) {
      console.error('Error deleting template:', error);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className='w-full h-auto bg-gray-100 cursor-pointer mb-3 hover:bg-white' onClick={() => { window.location.href = '/dashboard/projects/new' }}>
        <CardContent className='flex flex-col items-center justify-center mt-2 text-center h-full'>
          <CirclePlus className='w-12 h-12 mb-2' />
          <h1>New Template</h1>
        </CardContent>
      </Card>

      {[...templates].reverse().map(template => (
        <Card key={template._id} className='bg-white w-full mb-3'>
          <CardHeader>
            <CardTitle className='truncate text-clamp-1'>
              {template.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <img src={template.images[0]} alt='template image' className="h-40 w-full border rounded-md object-cover object-center" />
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button variant='outline' onClick={() => { window.location.href = '/dashboard/projects/edit/' + template._id }}>
              <Pencil />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive' onClick={() => { setSelectedTemplate(template._id) }}>
                  <Trash />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your template
                    and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button variant='destructive' onClick={deleteTemplate}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default DashboardContent
