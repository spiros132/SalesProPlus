import SearchBar from './searchBar'
import NavBar from './navBar'
import { ReactNode } from 'react';
import Head from 'next/head';
import BottomNavBar from './bottomNavBar';

interface LayoutProps {
    children: ReactNode;
}

/**
 * The layout for the entire application. 
 * @param children the children to be displayed inside the layout. 
 * @returns  a layout consisting of a top search bar, a bottom nav bar and the children between them.
 */
export default function Layout({ children }: LayoutProps) {
    return (<>
    <Head>
        <title>IKEA Sales Pro Plus</title>
    </Head>
    <div className="flex flex-col min-h-screen">
        <SearchBar/>
        <main className="flex-grow p-4">
            {children}
        </main>
        <BottomNavBar/>
    </div>
    </>)
    }
