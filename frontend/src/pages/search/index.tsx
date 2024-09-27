import Link from "next/link"
import {  useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Product } from "../../lib/definitions";
import SearchResult from "../../components/searchResult"
import { products } from "@/src/lib/fakeDB";

    /**
     * The search result/page component.
     * @returns row-formatted search results, based on url parameters.
     */
    export default function SearchPage() {
        const [searchResults, setSearchResults] = useState<Product[]>([])
        const searchParams = useSearchParams()
        const [searchQuery, setSearchQuery] = useState('')
        const [filter, setFilter] = useState('')
        const [sort, setSort] = useState('')
        
        useEffect(() => {
            if (searchParams?.get('q')) {
                setSearchQuery(searchParams.get('q') || '')
                setFilter(searchParams.get('filter') || '')
                setSort(searchParams.get('sort') || '')
                // Handle filters/sorting
                // API Call 
                // setSearchResults(data)

                // Temporary, should be done before this.
                const filteredProducts = products.filter(product => 
                    product.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setSearchResults(filteredProducts.length > 0 ? filteredProducts : products);
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
