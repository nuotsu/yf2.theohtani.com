'use client'

import { createContext, useContext, useState } from 'react'

type OptionalProps = {
	matchups?: {
		matchup: Fantasy.Matchup
	}[]
}

const ScoreboardContext = createContext<
	{
		selectedStatCategory: number | undefined
		setSelectedStatCategory: (statCategory?: number) => void
	} & OptionalProps
>({
	selectedStatCategory: undefined,
	setSelectedStatCategory: () => {},
})

export function ScoreboardProvider({
	value,
	children,
}: {
	value: OptionalProps
	children: React.ReactNode
}) {
	const [selectedStatCategory, setSelectedStatCategory] = useState<number>()

	return (
		<ScoreboardContext.Provider
			value={{
				...value,
				selectedStatCategory,
				setSelectedStatCategory,
			}}
			children={children}
		/>
	)
}

export const useScoreboardContext = () => useContext(ScoreboardContext)
