"use client"


import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const SearchBar = () => {

  const [query, setQuery] = React.useState("");
  const router = useRouter()

  function handleSearch (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/search?query=${query}`)
    setQuery("")
    
  }

  return (
    <div>
      <form className={"max-w-md"} onSubmit={handleSearch}>
          <div className="relative">
            <div className="flex items-center px-2">
              <input
                type="search"
                id="default-search"
                onChange={e => setQuery(e.target.value)}
                value={query}
                className="block text-sm sm:w-[300px] md:w-[330px] h-10 p-4 ps-8 text-gray-900 
                border border-gray-300 rounded-full bg-gray-50 focus:ring-teal-500 
                focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 
                dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-teal-500 
                dark:focus:border-teal-500 placeholder:px-3"
                placeholder="Search doctors, services..."
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
    </div>
  );
};

export default SearchBar;