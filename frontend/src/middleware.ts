import next from 'next';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextURL } from 'next/dist/server/web/next-url';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware function when we try to connect to /dashboard
export function middleware(request: NextRequest) {
    const { origin } = request.nextUrl;
    
    function exists(cookie: RequestCookie | undefined) {
        const value = cookie?.value;
        
        // Should do a regular check that the value exists in the backend
        return (value && value != "");
    }

    // Check that the client has logged in
    const username = request.cookies.get("username");
    const department = request.cookies.get("department");
    const region = request.cookies.get("region");

    if(exists(username) && exists(department) && exists(region))
        return NextResponse.next();
    else
        return NextResponse.redirect(`${origin}/`);
}

// Which paths we should run the middleware on
export const config = {
    matcher: '/dashboard/:path*',
}