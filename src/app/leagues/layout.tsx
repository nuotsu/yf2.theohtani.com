import { redirect } from 'next/navigation'
import { getAccessToken, getUserInfo } from '@/lib/yahoo/auth'

export default async function ({ children }: { children: React.ReactNode }) {
	const accessToken = await getAccessToken()

	if (!accessToken) {
		redirect('/')
	}

	const userInfo = await getUserInfo(accessToken)

	return (
		<main className="gap-ch grid">
			<section>
				<div className="gap-ch flex items-center justify-center">
					<img
						className="size-lh shrink-0 self-start"
						src={userInfo?.profile_images.image64}
						alt={userInfo?.name}
						width={64}
						height={64}
						loading="lazy"
					/>

					<div className="gap-x-ch flex flex-wrap items-center">
						<div>
							Welcome, <b>{userInfo?.nickname || userInfo?.given_name}</b>
						</div>

						<small>
							<a href="/auth/sign-out" className="link">
								Sign Out
							</a>
						</small>
					</div>
				</div>
			</section>

			{children}
		</main>
	)
}
