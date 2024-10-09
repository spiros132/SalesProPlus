/**
 * Dimension interface
 */
export interface dimensions {
    depth: number;
    width: number;
    height: number;
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

/** LEGACY, new interface exists, called Product_Short
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
 * The product interface when searching for a product
**/
export interface Product_Short {
    BM25_ProductsFTS: number;
    articleID: number;
    name: string;
    price: number;
    stock: number;
    image: string;
    description: string;
    unit: string;
    height: number | null;
    width: number | null;
    depth: number | null;
    length: number | null;
    packaging: string;
}


/**
 * The product interface when going into the product page itself
**/
export interface Product_Long {
    dimensions(dimensions: any): unknown;
    articleID: number;
    name: string;
    price: number;
    stock: number;
    image: string;
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
