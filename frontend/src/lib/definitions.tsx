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

/**
 * The product interface when going into the product page itself
**/
export interface Product_Long {
    articleID: number;
    name: string;
    price: number;
    description: string;
    info_description: string;
    designer: string;
    info: string;
    material: string;
    safety: string;
    manuals: string;
    unit: string;
    height: number | null;
    width: number | null;
    depth: number | null;
    length: number | null;
    packaging: string;
}
