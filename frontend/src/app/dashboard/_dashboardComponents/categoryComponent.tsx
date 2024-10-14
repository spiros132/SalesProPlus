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
    return (
        <button 
            key={category.categoryID} 
            className="block bg-white overflow-hidden p-2"
            onClick={() => setCategory(category.categoryID)}
        >
            <div>
                <Image
                    src={category.categoryImage} 
                    alt={category.categoryName}
                    width={1280}
                    height={720}
                    style={{ alignSelf: 'center' }}
                    className="w-full h-auto"
                />
                <span className="mt-2 text-center font-semibold">{category.categoryName}</span>
            </div>
        </button>
    );
}