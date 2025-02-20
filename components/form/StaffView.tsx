"use client"

import { useEffect, useContext } from "react";
import { socket } from "@/lib/socketClient";
import PatientCard from "../dashboard/PatientCard";
import { PatientData } from "@/type/types";
import { PatientContext } from "@/context/patientContext";
import Logo from "../Logo";


export default function StaffView() {
  
  const context = useContext(PatientContext);

  if (!context) {
    throw new Error("StaffView must be used within a PatientProvider");
  }

  const { patientData, setPatientData, selectedPatient, setSelectedPatient } = context;

  useEffect(() => {
    socket.on("Patient", (data: PatientData) => {
      data.createdAt = new Date(data.createdAt);
      data.viewed = false;
      setPatientData((prevPatients) => {
        const updatedPatients = [...prevPatients, data];
        localStorage.setItem("patients", JSON.stringify(updatedPatients));

        return updatedPatients;
      });
      
    });

    return () => {
      socket.off("Patient");
    };
  }, []);

  useEffect(() => {
    const storedPatients = localStorage.getItem("patients");
    if (storedPatients) {
      const parsedPatients = JSON.parse(storedPatients).map((p: PatientData) => ({
        ...p,
        createdAt: new Date(p.createdAt),
      }))
      setPatientData(parsedPatients);
    }
  }, []);

  const handleSelectPatient = (patient: PatientData) => {
    setSelectedPatient(patient);
    const storedPatients = JSON.parse(localStorage.getItem("patients") || "[]").map((p: PatientData) => ({
      ...p, createdAt: new Date(p.createdAt)
    }));
    const updatedPatient = storedPatients.map((p: PatientData) => {
      if (p.id === patient.id) {
        return { ...p, viewed: true }
      }
      return { ...p };
    });
    setPatientData(updatedPatient);
    localStorage.setItem("patients", JSON.stringify(updatedPatient));
  };

  return (
    <div className="max-w-xl h-full bg-gradient-to-b bg-slate-200 
        dark:from-slate-700 dark:to-slate-700">
      <div className="text-xl font-semibold py-3 p-3 mt-1 mx-1">
        <Logo 
          className="text-base"
          classLogo="w-5 h-5"
        />
      </div>
        <aside className="space-y-1.5 h-[500px] overflow-scroll z-50 mx-2 px-2">
        <h2 className="text-xl font-bold mb-4">Patient Info Data Box</h2>
            {patientData.map((patient, index) => (
            <div
                key={index}
                onClick={() => setSelectedPatient(patient)}
                className="cursor-pointer active:scale-95"
            >
                <PatientCard patient={patient} onSelect={handleSelectPatient} />
            </div>
            ))}
        </aside>
    </div>
  );
}
