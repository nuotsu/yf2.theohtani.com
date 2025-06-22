import { fetchLeagueTeams } from '@/lib/yahoo/fetch'
import { Flatten, flatten } from '@/lib/yahoo/utils'
import Link from 'next/link'
import Emoji from '@/ui/yahoo/emoji'
import { cn, formatOrdinal } from '@/lib/utils'

export default async function UserLeague({
	league,
	game,
}: {
	league: Flatten<[Fantasy.LeagueInfo]>
	game: Flatten<Fantasy.Game>
}) {
	const teams = await fetchLeagueTeams(league.league_key)

	const userTeam = teams.find(
		(team) => flatten(team.team[0]).is_owned_by_current_login,
	)
	const userTeamInfo = flatten(userTeam?.team[0] ?? [])
	// const userTeamStats = userTeam?.team[1]
	const { rank } = userTeam?.team[2].team_standings ?? {}

	return (
		<li
			className={cn(
				'gap-ch @container relative grid grid-cols-[auto_1fr] items-center',
				game.is_game_over && 'transition-opacity not-hover:opacity-50',
			)}
		>
			<figure className="size-lh grid shrink-0 place-items-center self-start">
				{league.logo_url ? (
					<img
						src={league.logo_url}
						alt={league.name}
						width={192}
						height={192}
						loading="lazy"
					/>
				) : (
					<Emoji code={league.game_code} />
				)}
			</figure>

			<div className="gap-x-ch flex flex-wrap @max-sm:flex-col @sm:items-center">
				<span className="gap-x-ch flex grow items-center">
					<Link href="" className="line-clamp-1 font-bold break-all italic">
						{userTeamInfo.name}
						<span className="absolute inset-0" />
					</Link>

					{rank && (
						<small className="shrink-0">
							{formatOrdinal(rank)}
							<span className="text-foreground/50">/{league.num_teams}</span>
						</small>
					)}

					{!game.is_game_over && (
						<small className="shrink-0 animate-pulse font-bold text-green-500 uppercase">
							Active
						</small>
					)}
				</span>

				<small className="text-foreground/50 gap-ch">
					{league.name}{' '}
					{!league.name.includes(league.season) && <>({league.season})</>}
				</small>
			</div>
		</li>
	)
}
