import { flatten } from '@/lib/yahoo/utils'

export default function ({
	standings,
}: {
	standings?: {
		team: Fantasy.Team<[Fantasy.TeamStats, Fantasy.TeamStandings]>
	}[]
}) {
	if (!standings) return <section>No standings.</section>

	return (
		<ol>
			{standings.map(({ team: [t0, ...t] }) => {
				const [teamInfo, teamStats, { team_standings }] = [flatten(t0), ...t]

				return <li key={teamInfo.team_key}>{teamInfo.name}</li>
			})}
		</ol>
	)
}
