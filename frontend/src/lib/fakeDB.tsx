import { Category, Product } from "./definitions";

/**
 * Simple products to test the app without DB connection.
 */
export const products: Product[] = [
    { id: 1, name: "Modern Sofa", image: "/assets/categoryassets/1.jpg", price: 999.99, shortdescription: "A modern sofa for your living room.", stock: 10, dimensions: "200x100x50" },
    { id: 2, name: "Leather Armchair", image: "/assets/categoryassets/1.jpg", price: 599.99, shortdescription: "A leather armchair for your living room.", stock: 5, dimensions: "100x100x50" },
    { id: 3, name: "Glass Coffee Table", image: "/assets/categoryassets/1.jpg", price: 299.99, shortdescription: "A glass coffee table for your living room.", stock: 0, dimensions: "50x50x50" },
    { id: 4, name: "Wooden TV Stand", image: "/assets/categoryassets/1.jpg", price: 399.99, shortdescription: "A wooden TV stand for your living room.", stock: 7, dimensions: "150x50x50" },
  ]

/**
 * Simple categories to test the app without DB connection.
 */
  export const categories: Category[] = [
    { id: 1, name: "Furniture", image: "/assets/categoryassets/1.jpg", products:null, parent:0},
    { id: 2, name: "Beds", image: "/assets/categoryassets/1.jpg", products:null, parent:0},
    { id: 3, name: "Textiles", image: "/assets/categoryassets/1.jpg", products:null, parent:0},
    { id: 4, name: "Lighting", image: "/assets/categoryassets/1.jpg", products:null, parent:0},
    { id: 5, name: "Bathroom furniture", image: "/assets/categoryassets/1.jpg", products:null, parent:0},
    { id: 6, name: "Kitchen", image: "/assets/categoryassets/1.jpg", products:null, parent:0},
    { id: 7, name: "Sofas", image: "/assets/categoryassets/1.jpg", products:[1,2], parent:1},
    { id: 8, name: "TV-Benches", image: "/assets/categoryassets/1.jpg", products:[4], parent:1},
    { id: 9, name: "Coffee Tables", image: "/assets/categoryassets/1.jpg", products:[3], parent:1},
    { id: 10, name: "Armchairs", image: "/assets/categoryassets/1.jpg", products:[2], parent:7},
    { id: 11, name: "Modern Sofas", image: "/assets/categoryassets/1.jpg", products:[1], parent:7},
    { id: 12, name: "Armchairs", image: "/assets/categoryassets/1.jpg", products:[2], parent:7},
    { id: 13, name: "Modern Sofas", image: "/assets/categoryassets/1.jpg", products:[1], parent:7},
    { id: 14, name: "Armchairs", image: "/assets/categoryassets/1.jpg", products:[2], parent:7},
    { id: 15, name: "Modern Sofas", image: "/assets/categoryassets/1.jpg", products:[1], parent:7},
]