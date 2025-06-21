const SPORT_EMOJI_MAP = {
	mlb: '⚾',
	nba: '🏀',
	nfl: '🏈',
	nhl: '🏒',
} as const

export default function ({
	code,
	...props
}: { code: string } & React.ComponentProps<'span'>) {
	return (
		<span {...props}>
			{SPORT_EMOJI_MAP[code as keyof typeof SPORT_EMOJI_MAP]}
		</span>
	)
}
