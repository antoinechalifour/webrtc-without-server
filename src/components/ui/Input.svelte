<script lang="ts">
	export const type = 'text';
	export let id: string;
	export let name: string;
	export let value = '';
	export let placeholder = '';

	const typeAction = (node: HTMLInputElement) => (node.type = type);
</script>

<input use:typeAction {id} {name} {placeholder} bind:value />

<style>
	input {
		display: block;
		width: 100%;
		box-sizing: border-box;
		padding: 1rem;
		border: 2px solid dodgerblue;
		border-radius: 1rem;
		font-family: inherit;
		font-size: inherit;
	}
</style>
