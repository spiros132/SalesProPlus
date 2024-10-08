'use client'

import Error, { ErrorProps } from "next/error";
import { Product_Long } from "./definitions";

const backendURL = "http://localhost:8000";

export async function CheckBackend(): Promise<boolean> {
    const data: Response = await fetch(backendURL);
    
    // Check so that the request works
    if(data.status == 200) {
        return true;
    } else {
        return false;
    }
}

export async function GetProduct(productID: number): Promise<Product_Long | null> {
    if(!(await CheckBackend())) {
        const props: ErrorProps = { 
            statusCode: 1,
            title: "Can't connect to the backend",
            
        };
        throw new Error(props);
    }
    
    // Get data from backend
    const data: Response = await fetch(backendURL + `/product/${productID}`);

    // Check if the we got a not found error or the product itself
    if(data.status == 404) {
        return null;
    } else {
        // Cast the json to the Product Long interface
        const product: Product_Long = await data.json();
        return product;
    }
}