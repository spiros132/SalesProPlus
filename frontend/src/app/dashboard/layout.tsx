import BottomBar from "./_dashboardComponents/bottombar";
import TopBar from "./_dashboardComponents/topbar";

// Root layout for the whole website
export default function RootLayout(
    { children } : {
        readonly children: React.ReactNode
    }
) {
    return (
        <div className="min-h-screen flex flex-col">
            <TopBar></TopBar>
            <div className="flex-grow p-2">{children}</div>
            <BottomBar></BottomBar>
        </div>
    );
}