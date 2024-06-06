import { Icons } from '@/components/Icons'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowRight, Check, Star } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
export default function Home() {  
  const { data: session } = useSession()
  return (
    <div className=''>
      <section className="relative pb-24 pt-10 sm:pb-32 xl:pb-52 xl:pt-32 lg:pt-24">
  <MaxWidthWrapper className="px-6 lg:px-0">
    <div className="relative mx-auto text-center flex flex-col items-center">
      <div className="absolute w-28 left-0 -top-20 hidden lg:block"></div>
      <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
        Showcase Your{' '}
        <span className=" px-2 text-blue-600">Projects</span>{' '}
        and  <span className='text-green-600'>Designs</span>
      </h1>
      <p className="mt-8 text-lg max-w-prose text-center text-balance md:text-wrap">
        Share your innovative designs and projects with the world.{' '}
        <span className="font-semibold">Showcase</span> your talent with us.
      </p>

      <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-center">
        <div className="space-y-2">
          <li className="flex gap-1.5 items-center text-left">
            <Check className="h-5 w-5 shrink-0 text-yellow-400" />
            Showcase your work with other developers and designers
          </li>
          <li className="flex gap-1.5 items-center text-left">
            <Check className="h-5 w-5 shrink-0 text-yellow-400" />
            Inspire others
          </li>
          <li className="flex gap-1.5 items-center text-left">
            <Check className="h-5 w-5 shrink-0 text-yellow-400" />
            Build your professional portfolio
          </li>
        </div>
      </ul>
    
      <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="flex -space-x-4">
          <img
            className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
            src="/users/user-1.png"
            alt="user image"
          />
          <img
            className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
            src="/users/user-2.png"
            alt="user image"
          />
          <img
            className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
            src="/users/user-3.png"
            alt="user image"
          />
          <img
            className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
            src="/users/user-4.jpg"
            alt="user image"
          />
          <img
            className="inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100"
            src="/users/user-5.jpg"
            alt="user image"
          />
        </div>
      </div>
      <div className="md:flex items-center space-x-8 mt-12">
          {session ? (
            <>
              <Link href={'/projects'} className='flex items-center text-primary '>
                <Button variant='default' className="text-xl font-semibold whitespace-nowrap ">
                  Start now
                </Button>
              </Link>
            
            </>
          ) : (
            <Button variant='default' onClick={() => { window.location.href = '/login' }}>
            Start now
            </Button>
          )}
        </div>
    </div>
  </MaxWidthWrapper>
</section>


    </div>
    
  )
}
