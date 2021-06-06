<ol>
	<slot />
</ol>

<style>
	ol {
		display: grid;
		grid-gap: 2rem;
		align-items: start;
	}

	ol :global(li) {
		display: grid;
		grid-gap: 1rem;
	}

	ol :global(li) > :global(:first-child) {
		font-weight: bold;
	}
</style>
