<script lang="ts">
	import type { Guest } from '../domain/Guest';
	import SharedFiles from './SharedFiles.svelte';
	import RemoteFiles from './RemoteFiles.svelte';

	export let guest: Guest;

	$: console.log(guest);

	function handleFilesChanged(e: CustomEvent<File[]>) {
		guest.sync(e.detail.map((file) => ({ id: file.name, name: file.name })));
	}
</script>

<SharedFiles on:fileschanged={handleFilesChanged} />
<RemoteFiles />
