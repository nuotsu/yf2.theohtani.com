import { getAccessToken } from '@/lib/yahoo/auth'
import { redirect } from 'next/navigation'
import SignIn from '@/ui/yahoo/sign-in'
import Image from 'next/image'
import pkg from '@@/package.json'

export default async function Home() {
	const accessToken = await getAccessToken()

	if (accessToken) {
		redirect('/leagues')
	}

	return (
		<main className="px-ch my-auto grid place-content-center gap-[.5ch] text-center">
			<SignIn />

			<figure className="max-w-sm">
				<Image src="/preview.png" width={1000} height={991} alt="screenshot" />
			</figure>

			<small className="text-foreground/50 text-[x-small]">
				Version {pkg.version}
			</small>
		</main>
	)
}
