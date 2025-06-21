import { dev, DOMAIN } from '@/lib/env'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const BASE_URL = dev ? `https://${request.headers.get('host')}` : DOMAIN

	const url = new URL('https://api.login.yahoo.com/oauth2/request_auth')

	url.searchParams.set('client_id', process.env.YAHOO_CONSUMER_KEY!)
	url.searchParams.set('redirect_uri', `${BASE_URL}/auth/callback`)
	url.searchParams.set('response_type', 'code')
	url.searchParams.set('scope', 'openid profile')

	return NextResponse.redirect(url.toString())
}
