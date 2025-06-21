'use client'

import { useFormStatus } from 'react-dom'
import { VscLoading } from 'react-icons/vsc'
import { FaYahoo } from 'react-icons/fa6'

export default function () {
	const { pending } = useFormStatus()

	return (
		<button type="submit" className="action-yahoo" disabled={pending}>
			{pending ? <VscLoading className="animate-spin" /> : <FaYahoo />}
			Sign in with Yahoo
		</button>
	)
}
