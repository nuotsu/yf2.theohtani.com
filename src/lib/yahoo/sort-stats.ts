type Team = {
	team: Fantasy.Team<[Fantasy.TeamStats]>
}

export function sortStats(a: Team, b: Team, target_stat_id: number | string) {
	const stat_id = Number(target_stat_id)

	const aStat = a.team[1].team_stats.stats.find(
		(s) => Number(s.stat.stat_id) === stat_id,
	)

	const bStat = b.team[1].team_stats.stats.find(
		(s) => Number(s.stat.stat_id) === stat_id,
	)

	// move to end if empty
	if (!aStat?.stat.value && !bStat?.stat.value) return 1
	if (!aStat?.stat.value) return 1
	if (!bStat?.stat.value) return -1

	// H/AB
	if (stat_id === 60) {
		const aH = Number(aStat?.stat.value.split('/')[1])
		const bH = Number(bStat?.stat.value.split('/')[1])
		return bH - aH
	}

	// sort by lowest
	if ([26, 27].includes(stat_id))
		return Number(aStat?.stat.value) - Number(bStat?.stat.value)

	// sort by highest
	return Number(bStat?.stat.value) - Number(aStat?.stat.value)
}
