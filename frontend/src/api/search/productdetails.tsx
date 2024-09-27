import { products } from '@/src/lib/fakeDB';
import { Product } from '../../lib/definitions';

/**
 * Gets the product data from the database.
 * @param id the id of the product to get.
 * @returns the product data.
 */
export function getProductData(id: number): Product {
    // Replace with API call
    return products[id];
}