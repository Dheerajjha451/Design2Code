import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/router';

const DashboardHeader = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  async function logout() {
    await router.push('/');
    await signOut();
  }

  return (
    <>
      <div className="flex justify-between items-center p-4  shadow-sm">
        <button
          className="inline-flex items-center p-2 text-gray-500 rounded-lg sm:hidden hover:bg-gray-200 dark:bg-slate-800 hover:dark:bg-slate-600 focus:outline-none focus:ring-2 "
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      </div>

      <aside className={`fixed z-40 w-80 h-100 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}>
        <div className="h-full px-3 py-4 overflow-y-auto relative">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg p-2 sm:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <ul className="space-y-2 font-medium mt-8">
            <li>
              <div className="w-full max-w-sm bg-white border border-gray-200 dark:bg-slate-800 dark:border-gray-800 rounded-lg shadow">
                <div className="flex flex-col items-center p-3">
                  <img src={session?.user?.image} alt={session?.user?.name} className='w-24 h-24 mb-3 rounded-full shadow-lg' />
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{session?.user?.name}</h5>
                  <span className="text-sm text-gray-600 dark:text-white">{session?.user?.email}</span>
                  <Button variant='outline' className='w-full mt-2  dark:hover:bg-slate-900' onClick={() => { window.location.href = '/dashboard' }}>
                    Dashboard
                  </Button>
                  <Button variant='outline' onClick={logout} className='w-full mt-2 dark:hover:bg-slate-900'>
                    Logout
                  </Button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default DashboardHeader;
