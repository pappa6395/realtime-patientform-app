"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"


export function ModeToggle() {
  //const { theme, setTheme } = useTheme()
  //const [isHydrated, setIsHydrated] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme()

  // React.useEffect(() => {
  //   setIsHydrated(true)
  // }, []);


  return (
    <>
      <button
        className={`flex flex-col ${
          resolvedTheme === "dark" ? "bg-slate-800" : "bg-slate-50"
        } group items-center justify-center rounded-[24px] w-10 h-10 hover:text-teal-500 duration-300`}
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {resolvedTheme === "dark" ? (
          <Sun className="w-5 h-5 flex-shrink-0" />
        ) : (
          <Moon className="w-5 h-5 flex-shrink-0" />
        )}
      </button>
      {/* {isHydrated && theme === "dark" ? (
      <button 
          className="flex flex-col bg-slate-800
          group items-center justify-center rounded-[24px] 
          w-10 h-10 hover:text-teal-500 duration-300" 
          onClick={() => setTheme("light")}>
          <Sun className="w-5 h-5 flex-shrink-0 " />
        </button>
      ) : (
        <button 
          className="flex flex-col bg-slate-50
          group items-center justify-center rounded-[24px] 
          w-10 h-10 hover:text-teal-500 duration-300"   
          onClick={() => setTheme("dark")}>
        <Moon className="w-5 h-5 flex-shrink-0" />
      </button>
      )} */}
    </>
    
  )
}