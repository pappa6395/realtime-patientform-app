"use client"

import { PatientContext } from '@/context/patientContext';
import { getAgeFromDoB } from '@/lib/getAgeFromDoB';
import { getNormalDate } from '@/lib/getNormalDate';
import { timeAgo } from '@/lib/timeAgo';
import { PatientData } from '@/type/types';
import { Ambulance, Calendar, Clock9 } from 'lucide-react'
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'


const PatientDetails = () => {

  const context = useContext(PatientContext);

  if (!context) {
    throw new Error("PatientDetails must be used within a PatientProvider");
  }
  const [patientEnter, setPatientEnter] = useState<PatientData[]>([]);
  const { 
    patientData, 
    selectedPatient,
  } = context;

  useEffect(() => {
    const transformData = patientData.map((patient) => {
        return {
            id: patient.id,
            firstName: patient.firstName,
            lastName: patient.lastName,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            email: patient.email,
            phoneNumber: patient.phoneNumber,
            preferredLanguage: patient.preferredLanguage,
            nationality: patient.nationality,
            emergencyContact: patient.emergencyContact,
            unitNumber: patient.unitNumber,
            streetAddress: patient.streetAddress,
            city: patient.city,
            state: patient.state,
            postalCode: patient.postalCode,
            country: patient.country,
            status: patient.status,
            createdAt: patient.createdAt,
            viewed: patient.viewed,
            image: patient.image || "/globe.svg"

        }
    })
    setPatientEnter(transformData)
  },[patientData])

    if (!selectedPatient) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className='flex flex-col items-center'>
                <Ambulance className='text-slate-600 size-14'/>
                <p className='text-slate-600 text-xl'>No patient selected</p>
            </div>

        </div>
    )
  }

  return (

    <div className="max-w-6xl mx-5 p-5 bg-white dark:bg-slate-800 rounded-lg shadow-md mt-5 mb-5">
        <h2 className="text-xl font-semibold mb-4">Patient Details</h2>
        <div>
            <div className='flex items-start justify-between'>
                <Image
                    src={selectedPatient.image || "/globe.svg"}
                    alt={selectedPatient.firstName}
                    width={200}
                    height={200} 
                    className='w-36 h-44 aspect-auto object-contain'
                />
                <div className='flex flex-col items-center gap-4'>
                    <h2 className="scroll-m-20 pb-2 text-lg 
                    font-medium tracking-tight first:mt-2">
                        {getNormalDate(selectedPatient.createdAt)}
                    </h2>
                    <div className='flex items-center font-medium text-slate-500 text-sm'>
                        <Clock9 className='w-4 h-4 mr-2'/>
                        <span>{timeAgo(selectedPatient.createdAt)}</span>
                    </div>
                </div>
            </div>
            
            <div className='flex justify-between mt-2 border-b px-4 py-4'>
                <h2 className="scroll-m-20 pb-2 text-2xl 
                font-medium tracking-tight first:mt-2"
                >
                Profile ID : <span className='text-xl ml-2'>{selectedPatient.id}</span>
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div className="col-span-2 flex px-4 py-3 space-x-2 divide-x-2 
                divide-gray-200 border-b"
                >
                    <p className='px-3 text-slate-500'>First Name</p>
                    <p className='px-4'>{selectedPatient.firstName}</p>
                </div>
                <div className="col-span-3 flex px-4 py-3 space-x-2 divide-x-2 
                    divide-gray-200 border-b"
                >
                    <p className='px-3 text-slate-500'>Last Name</p>
                    <p className='px-4'>{selectedPatient.lastName}</p>
                </div>
                <div className="col-span-2 flex px-4 py-3 space-x-2 divide-x-2 
                divide-gray-200 border-b"
                >
                    <p className='px-3 text-slate-500'>Middle Name (optional)</p>
                    <p className='px-4'>{selectedPatient.middleName || " - "}</p>
                </div>
                <div className="col-span-3 flex px-4 py-3 space-x-2 divide-x-2 
                    divide-gray-200 border-b"
                >
                    <p className='px-3 text-slate-500'>Gender</p>
                    <p className='px-4'>{selectedPatient.gender}</p>
                </div>
                <div className="col-span-2 flex px-4 py-3 space-x-2 divide-x-2 
                divide-gray-200 border-b"
                >
                    <p className='px-3 text-slate-500'>Age</p>
                    <p className='px-4'>{getAgeFromDoB(selectedPatient.dateOfBirth)}</p>
                </div>
                <div className="col-span-3 flex px-4 py-3 space-x-2 divide-x-2 
                    divide-gray-200 border-b"
                >
                    <p className='px-3 text-slate-500'>Date of Birth</p>
                    <p className='px-4'>{selectedPatient.dateOfBirth}</p>
                </div>
                <div className="col-span-2 flex px-4 py-3 space-x-2 divide-x-2 
                divide-gray-200 border-b">
                    <p className='px-3 text-slate-500'>Phone Number</p>
                    <p className='px-4'>{selectedPatient.phoneNumber}</p>
                </div>
                <div className="col-span-3 flex px-4 py-3 space-x-2 divide-x-2 
                    divide-gray-200 border-b">
                    <p className='px-3 text-slate-500'>Email Address</p>
                    <p className='px-3'>{selectedPatient.email}</p>
                </div>
            </div>
            <div className='px-4 pt-2'>
                <h2 className="scroll-m-20 pb-2 text-2xl 
                font-medium tracking-tight first:mt-2"
                >
                    Address 
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div className="col-span-2 flex px-4 py-3 space-x-2 divide-x-2 
                divide-gray-200 border-b"
                >
                    <p className='px-3 text-slate-500'>Unit No. / Room No.</p>
                    <p className='px-4'>{selectedPatient.unitNumber}</p>
                </div>
                <div className="col-span-3 flex px-4 py-3 space-x-2 divide-x-2 
                    divide-gray-200 border-b"
                >
                    <p className='px-3 text-slate-500'>Street Address</p>
                    <p className='px-4'>{selectedPatient.streetAddress}</p>
                </div>
                <div className="col-span-2 flex px-4 py-3 space-x-2 divide-x-2 
                divide-gray-200 border-b">
                    <p className='px-3 text-slate-500'>City</p>
                    <p className='px-4'>{selectedPatient.city}</p>
                </div>
                <div className="col-span-3 flex px-4 py-3 space-x-2 divide-x-2 
                    divide-gray-200 border-b">
                    <p className='px-3 text-slate-500'>State</p>
                    <p className='px-3'>{selectedPatient.state}</p>
                </div>
                <div className="col-span-2 flex px-4 py-3 space-x-2 divide-x-2 
                divide-gray-200 border-b">
                    <p className='px-3 text-slate-500'>Country</p>
                    <p className='px-4'>{selectedPatient.country}</p>
                </div>
                <div className="col-span-3 flex px-4 py-3 space-x-2 divide-x-2 
                    divide-gray-200 border-b">
                    <p className='px-3 text-slate-500'>Postal Code</p>
                    <p className='px-3'>{selectedPatient.postalCode}</p>
                </div>
            </div> 
            <div className='px-4 pt-2'>
                <h2 className="scroll-m-20 pb-2 text-2xl 
                font-medium tracking-tight first:mt-2"
                >
                    Additional Info. 
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-2">
                <div className="col-span-2 flex px-4 py-3 space-x-2 divide-x-2 
                divide-gray-200 border-b"
                >
                    <p className='px-3 text-slate-500'>Preferred Language</p>
                    <p className='px-4'>{selectedPatient.preferredLanguage}</p>
                </div>
                <div className="col-span-3 flex px-4 py-3 space-x-2 divide-x-2 
                    divide-gray-200 border-b"
                >
                    <p className='px-3 text-slate-500'>Nationality</p>
                    <p className='px-4'>{selectedPatient.nationality}</p>
                </div>
                <div className="col-span-2 flex px-4 py-3 space-x-2 divide-x-2 
                divide-gray-200 border-b"
                >
                    <p className='px-3 text-slate-500'>Emergency Contact</p>
                    <p className='px-4'>{selectedPatient.emergencyContact?.name}</p>
                </div>
                <div className="col-span-3 flex px-4 py-3 space-x-2 divide-x-2 
                divide-gray-200 border-b"
                >
                    <p className='px-3 text-slate-500'>Relationship</p>
                    <p className='px-4'>{selectedPatient.emergencyContact?.relationship}</p>
                </div>
                <div className="col-span-2 flex px-4 py-3 space-x-2 divide-x-2 
                divide-gray-200 border-b"
                >
                    <p className='px-3 text-slate-500'>Religion (optional)</p>
                    <p className='px-4'>{selectedPatient.religion}</p>
                </div>
            </div>
        </div>
    </div>

  )
}

export default PatientDetails