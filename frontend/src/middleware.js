import { NextResponse } from 'next/server'

export function middleware(request) {
    // Admin middleware disabled because of cross-domain cookie issues.
    // Auth protection is handled client-side in AdminLayoutClient.js using localStorage + Authorization header.
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/admin/:path*',
    ]
}
