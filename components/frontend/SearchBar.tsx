"use client"


import { PatientContext } from "@/context/patientContext";
import { Search } from "lucide-react";
import React, { useContext } from "react";

const SearchBar = () => {

  const context = useContext(PatientContext)
  const [query, setQuery] = React.useState("");

  if (!context) {
    throw new Error("SearchBar must be used within a PatientProvider");
  }

  const { patientData, setSelectedPatient } = context;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can add additional logic here if needed
  };

  // Filter patients based on the query (ID or name)
  const filteredPatients = patientData.filter((patient) => {
    const lowerCaseQuery = query.toLowerCase();
    const patientsId = typeof patient.id === 'string' ? patient.id.toLowerCase() : patient?.id || "";
    return (
      patientsId?.includes(lowerCaseQuery) ||
      `${patient?.firstName || ""} ${patient?.lastName || ""}`.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const handleClick = (patientId: string) => {

    const matchPatient = patientData.find((p) => p.id === patientId);
    if (matchPatient) {
      setSelectedPatient(matchPatient);
      setQuery("");
    } else {
      console.log(`Patient id ${patientId} data not found`);
    }
}



  return (
    <div>
      <form className={"max-w-md"} onSubmit={handleSearch}>
          <div className="relative">
            <div className="flex items-center px-2 relative">
              <input
                type="search"
                id="default-search"
                onChange={e => setQuery(e.target.value)}
                value={query}
                className="block text-sm sm:w-[300px] md:w-[330px] h-10 p-4 ps-8 text-gray-900 
                border border-gray-300 rounded-full bg-gray-50 focus:ring-teal-500 
                focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 
                dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-teal-500 
                dark:focus:border-teal-500 placeholder:px-3"
                placeholder="Search Patients, ID..."
                required
              />
              <Search className="absolute inset-x-3
              w-6 h-6 text-gray-500 dark:text-gray-400"/>
              <button
                type="submit"
                className="text-white absolute hidden sm:block translate-x-[110px]
                sm:translate-x-[220px] md:translate-x-[250px]
                bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none 
                focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 
                dark:bg-emerald-700 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Search
              </button>
            </div>
          </div>
      </form>
      {/* Display search results */}
      {query && (
        <div className="absolute top-14 start-20 w-60 bg-white dark:bg-slate-600 rounded-md shadow-lg">
          <h3 className="text-lg font-semibold mb-2 px-3">Search Results</h3>
          <div className="px-3">
            {filteredPatients?.map((patient) => (
              <button 
                key={patient.id}
                onClick={() => handleClick(patient.id)} 
                className="mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg active:scale-95">
                <p className="text-gray-900 dark:text-gray-100">
                  <span className="font-semibold">{patient?.firstName || ""} {patient?.lastName || ""}</span> - ID: {patient?.id || ""}
                </p>
              </button>
            ))}
          </div>
          {filteredPatients.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">No patients found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;