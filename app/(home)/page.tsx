"use client"

import PatientForm from '@/components/form/PatientForm'
import { formStep } from '@/config/formStep'
import { PatientContext } from '@/context/patientContext'
import { cn } from '@/lib/utils'
import { CircleCheck } from 'lucide-react'
import React, { useContext, useEffect } from 'react'

const Home = () => {

  const context = useContext(PatientContext);
      
  if (!context) {
  throw new Error("StaffView must be used within a PatientProvider");
  }
  
  const { 
      step,
      setStep
  } = context;

  useEffect(() => {
    setStep(1)

  },[setStep])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth'})
    
  })


  return (

    <div className="flex justify-center items-center sm:h-screen mx-auto">
      <div className='mt-4 mb-4 bg-white py-5 px-4 rounded-xl shadow-xl'>
        <h2 className='text-slate-400 font-bold text-2xl mb-4'>Patient Registration</h2>
        <div className='mb-4'>
          <ol className="flex pl-3 items-center w-full text-lg font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
              {formStep.map((s,index) => {
                return (
                  <li key={index} className={cn("pl-2 flex md:w-full items-center font-semibold sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700", 
                    {
                      "text-blue-600 dark:text-blue-500": step === s.step,
                      "text-gray-500 dark:text-gray-400": step !== s.step,
                    })}>
                    <span className="flex items-center after:content-['/'] 
                    sm:after:hidden after:mx-2 after:text-gray-200 
                    dark:after:text-gray-500">
                      {step === s.step ? (
                        <CircleCheck className='size-6 mr-2' />
                      )
                       : (
                        <span className='text-xs sm:text-lg mr-2'>{s.step}.</span>
                       )}
                        
                        <span className='text-xs sm:text-lg'>{s.title}</span>
                    </span>
                  </li>
                )
              })}
              
          </ol>
        </div>
            <PatientForm />
        </div>    
    </div>
  )
}

export default Home