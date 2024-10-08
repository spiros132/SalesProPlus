'use client'

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

export async function GetProduct(productID: number) {
    const data: Response = await fetch(backendURL + `/product/${productID}`);

    return data.json();
}