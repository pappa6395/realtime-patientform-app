"use client"

import { LogIn, PanelRightOpen, XCircle } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { ModeToggle } from '../ModeToggle'
import SearchBar from './SearchBar'
import StaffView from '../form/StaffView'
import StatusNotification from './StatusNotification'
import { PatientContext } from '@/context/patientContext'
import { PatientData } from '@/type/types'


const NavBar = () => {

    const pathname = usePathname()


    const context = useContext(PatientContext);
        
    if (!context) {
    throw new Error("PatientDetails must be used within a PatientProvider");
    }

    const [latestPatient, setLatestPatient] = useState<PatientData | null>(null);
    const [showNotification, setShowNotification] = useState(false);

    const { 
    patientData, 
    mobileMenuOpen,
    setMobileMenuOpen
    } = context;

    useEffect(() => {
        if (patientData.length === 0) return;
    
        const newPatient = patientData.reduce((latest, current) => {
          return new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest;
        }, patientData[0]);
    
        if (!latestPatient || newPatient.id !== latestPatient.id) {
          setLatestPatient(newPatient);
          setShowNotification(true);
        }
    }, [patientData]);


    const handleMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        setShowNotification(false);
    }

  return (

    <header>
        <nav className="sticky top-0 z-50 border-b border-border/40 
        bg-slate-200 dark:bg-emerald-800 dark:border-border">
            <div className="flex h-14 items-center px-4">
                <button onClick={handleMenuToggle} className='lg:hidden block'>
                    <PanelRightOpen 
                        className='w-6 h-6 text-slate-600 dark:text-slate-300' />
                    <span className='sr-only'>OpenMobileMenu</span>
                    {showNotification && (
                        <p className="absolute inline-flex items-center 
                        justify-center w-3 h-3 text-xs font-bold text-white 
                        bg-red-500  rounded-full top-3 start-8 dark:border-gray-900"
                        >
                        </p>
                    )}
                </button>
                <div className='hidden sm:flex pl-3'>
                    <SearchBar />
                </div>
                <div className="flex flex-1 items-center justify-end">
                    <nav className="flex items-center gap-4">
                        <StatusNotification />
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
        </nav>
        {mobileMenuOpen && (
            <div
            className="fixed inset-0 bg-black bg-opacity-70 z-40"
            onClick={handleMenuToggle}
            ></div>
        )}
        {mobileMenuOpen && (
            <div className='relative bg-slate-800'>
                <div className={`fixed h-full w-72 top-0 left-0 transform
                    ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
                    transition-transform duration-3000 ease-in-out z-50`}>
                    <StaffView />
                </div>
                 <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block lg:hidden rounded-md text-gray-800 -top-1 z-50 
                    start-64  dark:text-gray-300 absolute"
                >
                    <span className="sr-only">Close menu</span>
                    <XCircle className="size-6"/>
                </button>
            </div>
            
            
        )}
    </header>

  )
}

export default NavBar