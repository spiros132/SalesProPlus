import NavBar from "@/src/app/dashboard/_dashboardComponents/navBar";
import SearchBar from "@/src/app/dashboard/_dashboardComponents/searchBar";

// Root layout for the whole website
export default function RootLayout(
    { children } : {
        readonly children: React.ReactNode
    }
) {
    return (
        <div className="min-h-screen flex flex-col">
            <SearchBar></SearchBar>
            <div className="flex-grow p-2">{children}</div>
            <NavBar></NavBar>
        </div>
    );
}