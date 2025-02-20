"use client"

import { createContext, useState, ReactNode } from "react";
import { PatientData } from "@/type/types";

interface PatientContextType {
  patientData: PatientData[];
  setPatientData: React.Dispatch<React.SetStateAction<PatientData[]>>;
  selectedPatient: PatientData | null;
  setSelectedPatient: React.Dispatch<React.SetStateAction<PatientData | null>>;
}

export const PatientContext = createContext<PatientContextType | null>(null);

export function PatientProvider({ children }: { children: ReactNode }) {
  const [patientData, setPatientData] = useState<PatientData[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);

  return (
    <PatientContext.Provider value={{ patientData, setPatientData, selectedPatient, setSelectedPatient }}>
      {children}
    </PatientContext.Provider>
  );
}
