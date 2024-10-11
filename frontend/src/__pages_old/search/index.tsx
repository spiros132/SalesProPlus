import {  useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Product, Filters, Product_Short } from "../../lib/definitions";
import SearchResult from "../../app/dashboard/search/_searchComponents/searchResult"
import { searchProducts } from "@/src/api/search/search";

    /**
     * The search result/page component.
     * @returns row-formatted search results, based on url parameters.
     */
    export default function SearchPage() {
        const [searchResults, setSearchResults] = useState<Product_Short[]>([])
        const searchParams = useSearchParams()
        const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '')
        //const [filter, setFilter] = useState<Filters>({ category: '', price: 0, stock: 0, dimensions: { depth: 0, width: 0, height: 0 } })
        const [sort, setSort] = useState('')
        
        useEffect(() => {
            const fetchData = async () => {
              if (searchParams && searchParams.get('q')) {
                const query = searchParams.get('q') || '';
                const filterParam = searchParams.get('filter') ? JSON.parse(searchParams.get('filter') as string) : {};
                const sortParam = searchParams.get('sort') || '';
                setSearchQuery(query);
                //setFilter(filterParam);
                setSort(sortParam);
                const results = await searchProducts(query, filterParam, sortParam);
                setSearchResults(results);
              } else {
                setSearchResults([]);
              }
            };
            fetchData();
          }, [searchParams]);

    return (
      <>
        {searchResults.length === 0 ? (
          <div className="text-center">
              <h2 className="text-2xl font-semibold">No results found</h2>
              <p className="text-gray-500">Try searching for something else</p>
          </div>  
        ) : (
          <div className="space-y-4">
              {searchResults.map((product) => (
                  <SearchResult key={product.articleID} product={product} />
              ))}
          </div>
        )}
      </>
    )
}
