import { NextResponse } from 'next/server'

export function middleware(request) {
    const path = request.nextUrl.pathname

    // Only run logic for /admin routes
    if (path.startsWith('/admin')) {
        const isLoginPage = path === '/admin/login'
        const token = request.cookies.get('token')?.value

        // If user is on login page and has a token, redirect to dashboard
        if (isLoginPage && token) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }

        // If user is NOT on login page and has NO token, redirect to login
        if (!isLoginPage && !token) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/admin/:path*',
    ]
}
