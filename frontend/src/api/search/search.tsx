import { Category, filters, Product } from '../../lib/definitions';
import { products, categories } from '../../lib/fakeDB';



/**
 * Searches the products for a given query.
 * @param searchQuery the query to search for.
 * @returns an array of products that match the query.
 */
export function searchProducts(searchQuery: string, filters: filters, sort:string): Product[] {
    // Replace with API call. Filter data in server.
    let filteredProducts =  products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredProducts.length > 0 ? filteredProducts : products;
}
/**
 * Gets the categories available from DB.
 * @param parent the parent category. 0 if no parent.
 * @returns a list of categories.
 */
export function getCategories(parent:number): Category[] {
    // Replace with api call to get list of categories.
    return categories;
}



