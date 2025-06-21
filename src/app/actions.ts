'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { getAuthUrl } from '@/lib/yahoo/auth'

export async function signInWithYahoo() {
	const headersList = await headers()

	const url = getAuthUrl({ host: `https://${headersList.get('host')}` })

	redirect(url)
}
