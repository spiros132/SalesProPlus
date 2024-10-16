'use client';

import { useState } from 'react'

import { Category } from '@/src/lib/definitions'
import { GetCategory } from '@/src/lib/BackendConnection';
import CategoriesComponent from './_dashboardComponents/categories';
import CategoryProducts from './_dashboardComponents/categoryProducts';

/**
 * The component for the start/category page.
 * @returns a grid of categories fetched from the database, or a carousel of subcategories along with a grid of products.
 */
export default function Startpage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  /**
   * Transforms the id given by the click into the object, and then sets it.
   * @param category the category the user clicked on.
   */
  function changeCategory (categoryID: string) {
    if(categoryID != "") {
      // Get the category data from the backend
      GetCategory(categoryID)
      .then((category) => {
        setSelectedCategory(category);
      });
    } else
      setSelectedCategory(null);
  }

  // const filteredCategories = selectedCategory ? categories.filter(category => {
  //   // Check if the selected category has sub-categories
  //   const hasSubCategories = categories.some(subCategory => subCategory.parent === selectedCategory.id);
  
  //   if (hasSubCategories) {
  //     // Show sub-categories of the selected category
  //     return category.parent === selectedCategory.id;
  //   } else {
  //     // Show categories with the same parent as the selected category
  //     return category.parent === selectedCategory.parent;
  //   }
  // }) : [];

  /**
   * This handles the creation of the carousel object and it's content.
   * @returns a carousel of categories.
   */
  // const renderCarousel = () => {
  //   const handleDragStart = (e: { preventDefault: () => void }) => {
  //     // Do we want to do something here?
  //   };

  //   return (
  //   <div className="relative mt-4 border-b-2 border-t-2">
  //     <div className="flex overflow-x-auto scrollbar-hide space-x-2 p-2" onDragStart={handleDragStart}>
  //     {selectedCategory &&  filteredCategories.map((subcategory, index) => (
  //       <div 
  //       key={subcategory.id}
  //       className={`flex-none w-1/4 bg-white overflow-hidden cursor-pointer 
  //         ${subcategory.id == selectedCategory.id ? 'shadow-md' : ''}`}
  //       onClick={() => handleCategoryClick(subcategory.id)}
  //       >
  //       <Image
  //         src={subcategory.image}
  //         alt={subcategory.name}
  //         width={50}
  //         height={50}
  //         className="w-full h-auto"
  //       />
  //       <span className="mt-1 p-1 text-center font-semibold text-xs sm:text-sm">{subcategory.name}</span>
  //       </div>
  //     ))}
  //     </div>
  //   </div>
  //   );
  // };

  /**
   * This handles the creation of the products object and it's content.
   * @returns a grid of products.
   */
  // function RenderProducts() {
  //   return (<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
  //     {selectedCategory && selectedCategory.products && selectedCategory.products.map((productId) => {
  //       const product = products.find(p => p.id === productId);
  //       if(product == undefined)
  //         return null;
  //       else
  //         return (<CategoryProduct key={product.id} product={product} />);
  //     })}
  //   </div>);
  // }
  
  
  return (
    <div className="">
      {CategoriesComponent({parent: selectedCategory, setCategory: changeCategory})}

      {CategoryProducts({category: selectedCategory})}

      {/*selectedCategory && selectedCategory.products ? (<>{renderCarousel()}{RenderProducts()}</>)
      : 
      (renderGrid(selectedCategory ? filteredCategories : categories.filter(category => category.parent === 0)))*/}
    </div>
  )
}