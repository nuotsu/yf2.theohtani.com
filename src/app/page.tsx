import SignIn from '@/ui/sign-in'
import { signInWithYahoo } from './actions'

export default function Home() {
	return (
		<main className="p-ch grid place-content-center">
			<form action={signInWithYahoo}>
				<SignIn />
			</form>
		</main>
	)
}
