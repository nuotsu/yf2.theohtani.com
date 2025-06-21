import { redirect } from 'next/navigation'
import { getAccessToken, getUserInfo } from '@/lib/yahoo/auth'
import UserLeagues from './user-leagues'

export default async function () {
	const accessToken = await getAccessToken()

	if (!accessToken) {
		redirect('/')
	}

	const userInfo = await getUserInfo(accessToken)

	return (
		<main>
			<section>
				<div className="gap-ch flex items-center">
					<img
						className="size-8 shrink-0"
						src={userInfo?.profile_images.image64}
						alt={userInfo?.name}
						width={64}
						height={64}
						loading="lazy"
					/>
					<div>
						Welcome, <b>{userInfo?.nickname || userInfo?.given_name}</b>
					</div>

					<small>
						<a href="/auth/sign-out" className="link">
							Sign Out
						</a>
					</small>
				</div>
			</section>

			<UserLeagues />
		</main>
	)
}
