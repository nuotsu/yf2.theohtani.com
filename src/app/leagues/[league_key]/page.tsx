import { fetchLeagueTeams, fetchUserLeagues } from '@/lib/yahoo/fetch'
import Breadcrumbs from '../breadcrumbs'
import { flatten } from '@/lib/yahoo/utils'
import { notFound } from 'next/navigation'

export default async function ({
	params,
}: {
	params: Promise<{ league_key: string }>
}) {
	const { league_key } = await params

	const { league, teams, isError } = await fetchLeagueTeams(league_key)
	const { userLeagues } = await fetchUserLeagues()

	if (isError || !league || !teams || !userLeagues) {
		notFound()
	}

	const userTeam = flatten(
		teams.find(({ team }) => flatten(team[0]).is_owned_by_current_login)
			?.team[0] ?? [],
	)

	const { is_game_over } =
		userLeagues.find(
			({ game: [, { leagues }] }) =>
				leagues[0].league[0].league_key === league_key,
		)?.game[0] ?? {}

	return (
		<>
			<Breadcrumbs>
				<li className="anim-fade-to-r">
					{league.name}

					{!is_game_over && (
						<small className="shrink-0 animate-pulse font-bold text-green-500 uppercase">
							Active
						</small>
					)}
				</li>

				<li className="anim-fade-to-r font-bold">{userTeam.name}</li>
			</Breadcrumbs>
		</>
	)
}
