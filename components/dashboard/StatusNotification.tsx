import { PatientContext } from '@/context/patientContext';
import { PatientStatus } from '@/type/types';
import { Bell } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'


const StatusNotification = () => {

    const context = useContext(PatientContext);
    
    if (!context) {
    throw new Error("PatientDetails must be used within a PatientProvider");
    }
    const [statusEnter, setStatusEnter] = useState<PatientStatus[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const { 
    patientData,
    setSelectedPatient,
    patientStatus, 
    setPatientStatus,
    } = context;

    useEffect(() => {
        const Patients = patientStatus.map((p) => {
            return {
                patientId: p.patientId || "",
                status: p.status || "active",
            }
        })
        setStatusEnter(Patients);
    }, [patientStatus])

    const handleOpenNotification = () => {
        setIsOpen(!isOpen);
    }

    const handleClick = (patientId: string) => {

        const matchPatient = patientData.find((p) => p.id === patientId);
        if (matchPatient) {
           
                setSelectedPatient(matchPatient);
                const updatedStatus = patientStatus.filter((p) => p.patientId!== patientId);
                setPatientStatus(updatedStatus);
                localStorage.setItem("PatientStatus", JSON.stringify(updatedStatus));

        } else {

            const updatedStatus = patientStatus.filter((p) => p.patientId !== patientId);
            setPatientStatus(updatedStatus);
            localStorage.setItem("PatientStatus", JSON.stringify(updatedStatus));
            console.log(`Patient id ${patientId} data not found`);
        }
    }

  return (

    <div className='pt-2'>
        <button 
            className="relative inline-flex items-center p-3 text-sm 
            font-medium text-center text-white bg-transparent rounded-lg "
            onClick={handleOpenNotification}
        >
          <Bell className="text-slate-500 dark:text-lime-500" />
          <span className="sr-only">new patients</span>
          {statusEnter && statusEnter.length > 0 && (
            <p className="absolute inline-flex items-center 
            justify-center w-6 h-6 text-xs font-bold text-white 
            bg-red-500 rounded-full -top-0 start-6 dark:border-gray-900"
            >
                {statusEnter.length || 0}
            </p>
          )}
        </button>
        <div>
        {isOpen && (
            <div className="absolute top-14 w-48 bg-white dark:bg-slate-600 rounded-md shadow-lg">
                <div className="py-2 px-2 space-y-2">
                    {statusEnter && statusEnter.length > 0 ? (
                        statusEnter.map((p, index) => {
                            if (p.patientId) {
                                return (
                                    (
                                        <button 
                                            key={index}
                                            type="button" 
                                            onClick={() => handleClick(p.patientId)} 
                                            className='dark:bg-slate-700 w-full text-start  px-2 py-2 rounded-lg shadow-sm active:scale-95'>
                                            <p className='text-sm font-medium tracking-tight'>ID: {p.patientId || ""}</p> 
                                            {p.status === 'active' && <span className="text-green-500">🟢 Active</span>}
                                            {p.status === 'inactive' && <span className="text-gray-200">⚪️ inactive</span>}
                                            {p.status === 'filling' && <span className="text-yellow-500"> 🟡 Filling</span>}
                                            {p.status === 'idle' && <span className="text-blue-500"> 🔵 idle</span>}
                                            {p.status === 'submitted' && <span className="text-green-500">✅ Submitted</span>}
                                        </button>
                                    )
                                )
                            }
                        })
                    ) : (
                        <p className="text-center text-sm text-gray-600 
                        dark:text-slate-100">
                            No new patients
                        </p>
                    )}
                </div>
            </div>
        )}
        </div>
    </div>

  )
}

export default StatusNotification