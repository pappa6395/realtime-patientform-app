"use client"

import { Undo2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {

  const router = useRouter();
  
  const handleClick = () => {
      router.push('/')
  }

  return (

    <div className="flex justify-center items-center h-screen">
      <div className='flex flex-col items-center gap-4'>
        <Image 
            src={"/sorry.png"}
            alt="sorry"
            width={300}
            height={300}
        />
        <p className='text-slate-50 text-2xl font-semibold'>
          
        </p>
        <p className='text-slate-50 text-3xl font-semibold'>We are sorry to hear your leaving</p>
        <p className='text-slate-50 text-2xl font-semibold'>
          Thank you for your visiting. We hope to welcome you back soon
        </p>
        <p className='text-slate-50 text-2xl font-semibold'>
          Or if you change your mind, you are always welcome.
        </p>
        <div className='flex justify-center'>
            <button 
                type="button"
                onClick={handleClick} 
                className="bg-blue-500 text-white shadow-md
                px-4 py-2 rounded flex justify-center gap-2 active:scale-95"
            >
                <Undo2 />
                Back Home
            </button>   
        </div>
      </div>
    </div>
    
  )
}

export default page