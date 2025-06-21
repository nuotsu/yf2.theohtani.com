import { signInWithYahoo } from '@/app/actions'
import FormButton from './form-button'

export default function () {
	return (
		<form action={signInWithYahoo}>
			<FormButton />
		</form>
	)
}
