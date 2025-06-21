import { getAuthUrl } from '@/lib/yahoo/auth'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const url = getAuthUrl({ host: `https://${request.headers.get('host')}` })

	return NextResponse.redirect(url)
}
