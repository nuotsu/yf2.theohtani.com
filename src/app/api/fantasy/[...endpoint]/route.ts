import { getAccessToken } from '@/lib/yahoo/auth'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ endpoint: string[] }> },
) {
	try {
		const accessToken = await getAccessToken()

		if (!accessToken) {
			return NextResponse.json({ error: 'No access token' }, { status: 401 })
		}

		const endpoint = (await params).endpoint.join('/')

		const res = await fetch(
			`https://fantasysports.yahooapis.com/fantasy/v2/${endpoint}?format=json`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		)

		const data = await res.json()

		if (!res.ok) {
			return NextResponse.json({ error: data }, { status: res.status })
		}

		return NextResponse.json(data)
	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
	}
}
