"use client"

import { useState, useEffect } from "react";

import { EmergencyContact } from "./PatientForm";
import Image from "next/image";
import { socket } from "@/lib/socketClient";


type PatientData = {
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  email: string;
  streetAddress: string;
  unitNumber: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  preferredLanguage: string;
  nationality: string;
  emergencyContact?: EmergencyContact;
  religion?: string;
  image?: string;
  createdAt: Date;
};

export default function StaffView() {
  const [patientData, setPatientData] = useState<PatientData[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);


  useEffect(() => {
    socket.on("Patient", (data: PatientData) => {
      data.createdAt = new Date(data.createdAt);
      setPatientData((prevPatients) => [...prevPatients, data]);
    });

    return () => {
      socket.off("Patient");
    };
  }, []);

  return (
    <div className="max-w-6xl mx-5 p-5 bg-white rounded-lg shadow-md mt-5 mb-5">
      <h2 className="text-xl font-semibold mb-4">Staff View</h2>
      {patientData.length === 0 ? (
        <p>No patient data received yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {patientData.map((patient, index) => {
            return (
              <div key={index} className="p-4 border rounded-md shadow-sm">
                <p><strong>Name:</strong> {patient.firstName} {patient.lastName}</p>
                <p><strong>Middle Name:</strong> {patient.middleName}</p>
                <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
                <p><strong>Phone:</strong> {patient.phoneNumber}</p>
                <p><strong>Unit No. / Apartment No.:</strong> {patient.unitNumber}</p>
                <p><strong>Street Address:</strong> {patient.streetAddress}</p>
                <p><strong>City:</strong> {patient.city}</p>
                <p><strong>State:</strong> {patient.state}</p>
                <p><strong>Country:</strong> {patient.country}</p>
                <p><strong>Postal Code:</strong> {patient.postalCode}</p>
                <p><strong>Preferred Language:</strong> {patient.preferredLanguage}</p>
                <p><strong>Nationality:</strong> {patient.nationality}</p>
                <p><strong>Emergency Contact:</strong> {patient.emergencyContact?.name} - {patient.emergencyContact?.relationship}</p>
                <p><strong>Religion:</strong> {patient.religion}</p>
                  {patient.image && 
                    <Image 
                      src={patient.image || "/file.svg"} 
                      alt="Patient"
                      width={250}
                      height={250} 
                      className="w-24 h-24 object-cover mt-2" 
                    />
                  }
              </div>
            )
          })}
          
        </div>
      )}
    </div>
  );
}
