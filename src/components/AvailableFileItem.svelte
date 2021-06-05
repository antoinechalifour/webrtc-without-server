<script lang="ts">
	import FileIcon from 'svelte-icons/go/GoFile.svelte';

	export let name: string;
</script>

<section>
	<FileIcon class="icon" />

	<div>
		<slot />
	</div>

	<p>{name}</p>
</section>

<style>
	section {
		position: relative;
		padding: 1rem;
		display: grid;
		grid-gap: 1rem;
		background: transparent;
		border-radius: 1rem;
		transition: background-color 0.2s ease;
		aspect-ratio: 1;
		align-items: center;
	}

	section:hover {
		background: aliceblue;
	}

	section > :global(svg) {
		justify-self: center;
		max-width: 50px;
		color: darkslateblue;
	}

	div {
		position: absolute;
		top: 0;
		right: 0;
	}

	div :global(button) {
		display: flex;
		place-content: center;
		width: 2.5rem;
		padding: 0.2rem;
		aspect-ratio: 1;
		background: #fff;
		border: 1px solid #373737;
		border-radius: 50%;
		cursor: pointer;
		transform: scale(1);
		transition: transform 0.1s ease;
	}

	div :global(button:hover) {
		transform: scale(1.1);
	}

	p {
		text-align: center;
		word-break: break-all;
	}
</style>
