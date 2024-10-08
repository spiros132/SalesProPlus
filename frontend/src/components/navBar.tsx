import { Home, MessageCircle, Settings } from "lucide-react";
import Link from "next/link";

/**
 * The bottom navbar.
 * @returns the bottom navbar with links to pages on the site.
 */
export default function NavBar() {
    return(
    <nav className="sticky bottom-0 z-10 bg-white border-t-2" >
            <div className="flex justify-around ">
                <Link href="/" className="flex flex-col items-center  border-r-2 h-full w-1/3 p-2 text-gray-600 hover:bg-gray-100 focus:bg-gray-200">
                    <Home className="h-6 w-6 mx-auto" />
                    <span className="font-semibold">Dashboard</span>
                </Link>
                <Link href="/chat" className="flex flex-col items-center border-r-2 h-full w-1/3 p-2 text-gray-600 hover:bg-gray-100 focus:bg-gray-200">
                    <MessageCircle className="h-6 w-6 mx-auto" />
                    <span className="font-semibold">Chat</span>
                </Link>
                <Link href="/settings" className="flex flex-col items-center  h-full w-1/3 p-2 text-gray-600  hover:bg-gray-100 focus:bg-gray-200">
                    <Settings className="h-6 w-6 mx-auto" />
                    <span className="font-semibold">Settings</span>
                </Link>
            </div>
        </nav>
    )
}