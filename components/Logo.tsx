import { siteConfig } from '@/config/site'
import { Hospital } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Logo = ({
    className,
    classLogo
}: {
    className?: string;
    classLogo?: string;
}) => {

  return (

    <div>
        <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
            <Hospital className={`mr-2 flex-shrink-0 ${classLogo}`}/>
            <span className={`font-bold lg:inline-block ${className}`}>
            {siteConfig.name}
            </span>
      </Link>
    </div>

  )
}

export default Logo