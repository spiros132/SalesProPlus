'use client';

import Link from "next/link"; // Use Next.js's Link component
import { usePathname } from 'next/navigation';

import SearchIcon from "@/src/icons/searchicon";
import ChatIcon from "@/src/icons/chaticon";
import SettingsIcon from "@/src/icons/settingsicon";

/**
 * The bottom nav bar that has buttons for navigating the site
 * @returns a nav bar with buttons for navigation
 */
export default function BottomNavBar() {
    const pathName = usePathname();

    return (
        <nav className="sticky flex bottom-0 left-0 right-0 bg-white text-black, h-[12vh] border-t-3 border-navBorderGray">
            {/* Dashboard */}
            <div className="flex flex-1 h-full items-center justify-center">
                <Link className={`h-[10vh] w-[10vh] rounded-[35%] flex flex-col items-center justify-center text-black hover:bg-activeNavGray
                    transition duration-300 ease-in-out ${pathName === '/dashboard' ? 'bg-activeNavGray' : 'bg-white'} p-5`}  href="/dashboard">
                    <div className="w-full h-full"><SearchIcon></SearchIcon></div>
                    <p className="text-md pb-1 font-semibold text-iconGray">Search</p>
                </Link>
            </div>
            
            {/* Chat */}
            <div className="flex flex-1 h-full items-center justify-center">
                <Link className={`h-[10vh] w-[10vh] rounded-[30%] flex flex-col items-center justify-center text-black hover:bg-activeNavGray
                    transition duration-300 ease-in-out ${pathName === '/dashboard/chat' ? 'bg-activeNavGray' : 'bg-white'} p-5`} href="/dashboard/chat">
                    <div className="w-full h-full"><ChatIcon></ChatIcon></div>
                    <p className="text-md pb-1 font-semibold text-iconGray">Chat</p>
                </Link>
            </div>
            
            {/* Settings */}
            <div className="flex flex-1 h-full items-center justify-center">
                <Link className={`h-[10vh] w-[10vh] aspect-[1/1] rounded-[30%] flex flex-col items-center justify-center text-black hover:bg-activeNavGray
                    transition duration-300 ease-in-out ${pathName === '/dashboard/settings' ? 'bg-activeNavGray' : 'bg-white'} p-5`} href="/dashboard/settings">
                    <div className="w-full h-full"><SettingsIcon></SettingsIcon></div>
                    <p className="text-md pb-1 font-semibold text-iconGray">Settings</p>
                </Link>
            </div>
        </nav>
    );
}
