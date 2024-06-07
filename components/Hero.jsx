import React from 'react'
import { Button } from './ui/button'
import { useSession } from 'next-auth/react';

const Hero = () => {
  const { data: session } = useSession();
  return (
    <div className="relative overflow-hidden max-w-[1440px] mx-auto">
      <div className="pb-16 pt-20 sm:pt-24 lg:pb-24 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-primary dark:text-white sm:text-5xl lg:text-6xl">
              Your Hub for <span className="text-green-600 dark:text-green-400">Project</span> Templates
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
              Ready to kickstart your next big idea? Welcome to <span className="text-indigo-600 dark:text-indigo-400">Design2Code</span>, where developers like you come together to showcase their <span className='text-blue-600 dark:text-blue-400'>design</span> and <span className="text-red-600 dark:text-red-400">project</span> expertise. Find the <span className="text-purple-600 dark:text-purple-400">inspiration</span> and <span className="text-purple-600 dark:text-purple-400">resources</span> you need to bring your projects to life.
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
  );
}

export default Hero;
