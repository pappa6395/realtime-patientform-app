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

export const footerNavs = [
  {
      label: "Company",
      items: [
          {
              href: '#',
              name: 'List of services'
          },
          {
              href: '#',
              name: 'Blog'
          },
          {
              href: '#',
              name: 'Team'
          },
          {
              href: '#',
              name: 'Careers'
          },
      ],
  },
  {
      label: "Resources",
      items: [
          {
              href: '#',
              name: 'contact'
          },
          {
              href: '#',
              name: 'Support'
          },
          {
              href: '#',
              name: 'Docs'
          },
          {
              href: '#',
              name: 'Pricing'
          },
      ],
  },
  {
      label: "About",
      items: [
          {
              href: '#',
              name: 'Terms'
          },
          {
              href: '#',
              name: 'License'
          },
          {
              href: '#',
              name: 'Privacy'
          },
          {
              href: '#',
              name: 'About us'
          },
      ]
  }
]

