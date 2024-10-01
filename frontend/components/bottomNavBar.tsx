"use client";

import React from "react";
import Link from "next/link"; // Use Next.js's Link component
import { useRouter, usePathname } from 'next/navigation';
import SearchIcon from "../icons/searchicon";
import ChatIcon from "../icons/chaticon";
import SettingsIcon from "../icons/settingsicon";




function BottomNavBar() {

    /** Flytta ut dessa sen */
    const router = useRouter();
    const pathName = usePathname();
    /**----------------------------- */

    return (
        <nav className="fixed flex bottom-0 left-0 right-0 bg-white text-black, h-[12vh] border-t-3 border-navBorderGray">
            <div className="flex flex-1 h-full items-center justify-center">
                <Link className={`h-[10vh] w-[10vh] rounded-[35%] flex flex-col items-center justify-center text-black hover:bg-activeNavGray
                    transition duration-300 ease-in-out ${pathName === '/' ? 'bg-activeNavGray' : 'bg-white'} p-5`}  href="/">
                    <div className="w-full h-full"><SearchIcon></SearchIcon></div>
                    <p className="text-md pb-1 font-semibold text-iconGray">Browse</p>
                </Link>                    
                 
            </div>
            <div className="flex flex-1 h-full items-center justify-center">
                <Link className={`h-[10vh] w-[10vh] rounded-[30%] flex flex-col items-center justify-center text-black hover:bg-activeNavGray
                    transition duration-300 ease-in-out ${pathName === '/' ? 'bg-white' : 'bg-gray-300'} p-5`} href="/">
                    <div className="w-full h-full"><ChatIcon></ChatIcon></div>
                    <p className="text-md pb-1 font-semibold text-iconGray">Chat</p>
                </Link>  
            </div>
            <div className="flex flex-1 h-full items-center justify-center">
                <Link className={`h-[10vh] w-[10vh] aspect-[1/1] rounded-[30%] flex flex-col items-center justify-center text-black hover:bg-activeNavGray
                    transition duration-300 ease-in-out ${pathName === '/' ? 'bg-white' : 'bg-gray-300'} p-5`} href="/">
                    <div className="w-full h-full"><SettingsIcon></SettingsIcon></div>
                    <p className="text-md pb-1 font-semibold text-iconGray">Settings</p>
                </Link>
            </div>
        </nav>
    );
}

export default BottomNavBar;
