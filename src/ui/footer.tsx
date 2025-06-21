export default function () {
	return (
		<footer className="p-ch pb-[max(1rem,env(safe-area-inset-bottom))] text-center [&_a]:underline">
			<p className="text-foreground/50">
				<small>
					<a href="https://sb3.theohtani.com">Live Scorebug</a>
					{' | '}
					<a href="https://github.com/nuotsu/yf2.theohtani.com">GitHub</a>
					{' | '}
					Built by <a href="https://nuotsu.dev">nuotsu</a>
				</small>
			</p>
		</footer>
	)
}
