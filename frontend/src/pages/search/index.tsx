import {  useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Product, filters } from "../../lib/definitions";
import SearchResult from "../../components/searchResult"
import { searchProducts } from "@/src/api/search/search";

    /**
     * The search result/page component.
     * @returns row-formatted search results, based on url parameters.
     */
    export default function SearchPage() {
        const [searchResults, setSearchResults] = useState<Product[]>([])
        const searchParams = useSearchParams()
        const [searchQuery, setSearchQuery] = useState('')
        const [filter, setFilter] = useState<filters>({ category: '', price: 0, stock: 0, dimensions: { length: 0, width: 0, height: 0 } })
        const [sort, setSort] = useState('')
        
        useEffect(() => {
            if (searchParams?.get('q')) {
                setSearchQuery(searchParams.get('q') || '')
                setFilter(searchParams.get('filter') ? JSON.parse(searchParams.get('filter') as string) : {})
                setSort(searchParams.get('sort') || '')
                // Handle filters/sorting
                // API Call 
                // setSearchResults(data)
                setSearchResults(searchProducts(searchQuery, filter, sort))
            } else {
                setSearchResults([])
            }
        }, [searchParams])

    return(
        <div className="space-y-4">
        {searchResults.map((product) => (
            <SearchResult product={product} />
        ))}
        </div>
    )
}
