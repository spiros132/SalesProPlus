import SearchResult from "@/src/app/dashboard/search/_searchComponents/searchResult";
import { Product_Short } from "@/src/lib/definitions";

/**
 * The search result list
 * @param products the products to show in our list  
 * @returns the list in html that includes all of our products
 */
export default function SearchResultList({ products }: { readonly products: Product_Short[] }) {
    return (
        <div className="space-y-4">
            {products.map((product) => (
                <SearchResult key={product.articleID} product={product} />
            ))}
        </div>
    );
}