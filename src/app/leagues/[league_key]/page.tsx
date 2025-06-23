import { fetchLeagueTeams, fetchUserLeagues } from '@/lib/yahoo/fetch'
import { getUserTeam } from '@/lib/yahoo/utils'
import { notFound } from 'next/navigation'
import Breadcrumbs from '../breadcrumbs'
import { Suspense } from 'react'
import StandingsNonActive from '@/ui/yahoo/standings/non-active'
import StandingsActive from '@/ui/yahoo/standings/active'
import ScoreboardNonActive from '@/ui/yahoo/scoreboard/non-active'
import ScoreboardActive from '@/ui/yahoo/scoreboard/active'
import Loading from '@/ui/loading'

export default async function ({
	params,
}: {
	params: Promise<{ league_key: string }>
}) {
	const { league_key } = await params

	const [{ league, teams }, { userLeagues }] = await Promise.all([
		fetchLeagueTeams(league_key),
		fetchUserLeagues(),
	])

	if (!league || !teams || !userLeagues) {
		notFound()
	}

	const { userTeamInfo } = getUserTeam(teams)

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

				<li className="anim-fade-to-r font-bold">{userTeamInfo.name}</li>
			</Breadcrumbs>

			<section>
				{is_game_over ? (
					<Suspense fallback={<Loading>Loading standings...</Loading>}>
						<StandingsNonActive league_key={league_key} />
					</Suspense>
				) : (
					<StandingsActive league_key={league_key} />
				)}
			</section>

			<section className="@container">
				{is_game_over ? (
					<Suspense fallback={<Loading>Loading matchups...</Loading>}>
						<ScoreboardNonActive league_key={league_key} />
					</Suspense>
				) : (
					<ScoreboardActive league_key={league_key} />
				)}
			</section>
		</>
	)
}
