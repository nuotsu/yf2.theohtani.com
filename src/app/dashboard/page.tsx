import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { FaYahoo } from 'react-icons/fa6'
import { getUserInfo } from '@/lib/yahoo/auth'

export default async function () {
	const cookieStore = await cookies()
	const accessToken = cookieStore.get('yahoo_access_token')?.value

	if (!accessToken) {
		redirect('/')
	}

	const userInfo = await getUserInfo(accessToken)

	return (
		<main>
			<pre>{JSON.stringify(userInfo, null, 2)}</pre>

			<a href="/auth/sign-out" className="action-yahoo">
				<FaYahoo />
				Sign Out
			</a>
		</main>
	)
}
