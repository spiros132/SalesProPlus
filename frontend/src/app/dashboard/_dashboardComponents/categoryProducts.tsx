'use client';

import { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/skeleton";

import { SearchProducts } from "@/src/lib/BackendConnection";
import { Category, Filters, Filter, Product_Short } from "@/src/lib/definitions";
import SearchResult from "../search/_searchComponents/searchResult";


/**
 * Component for showing products when selecting a category.
 * @param category the category that you have selected. 
 * @returns a grid with all the products in the selected category 
 */
export default function CategoryProducts({
    category,
    filters,
    filterUpdate
} : {
    readonly category: Category | null,
    readonly filters: Filters,
    readonly filterUpdate: boolean
}) {
    const [products, setProducts] = useState<Product_Short[]>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        setIsLoaded(false);
        if(category != null) {
            filters.add({name: "category", value: category.categoryID})
        } else {
            filters.remove("category");
        }
        
        SearchProducts("", filters)
        .then((products) => {
            if(products != null) {
                setProducts(products);
                setIsLoaded(true);
            }
        });
    }, [category, filterUpdate]);

    return (
        <Skeleton isLoaded={isLoaded}>
            <div className="">
                {category && products?.map((product) => {
                    return SearchResult({product});
                })}
            </div>
        </Skeleton>
    );
}