import Sidebar from '@/components/dashboard/Sidebar'
import Footer from '@/components/frontend/Footer'
import SiteHeader from '@/components/frontend/SiteHeader'
import React from 'react'


const layout = ({children}: {children: React.ReactNode}) => {

  return (

    <div className="grid min-h-screen md:w-full w-fit md:grid-cols={220px_1fr}
    lg:grid-cols-[330px_1fr] dark:bg-slate-900">
        <div className='flex flex-col bg-slate-200'>
          <Sidebar />
        </div>
        <div>
          <SiteHeader />
          {children}
          <Footer />
        </div>
        
    </div>

  )
}

export default layout