'use client';

import { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/skeleton";

import CategoryComponent from "./categoryComponent";
import { Category } from "@/src/lib/definitions";
import { GetCategories, GetCategory } from "@/src/lib/BackendConnection";
import BackButton from "./categoryBackButton";

/**
 * Component for showing multiple categories into the view
 * @param category the parent category, if it exists, for showing subcategories
 * @param handleClick the on click function when clicking on a singular category 
 * @returns multiple categories for the view
 */
export default function CategoriesComponent(
    { // Parameters
        parent, 
        setCategory
    }: { // Parameter Types
        readonly parent: Category | null, 
        readonly setCategory: (category: string)=>void
    }
) {
    const [categories, setCategories] = useState<Category[]>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    function handleGoBack() {
        setCategory(parent?.parent ?? "");
    }

    useEffect(() => {
        GetCategories(parent ? parent.categoryID : null)
        .then((categories) => {
            if(categories != null) {
                setCategories(categories);
                setIsLoaded(true);
            }
        });
    }, [parent]);

    return (
        <Skeleton isLoaded={isLoaded}>
            {parent != null ? BackButton({handleGoBack}) : null}
            <div className={`${parent == null ? 'grid grid-cols-2 gap-4' : 'flex overflow-x-auto space-x-4 scrollbar-hide scroll-smooth p-4'}`}>
                {categories?.map((category: Category) => {
                    return CategoryComponent({category, setCategory});
                })}
                {categories?.map((category: Category) => {
                    return CategoryComponent({category, setCategory});
                })}
                
            </div>
        </Skeleton>
    );
}