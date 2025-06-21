import { dev, DOMAIN } from '@/lib/env'
import { cookies } from 'next/headers'

export function getAuthUrl({ host }: { host: string }) {
	const BASE_URL = dev ? host : DOMAIN

	const url = new URL('https://api.login.yahoo.com/oauth2/request_auth')

	url.searchParams.set('client_id', process.env.YAHOO_CONSUMER_KEY!)
	url.searchParams.set('redirect_uri', `${BASE_URL}/auth/callback`)
	url.searchParams.set('response_type', 'code')
	// url.searchParams.set('scope', 'openid profile')

	return url.toString()
}

export async function getAccessToken() {
	const cookieStore = await cookies()
	return cookieStore.get('yahoo_access_token')?.value
}

export async function getUserInfo(accessToken: string) {
	try {
		const response = await fetch(
			'https://api.login.yahoo.com/openid/v1/userinfo',
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					Accept: 'application/json',
				},
			},
		)

		if (response.ok) {
			return (await response.json()) as Yahoo.UserInfo
		}
	} catch (error) {
		console.error(error)
	}
	return null
}
