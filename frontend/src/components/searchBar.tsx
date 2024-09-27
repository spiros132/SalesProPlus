import { Filter, Search } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/router"

/**
 * The search header component.
 * @returns a header bar with search that redirects to search page, and a filter button.
 */
export default function SearchBar() {
    /**
     * Current value of the search bar.
     */
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState('')
    const [sort, setSort] = useState('')
    const router = useRouter()

    /**
     * Handling of the search. 
     * @param e the event that triggered.
     */
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if(searchQuery.length > 0) {
            router.push(`/search/?q=${searchQuery}&?filter=${filter}&?sort=${sort}`)
        }
    }

    return (
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
                <Filter className="h-full w-auto p-2 border-l-2" />
            </form>
        </header>
    )
}