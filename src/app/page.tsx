import { FaYahoo } from 'react-icons/fa6'

export default function Home() {
	return (
		<main className="p-ch grid place-content-center">
			<a href="/auth/sign-in" className="action-yahoo">
				<FaYahoo />
				Sign in with Yahoo
			</a>
		</main>
	)
}
