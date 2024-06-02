import { ExternalLink, SquareDot } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import axios from 'axios'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'
import Image from 'next/image'

const Templates = () => {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    axios.get('/api/template').then(response => {
      setTemplates(response.data)
      setLoading(false)
    })
  }, [])

  const filterTemplates = templates.filter(template =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.framework.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.css.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <header className="border-b mb-3">
        <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <SquareDot className="text-indigo-600" />
                Latest Templates
              </h1>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center w-full max-w-xl">
              <Input
                placeholder="Search by title, users name, css, framework or usecase"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {loading && templates.length === 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {[...Array(8)].map((_, index) => (
            <div className="flex flex-col space-y-3" key={index}>
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {filterTemplates.map((template) => (
          <div
            className="relative overflow-hidden rounded-lg shadow-lg border transition hover:shadow-xl"
            key={template.id}
          >
            <Link href={'/templates/' + template._id}>
              <div className="h-[210px]">
                <Image
                  alt="template image"
                  src={template.images[0]}
                  className="h-45 w-full object-cover rounded-t-lg"
                  width={278}
                  height={183}
                  layout="responsive"
                  quality={100}
                />
              </div>
              <div className="flex items-center gap-x-2 px-4 mt-2">
                <img
                  src={template.user.image}
                  alt="user image"
                  className="h-8 w-8 rounded-full"
                />
                <div className="">
                  <h3 className="text-base font-semibold leading-7 tracking-tight">
                    {template.user.name}
                  </h3>
                </div>
              </div>
              <div className="bg-white p-4 rounded-b-lg">
                <h3 className="text-lg font-semibold transition duration-300 line-clamp-1 truncate mb-10 hover:text-primary text-gray-600">
                  {template.title}
                </h3>
              </div>
            </Link>
            <div className="absolute bottom-0 left-0 w-full border-t p-3 text-gray-500 text-sm">
              <div className="flex justify-between items-center">
                <p className="text-sm"> {template.framework}</p>
                <Link href={template.deployedLink} target="_blank">
                  <ExternalLink />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Templates