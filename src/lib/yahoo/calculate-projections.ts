import { flatten, getPluralItems } from './utils'

export function calculateProjections({
	team_key,
	team_standings,
	matchups,
	leader,
}: {
	team_key: string
	team_standings?: Fantasy.TeamStandings['team_standings']
	matchups?: { matchup: Fantasy.Matchup }[]
	leader?: { wins: string; losses: string }
}) {
	const {
		outcome_totals: { wins, losses, ties } = {
			wins: '0',
			losses: '0',
			ties: '0',
		},
	} = team_standings ?? {}

	// matchup including team_key
	const matchup = matchups?.find((m) =>
		getPluralItems(m.matchup[0].teams).some(
			(team) => flatten(team.team[0]).team_key === team_key,
		),
	)?.matchup[0].teams

	if (!matchup) return null

	const teams = getPluralItems(matchup)

	const [self, opponent] = teams
		.reduce(
			(acc, team) => {
				const index = flatten(team.team[0]).team_key === team_key ? 0 : 1
				acc[index] = team
				return acc
			},
			[] as typeof teams,
		)
		.map(({ team }) => team)

	const [c_wins, c_losses, c_ties] = [
		Number(self[1].team_points.total),
		Number(opponent[1].team_points.total),
		Number(
			10 -
				Number(self[1].team_points.total) -
				Number(opponent[1].team_points.total),
		),
	]

	const [p_wins, p_losses, p_ties] = [
		(Number(wins) + c_wins).toString(),
		(Number(losses) + c_losses).toString(),
		(Number(ties) + c_ties).toString(),
	]

	// Percentage = (Wins + Ties/2) / (Wins + Losses + Ties)
	const p_percentage =
		(Number(p_wins) + Number(p_ties) / 2) /
		(Number(p_wins) + Number(p_losses) + Number(p_ties))

	return {
		team_key,
		p_wins,
		p_losses,
		p_ties,
		p_percentage,
		p_percentage_formatted: p_percentage?.toFixed(3).substring(1),
		...(leader
			? calculateGamesBack({
					leader,
					wins: p_wins,
					losses: p_losses,
				})
			: {}),
	}
}

function calculateGamesBack({
	leader,
	wins,
	losses,
}: {
	leader: { wins: string; losses: string }
	wins: string
	losses: string
}) {
	// Games Back = ((Leader's Wins - Team's Wins) + (Team's Losses - Leader's Losses)) / 2
	const p_games_back_number =
		(Number(leader.wins) -
			Number(wins) +
			(Number(losses) - Number(leader.losses))) /
		2

	const p_games_back = p_games_back_number
		? p_games_back_number.toFixed(1)
		: '-'

	return {
		p_games_back,
	}
}
