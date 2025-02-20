import { EmergencyContact } from "@/components/form/PatientForm"
import { Icons } from "@/ui/icons"

export interface NavItem {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
    icon?: keyof typeof Icons
    label?: string
}

export interface MainNavItem extends NavItem {}

export type GenderOptionProps = {
    label: string;
    id: string;
}

export type PatientData = {
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
  image?: string;
  viewed?: boolean;
  createdAt: Date;
};