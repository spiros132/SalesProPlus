'use client'

import Error, { ErrorProps } from "next/error";
import { Filters, Product_Long, Product_Short } from "./definitions";

const backendURL = "http://localhost:8000";

export async function CheckBackend(): Promise<boolean> {
    const data: Response = await fetch(backendURL);
    
    // Check so that the request works
    if(data.status == 200) {
        return true;
    } else {
        const props: ErrorProps = { 
            statusCode: 1,
            title: "Can't connect to the backend",
            
        };
        throw new Error(props);
    }
}

export async function GetProduct(productID: number): Promise<Product_Long | null> {
    await CheckBackend();
    
    // Get data from backend
    const data: Response = await fetch(backendURL + `/product/${productID}`);

    // Check that we did get a correct response
    if(data.status == 404) {
        return null;
    } else {
        // Cast the json to the Product Long interface
        const product: Product_Long = await data.json();
        return product;
    }
}


export async function SearchProducts(searchQuery: string, filters: Filters) {
    await CheckBackend();
    
    // Get response from the backend
    const data: Response = await fetch(backendURL + `/search/${searchQuery}?${filters.filterSearch}`);

    // Check that we did get a correct response
    if(data.status == 404) {
        return null;
    } else {
        // Cast the json to the Product Short interface
        const product: Product_Short[] = await data.json();
        return product;
    }
}