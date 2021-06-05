<script lang="ts">
	import { onDestroy } from 'svelte';

	import type { AvailableFile, Guest } from '../domain/Guest';

	export let guest: Guest;
	let files: AvailableFile[] = [];

	const cleanUp = guest.onFilesChanged((newFiles) => (files = newFiles));

	onDestroy(cleanUp);
</script>

<h2>Remote files</h2>
<ol>
	{#each files as file}
		<li>{file.name}</li>
	{/each}
</ol>
