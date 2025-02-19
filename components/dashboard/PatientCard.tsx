import { Calendar, ClipboardPlus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const PatientCard = () => {


  return (

    <div className='flex px-4 bg-white
    border-gray-100 dark:bg-slate-700 shadow-md rounded-md py-4 
    flex-col gap-1'>
        <div className='flex items-center justify-between gap-3'>
            <div className='flex gap-3 items-center'>
                <Image 
                    src={"/globe.svg"}
                    alt=""
                    width={100}
                    height={100}
                    className='w-6 h-6 aspect-square rounded-full object-contain'
                />
                <h2 className='text-xl font-semibold'>John Doe</h2>
            </div>
            <div>
                <ClipboardPlus />
            </div>
        </div>
        <div>
            <p className='text-sm text-gray-600'>Age: 25</p>
            <p className='text-sm text-gray-600'>Email: john.doe@example.com</p>
        </div>
    </div>

  )
}

export default PatientCard