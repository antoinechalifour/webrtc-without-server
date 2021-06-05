<script lang="ts">
	import type { Guest } from '../domain/Guest';
	import SharedFiles from './SharedFiles.svelte';
	import RemoteFiles from './RemoteFiles.svelte';

	export let guest: Guest;
</script>

<SharedFiles {guest} />
<RemoteFiles {guest} />
