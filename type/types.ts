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