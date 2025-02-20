import { PatientProvider } from '@/context/patientContext'
import { ThemeProvider } from 'next-themes'
import React from 'react'

const Providers = ({children}: {children: React.ReactNode}) => {

  return (

    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
        <PatientProvider>
          {children}
        </PatientProvider>
    </ThemeProvider>

  )
}

export default Providers