<script lang="ts">
	import GoClippy from 'svelte-icons/go/GoClippy.svelte';

	import Input from './Input.svelte';

	export let text: string;
	export let formatContent: (content: string) => string;

	const copyToClipboard = () => navigator.clipboard.writeText(formatContent(text));
</script>

<div class="input-wrapper">
	<Input type="text" readonly value={text} />
	<button type="button" aria-label="Copy the url to your clipboard" on:click={copyToClipboard}>
		<GoClippy />
	</button>
</div>

<style>
	.input-wrapper {
		position: relative;
	}

	.input-wrapper :global(button) {
		position: absolute;
		box-sizing: border-box;
		padding: 0.2rem 2rem;
		width: 6rem;
		background: dodgerblue;
		color: #fff;
		border: none;
		top: 2px;
		right: 2px;
		bottom: 2px;
		border-top-right-radius: 0.5rem;
		border-bottom-right-radius: 0.5rem;
		cursor: pointer;
		border-left: 2px solid dodgerblue;
	}

	.input-wrapper input {
		padding-right: 3.5rem;
	}
</style>
