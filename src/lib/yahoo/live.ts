import useSWR from 'swr'

const fetcher = (endpoint: string) =>
	fetch(`/api/fantasy/${endpoint}?format=json`).then((res) => res.json())

export function fetchFantasyLive<T>(endpoint: string) {
	return useSWR<T>(endpoint, fetcher, {
		refreshInterval: 1000 * 30, // 30 sec
	})
}
