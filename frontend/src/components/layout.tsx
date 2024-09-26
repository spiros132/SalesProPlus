import { useState } from 'react'
import Link from 'next/link'
import { Home, MessageCircle, Settings, Search } from 'lucide-react'

export default function Layout({children}) {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0  bg-white p-4">
                <form onSubmit={handleSearch} className="flex items-center">
                    <input
                    type="search"
                    placeholder="Search.."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className=" p-2 border border-gray-300"
                    />
                    <button type="submit" className="p-2 bg-blue-500 text-white ">
                        <Search className="h-5 w-5" />
                        <span className="sr-only">Search</span>
                    </button>
                </form>
            </header>
    
            <main className="flex-grow p-4">
            {children}
            </main>
    
            <nav className="sticky bottom-0 z-10 bg-white shadow-md">
                <div className="flex justify-around p-2">
                    <Link href="/" className="p-2 text-gray-600 ">
                        <Home className="h-6 w-6 mx-auto" />
                        <span className="sr-only">Dashboard</span>
                    </Link>
                    <Link href="/chat" className="p-2 text-gray-600 ">
                        <MessageCircle className="h-6 w-6 mx-auto" />
                        <span className="sr-only">Chat</span>
                    </Link>
                    <Link href="/settings" className="p-2 text-gray-600 ">
                        <Settings className="h-6 w-6 mx-auto" />
                        <span className="sr-only">Settings</span>
                    </Link>
                </div>
            </nav>
        </div>
    )





}