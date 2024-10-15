/**
 * Dimension interface
 */
export interface Dimensions {
    depth: number | null;
    width: number | null;
    height: number | null;
    length: number | null;
}

/**
 * Category interface, defines the contents of a category.
 */
export interface Category {
    categoryID: string;
    categoryName: string;
    categoryImage: string;
    parent: string | null;
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
    dimensions: Dimensions;
}

/**
 * Filter interface for sending the url and getting the whole string of values.
 */
export class Filters {
    constructor(filters: Filter[]) {
        filters.forEach((filter) => {
            this.filterSearch += `${filter.name}=${filter.value}&`;
        });
    }

    filterSearch: string = "";
}

/* Filter interface for one kind of filter*/
export interface Filter {
    name: string;
    value: any;
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
    category: string;
    designer: string;
    info: string;
    materials: string;
    safety: string;
    manuals: string;
    unit: string;
    height: number | null;
    width: number | null;
    depth: number | null;
    length: number | null;
    packaging: string;
}

export interface LoginFeedback {
    success: boolean;
    username: string;
    department: string;
    region: string;
}

export interface CreateQuestionForm {
    content: string;
    author: string;
    productID: number;
}

export interface CreateQuestionFeedback extends CreateQuestionForm {
    success: boolean;
}

export interface CreateAnswerForm {
    content: string;
    author: string;
    questionID: number;
}

export interface CreateAnswerFeedback extends CreateAnswerForm {
    success: boolean;
}

export interface Question {
    questionID: number;
    content: string;
    author: string;
    productID: number;
}

export interface Answer {
    answerID: number;
    content: string;
    author: string;
    questionID: number;
}