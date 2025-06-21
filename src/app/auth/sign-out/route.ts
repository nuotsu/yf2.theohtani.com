import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const response = NextResponse.redirect(new URL('/', request.url))

	// Clear auth cookies
	response.cookies.delete('yahoo_access_token')
	response.cookies.delete('yahoo_refresh_token')

	return response
}
