"use client"

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../formInput/TextInput";
import { GenderOptionProps } from "@/type/types";
import RadioInput from "../formInput/RadioInput";
import LanguageSelect from "../formInput/LanguageInput";
import NationalitySelect from "../formInput/NationalityInput";
import Image from "next/image";
import { ArrowBigLeft, ArrowBigRight, Loader, LogOut, Send, XCircle } from "lucide-react";
import { socket } from "@/lib/socketClient";
import { ensureUniquePatientId } from "@/lib/generateID";
import OptionalTextInput from "../formInput/OptionalTextInput";
import { debounce, throttle } from "@/lib/debounce";
import { usePathname, useRouter } from "next/navigation";
import { PatientContext } from "@/context/patientContext";


type FormData = {
  id: string | null;
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
  image: FileList;
  viewed?: boolean;
  createdAt: Date;
  status?: "active" | "filling" | "submitted" | "inactive" | "idle";
};

export type EmergencyContact = {
    name: string;
    relationship: string;
}

export default function PatientForm() {


  const { 
    register, 
    handleSubmit, 
    formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            middleName:'',
            dateOfBirth: '',
            phoneNumber: '',
            email: '',
            streetAddress: '',
            unitNumber: '',
            city: '',
            state: '',
            emergencyContact: {
                name: '',
                relationship: '',
            },
            postalCode: '',
            country: '',
            religion: '',
        }
    });

    const context = useContext(PatientContext);
    
    if (!context) {
    throw new Error("StaffView must be used within a PatientProvider");
    }
    
    const { 
        step,
        setStep
    } = context;

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [patientId, setPatientId] = useState<string | null>(null);
    const [status, setStatus] = useState<any>('inactive');
    const [isLoading, setIsLoading] = useState(false);
    console.log(patientId);
    
    
    const router = useRouter()
    const pathname = usePathname()
    const isHomePage = pathname === '/'

    const genderOptions: GenderOptionProps[] = [
        { id: 'male', label: 'Male' },
        { id: 'female', label: 'Female' },
    ];

    // Language
    const [language, setLanguage] = useState('');
    const [langError, setLangError] = useState(false);
  
  
    // Nationality
    const [selectedNationality, setSelectedNationality] = useState('');
    const [nationalError, setNationalError] = useState(false);
    const handleNationalityChange = (
        demonym: string,
    ) => {
        setSelectedNationality(demonym);
    };

    // Image
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result as string);
        reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data: FormData) => {
        setLangError(false);
        setNationalError(false);
        setIsLoading(true);
        const imageFile = data.image[0] ?? null;
        const reader = new FileReader();
        
        if (!language && !selectedNationality) {
            return setLangError(true), setNationalError(true), setIsLoading(false);
        } else if (!selectedNationality) {
            return setNationalError(true), setIsLoading(false); 
        } else if (!language) {
            return setLangError(true), setIsLoading(false);;
        }
        
        data.preferredLanguage = language;
        data.nationality = selectedNationality;
        data.createdAt = new Date();
        data.id = patientId || "";
        data.status = "submitted";

        localStorage.setItem('isSubmitted', 'true');

        const emitAndNavigate = (imageData: string | null) => {
            socket.emit("Patient", { ...data, image: imageData, sender: data.firstName });
            socket.emit("formStatus", { patientId, status: "submitted" });

            router.push(`/formsubmit?id=${data.id || ""}`);
            setIsLoading(false);
        };

        if (imageFile) {
            reader.onloadend = () => {
                const imageData = reader.result as string;
                emitAndNavigate(imageData);
            };
            reader.readAsDataURL(imageFile);
        } else {
            emitAndNavigate(null);
        }
        
    };

    useEffect(() => {

        const storedId = localStorage.getItem('patientId');
        const data: FormData[] = JSON.parse(localStorage.getItem('patients')?? '[]');
        let finalId = storedId;
    
    
        if (isHomePage) {
            finalId = ensureUniquePatientId(data.map((p) => p.id || ""), 10);
            localStorage.setItem('patientId', finalId);
        } else if (!storedId) {
            finalId = ensureUniquePatientId(data.map((p) => p.id || ""), 10);
            localStorage.setItem('patientId', finalId);
        }
    
        setPatientId(finalId);
            
        setTimeout(() => {
            socket.emit('formStatus', { patientId: finalId, status: 'active' });
            setStatus('active');
        },500)
        
        socket.on('updatedFormStatus', ({ patientId, status }) => {
        console.log(`Patient ${patientId} is ${status}`);
        setStatus(status);
        });
    
        return () => {
            const isSubmitted = localStorage.getItem('isSubmitted');
            if (!isSubmitted) {
                socket.emit('formStatus', { patientId: finalId, status: 'inactive' });
            }
        };
    }, [isHomePage]);
  

    const throttledFilling = throttle((data) => {
        socket.emit("formStatus", data);
    }, 3000);
      
    const debouncedIdle = debounce(() => {
        socket.emit("formStatus", { patientId, status: "idle" });
    }, 2000);
      

    const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        const { name, value } = e.target;
        
        throttledFilling({ patientId, status: "filling", [name]: value});
        debouncedIdle();
    };

    const handleClose = () => {
        router.push('/leaving');
    }


  return (
    <div className="max-w-4xl h-[550px] mx-auto p-5 bg-white dark:bg-emerald-700 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
            Patient Information
        </h2>
      <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
        <div>
            {step === 1 && (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <TextInput
                            register={register}
                            errors={errors}
                            label="First Name"
                            name="firstName"
                        />
                        <TextInput
                            register={register}
                            errors={errors}
                            label="Last Name"
                            name="lastName"
                        />
                        <OptionalTextInput
                            register={register}
                            label="Middle Name"
                            name="middleName"
                            type="text"
                        />
                        <TextInput
                            register={register}
                            errors={errors}
                            label="Date of Birth"
                            name="dateOfBirth"
                            type="date"
                        />
                        <div className="col-span-full gap-6">
                            <RadioInput
                                genderOptions={genderOptions}
                                label="Gender"
                                register={register}
                                name="gender"
                                errors={errors}
                            />
                        </div>
                        <TextInput
                            register={register}
                            errors={errors}
                            label="Phone Number"
                            name="phoneNumber"
                            type="tel"
                        />
                        <TextInput
                            register={register}
                            errors={errors}
                            label="Email"
                            name="email"
                            type="email"
                        />
                    </div>
                    <div className="flex items-center justify-between mx-3 px-3 mt-12 pt-6">
                        <button
                            type="button"
                            onClick={handleClose} 
                            className="bg-blue-500 text-white shadow-md
                            px-4 py-2 mt-2 rounded flex items-center gap-2 active:scale-95">
                            <LogOut className="size-5 rotate-180"/>    
                            <span>Leave</span>
                        </button>
                        <button 
                            type="button" 
                            className="bg-blue-500 text-white shadow-md
                            px-4 py-2 mt-2 flex items-center rounded gap-2 active:scale-95"
                            onClick={() => setStep(currStep => currStep + 1)}
                        >   
                            <span>Next</span>
                            <ArrowBigRight className="size-6"/> 
                        </button>
                    </div>
                </div>
            )}
            
            {step === 2 && (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className="block col-span-full text-base 
                            font-semibold text-gray-900 dark:text-slate-50 pt-2"
                            >
                                Address
                        </label>
                        <TextInput
                            register={register}
                            errors={errors}
                            label="Unit / Aparment No."
                            name="unitNumber"
                        />
                        <TextInput
                            register={register}
                            errors={errors}
                            label="Street Address"
                            name="streetAddress"
                        />
                        <TextInput
                            register={register}
                            errors={errors}
                            label="City"
                            name="city"
                        />
                        <TextInput
                            register={register}
                            errors={errors}
                            label="State"
                            name="state"
                        />
                        <TextInput
                            register={register}
                            errors={errors}
                            label="Country"
                            name="country"
                        />
                        <TextInput
                            register={register}
                            errors={errors}
                            label="Postal Code"
                            name="postalCode"
                        />
                    </div>
                    <div className="flex items-center justify-between mx-3 px-3 mt-14 pt-14">
                        <button
                            type="button"
                            onClick={() => setStep(currStep => currStep - 1)} 
                            className="bg-blue-500 text-white shadow-md
                            px-4 py-2 mt-2 rounded flex items-center gap-3 active:scale-95">
                            <ArrowBigLeft className="size-6"/>    
                            <span>Prev</span>
                        </button>
                        <button 
                            type="button" 
                            className="bg-blue-500 text-white shadow-md
                            px-4 py-2 mt-2 flex items-center rounded gap-2 active:scale-95"
                            onClick={() => setStep(currStep => currStep + 1)}
                        >   
                            <span>Next</span>
                            <ArrowBigRight className="size-6"/> 
                        </button>
                    </div>
                </div>
                
            )}
            
            {step === 3 && (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block col-span-full text-base 
                            font-semibold text-gray-900 dark:text-slate-50 pt-2"
                            >
                                Preferred Language
                            </label>
                                <LanguageSelect 
                                    value={language} 
                                    onChange={setLanguage}
                                    className="" 
                                />
                            {langError && (
                                <p className="text-red-500 dark:text-red-300 
                                font-semibold text-xs mt-1">
                                Language is required
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block col-span-full text-base 
                            font-semibold text-gray-900 dark:text-slate-50 pt-2"
                            >
                                Nationality
                            </label>
                            <NationalitySelect 
                                value={selectedNationality} 
                                onChange={handleNationalityChange}
                                className="" 
                            />
                            {nationalError && (
                                <p className="text-red-500 dark:text-red-300 
                                font-semibold text-xs mt-1">
                                Nationality is required
                                </p>
                            )}
                        </div>
                        <label className="block col-span-full text-base 
                        font-semibold text-gray-900 dark:text-slate-50 pt-2"
                        >
                            Addional Information
                        </label>
                        <OptionalTextInput
                            register={register}
                            label="Emergency Contact: Name"
                            name="emergencyContact.name"
                        />
                        <OptionalTextInput
                            register={register}
                            label="Relationship"
                            name="emergencyContact.relationship"
                        />
                        <OptionalTextInput
                            register={register}
                            label="Religion"
                            name="religion"
                            type="text"
                        />
                    </div>
                    <input 
                            type="file" 
                            accept="image/*" 
                            {...register("image")} 
                            onChange={handleImageChange} 
                            className="border dark:file:bg-emerald-800  p-2 w-full mb-2 mt-4" 
                        />
                        {   previewImage &&
                            <div className="relative ">
                                <Image 
                                src={previewImage}
                                alt="Preview"
                                width={350}
                                height={350} 
                                className="w-24 h-24 object-cover mt-2" 
                                />
                                <button className="absolute top-0 " onClick={() => setPreviewImage(null)}>
                                    <XCircle className="w-4 h-4 text-black"/>
                                </button>
                            </div> 
                        }
                    <div className="flex justify-between mt-4 mx-2">
                        <button
                            type="button"
                            onClick={() => setStep(currStep => currStep - 1)} 
                            className="bg-blue-500 text-white shadow-md
                            px-4 py-2 mt-2 rounded flex items-center gap-3 active:scale-95">
                            <ArrowBigLeft className="size-6"/>    
                            <span>Prev</span>
                        </button>
                        { isLoading ? (
                            <button 
                            type="submit"
                            disabled 
                            className="bg-blue-500 text-white shadow-md
                            px-4 py-2 mt-2 rounded flex gap-2 active:scale-95"
                            >
                                <Loader className="animate-spin mr-2" />
                                Sending...
                            </button>
                        ) : (
                            <button 
                                type="submit" 
                                className="bg-blue-500 text-white shadow-md
                                px-4 py-2 mt-2 rounded flex gap-2 active:scale-95"
                            >
                                <Send />
                                Submit
                            </button>
                        )}
                    </div>
                </div>
                
            )}
        </div>
      </form>
    </div>
  );
}
