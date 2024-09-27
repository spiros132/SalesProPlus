import { ChevronLeft} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

// replace with api
const categories = [
  { id: 1, name: "Furniture", image: "/assets/categoryassets/1.jpg", products:null, parent:0},
  { id: 2, name: "Beds", image: "/assets/categoryassets/1.jpg", products:null, parent:0},
  { id: 3, name: "Textiles", image: "/assets/categoryassets/1.jpg", products:null, parent:0},
  { id: 4, name: "Lighting", image: "/assets/categoryassets/1.jpg", products:null, parent:0},
  { id: 5, name: "Bathroom furniture", image: "/assets/categoryassets/1.jpg", products:null, parent:0},
  { id: 6, name: "Kitchen", image: "/assets/categoryassets/1.jpg", products:null, parent:0},
  { id: 7, name: "Sofas", image: "/assets/categoryassets/1.jpg", products:[1,2], parent:1},
  { id: 8, name: "TV-Benches", image: "/assets/categoryassets/1.jpg", products:[4], parent:1},
  { id: 9, name: "Coffee Tables", image: "/assets/categoryassets/1.jpg", products:[3], parent:1},
  { id: 10, name: "Armchairs", image: "/assets/categoryassets/1.jpg", products:[2], parent:7},
  { id: 11, name: "Modern Sofas", image: "/assets/categoryassets/1.jpg", products:[1], parent:7},
  { id: 12, name: "Armchairs", image: "/assets/categoryassets/1.jpg", products:[2], parent:7},
  { id: 13, name: "Modern Sofas", image: "/assets/categoryassets/1.jpg", products:[1], parent:7},
  { id: 14, name: "Armchairs", image: "/assets/categoryassets/1.jpg", products:[2], parent:7},
  { id: 15, name: "Modern Sofas", image: "/assets/categoryassets/1.jpg", products:[1], parent:7},
]

const products = [
  { id: 1, name: "Modern Sofa", image: "/assets/categoryassets/1.jpg", price: 999.99 },
  { id: 2, name: "Leather Armchair", image: "/assets/categoryassets/1.jpg", price: 599.99 },
  { id: 3, name: "Glass Coffee Table", image: "/assets/categoryassets/1.jpg", price: 299.99 },
  { id: 4, name: "Wooden TV Stand", image: "/assets/categoryassets/1.jpg", price: 399.99 },
]

/**
 * The component for the start/category page.
 * @returns a grid of categories fetched from the database, or a carousel of subcategories along with a grid of products.
 */
export default function Startpage() {

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [carouselIndex, setCarouselIndex] = useState(0)
  
  
    /**
     * Transforms the id given by the click into the object, and then sets it.
     * @param category the category the user clicked on.
     */
    const handleCategoryClick = (category) => {
      category = categories[category-1];
      setSelectedCategory(category)
      setCarouselIndex(0)
    }

    /**
     * This handles the creation of the grid object and it's content.
     * @param items the categories shown in the grid.
     * @returns a grid of categories.
     */
    const renderGrid = (items) => (
      <div className="grid grid-cols-2 gap-4">
      {items.map((item) => (
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
            <h2 className="mt-2 text-center font-semibold">{item.name}</h2>
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
      const handleDragStart = (e) => {
      e.preventDefault();
      };

      return (
      <div className="relative mt-4 border-b-2 border-t-2">
        <div className="flex overflow-x-auto scrollbar-hide space-x-2 p-2" onDragStart={handleDragStart}>
        {categories.filter(category => category.parent === selectedCategory.id).map((subcategory, index) => (
          <div 
          key={subcategory.id}
          className={`flex-none w-1/4 bg-white overflow-hidden cursor-pointer 
            ${index === carouselIndex ? 'shadow-md' : ''}`}
          onClick={() => handleCategoryClick(subcategory.id)}
          >
          <Image
            src={subcategory.image}
            alt={subcategory.name}
            width={50}
            height={50}
            className="w-full h-auto"
          />
          <h3 className="mt-1 p-1 text-center font-semibold text-xs sm:text-sm">{subcategory.name}</h3>
          </div>
        ))}
        </div>
      </div>
      );
    };
  
    /**
     * Hur gör man för att få produktID från länken?????????????????????????????????????
     * This handles the creation of the products object and it's content.
     * @returns a grid of products.
     */
    const renderProducts = () => (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {selectedCategory.products.map((product) => (
          product = products[product-1],
          <Link href={`/product/${product.id}`} key={product.id} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={50}
                height={50}
                className="w-full h-auto"
              />
              <div className="p-2">
                <h3 className="font-semibold text-sm">{product.name}</h3>
                <p className="text-xs text-gray-600">{product.price.toFixed(2)} kr</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )
    
  return (
    <div className="space-y-6">
      {selectedCategory && (
      <button 
      className="-mt-2 flex items-center text-blue-500 hover:text-blue-700"
      onClick={() => setSelectedCategory(selectedCategory.parent === 0 ? null : categories[selectedCategory.parent-1])} 
      >
      <ChevronLeft className="w-5 h-5 " />
      Back
      </button>
      )}
      {selectedCategory && selectedCategory.products ? (<>{renderCarousel()}{renderProducts()}</>)
      : 
      (renderGrid(selectedCategory ? categories.filter(category => category.parent === selectedCategory.id) : categories.filter(category => category.parent === 0)))}
    </div>
  )
}