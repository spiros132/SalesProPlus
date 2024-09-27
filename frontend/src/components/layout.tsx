import SearchBar from './searchBar'
import NavBar from './navBar'
import { ReactNode } from 'react';

/**
 * The layout for the entire application. 
 * @param children the children to be displayed inside the layout. 
 * @returns  a layout consisting of a top search bar, a bottom nav bar and the children between them.
 */
interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

    return (
    <div className="flex flex-col min-h-screen">
        <SearchBar/>
        <main className="flex-grow p-4">
            {children}
        </main>
        <NavBar/>
    </div>
    )
    }
