import { MainNavItem } from "@/type/types"

export interface DocsConfig {
  mainNav: MainNavItem[]
  
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Find Doctors",
      href: "#",
    },
    {
      title: "Telehealth Visit",
      href: "#",
    },
    {
      title: "In-Person Visit",
      href: "#",
    },
    {
      title: "Be Service Provider",
      href: "#",
    },
  ]
}