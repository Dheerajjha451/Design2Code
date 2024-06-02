import React, { useState } from 'react'
import { Input } from '../ui/input'
import { cssPackages, useCases, webFrameworkNames } from '@/data'
import { Label } from '../ui/label'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css';
import { Button } from '../ui/button'
import { FolderPlus, Trash } from 'lucide-react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Spinner from '../Spinner'
import { ReactSortable } from 'react-sortablejs'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video', 'code-block'],
    ['clean'], [{ color: [] }]
  ],
  clipboard: {
    matchVisual: false
  }
}

const formats = [
  'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'link', 'image', 'video', 'code-block'
]


const TemplateForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  images: existingImages,
  deployedLink: existingDeployedLink,
  repositoryLink: existingRepositoryLink,
  framework: existingFramework,
  css: existingCss,
  useCase: existingUseCase,
}) => {
  const [title, setTitle] = React.useState(existingTitle || '')
  const [description, setDescription] = useState(existingDescription || '');
  const [images, setImages] = useState(existingImages || []);
  const [deployedLink, setDeployedLink] = useState(existingDeployedLink || '');
  const [repositoryLink, setRepositoryLink] = useState(existingRepositoryLink || '');
  const [framework, setFramework] = useState(existingFramework || '');
  const [css, setCss] = useState(existingCss || '');
  const [useCase, setUseCase] = useState(existingUseCase || '');
  const [isUploading, setIsUploading] = useState(false);

  const { data: session } = useSession();

  const [redirect, setRedirect] = useState(false);

  const router = useRouter()



  const uploadImageQueue = [];

  function updateImagesOrder(images) {
    setImages(images);
  }

  function handleDeleteImage(index) {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files.length > 0) {
      setIsUploading(true);

      for (const file of files) {
        const data = new FormData();
        data.append('file', file);

        uploadImageQueue.push(
          axios.post('/api/upload', data).then(res => {
            setImages(oldImages => [...oldImages, ...res.data.links])
          })
        )
      }

      await Promise.all(uploadImageQueue);
      setIsUploading(false);
    }
  }

  async function createTemplate(ev) {
    ev.preventDefault();

    if (isUploading) {
      await Promise.all(uploadImageQueue);
    }

    const data = {
      title,
      description,
      css,
      framework,
      useCase,
      deployedLink,
      repositoryLink,
      images,
      user: session.user
    };

    if (_id) {
      await axios.put(`/api/template`, { ...data, _id });
    } else {
      await axios.post('/api/template', data);
    }

    setRedirect(true);

  }

  if (redirect) {
    router.push('/dashboard');
    return null;
  }

  return <>
    <form className="p-3 space-y-6" onSubmit={createTemplate}>
      <Input type='text' placeholder='Template Name' value={title} onChange={(e) => setTitle(e.target.value)} />
      <div className="grid grid-cols-3 gap-4">
        <select className='border rounded-md px-3 py-2 w-full' value={framework} onChange={(e) => setFramework(e.target.value)}>
          <option value="">Select A Framework</option>
          {webFrameworkNames.map((framework) => (
            <option key={framework} value={framework}>
              {framework}
            </option>
          ))}
        </select>
        <select className='border rounded-md px-3 py-2 w-full' value={css} onChange={(e) => setCss(e.target.value)}>
          <option value="">Select Css</option>
          {cssPackages.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <select className='border rounded-md px-3 py-2 w-full' value={useCase} onChange={(e) => setUseCase(e.target.value)}>
          <option value="">Select A UseCase</option>
          {useCases.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input type='url' placeholder='Deployed Link' value={deployedLink} onChange={(e) => setDeployedLink(e.target.value)} />
        <Input type='url' placeholder='Repository Link' value={repositoryLink} onChange={(e) => setRepositoryLink(e.target.value)} />
      </div>

      <div className="grid w-full items-center gap-2">
        <Label>Template Images</Label>
        <Input type='file' onChange={uploadImages} />
        {isUploading && (
          <div className="">
            <Spinner />
          </div>
        )}

        {!isUploading && (
          <div className="w-full">
            <ReactSortable
              list={Array.isArray(images) ? images : []}
              setList={updateImagesOrder}
              className='grid grid-cols-3 gap-4'
            >
              {Array.isArray(images) && images.map((link, index) => (
                <div className="relative" key={link}>
                  <img src={link} alt="template image" className="object-cover h-full w-full rounded-md border p-2 cursor-pointer transition-transform duration-300 transform-gpu group-hover:scale-110" />
                  <div className="absolute top-3 right-3 cursor-pointer opacity-100">
                    <Button onClick={() => handleDeleteImage(index)}>
                      <Trash className='w-4 h-4 bg-white text-red-600 rounded-full p-1' />
                    </Button>
                  </div>
                </div>
              ))}
            </ReactSortable>
          </div>
        )}
      </div>


      <ReactQuill theme='snow' modules={modules} formats={formats} placeholder='Describe your template' className='flex-grow my-3 h-auto' value={description} onChange={(newValue) => setDescription(newValue)} />

      <Button>
        {_id ? 'Update Template' : 'Create Template'}
      </Button>
    </form>
  </>
}

export default TemplateForm