import { useState } from 'react'
import Link from 'next/link'
import { Home, MessageCircle, Settings, Search } from 'lucide-react'


/**
 * The layout for the entire application. 
 * @param children the children to be displayed inside the layout. 
 * @returns  a layout consisting of a top search bar, a bottom nav bar and the children between them.
 */
export default function Layout({children}) {
    /**
     * Current value of the search bar.
     */
    const [searchQuery, setSearchQuery] = useState('')

    /**
     * Handling of the search. 
     * @param e the event that triggered.
     */
    const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if(searchQuery.length > 0) {
        // Redirect to search page???? 
    }

    return (
    <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 bg-white p-4 border-b-2">
            <form onSubmit={handleSearch} className="flex items-center border border-gray-300 focus:ring-2 focus:ring-blue-500">
                <button type="submit" className="p-2 bg-white text-black ">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                </button>
                <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow p-2 focus:outline-none "
                />
                
            </form>
        </header>

        <main className="flex-grow p-4">
            {children}
        </main>

        <nav className="sticky bottom-0 z-10 bg-white border-t-2" >
            <div className="flex justify-around ">
                <Link href="/" className="border-r-2 h-full w-1/3 p-2 text-gray-600 hover:bg-gray-100 focus:bg-gray-200">
                    <Home className="h-6 w-6 mx-auto" />
                    <span className="sr-only">Dashboard</span>
                </Link>
                <Link href="/chat" className="border-r-2 h-full w-1/3 p-2 text-gray-600 hover:bg-gray-100 focus:bg-gray-200">
                    <MessageCircle className="h-6 w-6 mx-auto" />
                    <span className="sr-only">Chat</span>
                </Link>
                <Link href="/settings" className="h-full w-1/3 p-2 text-gray-600  hover:bg-gray-100 focus:bg-gray-200">
                    <Settings className="h-6 w-6 mx-auto" />
                    <span className="sr-only">Settings</span>
                </Link>
            </div>
        </nav>
    </div>
    )





}