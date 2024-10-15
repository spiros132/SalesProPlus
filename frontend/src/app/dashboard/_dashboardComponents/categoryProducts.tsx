'use client';

import { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/skeleton";

import { SearchProducts } from "@/src/lib/BackendConnection";
import { Category, Filters, Filter, Product_Short } from "@/src/lib/definitions";
import CategoryProduct from "./categoryProduct";


/**
 * Component for showing products when selecting a category.
 * @param category the category that you have selected. 
 * @returns a grid with all the products in the selected category 
 */
export default function CategoryProducts({
    category
} : {
    readonly category: Category | null
}) {
    const [products, setProducts] = useState<Product_Short[]>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        const filters: Filter[] = [];
        
        if(category != null)
            filters.push({name: "category", value: category.categoryID});
        
        SearchProducts("", new Filters(filters))
        .then((products) => {
            if(products != null) {
                setProducts(products);
                setIsLoaded(true);
            }
        });
    }, [category]);

    return (
        <Skeleton isLoaded={isLoaded}>
            <div className="">
                {category && products?.map((product) => {
                    return CategoryProduct({product});
                })}
            </div>
        </Skeleton>
    );
}