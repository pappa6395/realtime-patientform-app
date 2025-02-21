import { PatientData } from '@/type/types'
import Image from 'next/image'
import React from 'react'

const PatientCard = ({
    patient,
    onSelect
}: {
    patient: PatientData;
    onSelect: (patient: PatientData) => void;
}) => {


  return (

    <div className={`flex px-4 bg-white dark:bg-slate-800 shadow-md dark:shadow-xl rounded-md py-4 flex-col gap-1 border-2 ${patient.viewed 
    ? "border-gray-200 dark:border-gray-400" : "border-emerald-400 dark:border-emerald-500"} hover:bg-slate-100 relative`}
    onClick={() => onSelect(patient)}
    >
        <div className='flex items-center justify-between gap-3'>
            <div className='flex gap-3 items-center'>
                <Image 
                    src={patient.image || "/globe.svg"}
                    alt={patient?.firstName || ""}
                    width={100}
                    height={100}
                    className='w-10 h-10 aspect-square rounded-full object-cover'
                />
                <div>
                    <h3 className='text-base font-semibold'>{`${patient?.firstName || ""} ${patient?.lastName || ""}`}</h3>
                    <p className='text-sm text-gray-600 dark:text-slate-50'>{patient?.email || ""}</p>
                </div>
                {!patient.viewed && (
                    <span className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-500 shadow-lg border border-slate-700"></span>
                )}
            </div>
        </div>
    </div>

  )
}

export default PatientCard