<script lang="ts">
	import GoClippy from 'svelte-icons/go/GoClippy.svelte';

	import Input from './Input.svelte';

	const defaultFormatContent = (str: string) => str;

	export let text: string;
	export let formatContent: (content: string) => string = defaultFormatContent;

	const copyToClipboard = () => navigator.clipboard.writeText(formatContent(text));
</script>

<div class="wrapper">
	<Input type="text" readonly value={text} />
	<button type="button" aria-label="Copy the url to your clipboard" on:click={copyToClipboard}>
		<GoClippy />
	</button>
</div>

<style>
	.wrapper {
		position: relative;
	}

	.wrapper :global(button) {
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

	.wrapper :global(input) {
		padding-right: 6.5rem;
	}
</style>
