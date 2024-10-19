'use client';

import Image from "next/image";

import { Category } from "@/src/lib/definitions";

/**
 * Component for showing a singular category in the view
 * @param category the category that you have selected. 
 * @param handleClick the on click function when clicking on a singular category 
 * @returns a singular category button
 */
export default function CategoryComponent(
    { // Parameters
        category, 
        setCategory
    }: { // Parameter Types
        readonly category: Category, 
        readonly setCategory: (categoryID: string)=>void
    }) {

        const hasParent = category.parent == null ? false : true;
    return (
        <button 
            key={category.categoryID} 
            className={`${hasParent ? 'flex-none w-[25vw]' : 'block h-[25vh]'} bg-white overflow-hidden p-2 relative`}
            onClick={() => setCategory(category.categoryID)}
        >
            <div className={`${hasParent ? '' : 'h-full w-full'}`}>
                <Image
                    src={category.categoryImage} 
                    alt={category.categoryName}
                    width={1280}
                    height={720}
                    className="object-cover w-full h-full rounded-md"
                    style={{ alignSelf: 'center' }}
                />
                {hasParent ? (
                    <span className="mt-2 text-center font-semibold">{category.categoryName}</span>
                    ) : (
                <div className="absolute bg-white bottom-[16%] left-1/2 transform -translate-x-1/2 pl-4 pr-4 pt-3 pb-3 rounded-full text-xs font-semibold">
                    {category.categoryName}
                </div>                        
                    )}
                

            </div>
        </button>
    );
}