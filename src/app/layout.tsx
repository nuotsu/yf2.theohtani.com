import { Geist } from 'next/font/google'
import Footer from '@/ui/footer'
import './app.css'
import type { Metadata } from 'next'

const font_sans = Geist({
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'YF2 | Yahoo Fantasy',
	description: 'A better Yahoo Fantasy experience.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className="bg-background text-foreground antialiased">
				{children}

				<Footer />
			</body>
		</html>
	)
}
