import {
	LiaBaseballBallSolid,
	LiaBasketballBallSolid,
	LiaFootballBallSolid,
	LiaHockeyPuckSolid,
} from 'react-icons/lia'

const ICON_MAP = {
	mlb: LiaBaseballBallSolid,
	nba: LiaBasketballBallSolid,
	nfl: LiaFootballBallSolid,
	nhl: LiaHockeyPuckSolid,
} as const

export default function ({
	code,
	...props
}: { code: keyof typeof ICON_MAP } & React.ComponentProps<
	(typeof ICON_MAP)[keyof typeof ICON_MAP]
>) {
	const Component = ICON_MAP[code]

	if (!Component) return null

	return <Component {...props} />
}
