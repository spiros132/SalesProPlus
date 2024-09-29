/**
 * Dimension interface
 */
export interface dimensions {
    height: number;
    width: number;
    depth: number;
}

/**
 * Category interface, defines the contents of a category.
 */
export interface Category {
    id: number;
    name: string;
    image: string;
    products: number[] | null;
    parent: number;
}

/**
 * Product interface, defines the contents of a product.
 */
export interface Product {
    id: number;
    image: string;
    name: string;
    price: number;
    shortdescription: string;
    stock: number;
    dimensions: dimensions;
}
/**
 * Filter interface, defines the contents of a filter.
 */
export interface filters {
    category: string;
    price: number;
    stock: number;
    dimensions: dimensions;
}

