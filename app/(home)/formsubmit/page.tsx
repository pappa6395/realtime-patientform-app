"use client"
import { CircleCheckBig } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React from 'react'


const page = () => {

  const param = useSearchParams()
  const patientId = param.get('id')

  return (

    <div className="flex justify-center items-center h-screen">
      <div className='flex flex-col items-center gap-4'>
        <CircleCheckBig className='text-lime-300 size-36'/>
        <p className='text-slate-50 text-2xl font-semibold'>
          ID : {patientId} 
        </p>
        <p className='text-slate-50 text-3xl font-semibold'>Form submission successful</p>
        <p className='text-slate-50 text-2xl font-semibold'>
          Thank you for your submission. After reviewing your data 
        </p>
        <p className='text-slate-50 text-2xl font-semibold'>
          our specialists will contact you as soon as possible.
        </p>
      </div>
    </div>

  )
}

export default page