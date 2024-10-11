'use client';

import Link from "next/link";
import Image from 'next/image';

import { Product_Short } from "@/src/lib/definitions";

/**
 * Component for product shown in the category products.
 * @param product the product corresponding to this component. 
 * @returns a simple tile with the product's image, name and price.
 */
export default function CategoryProduct({product}: { readonly product: Product_Short}) {
  return (
    <Link href={`/dashboard/product/${product.articleID}`} key={product.articleID} className="block">
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
  )
}