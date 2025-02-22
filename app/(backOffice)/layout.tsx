
import NavBar from '@/components/dashboard/NavBar'
import StaffView from '@/components/form/StaffView'
import Footer from '@/components/frontend/Footer'
import React from 'react'


const layout = ({children}: {children: React.ReactNode}) => {

  return (

    <div className="grid min-h-screen
    lg:grid-cols-[340px_1fr] dark:bg-slate-800">
        <div className='hidden lg:flex lg:flex-col'>
          <StaffView />
        </div>
        <div>
          <NavBar />
          {children}
          <Footer />
        </div>
    </div>

  )
}

export default layout