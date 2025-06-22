import useSWR from 'swr'

const fetcher = (endpoint: string) =>
	fetch(`/api/fantasy/${endpoint}`).then((res) => res.json())

export function fetchFantasyLive<T>(endpoint: string) {
	return useSWR<T>(endpoint, fetcher)
}
