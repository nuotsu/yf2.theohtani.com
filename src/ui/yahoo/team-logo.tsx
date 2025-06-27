import { type Flatten } from '@/lib/yahoo/utils'

export default function ({
	teamInfo,
	...props
}: {
	teamInfo: Flatten<Fantasy.TeamInfo>
} & React.ComponentProps<'img'>) {
	const { url } = teamInfo.team_logos[0].team_logo

	return <img src={url} alt={teamInfo.name} {...props} />
}
