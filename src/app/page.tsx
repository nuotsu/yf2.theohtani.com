import { getAccessToken } from '@/lib/yahoo/auth'
import { redirect } from 'next/navigation'
import SignIn from '@/ui/yahoo/sign-in'
import { version } from '@@/package.json'

export default async function Home() {
	const accessToken = await getAccessToken()

	if (accessToken) {
		redirect('/leagues')
	}

	return (
		<main className="px-ch grid place-content-center gap-[.5ch] text-center">
			<SignIn />

			<small className="text-foreground/50 text-[x-small]">
				Version {version}
			</small>
		</main>
	)
}
