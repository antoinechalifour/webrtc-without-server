<ul>
	<slot />
</ul>

<style>
	ul {
		padding: 1rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
		grid-gap: 1.6rem;
	}
</style>
