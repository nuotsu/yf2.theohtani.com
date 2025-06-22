export default function () {
	return (
		<footer className="p-ch mt-auto pb-[max(1ch,env(safe-area-inset-bottom))] text-center [&_a]:underline">
			<p className="text-foreground/50">
				<small className="*:inline-block">
					<span>
						Built by <a href="https://nuotsu.dev">nuotsu</a>
					</span>
					{' | '}
					<a href="https://github.com/nuotsu/yf2.theohtani.com">GitHub</a>
					{' | '}
					<a href="https://sb3.theohtani.com">Live Scorebug</a>
				</small>
			</p>
		</footer>
	)
}
