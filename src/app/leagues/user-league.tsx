import { fetchLeagueTeams } from '@/lib/yahoo/fetch'
import { Flatten, getUserTeam } from '@/lib/yahoo/utils'
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
	const { teams } = await fetchLeagueTeams<[Fantasy.TeamStandings]>(
		league.league_key,
		'out=standings',
	)

	if (!teams) return null

	const { userTeam, userTeamInfo } = getUserTeam(teams)

	const { rank } = userTeam?.team[1].team_standings ?? {}

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

			<div className="gap-x-ch flex flex-wrap @max-md:flex-col @md:items-center">
				<span className="gap-x-ch flex grow items-center">
					<Link
						href={`/leagues/${league.league_key}`}
						className="line-clamp-1 font-bold break-all italic"
					>
						{userTeamInfo.name}
						<span className="absolute inset-0 z-1" />
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
