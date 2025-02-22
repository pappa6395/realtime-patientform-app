import { PatientProvider } from '@/context/patientContext'
import { ThemeProvider } from 'next-themes'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const Providers = ({children}: {children: React.ReactNode}) => {

  return (

    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
        <PatientProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
          {children}
        </PatientProvider>
    </ThemeProvider>

  )
}

export default Providers