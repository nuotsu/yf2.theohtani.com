import { getAccessToken } from '@/lib/yahoo/auth'
import { redirect } from 'next/navigation'
import SignIn from '@/ui/yahoo/sign-in'

export default async function Home() {
	const accessToken = await getAccessToken()

	if (accessToken) {
		redirect('/leagues')
	}

	return (
		<main className="px-ch grid place-content-center">
			<SignIn />
		</main>
	)
}
