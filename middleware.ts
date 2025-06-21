import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	// Check if user is accessing protected routes
	if (request.nextUrl.pathname.startsWith('/dashboard')) {
		const accessToken = request.cookies.get('yahoo_access_token')?.value

		if (!accessToken) {
			return NextResponse.redirect(new URL('/', request.url))
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*'],
}
