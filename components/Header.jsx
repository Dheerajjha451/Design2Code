import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Code, SquareDashedBottomCode, Sun, Moon, Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarImage } from './ui/avatar'

const Header = () => {
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark')
        document.documentElement.classList.toggle('dark', savedTheme === 'dark')
      } else {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        setIsDarkMode(prefersDarkMode)
        document.documentElement.classList.toggle('dark', prefersDarkMode)
      }
    }
  }, [])

  const handleToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleThemeToggle = () => {
    const newTheme = isDarkMode ? 'light' : 'dark'
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
  }

  return (
    <nav className="border-b border-gray-200 sticky top-0 z-50 bg-white dark:bg-gradient-to-r from-black via-gray-800 to-black dark:border-zinc-700">
      <div className="flex flex-wrap items-center justify-between p-4 max-w-[1440px] mx-auto">
        <Link href={'/'} className='flex items-center space-x-3 text-primary font-bold'>
          <img src='/logo.png' width={32} height={32} alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Design2Code
          </span>
        </Link>
   

        <div className="flex items-center md:hidden">
          <button onClick={handleToggle} className="text-primary">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <button onClick={handleThemeToggle} className="text-primary">
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <Link href={'/projects'} className='flex items-center text-primary font-bold space-x-2'>
                <SquareDashedBottomCode width={20} height={20} />
                <span className="text-xl font-semibold whitespace-nowrap">
                  Projects
                </span>
              </Link>
          {session ? (
            <>
             
              <Avatar onClick={() => { window.location.href = '/dashboard' }} className="cursor-pointer">
                <AvatarImage src={session.user.image} />
              </Avatar>
            </>
          ) : (
            <Button variant='outline' onClick={() => { window.location.href = '/login' }}>
              Login
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="w-full md:hidden flex flex-col items-start space-y-4 mt-4">
            <button onClick={handleThemeToggle} className="text-primary">
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            {session ? (
              <>
                <Link href={'/projects'} className='flex items-center text-primary font-bold space-x-2'>
                  <SquareDashedBottomCode width={20} height={20} />
                  <span className="text-xl font-semibold whitespace-nowrap">
                    Projects
                  </span>
                </Link>
                <Avatar onClick={() => { window.location.href = '/dashboard' }} className="cursor-pointer">
                  <AvatarImage src={session.user.image} />
                </Avatar>
              </>
            ) : (
              <Button variant='outline' onClick={() => { window.location.href = '/login' }}>
                Login
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Header
