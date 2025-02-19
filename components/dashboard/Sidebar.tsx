import React from 'react'
import PatientCard from './PatientCard'

const Sidebar = () => {

  return (

    <div>
        <div className='p-4 bg-sky-300'>
            <h2>Patient Data Inbox</h2>
        </div>
        <aside className="p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Patient Info Data Box</h2>
            {/* {patients.map((patient, index) => (
            <div
                key={index}
                className="p-2 bg-white shadow-md rounded-md cursor-pointer mb-2 hover:bg-gray-200"
                onClick={() => setSelectedPatient(patient)}
            >
                <p className="font-semibold">{patient.firstName} {patient.lastName}</p>
                <p className="text-sm text-gray-600">Age: {patient.age}</p>
            </div>
            ))} */}
            <PatientCard />
            
        </aside>

    </div>

  )
}

export default Sidebar