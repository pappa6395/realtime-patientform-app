"use client"

import Link from 'next/link';
import React from 'react'
import { FaLinkedinIn, FaFacebookF, FaYoutube, FaInstagram, FaHeart } from "react-icons/fa";

export default function Footer() {

    const footerNavs = [
        {
            label: "Company",
            items: [
                {
                    href: '#',
                    name: 'List of your services'
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

    const socialLinks = [
        {
            title: "Linkedin",
            href: "#",
            icon: <FaLinkedinIn />,
            color: "text-blue-600"
        },
        {
            title: "Facebook",
            href: "#",
            icon: <FaFacebookF />,
            color: "text-blue-500"
        },
        {
            title: "Youtube",
            href: "#",
            icon: <FaYoutube />,
            color: "text-red-600"
        },
        {
            title: "Instagram",
            href: "#",
            icon: <FaInstagram />,
            color: "text-pink-600"
        },
    ]

    return (
        <footer className="text-gray-500 bg-slate-100 dark:bg-emerald-800
        px-4 py-5 max-w-screen mx-auto md:px-8 mb-0 mt-auto">
            <div className="justify-between md:flex">
                <div className="flex-1">
                    <div className="max-w-xs">
                        <div className='flex items-center gap-2'>
                            <p className='font-bold dark:text-slate-100'>MediCare-Realtime-Form</p>
                        </div>
                        <p className="leading-relaxed mt-2 text-[15px] dark:text-slate-400">
                            Our mission is to help people find the best doctors in their area.
                        </p>
                    </div>
                    <div className="pt-6 sm:mt-0">
                        <ul className="flex items-center space-x-4">
                            {socialLinks.map((item, i) => {
                                return (
                                    <li key={i} className="w-10 h-10 border rounded-full 
                                    flex items-center justify-center dark:bg-slate-800">
                                        <Link href={item.href}>
                                            <span className={`w-10 h-10 ${item.color}`}>
                                                {item.icon}
                                            </span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="flex-1 mr-4 mt-10 space-y-6 items-center justify-between sm:flex md:space-y-0 md:mt-0">
                    {
                        footerNavs.map((item, idx) => (
                            <ul
                                className="space-y-4"
                                key={idx}
                            >
                                <h4 className="text-gray-800 dark:text-slate-50 font-medium">
                                    { item.label }
                                </h4>
                                {
                                    item.items.map(((el, idx) => (
                                        <li key={idx}>
                                            <a 
                                                href={el.href}
                                                className="hover:underline hover:text-blue-500
                                                dark:text-slate-400"
                                            
                                            >
                                                { el.name }
                                            </a>
                                        </li>
                                    )))
                                }
                            </ul>
                        ))
                    }
                </div>
            </div>
            <div className="mt-8 py-2 border-t items-center justify-center sm:flex">
                <div className="mt-4 sm:mt-0 dark:text-slate-300">
                    &copy; {(new Date).getFullYear()} Created with 
                    {' '}<FaHeart className='inline text-pink-500'/> by Pap Nontachai.
                </div>
            </div>
        </footer>
    )
}