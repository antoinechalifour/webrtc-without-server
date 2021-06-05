<script lang="ts">
	import type { Guest } from '../domain/Guest';
	import SharedFiles from './SharedFiles.svelte';
	import RemoteFiles from './RemoteFiles.svelte';

	export let guest: Guest;
</script>

<main>
	<SharedFiles {guest} />
	<RemoteFiles {guest} />
</main>

<style>
	main {
		min-height: 100vh;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1.6rem;
	}
</style>
