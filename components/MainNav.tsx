"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Hospital } from "lucide-react"
import { docsConfig } from "@/config/docs"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <Hospital className="w-4 h-4 mr-2 flex-shrink-0"/>
        <span className="font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="hidden sm:flex items-center ml-2 gap-4 text-sm xl:gap-6">
        {
          docsConfig.mainNav.map((item,i) => {
            return (
              <Link
                key={i}
                href={`${item.href}`}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href ? "text-foreground" : "text-foreground/80"
                )}
              >
                <span className="line-clamp-2">{item.title}</span>
              </Link>
            )
          })
        }
      </nav>
    </div>
  )
}