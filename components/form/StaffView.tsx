"use client"

import { useEffect, useContext, useState } from "react";
import { socket } from "@/lib/socketClient";
import PatientCard from "../dashboard/PatientCard";
import { PatientData, PatientStatus } from "@/type/types";
import { PatientContext } from "@/context/patientContext";
import Logo from "../Logo";


export default function StaffView() {
  
  const context = useContext(PatientContext);

  if (!context) {
    throw new Error("StaffView must be used within a PatientProvider");
  }

  const { 
    patientData, 
    setPatientData,
    setSelectedPatient,
    patientStatus, 
    setPatientStatus,
    setMobileMenuOpen
  } = context;


  useEffect(() => {
    socket.on("Patient", (data: PatientData) => {
      data.createdAt = new Date(data.createdAt);
      data.viewed = false;
      data.status = "submitted";
      setPatientData((prevPatients) => {
        const updatedPatients = [...prevPatients, data];
        localStorage.setItem("patients", JSON.stringify(updatedPatients));

        return updatedPatients;
      });
    });
    socket.on("updatedFormStatus", ({patientId, status}) => {
      console.log(`recieved ID ${patientId} and status ${status}`);
      let updatedStatus;
      
      setPatientStatus((prevStatus) => {
        const existingIndex = prevStatus.findIndex((p) => p.patientId === patientId);
        if (existingIndex !== -1) {
          updatedStatus = [...prevStatus];
          updatedStatus[existingIndex].status = status;
          
        } else {
          updatedStatus = [...prevStatus, { patientId, status }];
        }
        localStorage.setItem("PatientStatus", JSON.stringify(updatedStatus));
        return updatedStatus;
      });

      setPatientData((prevPatients) => {
        const updatedPatients = prevPatients.map((p) => 
          p.id === patientId ? { ...p, status} : p 
      );
      localStorage.setItem("patients", JSON.stringify(updatedPatients));

        return updatedPatients;
      })
    })

    return () => {
      socket.off("Patient");
      socket.off("updatedFormStatus");
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

  const handleToggleCard = (patient: PatientData) => {
    setSelectedPatient(patient)
    setMobileMenuOpen(false)
  }

  return (
    <div className="max-w-xl h-full bg-gradient-to-b bg-slate-200 
        dark:from-slate-700 dark:to-slate-700">
      <div className="text-xl font-semibold py-3 p-3 mt-1 mx-1">
        <Logo 
          className="text-base"
          classLogo="w-5 h-5"
        />
      </div>
        <aside className="space-y-1.5 h-[800px] overflow-scroll z-50 mx-2 px-2">
        <h2 className="text-xl font-bold mb-4">Patient Info Data Box</h2>
            {patientData.slice().reverse().map((patient, index) => (
            <div
                key={index}
                onClick={() => handleToggleCard(patient)}
                className="cursor-pointer active:scale-95"
            >
                <PatientCard patient={patient} onSelect={handleSelectPatient} />
            </div>
            ))}
            <div>
              <p className="text-sm pl-2 text-slate-700 dark:text-slate-50">
                {patientData?.length || 0} new patient form submissions
              </p>
              {patientStatus.map((p, i) => {
                if (p.status === 'inactive' || p.status === 'submitted') {
                  return (
                    <div key={i}>
                      {""}
                    </div>
                  )
                } else {
                  return (
                    <div key={i}>
                      Patient {p.patientId || ""}: 
                      {p.status === 'active' && <span className="text-green-500">🟢 Active</span>}
                      {p.status === 'filling' && <span className="text-yellow-500"> 🟡 Filling</span>}
                      {p.status === 'idle' && <span className="text-blue-500"> 🔵 idle</span>}
                    </div>
                  )
                }
              })}
            </div>
        </aside>
    </div>
  );
}
