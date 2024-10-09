import { format } from 'path';
import { Category, Filters, Product } from '../../lib/definitions';
import { products, categories } from '../../lib/fakeDB';



/**
 * Searches the products for a given query.
 * @param searchQuery the query to search for.
 * @returns an array of products that match the query.
 */
export async function searchProducts(searchQuery: string, filters: Filters, sort: string): Promise<Product[]> {
    //testAPI();
    try {
        const url = new URL('http://localhost:8000/search/' + searchQuery + '/');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log(response.ok);
            throw new Error('Invalid response');
        }
        const data = await response.json();
        console.log(data);
        
        return formatProduct(data); // Assuming the API returns { results: [...] }
    } 
    catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
}

export function formatProduct(data: any): Promise<Product[]> {
    return data.map((product: any): Product => ({
        ...product,
        dimensions: {
            depth: product.depth,
            width: product.width,
            height: product.height,
        },
    }));

}

export default async function testAPI() {
    try {
        const url = new URL('http://localhost:8000/search/');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Invalid response');
        }
        console.log(response);
        const data = await response.json();
        return data.results; // Assuming the API returns { results: [...] }
    }
    catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
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

function fakeSearch(searchQuery: string, filters: Filters, sort:string): Product[] {
    // Replace with API call. Filter data in server.
    let filteredProducts =  products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredProducts.length > 0 ? filteredProducts : products;
}

