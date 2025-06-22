export type Flatten<T extends Array<Record<string, any> | []>> = {
	[K in T[number] extends infer U
		? U extends Record<string, any>
			? keyof U
			: never
		: never]: any
}

export function flatten<T extends Array<Record<string, any> | []>>(
	arr: T,
): Flatten<T> {
	return arr.reduce((acc, item) => {
		if (typeof item === 'object' && !Array.isArray(item)) {
			return { ...acc, ...item }
		}
		return acc
	}, {})
}

export function getPluralItems<T>(obj: Fantasy.Plural<T>): T[] {
	return Object.entries<T>(obj)
		.filter(([key]) => !isNaN(Number(key)))
		.map(([, value]) => value)
}

export function getUserTeam<Params = []>(
	teams: { team: Fantasy.Team<Params> }[],
) {
	const userTeam = teams.find(
		(team) => flatten(team.team[0]).is_owned_by_current_login,
	)

	return {
		userTeam,
		userTeamInfo: flatten(userTeam?.team[0] ?? []),
	}
}
