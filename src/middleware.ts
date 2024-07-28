import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const publicPaths = ['/login', '/signup', '/', '/verifyemail'];
    const ispublicPath = publicPaths.includes(pathname);

    const token = request.cookies.get('token')?.value || '';

    // if the user has a token and is trying to access a public path, redirect to profile
    if (token && ispublicPath) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    // if the user does not have a token and is trying to access a private path, redirect to login
    if (!token && !ispublicPath) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/', 
    '/login', 
    '/signup', 
    '/profile', 
    '/verifyemail'
],
}