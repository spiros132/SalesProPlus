"use client";

import React from "react";
import Link from "next/link"; // Use Next.js's Link component
import { useRouter, usePathname } from 'next/navigation';

function BottomNavBar() {

    /** Flytta ut dessa sen */
    const router = useRouter();
    const pathName = usePathname();
    /**----------------------------- */

    return (
        <nav className="fixed flex bottom-0 left-0 right-0 bg-white text-black, h-[12vh] border-t-4 border-navBorderGray">
            <div className="flex flex-1 h-full items-center justify-center">
                <Link className={`h-[80%] aspect-[1/1] rounded-[30%] flex flex-col items-center justify-center text-black hover:bg-activeNavGray
                    transition duration-300 ease-in-out ${pathName === '/' ? 'bg-activeNavGray' : 'bg-white'}`}  href="/">
                    <div>icon</div>
                    <p>Browse</p>
                </Link>                    
                 
            </div>
            <div className="flex flex-1 h-full items-center justify-center">
                <Link className={`h-[80%] aspect-[1/1] rounded-[30%] flex flex-col items-center justify-center text-black hover:bg-activeNavGray
                    transition duration-300 ease-in-out ${pathName === '/' ? 'bg-white' : 'bg-gray-300'}`} href="/">
                    <div>icon</div>
                    <p>Chat</p>
                </Link>  
            </div>
            <div className="flex flex-1 h-full items-center justify-center">
                <Link className={`h-[80%] aspect-[1/1] rounded-[30%] flex flex-col items-center justify-center text-black hover:bg-activeNavGray
                    transition duration-300 ease-in-out ${pathName === '/' ? 'bg-white' : 'bg-gray-300'}`} href="/">
                    <div>icon</div>
                    <p>Settings</p>
                </Link>
            </div>
        </nav>
    );
}

export default BottomNavBar;
