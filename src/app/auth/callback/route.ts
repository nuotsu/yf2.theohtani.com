import { dev, DOMAIN } from '@/lib/env'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const code = searchParams.get('code')
	const error = searchParams.get('error')

	if (error) {
		return NextResponse.redirect(new URL('/?error=auth_failed', request.url))
	}

	if (!code) {
		return NextResponse.redirect(new URL('/?error=no_code', request.url))
	}

	try {
		// Exchange code for access token
		const BASE_URL = dev ? `https://${request.headers.get('host')}` : DOMAIN

		const tokenResponse = await fetch(
			'https://api.login.yahoo.com/oauth2/get_token',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Basic ${Buffer.from(`${process.env.YAHOO_CONSUMER_KEY}:${process.env.YAHOO_CONSUMER_SECRET}`).toString('base64')}`,
				},
				body: new URLSearchParams({
					grant_type: 'authorization_code',
					code: code,
					redirect_uri: `${BASE_URL}/auth/callback`,
				}),
			},
		)

		if (!tokenResponse.ok) {
			throw new Error('Failed to exchange code for token')
		}

		const tokenData = await tokenResponse.json()

		// Create response and set secure cookie
		const response = NextResponse.redirect(
			new URL('/auth/success', request.url),
		)

		response.cookies.set('yahoo_access_token', tokenData.access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: tokenData.expires_in || 3600, // Use token expiry or default to 1 hour
			path: '/',
		})

		if (tokenData.refresh_token) {
			response.cookies.set('yahoo_refresh_token', tokenData.refresh_token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 60 * 60 * 24 * 30, // 30 days
				path: '/',
			})
		}

		return response
	} catch (error) {
		console.error('OAuth callback error:', error)
		return NextResponse.redirect(
			new URL('/?error=token_exchange_failed', request.url),
		)
	}
}
