"use client"

import { createContext, useState, ReactNode } from "react";
import { PatientData, PatientStatus } from "@/type/types";

interface PatientContextType {
  patientData: PatientData[];
  setPatientData: React.Dispatch<React.SetStateAction<PatientData[]>>;
  selectedPatient: PatientData | null;
  setSelectedPatient: React.Dispatch<React.SetStateAction<PatientData | null>>;
  patientId: string;
  setPatientId: React.Dispatch<React.SetStateAction<string>>;
  patientStatus: PatientStatus[];
  setPatientStatus: React.Dispatch<React.SetStateAction<PatientStatus[]>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export const PatientContext = createContext<PatientContextType | null>(null);

export function PatientProvider({ children }: { children: ReactNode }) {
  const [patientData, setPatientData] = useState<PatientData[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);
  const [patientId, setPatientId] = useState<string>("");
  const [patientStatus, setPatientStatus] = useState<PatientStatus[]>([]);
  const [step, setStep] = useState<number>(1);

  return (
    <PatientContext.Provider value={{ 
      patientData, 
      setPatientData, 
      selectedPatient, 
      setSelectedPatient,
      patientId, 
      setPatientId,
      patientStatus, 
      setPatientStatus,
      step, 
      setStep 
    }}>
      {children}
    </PatientContext.Provider>
  );
}
