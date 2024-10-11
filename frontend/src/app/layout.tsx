import "@/styles/globals.css";
import { Metadata } from "next";
import { Providers } from "./providers";

// Metadata for the whole website
export const metadata: Metadata = {
    title: "Sales Pro Plus"
};

// Root layout for the whole website
export default function RootLayout(
    { children } : {
        readonly children: React.ReactNode
    }
) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}