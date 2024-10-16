'use client';

import Image from 'next/image'
import Link from 'next/link'
import { Check, X } from 'lucide-react';
import { Product_Short } from '../../../../lib/definitions';


/**
 * The search result component.
 * @param product the product this object represents.  
 * @returns a search result object with the product's information.
 */
export default function SearchResult({ product }: { readonly product: Product_Short }){

    const dimensions = `${product.height != null ? product.height+"x" : ''}${product.width != null ? product.width + "x" : ''}${product.depth != null ? product.depth+"x" : ''}${product.length != null ? product.length : '' }${product.unit.toLowerCase()}`

    return(
        <Link href={`/dashboard/product/${product.articleID}`} key={product.articleID} className="block">
        <div className="flex overflow-hidden border-t-1 border-b-1 items-center">
          <Image
            src={product.image}
            alt={product.name}
            width={50}
            height={50}
            className="w-[50%]"
          />
          <div className="h-[80%]">
            <h3 className="p-1 font-semibold text-md">{product.name}</h3>
            <p className={`text-sm pt-1 before:inline-block before:mr-1 before:rounded-full before:w-3 before:h-3 ${product.stock > 0 ? 'before:bg-green-500' : 'before:bg-red-500'}`}>
              {product.stock} in stock
            </p>
            <p className="text-sm pt-1">
              {dimensions}
            </p>
            <p className="text-sm pt-1 font-medium">{product.price.toFixed(2)} kr</p>
          </div>
        </div>
      </Link>
    )
}