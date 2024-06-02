import React from 'react'
import { Button } from './ui/button'
import { useSession } from 'next-auth/react';

const Hero = () => {
  const { data: session } = useSession();
  return <>
    <div className="relative overflow-hidden">
      <div className="pb-16 pt-20 sm:pt-24 lg:pb-24 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl lg:text-6xl">
              Your Hub for  <span className="text-green-600">Project</span> Templates
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Ready to kickstart your next big idea? Welcome to <span className="text-indigo-600">Design2Code</span>, where developers like you come together to showcase their <span className='text-blue-600'>design </span> and <span className="text-red-600">project</span> expertise. Whether you're creating a <span className="text-yellow-600">website</span>, <span className="text-blue-600">mobile app</span>, or exploring a new technology, find the <span className="text-purple-600">inspiration</span> and <span className="text-purple-600">resources</span> you need to bring your projects to life.
            </p>
          </div>
          <div className="mt-12 text-center">
            {session ? (
              <Button variant="default" onClick={() => { window.location.href = '/dashboard' }}>
                Share your projects
              </Button>
            ) : (
              <Button variant="default" onClick={() => { window.location.href = '/login' }}>
                Sign In to start sharing your projects
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Hero
