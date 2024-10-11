'use client';

import { useEffect, useState } from "react"
import {  useSearchParams } from "next/navigation"
import { Skeleton } from "@nextui-org/skeleton";

import { SearchProducts } from "@/src/lib/BackendConnection";
import { Filters, Product_Short } from "@/src/lib/definitions";
import NoSearchResultComponent from "./_searchComponents/noSearchResult";
import SearchResultList from "./_searchComponents/searchResultList";

/**
 * The search result/page component.
 * @returns row-formatted search results, based on url parameters.
 */
export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchResults, setSearchResults] = useState<Product_Short[]>([])
  //const [filter, setFilter] = useState<Filters>({ category: '', price: 0, stock: 0, dimensions: { depth: 0, width: 0, height: 0 } })
  //const [sort, setSort] = useState('')
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  useEffect(() => {
    if (searchParams?.get('q')) {
      const query = searchParams.get('q') ?? '';
      //const filterParam = searchParams.get('filter') ? JSON.parse(searchParams.get('filter') as string) : {};
      //const sortParam = searchParams.get('sort') || '';
      
      //setFilter(filterParam);
      //setSort(sortParam);
      // Fix so that we can have a certain sort or filters
      SearchProducts(query, new Filters([]))
      .then((results) => {
        // We have gotten our results back
        setIsLoaded(true);
        setSearchResults(results ?? []);
      });
    }
  }, [searchParams]);
  
  return (
    <Skeleton isLoaded={isLoaded}>
      {searchResults.length === 0 ? 
      NoSearchResultComponent() : 
      SearchResultList({products: searchResults})}
    </Skeleton>
  )
}
