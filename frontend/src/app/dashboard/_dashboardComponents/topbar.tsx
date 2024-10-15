'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchIcon from "@/src/icons/searchicon";


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
    const [isFocused, setIsFocused] = useState(false);

    /**
     * Handling of the search. 
     * @param e the event that triggered.
     */
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if(searchQuery.length > 0) {
            router.push(`/dashboard/search/?q=${searchQuery}&?filter=${filter}&?sort=${sort}`)
        }
    }

    return (
        <header className=" sticky top-0 z-10  bg-white p-4 border-b-2 flex justify-center">
            <form onSubmit={handleSearch} className="flex items-center w-[80%]">
                <div className="flex-grow bg-gray-100 flex items-center rounded-2xl overflow-hidden p-1">
                    {(!isFocused && searchQuery.length == 0) && (
                    <div className="h-7 w-7 ml-2">
                        <SearchIcon></SearchIcon>
                    </div>
                    )}
                    <input
                        type="search"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="flex-grow p-2 bg-gray-100 focus:outline-none "
                    />
                    {(isFocused || searchQuery.length > 0) && (
                    <button type="submit" className="p-2 bg-gray-100 text-black ">
                        <div className="h-7 w-7">
                            <SearchIcon></SearchIcon>
                        </div>
                        <span className="sr-only">Search</span>
                    </button>
                    )}
                </div>
            </form>
        </header>
    )
}