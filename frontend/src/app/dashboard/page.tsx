'use client';

import { useState } from 'react'

import { Category, Filter, Filters } from '@/src/lib/definitions'
import { GetCategory } from '@/src/lib/BackendConnection';
import CategoriesComponent from './_dashboardComponents/categories';
import CategoryProducts from './_dashboardComponents/categoryProducts';
import FiltersComponent from './_dashboardComponents/filters';

/**
 * The component for the start/category page.
 * @returns a grid of categories fetched from the database, or a carousel of subcategories along with a grid of products.
 */
export default function Startpage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [filters] = useState<Filters>(new Filters());
  const [filterUpdate, setFilterUpdate] = useState<boolean>(false);


  function addFilter(filter: Filter) {
    filters.add(filter);
    setFilterUpdate(!filterUpdate);
  }

  function removeFilter(name: string) {
    filters.remove(name);
    setFilterUpdate(!filterUpdate);
  }

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
  
  return (
    <div className="space-y-6">
      {/* The shown categories at the top of the page */}
      <CategoriesComponent parent={selectedCategory} setCategory={changeCategory}/>

      {/* The Filters that show only if you have selected a category */}
      {selectedCategory != null && FiltersComponent({addFilter: addFilter, removeFilter: removeFilter})}

      {/* The products for the selected category */}
      <CategoryProducts filters={filters} filterUpdate={filterUpdate} category={selectedCategory}/>
    </div>
  )
}