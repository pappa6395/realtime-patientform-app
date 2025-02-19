import Footer from '@/components/frontend/Footer'
import SiteHeader from '@/components/frontend/SiteHeader'
import React from 'react'


const layout = ({children}: {children: React.ReactNode}) => {

  return (

    <div className='min-h-screen bg-gradient-to-br from-white via-teal-500 to-sky-500'>
        <SiteHeader />
        {children}
        <Footer />
    </div>

  )
}

export default layout