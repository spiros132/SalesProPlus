import Link from "next/link";
import { Product } from "../lib/definitions";
import Image from 'next/image';

/**
 * Component for product shown in category view.
 * @param product the product corresponding to this component. 
 * @returns a simple tile with the product's image, name and price.
 */
export default function CategoryProduct({product}: {product: Product}) {

    return (
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
    )
}