import { Geist } from 'next/font/google'
import { unstable_ViewTransition as ViewTransition } from 'react'
import Header from '@/ui/header'
import Footer from '@/ui/footer'
import './app.css'
import type { Metadata } from 'next'

const font_sans = Geist({
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'YF2 | Yahoo Fantasy',
	description: 'A better Yahoo Fantasy Sports web experience.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<ViewTransition>
				<body className="bg-background text-foreground flex min-h-dvh flex-col antialiased">
					<Header />
					{children}
					<Footer />
				</body>
			</ViewTransition>
		</html>
	)
}
