"use client"

import React from 'react'
import { MainNav } from '../MainNav'
import { ModeToggle } from '../ModeToggle'
import Link from 'next/link'
import { LogIn } from 'lucide-react'
import { usePathname } from 'next/navigation'

const SiteHeader = () => {

    const pathname = usePathname()

  return (

    <header className="sticky top-0 z-50 border-b border-border/40 
    bg-slate-200 dark:bg-emerald-800 dark:border-border">
      <div className="flex h-14 items-center px-4">
        <MainNav />
        {/* <MobileNav /> */}
        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center gap-4">
            <button className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl active:scale-90">
                  {pathname === '/dashboard' ? (
                    <Link href="/" className='flex items-center'>
                        <LogIn className="mr-2 h-4 w-4" />Patient
                    </Link>
                  ) : (
                    <Link href="/dashboard" className='flex items-center'>
                      <LogIn className="mr-2 h-4 w-4" />Staff
                  </Link>
                  )}
                  
            </button>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>

  )
}

export default SiteHeader