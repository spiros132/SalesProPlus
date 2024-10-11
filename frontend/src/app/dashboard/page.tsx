'use client';

import { ChevronLeft} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { products } from '../../lib/fakeDB'
import { categories } from '../../lib/fakeDB'
import { Category } from '@/src/lib/definitions'
import CategoryProduct from '@/src/app/dashboard/_dashboardComponents/categoryProduct'
// replace with api

/**
 * The component for the start/category page.
 * @returns a grid of categories fetched from the database, or a carousel of subcategories along with a grid of products.
 */
export default function Startpage() {

    const [selectedCategory, setSelectedCategory] = useState<{ id: number; name: string; image: string; products: number[] | null; parent: number } | null>(null)
    const [carouselIndex, setCarouselIndex] = useState(0)
  
  
    /**
     * Transforms the id given by the click into the object, and then sets it.
     * @param category the category the user clicked on.
     */
    const handleCategoryClick = (category_id: number) => {
      let category = categories[category_id-1];
      setSelectedCategory(category)
      setCarouselIndex(0)
    }

    const filteredCategories = selectedCategory ? categories.filter(category => {
      // Check if the selected category has sub-categories
      const hasSubCategories = categories.some(subCategory => subCategory.parent === selectedCategory.id);
    
      if (hasSubCategories) {
        // Show sub-categories of the selected category
        return category.parent === selectedCategory.id;
      } else {
        // Show categories with the same parent as the selected category
        return category.parent === selectedCategory.parent;
      }
    }) : [];

    /**
     * This handles the creation of the grid object and it's content.
     * @param items the categories shown in the grid.
     * @returns a grid of categories.
     */
    const renderGrid = (items: { id: number; name: string; image: string; products: number[] | null; parent: number }[]) => (
      <div className="grid grid-cols-2 gap-4">
      {items.map((item: Category) => (
        <button 
            key={item.id} 
            className="block bg-white overflow-hidden p-2"
            onClick={() => handleCategoryClick(item.id)}
        >
          <div>
            <Image
                src={item.image}
                alt={item.name}
                width={1280}
                height={720}
                style={{ alignSelf: 'center' }}
                className="w-full h-auto"
            />
            <span className="mt-2 text-center font-semibold">{item.name}</span>
          </div>
        </button>
      ))}
    </div>
    )

    /**
     * This handles the creation of the carousel object and it's content.
     * @returns a carousel of categories.
     */
    const renderCarousel = () => {
      const handleDragStart = (e: { preventDefault: () => void }) => {
        // Do we want to do something here?
      };

      return (
      <div className="relative mt-4 border-b-2 border-t-2">
        <div className="flex overflow-x-auto scrollbar-hide space-x-2 p-2" onDragStart={handleDragStart}>
        {selectedCategory &&  filteredCategories.map((subcategory, index) => (
          <div 
          key={subcategory.id}
          className={`flex-none w-1/4 bg-white overflow-hidden cursor-pointer 
            ${subcategory.id == selectedCategory.id ? 'shadow-md' : ''}`}
          onClick={() => handleCategoryClick(subcategory.id)}
          >
          <Image
            src={subcategory.image}
            alt={subcategory.name}
            width={50}
            height={50}
            className="w-full h-auto"
          />
          <span className="mt-1 p-1 text-center font-semibold text-xs sm:text-sm">{subcategory.name}</span>
          </div>
        ))}
        </div>
      </div>
      );
    };
  
    /**
     * This handles the creation of the products object and it's content.
     * @returns a grid of products.
     */
    const renderProducts = () => (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {selectedCategory && selectedCategory.products && selectedCategory.products.map((productId) => {
          const product = products.find(p => p.id === productId);
          return product ? (
            <CategoryProduct key={product.id} product={product} />
          ) : null;
        })}
      </div>
    )
    
  return (
    <div className="space-y-6">
      {selectedCategory && (
      <button 
      className="flex items-center text-blue-500 hover:text-blue-700"
      onClick={() => setSelectedCategory(selectedCategory.parent === 0 ? null : categories[selectedCategory.parent-1])} 
      >
      <ChevronLeft className="w-5 h-5 " />
      Back
      </button>
      )}
      {selectedCategory && selectedCategory.products ? (<>{renderCarousel()}{renderProducts()}</>)
      : 
      (renderGrid(selectedCategory ? filteredCategories : categories.filter(category => category.parent === 0)))}
    </div>
  )
}