'use client'

const backendURL = "http://localhost";
const port = ":8000";

export async function CheckBackend(): Promise<string> {
    const data: Response = await fetch(backendURL + port,
        {
            mode: 'same-origin'
        }
    );
    
    // Check so that the request works
    return data.text();
    
}