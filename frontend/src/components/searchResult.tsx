import Image from 'next/image'
import Link from 'next/link'
import { Check, X } from 'lucide-react';
import { Product } from '../lib/definitions';


/**
 * The search result component.
 * @param product the product this object represents.  
 * @returns a search result object with the product's information.
 */
export default function SearchResult({ product }: { product: Product }){
    return(
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
                        <h3 className="text-xs">{product.dimensions.height}x{product.dimensions.width}x{product.dimensions.depth}</h3>
                        <p className="text-sm text-gray-600">{product.price.toFixed(2)} kr</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}