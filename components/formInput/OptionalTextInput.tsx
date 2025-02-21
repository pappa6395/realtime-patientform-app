
import { cn } from "@/lib/utils";
import React from "react";

type TextInputProps = {
  register: any;
  label: string;
  type?: string;
  name: string;
  className?: string;
  placeholder?: string;
};
export default function OptionalTextInput({
  register,
  label,
  type = "text",
  className,
  name,
  placeholder,
}: TextInputProps) {

return (
 <div>
   <div className={cn("flex space-x-2 items-center", className)}>
     <label
       htmlFor={name}
       className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50"
     >
       {label}
     </label>
   </div>
   <div className="mt-2">
     <div className="relative rounded-md ">
       <input
         id={name}
         type={type}
         {...register(`${name}`)}
         className="block w-full rounded-md border-0 text-gray-900 shadow-sm 
         ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
         focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-sm"
         placeholder={placeholder || label}
       />
     </div>
   </div>
 </div>
);
}