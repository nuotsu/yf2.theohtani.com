import {
	fetchLeagueSettings,
	fetchLeagueTeams,
	fetchUserLeagues,
} from '@/lib/yahoo/fetch'
import { getUserTeam } from '@/lib/yahoo/utils'
import { notFound } from 'next/navigation'
import Breadcrumbs from '../breadcrumbs'
import SelectWeek from '@/ui/yahoo/select-week'
import { Suspense } from 'react'
import Loading from '@/ui/loading'
import StandingsNonActive from '@/ui/yahoo/standings/non-active'
import StandingsActive from '@/ui/yahoo/standings/active'
import ScoreboardNonActive from '@/ui/yahoo/scoreboard/non-active'
import ScoreboardActive from '@/ui/yahoo/scoreboard/active'

export default async function ({
	params,
	searchParams,
}: {
	params: Promise<{ league_key: string }>
	searchParams: Promise<{ week: string }>
}) {
	const { league_key } = await params
	const { week } = await searchParams

	const [{ league, teams }, { userLeagues }, { settings }] = await Promise.all([
		fetchLeagueTeams(league_key),
		fetchUserLeagues(),
		fetchLeagueSettings(league_key),
	])

	if (!league || !teams || !userLeagues || !settings) {
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

				<li className="anim-fade-to-r">{userTeamInfo.name}</li>

				<li className="anim-fade-to-r bg-background overflow-fade-l sticky right-0 -ml-[1.5ch] pl-[1.5ch] empty:hidden">
					<SelectWeek
						currentWeek={league.current_week}
						settings={settings}
						refreshOnChange={!!is_game_over}
					/>
				</li>
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

			<section>
				{is_game_over ? (
					<Suspense fallback={<Loading>Loading matchups...</Loading>}>
						<ScoreboardNonActive
							league_key={league_key}
							settings={settings}
							week={week}
						/>
					</Suspense>
				) : (
					<ScoreboardActive league_key={league_key} settings={settings} />
				)}
			</section>
		</>
	)
}
