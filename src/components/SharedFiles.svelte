<script lang="ts">
	declare module 'svelte-file-dropzone';
	import { createEventDispatcher } from 'svelte';
	import Dropzone from 'svelte-file-dropzone';

	const dispatch = createEventDispatcher();
	let files: File[] = [];

	$: dispatch('fileschanged', files);

	const handleFilesSelect = (e: any) => (files = [...files, ...e.detail.acceptedFiles]);
</script>

<h2>Local files</h2>

<Dropzone on:drop={handleFilesSelect} />

<ul>
	{#each files as file}
		<li>{file.name}</li>
	{/each}
</ul>
