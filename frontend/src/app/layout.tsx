import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "@next/font/google";
import { Providers } from "./providers";

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '700'], // Specify the weights you're using
  });

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
        <html lang="en" className={inter.className}>
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}