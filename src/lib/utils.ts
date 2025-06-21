import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

const suffixes = new Map([
	['one', 'st'],
	['two', 'nd'],
	['few', 'rd'],
	['other', 'th'],
])

const pr = new Intl.PluralRules('en-US', { type: 'ordinal' })

export const formatOrdinal = (n: number | string) => {
	const rule = pr.select(Number(n))
	const suffix = suffixes.get(rule)
	return `${n}${suffix}`
}
