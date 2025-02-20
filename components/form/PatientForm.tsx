"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../formInput/TextInput";
import { GenderOptionProps } from "@/type/types";
import RadioInput from "../formInput/RadioInput";
import LanguageSelect, { Language } from "../formInput/LanguageInput";
import NationalitySelect from "../formInput/NationalityInput";
import Image from "next/image";
import { Send, XCircle } from "lucide-react";
import { socket } from "@/lib/socketClient";
import { generateID } from "@/lib/generateID";


type FormData = {
  id: number;
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
            dateOfBirth: '',
            gender: '',
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

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const genderOptions: GenderOptionProps[] = [
    { id: 'male', label: 'Male' },
    { id: 'female', label: 'Female' },
    
  ];

  // Language
  const [language, setLanguage] = useState('en');
  
  // Nationality
  const [selectedNationality, setSelectedNationality] = useState('');
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
    const imageFile = data.image[0] ?? null;
    const reader = new FileReader();
    data.preferredLanguage = language;
    data.nationality = selectedNationality;
    data.createdAt = new Date();
    data.id = Number(generateID());
    
    if (imageFile) {
        reader.onloadend = () => {
            const imageData = reader.result as string;
            socket.emit("Patient", { ...data, image: imageData, sender: data.firstName });
          };
          reader.readAsDataURL(imageFile);
    } else {
        socket.emit("Patient", { ...data, image: null, sender: data.firstName });
    }
    
  };

  return (
    <div className="max-w-2xl mx-auto p-5 bg-white dark:bg-emerald-700 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Patient Information
    </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
            <TextInput
                register={register}
                errors={errors}
                label="Middle Name"
                name="middleName"
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
                <div>
                    <label className="block col-span-full text-base 
                    font-semibold text-gray-900 dark:text-slate-50 pt-2"
                    >
                        Preferred Language
                    </label>
                        <LanguageSelect 
                            value={language} 
                            onChange={setLanguage}
                            className="w-full" 
                        />
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
                        className="w-full" 
                    />
                </div>
                <label className="block col-span-full text-base 
                font-semibold text-gray-900 dark:text-slate-50 pt-2"
                >
                    Emergency Contact
                </label>
                <TextInput
                    register={register}
                    errors={errors}
                    label="Name"
                    name="emergencyContact.name"
                />
                <TextInput
                    register={register}
                    errors={errors}
                    label="Relationship"
                    name="emergencyContact.relationship"
                />
                <TextInput
                    register={register}
                    errors={errors}
                    label="Religion (Optional)"
                    name="religion"
                    className="mt-2"
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
        <div className="grid justify-center mt-4">
            <button 
                type="submit" 
                className="bg-blue-500 text-white shadow-md
                px-4 py-2 mt-2 rounded flex gap-2 active:scale-95"
            >
                <Send />
                Submit
            </button>
        </div>
      </form>
    </div>
  );
}
