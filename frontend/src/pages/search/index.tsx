import Link from "next/link"
import {  useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Check, X } from "lucide-react";

    interface Product {
        id: number;
        image: string;
        name: string;
        price: number;
        shortdescription: string;
        stock: number;
        dimensions: string;
    }

    const products: Product[] = [
        { id: 1, name: "Modern Sofa", image: "/assets/categoryassets/1.jpg", price: 999.99, shortdescription: "A modern sofa for your living room.", stock: 10, dimensions: "200x100x50" },
        { id: 2, name: "Leather Armchair", image: "/assets/categoryassets/1.jpg", price: 599.99, shortdescription: "A comfortable leather armchair.", stock: 0, dimensions: "100x100x50" },
        { id: 3, name: "Glass Coffee Table", image: "/assets/categoryassets/1.jpg", price: 299.99, shortdescription: "A glass coffee table for your living room.", stock: 15, dimensions: "150x50x50" },
        { id: 4, name: "Wooden TV Stand", image: "/assets/categoryassets/1.jpg", price: 399.99, shortdescription: "A wooden TV stand for your living room.", stock: 20, dimensions: "150x50x50" },
    ]

    /**
     * The search result/page component.
     * @returns row-formatted search results, based on url parameters.
     */
    export default function SearchPage() {
        const [searchResults, setSearchResults] = useState<Product[]>([])
        const searchParams = useSearchParams()
        const [searchQuery, setSearchQuery] = useState('')
        const [filter, setFilter] = useState('')
        const [sort, setSort] = useState('')
        
        useEffect(() => {
            if (searchParams?.get('q')) {
                setSearchQuery(searchParams.get('q') || '')
                setFilter(searchParams.get('filter') || '')
                setSort(searchParams.get('sort') || '')
                // Handle filters/sorting
                // API Call 
                // setSearchResults(data)

                // Temporary, should be done before this.
                const filteredProducts = products.filter(product => 
                    product.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setSearchResults(filteredProducts.length > 0 ? filteredProducts : products);
            } else {
                setSearchResults([])
            }
        }, [searchParams])

    return(
        <div className="space-y-4">
        {searchResults.map((product) => (
            <Link href={`/products/?id=${product.id}`} key={product.id} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 flex items-center space-x-4">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-1/3 h-auto rounded-md"
                    />
                    <div>
                        <h2 className="font-semibold">{product.name}</h2>
                        <h3 className="text-xs">{product.shortdescription}</h3>
                        <div className="flex items-center space-x-1"> 
                            {product.stock > 0 ? <Check className="h-4 w-4 text-green-700" /> : <X className="text-red-700 h-4 w-4" />}
                            <span className="text-xs">{product.stock} in stock</span>
                        </div>
                        <h3 className="text-xs">{product.dimensions}</h3>

                        <p className="text-sm text-gray-600">{product.price.toFixed(2)} kr</p>
                    </div>
                </div>
            </div>
            </Link>
        ))}
    </div>
    )
}
