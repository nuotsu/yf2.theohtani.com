import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const accessToken = request.cookies.get('yahoo_access_token')?.value

	if (!accessToken) {
		return NextResponse.redirect(new URL('/?error=no_token', request.url))
	}

	// Redirect to success page
	return NextResponse.redirect(new URL('/dashboard', request.url))
}
