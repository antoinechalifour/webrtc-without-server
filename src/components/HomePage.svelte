<main>
	<section>
		<h1>File Transfer</h1>

		<slot />
	</section>
</main>

<style>
	main {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;

		background-image: url('/cool-background.png');
		background-size: cover;
		background-position: center center;
	}

	section {
		display: grid;
		grid-template-rows: auto 1fr;
		grid-gap: 2rem;
		min-height: 30rem;
		background: #fff;
		border-radius: 1rem;
		padding: 2rem;
		width: 100%;
		max-width: 800px;
	}

	h1 {
		text-align: center;
		font-weight: bold;
		font-size: 4rem;
		background-image: linear-gradient(45deg, dodgerblue, violet);
		background-clip: text;
		-webkit-background-clip: text;
		-moz-background-clip: text;
		text-fill-color: transparent;
		-webkit-text-fill-color: transparent;
		-moz-text-fill-color: transparent;
	}
</style>
